"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductFeaturePreview } from "./product-feature-preview";
import { productFeatures } from "./product-features-data";
import { eyebrow, wrap } from "./styles";

export function ProductFeaturesSection() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches) return;
      const center = window.innerHeight / 2;
      let nearest = 0;
      let distance = Infinity;
      steps.current.forEach((step, index) => {
        if (!step) return;
        const bounds = step.getBoundingClientRect();
        const delta = Math.abs(bounds.top + bounds.height / 2 - center);
        if (delta < distance) { distance = delta; nearest = index; }
      });
      setActive(nearest);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section id="cara-kerja" aria-labelledby="product-features-heading" className="bg-white pb-16 sm:pb-20 lg:pb-[100px]">
      <div className={wrap}>
        <div className="max-w-[800px]">
          <p className={cn(eyebrow, "text-pine")}>SATU TEMPAT UNTUK MEMAHAMI KPR</p>
          <h2 id="product-features-heading" className="mt-5 font-display text-display font-medium tracking-[-0.018em]">Kenali lebih dekat cara kerja REMAX.</h2>
          <p className="mt-6 max-w-[700px] text-lg leading-[1.6] text-slate">Dari ringkasan KPR sampai simulasi pilihan berikutnya, REMAX membantu menyajikan informasi yang kamu butuhkan dengan lebih mudah dipahami.</p>
        </div>

        <div className="relative mt-12 grid items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,680fr)_minmax(0,520fr)] lg:gap-14 xl:gap-20">
          <div className="feature-sticky hidden lg:block">
            <ProductFeaturePreview active={active} />
            <nav aria-label="Jelajahi fitur REMAX" className="mt-5 flex items-center justify-center gap-2">
              {productFeatures.map((feature, index) => (
                <button key={feature.label} type="button" aria-label={`Lihat ${feature.label}`} aria-current={active === index ? "step" : undefined} onClick={() => steps.current[index]?.scrollIntoView({ block: "center" })} className="group flex h-11 w-11 items-center justify-center rounded-full">
                  <span className={cn("h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none", active === index ? "w-8 bg-pine" : "w-3 bg-fog group-hover:bg-pine")} />
                </button>
              ))}
            </nav>
          </div>

          <ol className="flex min-w-0 flex-col gap-14 lg:gap-0">
            {productFeatures.map((feature, index) => (
              <li key={feature.label} ref={(element) => { steps.current[index] = element; }} id={`product-feature-${index + 1}`} className="feature-story-step flex min-w-0 flex-col justify-center gap-7 lg:min-h-[76svh] lg:py-16">
                <div className={cn("border-t pt-7 transition-colors duration-300 motion-reduce:transition-none", active === index ? "border-pine" : "border-line")}>
                  <p className="flex items-baseline gap-4 text-sm font-semibold text-pine"><span className="text-xs tabular-nums">0{index + 1}</span>{feature.label}</p>
                  <h3 className="mt-5 font-display text-[clamp(1.875rem,2.7vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.02em]">{feature.title}</h3>
                  <p className="mt-5 text-base leading-[1.7] text-slate sm:text-lg">{feature.description}</p>
                  {"detail" in feature && (
                    <p className="mt-6 text-sm leading-6 text-pine">{feature.detail}</p>
                  )}
                  <Button asChild variant="teal" size="xl" className="mt-7 h-auto min-h-12 w-full whitespace-normal py-3 text-left sm:w-auto">
                    <a href={feature.cta.href}>
                      {feature.cta.label}
                      <ArrowRight aria-hidden className="transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transition-none" />
                    </a>
                  </Button>
                </div>
                <ProductFeaturePreview active={index} className="lg:hidden" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
