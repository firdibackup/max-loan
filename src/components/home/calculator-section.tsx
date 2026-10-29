import { CALCULATOR_URL } from "@/lib/links";
import { ArrowUpRight, House, ArrowLeftRight, Wallet } from "lucide-react";
import { wrap } from "./styles";

const options = [
  { mode: "primary", title: "KPR Baru", description: "Hitung DP dan cicilan rumah.", icon: House },
  { mode: "takeover", title: "Take Over", description: "Bandingkan biaya pindah bank.", icon: ArrowLeftRight },
  { mode: "topup", title: "Refinancing + Top-up", description: "Hitung dana tambahan dari KPR.", icon: Wallet },
];

export function CalculatorSection() {
  return <section id="kalkulator" className="bg-mist py-16 sm:py-24">
    <div className={wrap}>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <h2 className="max-w-2xl font-display text-section font-medium">Hitung dulu.<br />Tentukan langkah KPR kamu.</h2>
        <p className="max-w-sm text-base leading-7 text-slate">Simulasi gratis, tanpa login.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {options.map(({ mode, title, description, icon: Icon }) => <a key={mode} href={`${CALCULATOR_URL}#${mode}`} className="group flex flex-col items-start rounded-2xl border border-line bg-white p-7 transition-colors hover:border-pine sm:p-8">
          <Icon className="mb-8 size-7 text-pine" strokeWidth={1.5} />
          <h3 className="mb-3 text-2xl font-medium">{title}</h3>
          <p className="mb-8 leading-7 text-slate">{description}</p>
          <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-pine">Mulai hitung <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
        </a>)}
      </div>
    </div>
  </section>;
}
