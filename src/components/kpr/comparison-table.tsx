import { Check } from "lucide-react";
import type { Mode, Simulation } from "@/lib/kpr/types";

const rupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

type ComparisonRow = {
  label: string;
  value: (result: Simulation) => number | null;
  format: (value: number | null) => string;
  preference: "lower" | "higher";
  requiresCompleteFees?: boolean;
  compareUnavailable?: boolean;
};

export function ComparisonTable({ results, mode, onClear }: { results: Simulation[]; mode: Mode; onClear: () => void }) {
  const rows: ComparisonRow[] = [
    { label: "Cicilan awal", value: r => r.payment, format: n => rupiah(n!), preference: "lower" },
    { label: "Cicilan floating (estimasi)", value: r => r.floatingPayment, format: n => n === null ? "Tidak ada" : rupiah(n), preference: "lower" },
    { label: "Biaya", value: r => r.feesTotal, format: n => rupiah(n!), preference: "lower", requiresCompleteFees: true },
    { label: "Total pembayaran + biaya", value: r => r.totalCost, format: n => rupiah(n!), preference: "lower", requiresCompleteFees: true },
  ];
  if (mode === "topup") rows.push({ label: "Dana bersih", value: r => r.cash, format: n => rupiah(n!), preference: "higher", requiresCompleteFees: true });
  if (mode === "takeover") rows.push(
    { label: "Penghematan bersih", value: r => r.saving, format: n => n === null ? "—" : rupiah(n), preference: "higher", requiresCompleteFees: true },
    { label: "Titik impas berkelanjutan", value: r => r.breakEven, format: n => n === null ? "Belum tercapai" : `Bulan ${n}`, preference: "lower", requiresCompleteFees: true, compareUnavailable: true },
  );
  const completeFees = results.every(r => r.missingFees.length === 0);

  return <section id="perbandingan-produk" tabIndex={-1} aria-labelledby="comparison-heading" className="mt-10 scroll-mt-6 rounded-2xl border border-line bg-white p-5 focus-visible:outline-2 focus-visible:outline-pine sm:p-7">
    <div className="mb-2 flex items-center justify-between gap-4">
      <h2 id="comparison-heading" className="text-xl font-semibold">Bandingkan pilihanmu</h2>
      <button onClick={onClear} className="min-h-11 shrink-0 px-3 text-sm text-slate hover:text-ink">Hapus semua</button>
    </div>
    <p className="mb-5 text-xs leading-5 text-slate">{results.length < 2 ? "Pilih satu produk lagi untuk melihat keunggulannya." : "Highlight hijau = nilai lebih unggul."}{!completeFees && results.length > 1 ? " Biaya belum lengkap tidak diberi peringkat." : ""}</p>
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tabel perbandingan produk">
      <table className="w-full min-w-[580px] text-left text-sm">
        <caption className="sr-only">Perbandingan hingga tiga produk bank untuk input yang sama</caption>
        <thead><tr><th scope="col" className="p-3 font-medium">Komponen</th>{results.map(r => <th scope="col" key={r.product.id} className="max-w-60 p-3 align-top font-semibold">{r.product.name}</th>)}</tr></thead>
        <tbody>
          {rows.map(row => {
            const values = results.map(row.value);
            const valid = values.filter((n): n is number => n !== null && Number.isFinite(n));
            const best = row.preference === "lower" ? Math.min(...valid) : Math.max(...valid);
            const canHighlight = results.length > 1 && valid.length > 0 && (valid.length === results.length || row.compareUnavailable) && new Set(values).size > 1 && (!row.requiresCompleteFees || completeFees);
            return <tr key={row.label} className="border-t border-line">
              <th scope="row" className="p-3 align-top font-normal text-slate">{row.label}</th>
              {results.map((r, index) => {
                const winner = canHighlight && values[index] === best;
                return <td key={r.product.id} className={`max-w-60 p-3 align-top leading-6 tabular-nums ${winner ? "bg-mist font-semibold text-pine" : ""}`}>
                  <span className="inline-flex items-start gap-2">{winner && <Check size={15} className="mt-1 shrink-0" aria-hidden="true" />}<span>{row.format(values[index])}{winner && <span className="sr-only"> — lebih unggul</span>}</span></span>
                </td>;
              })}
            </tr>;
          })}
          <tr className="border-t border-line"><th scope="row" className="p-3 align-top font-normal text-slate">Catatan</th>{results.map(r => <td key={r.product.id} className="max-w-60 p-3 align-top text-xs leading-6 text-slate">{[...r.reasons, ...(r.missingFees.length ? [`Biaya ${r.missingFees.join(", ")} belum tersedia.`] : [])].join(" ") || "Syarat lainnya perlu pemeriksaan bank."}</td>)}</tr>
        </tbody>
      </table>
    </div>
  </section>;
}
