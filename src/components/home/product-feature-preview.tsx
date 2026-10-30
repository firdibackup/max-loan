"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarClock, CircleCheck, House, TriangleAlert } from "lucide-react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BASE_PATH } from "@/lib/base-path";

const screenNames = ["Ringkasan KPR", "Perubahan bunga", "Bandingkan skenario", "Jadwal amortisasi"];

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <dt className="text-xs text-slate">{label}</dt>
      <dd className="text-base font-bold tracking-tight tabular-nums sm:text-lg">{value}</dd>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <House aria-hidden className="size-5 text-pine" />
        <div><h4 className="text-sm font-bold">KPR Rumah Saya</h4><p className="mt-1 text-xs text-slate">KPR aktif · Bunga fixed <strong className="font-bold text-ink">6,50%</strong></p></div>
        <CircleCheck aria-hidden className="ml-auto size-5 text-pine" />
      </div>
      <div className="rounded-xl bg-ink p-5 text-white sm:p-6">
        <p className="text-xs text-fog">Sisa pokok pinjaman</p>
        <p className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-tight tabular-nums">Rp 640.000.000</p>
        <div className="mt-5 flex justify-between gap-2 text-xs text-fog"><span>Progres pelunasan pokok</span><span className="font-bold text-aqua">20%</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-deep-line"><div className="feature-progress h-full w-1/5 rounded-full bg-aqua" /></div>
        <p className="mt-3 text-xs text-fog">Dari plafon awal Rp 800.000.000</p>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-5 px-1">
        <Metric label="Cicilan bulanan" value="Rp 6.250.000" />
        <Metric label="Sisa tenor" value="12 tahun" />
        <Metric label="Estimasi nilai properti" value="Rp 950.000.000" />
        <Metric label="Estimasi ekuitas" value="Rp 310.000.000" />
      </dl>
      <div className="flex items-start gap-3 border-t border-line pt-4">
        <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-amber" />
        <p className="text-xs leading-5"><strong className="font-bold">KPR Health · Perlu perhatian</strong><br /><span className="text-slate">Masa fixed segera berakhir. Cek periode bunga berikutnya.</span></p>
      </div>
    </div>
  );
}

function RatePreview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3"><h4 className="text-base font-bold">Bersiap untuk periode berikutnya</h4><CalendarClock aria-hidden className="size-6 shrink-0 text-pine" /></div>
      <div className="rounded-xl bg-amber-wash p-5 text-amber">
        <p className="flex items-center gap-2 text-xs font-semibold"><TriangleAlert aria-hidden className="size-4" /> Masa fixed akan berakhir</p>
        <p className="mt-3 text-4xl font-extrabold tracking-tight tabular-nums">90 <span className="text-lg font-medium">hari lagi</span></p>
        <p className="mt-2 text-sm font-bold">19 Januari 2027</p>
      </div>
      <div className="flex items-center gap-3 px-1 text-xs"><span className="rounded-full bg-mint px-3 py-2 font-semibold text-pine">Fixed · 6,50%</span><div className="h-px flex-1 bg-line" /><ArrowRight aria-hidden className="size-4 text-slate" /><span className="rounded-full bg-track px-3 py-2 font-semibold">Floating · 10%</span></div>
      <dl className="divide-y divide-line">
        <div className="flex items-center justify-between gap-3 py-4"><dt className="text-sm text-slate">Cicilan saat ini</dt><dd className="text-base font-bold tabular-nums">Rp 6.250.000</dd></div>
        <div className="flex items-center justify-between gap-3 py-4"><dt className="text-sm text-slate">Estimasi berikutnya</dt><dd className="text-base font-extrabold tabular-nums">Rp 7.650.000</dd></div>
      </dl>
      <p className="rounded-lg bg-paper px-4 py-3 text-xs leading-5 text-slate">Estimasi menggunakan asumsi bunga floating 10%. Cicilan aktual mengikuti ketentuan bank.</p>
    </div>
  );
}

function ComparisonPreview() {
  return (
    <div className="flex flex-col gap-5">
      <div><h4 className="text-base font-bold">Lihat pilihan berdampingan</h4><p className="mt-1 text-xs text-slate">Contoh dua skenario · Sisa tenor 12 tahun</p></div>
      <div className="overflow-hidden rounded-xl border border-line">
        <table className="w-full table-fixed text-left text-xs sm:text-sm">
          <caption className="sr-only">Ilustrasi perbandingan KPR saat ini dan skenario takeover</caption>
          <thead><tr><th className="w-[34%] p-3 font-medium text-slate">Komponen</th><th className="p-3 font-semibold">Saat ini</th><th className="bg-mist p-3 font-semibold text-pine">Takeover</th></tr></thead>
          <tbody className="tabular-nums">
            {[["Cicilan / bulan", "Rp 6,25 jt", "Rp 5,75 jt"], ["Biaya pindah", "—", "Rp 12 jt"], ["Total pembayaran¹", "Rp 900 jt", "Rp 840 jt"]].map(([label, current, next]) => (
              <tr key={label} className="border-t border-line"><th className="p-3 py-5 font-medium text-slate">{label}</th><td className="p-3 font-bold">{current}</td><td className="bg-mist p-3 font-bold text-pine">{next}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-xl bg-mint px-5 py-4"><p className="text-xs font-semibold text-pine">Perkiraan titik impas</p><p className="mt-1 text-3xl font-extrabold tracking-tight">Bulan ke-24</p><p className="mt-2 text-xs leading-5 text-pine">Biaya pindah Rp 12 jt ÷ selisih cicilan Rp 500 rb/bulan.</p></div>
      <p className="text-xs leading-5 text-slate">¹ Contoh sederhana: cicilan tetap selama 144 bulan, termasuk biaya pindah. Bukan penawaran bank; perubahan bunga dapat mengubah hasil.</p>
    </div>
  );
}

const principalShares = [38, 41, 44, 47, 51, 55, 60, 65, 71, 78, 86, 95];

function AmortizationPreview() {
  return (
    <div className="flex flex-col gap-5">
      <div><h4 className="text-base font-bold">Setiap cicilan, semakin dekat.</h4><p className="mt-1 text-xs text-slate">Ilustrasi komposisi pembayaran per tahun</p></div>
      <div className="flex flex-wrap gap-5 text-xs font-bold"><span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-pine" />Pokok pinjaman</span><span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-aqua" />Bunga</span></div>
      <div role="img" aria-label="Grafik ilustratif 12 tahun: porsi pokok meningkat dari 38 menjadi 95 persen, sementara porsi bunga menurun dari 62 menjadi 5 persen.">
        <div className="flex h-48 items-end gap-2 border-b border-line pb-0 sm:h-56 sm:gap-3">
          {principalShares.map((principal, i) => (
            <div key={i} className="feature-chart-bar flex h-full min-w-0 flex-1 origin-bottom flex-col overflow-hidden rounded-t-sm" style={{ animationDelay: `${i * 35}ms` }}>
              <div className="bg-aqua" style={{ height: `${100 - principal}%` }} />
              <div className="bg-pine" style={{ height: `${principal}%` }} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-xs text-slate"><span>Tahun 1</span><span>Tahun 6</span><span>Tahun 12</span></div>
      </div>
      <div className="border-t border-line pt-4"><p className="text-sm font-bold">Porsi pokok bertumbuh seiring waktu.</p><p className="mt-2 text-xs leading-5 text-slate">Pada skema anuitas dengan bunga tetap, porsi bunga menurun saat sisa pokok berkurang. Grafik ini ilustrasi pola, bukan jadwal pembayaran aktual.</p></div>
    </div>
  );
}

const screens = [DashboardPreview, RatePreview, ComparisonPreview, AmortizationPreview];

/** Reconstructed from the dashboard widgets and amortization page; demo data only. */
export function ProductFeaturePreview({ active, className }: { active: number; className?: string }) {
  const reduce = useReducedMotion();
  const Screen = screens[active];

  return (
    <figure className={cn("feature-preview rounded-[20px] bg-mist p-3 sm:p-5 xl:p-7", className)}>
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_16px_40px_-24px_rgba(0,14,53,0.24)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <Image src={`${BASE_PATH}/max-loan-logo.svg`} alt="MAXLOAN" width={156} height={24} className="h-6 w-auto" />
          <span className="text-xs text-slate">{screenNames[active]}</span>
        </div>
        <motion.div key={active} initial={reduce ? false : { opacity: 0.65, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} className="feature-preview-body p-5 sm:p-6">
          <Screen />
        </motion.div>
      </div>
      <figcaption className="mt-4 flex items-center justify-between gap-3 px-1 text-[11px] leading-4 text-slate"><span>CONTOH TAMPILAN · DATA ILUSTRATIF</span><span className="shrink-0 tabular-nums">0{active + 1} / 04</span></figcaption>
    </figure>
  );
}
