import * as motion from "motion/react-client";
import { ProductIntroductionVideo } from "@/components/product-introduction-video";
import { MortgageStatement } from "./mortgage-statement";
import { ArrowLink } from "./arrow-link";
import { item, rise, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { wrap } from "./styles";

const narrative = [
  {
    title: "Pantau yang penting",
    body: "Cicilan, sisa pokok, tenor, dan bunga dalam satu ringkasan. Nilai properti serta estimasi ekuitas mengikuti data yang kamu isi.",
  },
  {
    title: "Pahami alasannya",
    body: "KPR Health menjelaskan indikator kondisi KPR berdasarkan aturan. Bukan AI, bukan credit score.",
  },
  {
    title: "Lengkapi, bukan menebak",
    body: "Data yang belum tersedia ditandai dengan jelas. Perhitungan resmi berasal dari backend, bukan angka buatan.",
  },
];

export function OverviewSection() {
  return (
    <section id="ringkasan" className="bg-white">
      <div
        className={cn(
          wrap,
          "flex flex-col gap-8 py-16 sm:gap-10 sm:py-20 lg:py-[100px]",
        )}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-16">
          <motion.h2
            {...rise()}
            className="flex-1 font-display text-display font-medium tracking-[-0.018em]"
          >
            Kenalan dengan asisten
            {/* Forced break orphans "asisten" on phones. */}
            <br className="max-sm:hidden" />
            KPR pribadi kamu.
          </motion.h2>
          <motion.p
            {...rise(0.1)}
            className="max-w-[440px] text-lg leading-[1.5] text-slate lg:shrink-0"
          >
            Pahami kondisi KPR kamu dengan lebih jelas, agar kamu bisa menjalani
            perjalanan KPR dengan lebih tenang.
          </motion.p>
        </div>
        <ProductIntroductionVideo />
      </div>
    </section>
  );
}
