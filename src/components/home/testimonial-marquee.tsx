"use client";

import { useState, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "motion/react";

function MarqueeRow({ children, reverse, paused }: { children: ReactNode; reverse: boolean; paused: boolean }) {
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const x = useTransform(progress, (value) => `${reverse ? value - 50 : -value}%`);

  useAnimationFrame((_, delta) => {
    if (paused || reduce) return;
    progress.set((progress.get() + Math.min(delta, 64) / 1400) % 50);
  });

  return (
    <div className={reduce ? "overflow-x-auto" : "overflow-hidden"}>
      <motion.div className="testimonials-track" style={{ x: reduce ? 0 : x }}>
        <div key="original" className="testimonials-group">{children}</div>
        <div key="duplicate" className="testimonials-group" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}

export function TestimonialMarquee({ rows }: { rows: ReactNode[] }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className="testimonials-marquee mt-12 flex w-full flex-col gap-8 lg:mt-16 lg:gap-10" tabIndex={0} role="region" aria-label="Cerita pengguna. Arahkan kursor atau fokuskan area ini untuk menghentikan gerakan."
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      {rows.map((row, index) => (
        <MarqueeRow key={index} reverse={index === 1} paused={hovered || focused}>{row}</MarqueeRow>
      ))}
    </div>
  );
}
