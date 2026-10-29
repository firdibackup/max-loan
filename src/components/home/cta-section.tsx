import * as motion from "motion/react-client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/links";
import { BASE_PATH } from "@/lib/base-path";
import { ParallaxImage } from "@/components/parallax-image";
import { item, rise, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { wrap } from "./styles";

export function CtaSection() {
  return (
    <section
      id="mulai"
      className="relative isolate overflow-hidden bg-ink-deep"
    >
      <ParallaxImage
        src={`${BASE_PATH}/images/cta-fasad-maxi.webp`}
        alt=""
        className="object-[70%_center] lg:object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#000a28]/75 sm:bg-transparent sm:bg-[linear-gradient(-90deg,#000A28B3_0%,#000A2899_52%,#000A2866_100%)]"
      />
      <div
        className={cn(
          wrap,
          "flex min-h-[560px] flex-col items-center justify-center gap-8 py-20 text-center lg:min-h-[616px] lg:py-[104px]",
        )}
      >
        <motion.div
          {...stagger(0.12)}
          className="flex flex-col items-center gap-5"
        >
          <motion.p
            {...item}
            className="text-xl leading-[1.5] font-extrabold tracking-[0.04em] text-aqua sm:text-2xl"
          >
            #MaximalkanKPRKamu
          </motion.p>
          <motion.h2
            {...item}
            className="font-display text-finale font-medium tracking-[-0.019em] text-paper"
          >
            Mulai pahami KPR
            <br />
            kamu hari ini.
          </motion.h2>
          <motion.p
            {...item}
            className="max-w-[650px] text-lg leading-[1.5] text-paper"
          >
            Kenali posisi KPR kamu, pantau hal penting, dan buat keputusan
            berikutnya dengan informasi yang lebih jelas.
          </motion.p>
        </motion.div>
        <motion.div
          {...rise(0.3, 16)}
          className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6"
        >
          <Button asChild variant="teal" size="2xl">
            <a href={APP_URL}>
              Cek KPR Saya
              <ArrowRight aria-hidden />
            </a>
          </Button>
          <Button asChild variant="outline-light" size="xl">
            <a href={APP_URL}>
              Pelajari Cara Kerja REMAX
              <ArrowRight aria-hidden />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
