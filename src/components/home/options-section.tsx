import Image from "next/image";
import * as motion from "motion/react-client";
import { rise } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BASE_PATH } from "@/lib/base-path";
import { wrap } from "./styles";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function OptionsSection() {
  return (
    <section
      id="opsi"
      className="relative isolate overflow-hidden bg-ink-deep text-white"
    >
      {/* Base: deep navy → blue diagonal */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #00081f 0%, #000e35 38%, #001a66 72%, #0036cc 100%)",
        }}
      />
      {/* Soft light glows */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(55% 75% at 12% 0%, rgba(0,67,255,0.32) 0%, transparent 65%)",
            "radial-gradient(45% 70% at 92% 105%, rgba(255,18,0,0.18) 0%, transparent 70%)",
            "radial-gradient(40% 55% at 50% 50%, rgba(138,168,255,0.07) 0%, transparent 75%)",
          ].join(", "),
        }}
      />
      {/* Fine grain for a matte, printed feel */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: grain }}
      />
      {/* Hairlines top & bottom */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-aqua/30 to-transparent"
      />

      <div
        className={cn(
          wrap,
          "flex flex-col items-center gap-10 py-16 text-center sm:py-20 lg:gap-12 lg:py-24",
        )}
      >
        <motion.blockquote {...rise()} className="max-w-[880px]">
          <p className="bg-gradient-to-b from-white via-white to-aqua/80 bg-clip-text font-display text-band font-medium text-balance text-transparent">
            “Memiliki rumah adalah sebuah pencapaian. Menjaganya tetap menjadi
            keputusan yang baik adalah perjalanan berikutnya.”
          </p>
        </motion.blockquote>
        <motion.div {...rise(0.1)} className="flex flex-col items-center gap-5">
          <span
            aria-hidden
            className="h-px w-16 bg-gradient-to-r from-transparent via-aqua to-transparent"
          />
          <Image
            src={`${BASE_PATH}/max-loan-logo-white.svg`}
            alt="MAXLOAN"
            width={194}
            height={30}
          />
          <p className="text-sm leading-6 tracking-[0.02em] text-white/70">
            KPR lebih mudah dipahami.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
