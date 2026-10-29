"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

/** Full-bleed photo that settles in once, then drifts slower than the scroll. */
export function ParallaxImage({
  src,
  mobileSrc,
  alt,
  priority,
  className,
}: {
  src: string;
  /** Portrait art direction for phones (below `sm`). */
  mobileSrc?: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 -inset-y-[7%]"
        style={{ y: reduce ? 0 : y }}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease }}
      >
        <picture>
          {/* Images are unoptimized (static export), so the path is the srcset. */}
          {mobileSrc && <source media="(max-width: 639px)" srcSet={mobileSrc} />}
          <Image
            src={src}
            alt={alt}
            fill
            loading={priority ? "eager" : undefined}
            fetchPriority={priority ? "high" : undefined}
            sizes="100vw"
            className={cn("object-cover", className)}
          />
        </picture>
      </motion.div>
    </div>
  );
}
