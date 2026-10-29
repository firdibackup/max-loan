import * as motion from "motion/react-client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/links";
import { ParallaxImage } from "@/components/parallax-image";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { wrap } from "./styles";

/** Hero entrance: plays on load, sharpening out of a soft blur. */
const intro = (delay: number) => ({
  "data-reveal": "",
  initial: { opacity: 0, y: 24, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, ease, delay },
});

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative isolate flex h-[calc(100svh-72px)] max-h-[860px] min-h-[600px] overflow-hidden bg-ink-deep sm:h-[calc(100svh-104px)] lg:h-[766px] lg:max-h-none"
    >
      <ParallaxImage
        priority
        src="/images/hero-rumah-dan-pemilik.webp"
        mobileSrc="/images/hero-rumah-dan-pemilik-vertical.webp"
        alt="Pasangan tersenyum memegang maket rumah di depan rumah modern"
        className="object-[88%_center] max-sm:object-bottom lg:object-center"
      />
      {/* Phones: copy sits on the sky, CTAs on the shirts, faces stay clear. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#00081ff2_0%,#00081fa6_45%,#00081f00_68%),linear-gradient(0deg,#00081fcc_0%,#00081f00_26%)] sm:bg-[linear-gradient(0deg,#00081ff2_0%,#00081fb8_45%,#00081f00_80%)] lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-[63.4%] bg-[linear-gradient(-90deg,#00081f00_5.5%,#00081f8c_51%,#00081fe6_100%)] lg:block"
      />
      <div
        className={cn(
          wrap,
          "flex py-8 sm:items-end sm:pt-0 sm:pb-16 lg:items-center lg:pb-0",
        )}
      >
        <div className="flex max-w-[600px] flex-col items-start justify-between gap-8 text-white sm:justify-start sm:gap-6 lg:gap-7">
          <div className="flex flex-col items-start gap-4 sm:gap-6 lg:gap-7">
            <motion.p
              {...intro(0.2)}
              className="text-base leading-6 font-extrabold tracking-[0.05em] sm:text-xl sm:leading-7"
            >
              #MaximalkanKPRKamu
            </motion.p>
            <motion.h1
              {...intro(0.35)}
              className="font-display text-hero font-medium tracking-[-0.027em]"
            >
              Bunga KPR masih 6% atau lebih? <br /> Kamu punya pilihan KPR yang
              lebih baik.
            </motion.h1>
            <motion.p
              {...intro(0.5)}
              className="text-base leading-[1.6] sm:text-lg"
            >
              Pahami kondisi KPR kamu, pantau perubahan bunga, dan cari tahu
              pilihan yang tersedia sebelum mengambil keputusan.
            </motion.p>
          </div>
          <motion.div
            {...intro(0.65)}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button asChild variant="teal" size="xl">
              <a href={APP_URL}>
                Cek KPR Saya
                <ArrowRight aria-hidden />
              </a>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <a href={APP_URL}>
                Cara Kerja REMAX
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
