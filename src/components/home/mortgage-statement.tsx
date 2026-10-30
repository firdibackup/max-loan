import Image from "next/image";
import * as motion from "motion/react-client";
import { ease, rise, stagger } from "@/lib/motion";
import { BASE_PATH } from "@/lib/base-path";

export function MortgageStatement() {
  return (
    <motion.figure
      {...rise(0, 40)}
      className="flex flex-col gap-5 rounded-[20px] bg-mist p-3 sm:gap-6 sm:p-6 lg:p-8"
    >
      <div className="flex flex-col gap-6 rounded-xl bg-white p-5 outline outline-line -outline-offset-1 sm:p-8">
        <div className="flex items-center justify-between gap-6">
          <Image src={`${BASE_PATH}/max-loan-logo.svg`} alt="MAXLOAN" width={156} height={24} />
          <span className="text-[11px] leading-[17px] tracking-[0.14em] text-slate">
            CONTOH TAMPILAN
          </span>
        </div>
        <p className="text-xl leading-[1.5] font-semibold">KPR Saya</p>
        <div className="flex flex-col gap-2 border-y border-line py-6 lg:min-h-[184px]">
          <span className="text-sm text-slate">Sisa pokok pinjaman</span>
          <span className="text-[clamp(1.875rem,1.5rem+1.6vw,2.5rem)] leading-[1.5] font-semibold tracking-[-0.025em] tabular-nums">
            Rp 640.000.000
          </span>
        </div>
        <dl className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <dt className="text-sm text-slate">Sisa tenor</dt>
            <dd className="text-xl leading-[1.5] font-semibold">12 tahun</dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="text-sm text-slate">Bunga saat ini</dt>
            <dd className="text-xl leading-[1.5] font-semibold tabular-nums">
              6,50% fixed
            </dd>
          </div>
        </dl>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-6 text-sm">
            <span>Progres pelunasan pokok</span>
            <span className="font-semibold tabular-nums">20%</span>
          </div>
          {/* Focal moment: the paid-off principal fills in, segment by segment. */}
          <motion.div
            {...stagger(0.14, 0.35, 0.9)}
            role="img"
            aria-label="20 persen pokok pinjaman sudah dilunasi"
            className="flex gap-1"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="h-3 flex-1 overflow-hidden rounded-[2px] bg-track"
              >
                {i < 4 && (
                  <motion.div
                    data-reveal=""
                    variants={{
                      hidden: { scaleX: 0 },
                      show: { scaleX: 1, transition: { duration: 0.45, ease } },
                    }}
                    className="h-full origin-left bg-teal"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
        <p className="text-xs text-slate">
          Plafon awal Rp 800.000.000 · data ilustratif
        </p>
      </div>
      <figcaption className="px-2 text-[11px] leading-[17px] tracking-[0.09em] text-slate sm:px-0">
        01 / RINGKASAN KPR · ANGKA CONTOH, BUKAN DATA PENGGUNA
      </figcaption>
    </motion.figure>
  );
}
