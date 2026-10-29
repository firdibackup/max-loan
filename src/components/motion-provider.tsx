"use client";

import { MotionConfig } from "motion/react";

// "user": honour prefers-reduced-motion by dropping transforms, keeping fades.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
