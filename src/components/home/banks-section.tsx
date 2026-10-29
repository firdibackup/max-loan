import Image from "next/image";
import * as motion from "motion/react-client";
import { item, rise, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BASE_PATH } from "@/lib/base-path";
import { wrap } from "./styles";

const banks = [
  ["bca", "BCA"],
  ["bca-syariah", "BCA Syariah"],
  ["mandiri", "Bank Mandiri"],
  ["bri", "BRI"],
  ["bni", "BNI"],
  ["btn", "BTN"],
  ["bsi", "BSI"],
  ["danamon", "Danamon"],
  ["maybank", "Maybank"],
  ["ocbc", "OCBC"],
  ["bjb", "Bank BJB"],
  ["uob", "UOB"],
  ["permata", "Permata Bank"],
  ["kb-bank", "KB Bank"],
  ["panin", "Panin Bank"],
  ["muamalat", "Bank Muamalat"],
  ["mega", "Bank Mega"],
  ["mega-syariah", "Bank Mega Syariah"],
  ["cimb-niaga", "CIMB Niaga"],
  ["smbc", "SMBC"],
  ["mnc", "MNC Bank"],
  ["woori-saudara", "Bank Woori Saudara"],
  ["mestika", "Bank Mestika"],
  ["ina", "Bank INA"],
  ["ccb-indonesia", "CCB Indonesia"],
  ["dki", "Bank DKI"],
  ["ganesha", "Bank Ganesha"],
] as const;

export function BanksSection() {
  return (
    <section id="bank" className="border-b border-line bg-white">
      <div
        className={cn(
          wrap,
          "flex flex-col items-center gap-9 py-14 sm:py-16 lg:py-20",
        )}
      >
        <motion.h2
          {...rise()}
          className="text-center font-display text-banks font-medium"
        >
          Dukungan Kerja Sama Bank
        </motion.h2>
        <motion.ul
          {...stagger(0.03, 0, 0.15)}
          className="flex w-full flex-wrap justify-center gap-x-3 gap-y-4 sm:gap-x-5 lg:gap-x-7 lg:gap-y-7"
        >
          {banks.map(([slug, name]) => (
            <motion.li
              {...item}
              key={slug}
              className="flex h-14 w-[calc((100%-1.5rem)/3)] items-center justify-center sm:h-[68px] sm:w-[calc((100%-3.75rem)/4)] md:w-[calc((100%-5rem)/5)] lg:w-[calc((100%-10.5rem)/7)] lg:max-w-[158px]"
            >
              <Image
                src={`${BASE_PATH}/banks/${slug}.png`}
                alt={name}
                width={138}
                height={48}
                className="h-10 w-full max-w-[138px] object-contain sm:h-12"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
