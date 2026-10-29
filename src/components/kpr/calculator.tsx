"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, CircleAlert, LoaderCircle, RotateCcw } from "lucide-react";
import { simulate, validateInputs } from "@/lib/kpr/finance";
import type { Inputs, Mode, Product, Simulation } from "@/lib/kpr/types";
import { ComparisonTable } from "./comparison-table";
import { applicationLink } from "@/lib/kpr/handoff";

const rupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
const numeric = (value: number) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(value);
const dateLabel = (value: string) => new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeZone: "Asia/Jakarta" }).format(new Date(value));
const tabs: { mode: Mode; label: string }[] = [
  { mode: "primary", label: "KPR Baru" },
  { mode: "takeover", label: "Take Over" },
  { mode: "topup", label: "Refinancing + Top-up" },
];
const defaults: Inputs = {
  price: 1_000_000_000, downPayment: 200_000_000, months: 180,
  outstanding: 500_000_000, remainingMonths: 180, currentRate: 11, currentPayment: 0,
  fixedMonthsLeft: 0, currentFloatingRate: 11, penaltyRate: 2, exitAdmin: 0,
  requestedCash: 150_000_000, purpose: "renovation", additionalCosts: 0, income: 0, otherDebt: 0,
};

function NumberField({ label, value, onChange, unit = "Rp", hint, step = 1, max = 1e13 }: {
  label: string; value: number; onChange: (n: number) => void; unit?: string; hint?: string; step?: number; max?: number;
}) {
  const id = useId();
  return <div>
    <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
    <div className="flex min-h-12 items-center gap-2 rounded-lg border border-line bg-white px-3.5 focus-within:border-pine focus-within:ring-1 focus-within:ring-pine">
      {unit === "Rp" && <span className="text-sm text-slate">Rp</span>}
      <input id={id} type={unit === "Rp" ? "text" : "number"} inputMode={unit === "Rp" ? "numeric" : "decimal"} min={0} max={max} step={step}
        value={unit === "Rp" ? numeric(value) : value}
        onChange={e => { const v = unit === "Rp" ? Number(e.target.value.replace(/[^0-9]/g, "")) : Number(e.target.value); if (Number.isFinite(v) && v >= 0 && v <= max) onChange(v); }}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="min-w-0 flex-1 bg-transparent py-3 text-base tabular-nums outline-none!" />
      {unit !== "Rp" && <span className="text-sm text-slate">{unit}</span>}
    </div>
    {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs leading-5 text-slate">{hint}</p>}
  </div>;
}

function Metric({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div className="min-w-0"><dt className="text-xs leading-5 text-slate">{label}</dt><dd className="mt-1 text-lg font-semibold tabular-nums sm:text-xl">{value}</dd>{note && <p className="mt-1 text-xs leading-5 text-slate">{note}</p>}</div>;
}

export function KprCalculator({ applicationUrl }: { applicationUrl: string }) {
  const [mode, setMode] = useState<Mode>("primary");
  const [input, setInput] = useState<Inputs>(defaults);
  const [dpPercent, setDpPercent] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState("");
  const [comparison, setComparison] = useState<string[]>([]);
  const scrollToComparison = useRef(false);
  const [sort, setSort] = useState("total");
  const [bankFilter, setBankFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [asOf, setAsOf] = useState("");
  const [retry, setRetry] = useState(0);
  const [scheduleYear, setScheduleYear] = useState(1);
  const [notice, setNotice] = useState("");
  const update = (key: keyof Inputs, value: number | string) => setInput(old => ({ ...old, [key]: value }));

  useEffect(() => {
    if (!scrollToComparison.current) return;
    scrollToComparison.current = false;
    const section = document.getElementById("perbandingan-produk");
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [comparison]);

  function toggleComparison(id: string, checked: boolean) {
    if (checked && (comparison.length >= 3 || comparison.includes(id))) return;
    scrollToComparison.current = checked;
    setComparison(old => checked ? [...old, id].slice(0, 3) : old.filter(value => value !== id));
  }

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "primary" || hash === "takeover" || hash === "topup") {
        setMode(hash); setSelected(""); setComparison([]); setBankFilter(""); setNotice("");
      }
    };
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true); setError("");
      try {
        const response = await fetch("/api/kpr/products", { signal: controller.signal });
        if (!response.ok) throw new Error("Katalog bank belum dapat dimuat. Coba lagi untuk mengambil produk terbaru.");
        const data = await response.json();
        setProducts(data.products); setAsOf(data.asOf);
      } catch (e) {
        if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "Gagal memuat katalog.");
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load();
    return () => controller.abort();
  }, [retry]);

  function switchMode(next: Mode) {
    setMode(next); setSelected(""); setComparison([]); setBankFilter(""); setScheduleYear(1); setNotice("");
    window.history.replaceState(null, "", `#${next}`);
  }

  const errors = validateInputs(mode, input);
  const available = products.filter(p => p.productTypes.includes(mode));
  const evaluated = errors.length ? [] : available.flatMap(product => {
    try { return [simulate(product, mode, input)]; } catch { return []; }
  });
  const ranked = [...evaluated].sort((a, b) => a.reasons.length - b.reasons.length || (sort === "payment" ? a.payment - b.payment : sort === "fees" ? a.feesTotal - b.feesTotal : a.totalCost - b.totalCost));
  const result = evaluated.find(r => r.product.id === selected) ?? ranked[0];
  const continuationUrl = result ? applicationLink(applicationUrl, mode, input, result.product) : "";
  const visible = ranked.filter(r => !bankFilter || r.product.bank.id === bankFilter);
  const banks = [...new Map(available.map(p => [p.bank.id, p.bank])).values()];
  const compared = comparison.map(id => evaluated.find(r => r.product.id === id)).filter((r): r is Simulation => !!r);
  const skipped = available.length - evaluated.length;
  const stale = result && asOf && (Date.parse(asOf) - Date.parse(result.product.lastVerifiedAt)) / 86_400_000 > 30;

  return <div className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-10 lg:px-12">
    <div className="pt-8 pb-9 sm:pt-12 sm:pb-12">
      <Link href="/" className="text-sm text-slate hover:text-pine">Beranda / <span className="text-ink">Kalkulator KPR</span></Link>
      <div className="mt-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <h1 className="max-w-2xl font-display text-display font-medium tracking-tight">Rencanakan KPR.<br /><span className="text-pine">Mulai dari angkanya.</span></h1>
        <p className="max-w-sm leading-7 text-slate">Simulasi KPR dengan produk bank. Gratis, tanpa login.</p>
      </div>
    </div>

    <div role="tablist" aria-label="Jenis kalkulator" className="grid grid-cols-3 gap-1 rounded-xl bg-track p-1.5">
      {tabs.map((tab, index) => <button key={tab.mode} id={`tab-${tab.mode}`} role="tab" aria-selected={mode === tab.mode} aria-controls="calculator-panel" tabIndex={mode === tab.mode ? 0 : -1}
        onClick={() => switchMode(tab.mode)} onKeyDown={e => {
          let target = index;
          if (e.key === "ArrowRight") target = (index + 1) % 3;
          else if (e.key === "ArrowLeft") target = (index + 2) % 3;
          else if (e.key === "Home") target = 0;
          else if (e.key === "End") target = 2;
          else return;
          e.preventDefault(); switchMode(tabs[target].mode); document.getElementById(`tab-${tabs[target].mode}`)?.focus();
        }} className={`min-h-14 rounded-lg px-2 py-3 text-xs font-semibold transition-colors sm:text-base ${mode === tab.mode ? "bg-white text-ink shadow-sm" : "text-slate hover:text-ink"}`}>{tab.label}</button>)}
    </div>

    <div id="calculator-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} className="pt-6">
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="rounded-2xl border border-line bg-white p-5 sm:p-7">
          <div className="mb-7 flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">{mode === "primary" ? "Rencana pembelianmu" : "Kondisi KPR kamu"}</h2><button onClick={() => { setInput(defaults); setDpPercent(false); setScheduleYear(1); }} className="flex min-h-10 items-center gap-1.5 text-xs text-slate hover:text-pine"><RotateCcw size={13} /> Reset</button></div>
          <div className="space-y-5">
            <NumberField label={mode === "primary" ? "Harga properti" : "Estimasi nilai properti saat ini"} value={input.price} onChange={n => setInput(old => ({ ...old, price: n, ...(dpPercent ? { downPayment: Math.round(n * (old.price ? old.downPayment / old.price : 0.2)) } : {}) }))} />
            {mode === "primary" ? <div>
              <div className="mb-2 flex justify-end gap-1" aria-label="Satuan DP">{[false, true].map(percent => <button key={String(percent)} aria-pressed={dpPercent === percent} onClick={() => setDpPercent(percent)} className={`min-h-9 rounded-md px-3 text-xs ${dpPercent === percent ? "bg-mint text-ink" : "text-slate"}`}>{percent ? "%" : "Rupiah"}</button>)}</div>
              <NumberField label="Uang muka (DP)" value={dpPercent ? Math.round(input.downPayment / (input.price || 1) * 10_000) / 100 : input.downPayment} onChange={n => update("downPayment", dpPercent ? Math.round(input.price * n / 100) : n)} unit={dpPercent ? "%" : "Rp"} max={dpPercent ? 100 : 1e13} step={dpPercent ? 0.1 : 1} hint={dpPercent ? rupiah(input.downPayment) : `${numeric(input.downPayment / (input.price || 1) * 100)}% dari harga properti`} />
            </div> : <>
              <NumberField label="Sisa pokok KPR" value={input.outstanding} onChange={n => update("outstanding", n)} />
              <div className="grid grid-cols-2 gap-4"><NumberField label="Sisa tenor lama" value={input.remainingMonths} onChange={n => update("remainingMonths", n)} unit="bulan" max={360} /><NumberField label="Bunga saat ini" value={input.currentRate} onChange={n => update("currentRate", n)} unit="% / tahun" step={0.01} max={100} /></div>
              <NumberField label="Cicilan lama per bulan (opsional)" value={input.currentPayment} onChange={n => update("currentPayment", n)} hint="Isi 0 untuk hitung otomatis." />
              <details className="rounded-lg bg-paper p-4"><summary className="cursor-pointer text-sm font-medium">Masa fixed & biaya pelunasan</summary><div className="mt-4 space-y-4">
                <NumberField label="Sisa masa fixed" value={input.fixedMonthsLeft} onChange={n => update("fixedMonthsLeft", n)} unit="bulan" max={360} hint="Isi 0 jika sudah floating." />
                {input.fixedMonthsLeft > 0 && <NumberField label="Estimasi bunga setelah fixed" value={input.currentFloatingRate} onChange={n => update("currentFloatingRate", n)} unit="% / tahun" step={0.01} max={100} />}
                <NumberField label="Penalti pelunasan" value={input.penaltyRate} onChange={n => update("penaltyRate", n)} unit="% pokok" step={0.1} max={100} hint="Sesuaikan dengan bank lama." />
                <NumberField label="Administrasi bank lama" value={input.exitAdmin} onChange={n => update("exitAdmin", n)} />
              </div></details>
            </>}
            {mode === "topup" && <>
              <NumberField label="Dana bersih yang dibutuhkan" value={input.requestedCash} onChange={n => update("requestedCash", n)} />
              <label className="block text-sm font-medium">Tujuan dana<select value={input.purpose} onChange={e => update("purpose", e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-line bg-white px-3 text-base">
                <option value="renovation">Renovasi rumah</option><option value="education">Pendidikan</option><option value="business">Usaha</option><option value="debt_consolidation">Konsolidasi utang</option><option value="other">Lainnya</option>
              </select></label>
            </>}
            <div className="border-t border-line pt-5"><NumberField label={mode === "primary" ? "Tenor KPR" : "Tenor KPR baru"} value={input.months} onChange={n => { update("months", n); setScheduleYear(1); }} unit="bulan" max={360} hint={`${numeric(input.months / 12)} tahun`} />
              <input aria-label="Geser tenor KPR" type="range" min="12" max="360" step="12" value={Math.max(12, input.months)} onChange={e => { update("months", Number(e.target.value)); setScheduleYear(1); }} className="mt-3 w-full accent-pine" />
              <div className="flex justify-between text-xs text-slate"><span>1 tahun</span><span>30 tahun</span></div>
            </div>
            <details className="border-t border-line pt-4"><summary className="cursor-pointer text-sm font-medium">Biaya tambahan & kemampuan bayar</summary><div className="mt-4 space-y-4">
              <NumberField label="Biaya tambahan estimasi" value={input.additionalCosts} onChange={n => update("additionalCosts", n)} hint="Hanya biaya yang belum tercantum." />
              <NumberField label="Penghasilan bulanan (opsional)" value={input.income} onChange={n => update("income", n)} />
              <NumberField label="Cicilan lain per bulan" value={input.otherDebt} onChange={n => update("otherDebt", n)} hint="Di luar KPR lama." />
            </div></details>
          </div>
        </div>

        <div className="min-w-0 lg:sticky lg:top-6">
          {loading ? <div role="status" className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl bg-mist text-pine"><LoaderCircle className="animate-spin" /><p>Mengambil produk bank terbaru…</p></div>
            : error ? <div role="alert" className="rounded-2xl border border-line bg-white p-8"><CircleAlert className="mb-4 text-amber" /><h2 className="text-xl font-medium">Katalog belum tersedia</h2><p className="mt-3 leading-7 text-slate">{error}</p><button onClick={() => setRetry(n => n + 1)} className="mt-5 rounded-lg bg-ink px-5 py-3 text-white">Coba lagi</button></div>
            : errors.length ? <div role="alert" className="rounded-2xl bg-amber-wash p-7"><h2 className="mb-3 font-semibold">Periksa angka kamu</h2><ul className="list-disc space-y-2 pl-5 text-sm leading-6">{errors.map(e => <li key={e}>{e}</li>)}</ul></div>
            : result ? <>
              <section id="hasil-simulasi" aria-label="Hasil simulasi" className="overflow-hidden rounded-2xl border border-line bg-white">
                <div className="bg-ink px-6 py-7 text-white sm:px-8 sm:py-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs">Estimasi cicilan awal</span><span className="text-xs text-mint">{result.product.bank.name}</span></div>
                  <p className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight tracking-tight tabular-nums">{rupiah(result.payment)}<span className="ml-2 text-sm font-normal text-fog">/ bulan</span></p>
                  <p className="mt-3 text-sm leading-6 text-fog">{result.product.name}</p>
                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/20 pt-4 text-xs text-mint"><span>Bunga awal {numeric(result.product.ratePeriods[0].rateBps / 100)}% / tahun</span><span>Tenor {numeric(input.months / 12)} tahun</span></div>
                </div>
                <div className="space-y-6 p-6 sm:p-8">
                  <dl className="grid grid-cols-2 gap-x-5 gap-y-6">
                    <Metric label={mode === "topup" ? "Plafon baru" : "Plafon pinjaman"} value={rupiah(result.principal)} />
                    <Metric label="Cicilan floating (estimasi)" value={result.floatingPayment === null ? "Tidak ada" : rupiah(result.floatingPayment)} />
                    <Metric label={mode === "topup" ? "Biaya dipotong dari plafon" : "Estimasi biaya awal"} value={rupiah(result.feesTotal)} note={mode === "primary" ? "Di luar DP dan pajak transaksi." : undefined} />
                    <Metric label="Total bunga" value={rupiah(result.totalInterest)} />
                  </dl>
                  {mode === "topup" && <div className="rounded-xl bg-mist p-5"><p className="text-sm text-pine">Estimasi dana bersih diterima</p><p className="mt-2 text-2xl font-semibold tabular-nums">{rupiah(result.cash)}</p><p className="mt-2 text-xs leading-6 text-slate">Plafon baru − sisa pokok − seluruh biaya.</p>{result.cashGap > 0 && <p className="mt-2 text-sm text-amber">Kurang {rupiah(result.cashGap)} dari kebutuhan dana.</p>}</div>}
                  {mode === "takeover" && <div className="rounded-xl bg-mist p-5"><dl className="grid grid-cols-2 gap-5"><Metric label="Selisih cicilan awal" value={rupiah(result.monthlySaving!)} note="Positif berarti cicilan awal lebih rendah." /><Metric label="Penghematan bersih" value={rupiah(result.saving!)} note={`Dibandingkan hingga ${Math.max(input.months, input.remainingMonths)} bulan.`} /></dl><p className="mt-4 border-t border-line pt-3 text-sm font-medium">{result.breakEven === null ? "Biaya pindah belum tertutup secara berkelanjutan." : `Biaya pindah tertutup mulai bulan ke-${result.breakEven}.`}</p></div>}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-4"><span className="text-sm text-slate">Total pembayaran + biaya</span><strong className="text-xl tabular-nums">{rupiah(result.totalCost)}</strong></div>
                  {mode === "topup" && <p className="text-xs leading-5 text-slate">Biaya sudah termasuk dalam plafon.</p>}
                  {result.reasons.length > 0 && <div role="status" className="rounded-lg bg-amber-wash p-4 text-sm leading-6"><p className="mb-2 font-semibold text-amber">Perlu penyesuaian</p><ul className="list-disc space-y-1 pl-4">{result.reasons.map(r => <li key={r}>{r}</li>)}</ul></div>}
                  {result.missingFees.length > 0 && <p className="text-xs leading-6 text-amber">Belum termasuk {result.missingFees.join(", ")}. Isi di biaya tambahan.</p>}
                  {result.dti !== null && <p className="text-sm text-slate">Rasio cicilan awal: <strong className="text-ink">{numeric(result.dti * 100)}%</strong> dari penghasilan. Batas produk {numeric(result.product.eligibility.maximumDtiBps / 100)}%.</p>}
                  <p className="text-xs leading-6 text-slate">Estimasi, bukan persetujuan kredit.</p>
                  {continuationUrl && <a href={continuationUrl} referrerPolicy="no-referrer" className="flex min-h-12 items-center justify-center gap-3 rounded-lg bg-ink px-5 py-3 font-medium text-white hover:bg-pine">Lanjutkan di REMAX <ArrowUpRight size={17} /></a>}
                  <p className="text-xs text-slate">Diverifikasi {dateLabel(result.product.lastVerifiedAt)} · Berlaku sampai {dateLabel(result.product.effectiveUntil)}</p>
                  {stale && <p className="text-xs leading-5 text-amber">Data lebih dari 30 hari. Konfirmasi ulang ke bank.</p>}
                </div>
              </section>
            </> : <div className="rounded-2xl bg-mist p-8"><h2 className="text-xl font-medium">Belum ada produk yang bisa dihitung</h2><p className="mt-3 text-sm leading-7 text-slate">Produk aktif untuk kebutuhan ini belum tersedia, atau periode bunganya belum mencakup tenor yang kamu pilih. Coba tenor lain.</p></div>}
        </div>
      </div>

      {!loading && !error && compared.length > 0 && <ComparisonTable results={compared} mode={mode} onClear={() => setComparison([])} />}

      {!loading && !error && !errors.length && <section className="mt-14" aria-labelledby="products-heading">
        <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h2 id="products-heading" className="font-display text-3xl font-medium">Pilihan produk bank</h2><p className="mt-2 text-sm leading-6 text-slate">{visible.length} produk konvensional</p></div><div className="flex flex-wrap gap-3">
          <label className="text-xs text-slate">Bank<select value={bankFilter} onChange={e => setBankFilter(e.target.value)} className="mt-1 block min-h-11 max-w-52 rounded-lg border border-line bg-white px-3 text-sm text-ink"><option value="">Semua bank</option>{banks.map(b => <option value={b.id} key={b.id}>{b.name}</option>)}</select></label>
          <label className="text-xs text-slate">Urutkan<select value={sort} onChange={e => setSort(e.target.value)} className="mt-1 block min-h-11 rounded-lg border border-line bg-white px-3 text-sm text-ink"><option value="total">Total terendah</option><option value="payment">Cicilan awal terendah</option><option value="fees">Biaya awal terendah</option></select></label>
        </div></div>
        {skipped > 0 && <p className="mb-4 text-sm text-amber">{skipped} produk belum tersedia untuk tenor ini.</p>}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map(r => {
          const active = result?.product.id === r.product.id;
          return <article key={r.product.id} className={`flex flex-col rounded-xl border bg-white p-5 sm:p-6 ${active ? "border-pine ring-1 ring-pine" : "border-line"}`}>
            <div className="mb-5 flex items-center justify-between gap-3"><span className="flex h-11 min-w-14 items-center justify-center rounded-lg bg-paper px-2 text-xs font-bold text-pine">{r.product.bank.mark}</span><span className="text-xs text-slate">Fixed {numeric((r.product.ratePeriods.filter(p => p.type === "fixed").reduce((s, p) => s + (p.durationMonths ?? 0), 0)) / 12)} tahun</span></div>
            <p className="text-xs text-slate">{r.product.bank.name}</p><h3 className="mt-1 text-lg font-semibold leading-7">{r.product.name}</h3>
            <p className="mt-5 text-2xl font-semibold tabular-nums">{rupiah(r.payment)}<span className="ml-1 text-xs font-normal text-slate">/ bulan</span></p>
            <div className="mt-3 space-y-2 text-xs leading-5 text-slate"><p>Bunga awal <strong className="text-ink">{numeric(r.product.ratePeriods[0].rateBps / 100)}%</strong> · LTV maks. {numeric(r.product.eligibility.maximumLtvBps / 100)}%</p><p>Total pembayaran + biaya {rupiah(r.totalCost)}</p>{r.missingFees.length > 0 && <p className="text-amber">Sebagian biaya belum tersedia</p>}{r.reasons.length > 0 && <p className="text-amber">{r.reasons.length} catatan penyesuaian</p>}</div>
            <button onClick={() => { setSelected(r.product.id); setNotice(`${r.product.name} diterapkan ke simulasi.`); document.getElementById("hasil-simulasi")?.scrollIntoView({ block: "start" }); }} className={`mt-5 flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${active ? "border-pine bg-mist text-pine" : "border-line hover:bg-paper"}`}>{active ? <><Check size={16} /> Sedang digunakan</> : <>Gunakan produk ini <ArrowRight size={15} /></>}</button>
            <label className="mt-auto flex min-h-11 cursor-pointer items-center gap-2 pt-3 text-xs text-slate"><input type="checkbox" checked={comparison.includes(r.product.id)} disabled={!comparison.includes(r.product.id) && comparison.length >= 3} onChange={e => toggleComparison(r.product.id, e.target.checked)} className="size-4 accent-pine" /> Bandingkan produk<span className="sr-only"> {r.product.name}</span> {comparison.length >= 3 && !comparison.includes(r.product.id) ? "(maks. 3)" : ""}</label>
          </article>;
        })}</div>
        {!visible.length && <p className="rounded-xl bg-track p-6 text-sm text-slate">Belum ada produk untuk pilihan ini. Coba bank atau tenor lain.</p>}
        <p aria-live="polite" className="mt-3 min-h-5 text-sm text-pine">{notice}</p>
      </section>}

      {result && !errors.length && !loading && !error && <section className="mt-10 space-y-4" aria-label="Rincian simulasi">
        <details className="rounded-xl border border-line bg-white p-5 sm:p-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium">Rincian biaya & tahapan bunga <ChevronDown size={18} /></summary><div className="mt-6 grid gap-8 md:grid-cols-2"><div><h3 className="mb-3 text-sm font-semibold">Biaya {mode === "topup" ? "yang dipotong dari plafon" : "di awal"}</h3><dl className="space-y-3">{result.fees.map(f => <div key={f.label} className="flex justify-between gap-4 text-sm"><dt className="text-slate">{f.label}</dt><dd className="shrink-0 tabular-nums">{rupiah(f.amount)}</dd></div>)}</dl></div><div><h3 className="mb-3 text-sm font-semibold">Cicilan berubah mengikuti periode bunga</h3><ol className="space-y-3">{result.rows.filter((row, index, rows) => index === 0 || row.rateBps !== rows[index - 1].rateBps || row.floating !== rows[index - 1].floating).map(row => <li key={row.month} className="rounded-lg bg-paper p-3 text-sm leading-6">Mulai bulan {row.month}: {numeric(row.rateBps / 100)}% {row.floating ? "floating (estimasi)" : "fixed"}<br /><strong>{rupiah(row.payment)} / bulan</strong></li>)}</ol></div></div></details>
        <details className="rounded-xl border border-line bg-white p-5 sm:p-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium">Jadwal cicilan & sisa pokok <ChevronDown size={18} /></summary><div className="mt-5"><label className="text-sm">Tampilkan tahun <select value={Math.min(scheduleYear, Math.ceil(input.months / 12))} onChange={e => setScheduleYear(Number(e.target.value))} className="ml-2 min-h-11 rounded-lg border border-line px-3">{Array.from({ length: Math.ceil(input.months / 12) }, (_, n) => <option key={n} value={n + 1}>{n + 1}</option>)}</select></label><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[600px] text-left text-xs sm:text-sm"><caption className="sr-only">Jadwal amortisasi {result.product.name}</caption><thead><tr>{["Bulan", "Bunga / tahun", "Cicilan", "Pokok", "Bunga", "Sisa pokok"].map(h => <th className="py-3 pr-4 font-medium text-slate" key={h}>{h}</th>)}</tr></thead><tbody>{result.rows.slice((scheduleYear - 1) * 12, scheduleYear * 12).map(row => <tr key={row.month} className="border-t border-line tabular-nums"><td className="py-3 pr-4">{row.month}</td><td className="pr-4">{numeric(row.rateBps / 100)}%{row.floating ? "*" : ""}</td><td className="pr-4">{rupiah(row.payment)}</td><td className="pr-4">{rupiah(row.principal)}</td><td className="pr-4">{rupiah(row.interest)}</td><td>{rupiah(row.balance)}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs text-slate">* Floating adalah asumsi, bukan proyeksi bunga bank. Pembulatan ke rupiah terdekat.</p></div></details>
      </section>}
      <details className="mt-10 max-w-4xl border-t border-line pt-6 text-xs leading-6 text-slate"><summary className="cursor-pointer font-medium">Asumsi perhitungan</summary><div className="mt-3 space-y-2"><p>Angka awal adalah contoh. Perhitungan menggunakan anuitas; bunga floating diasumsikan tetap sesuai produk. Jika cicilan lama diisi manual, selisih saldo diselesaikan di cicilan terakhir.</p><p>Total KPR Baru di luar DP dan pajak. Produk tanpa catatan penyesuaian diurutkan lebih dahulu. Kemampuan bayar diperiksa jika penghasilan diisi; syarat lainnya tetap diperiksa bank.</p><p>Simulasi tidak mengirim pengajuan atau menyimpan data keuangan ke server.</p>{asOf && <p>Katalog {dateLabel(asOf)} · Konvensional</p>}</div></details>
    </div>
  </div>;
}
