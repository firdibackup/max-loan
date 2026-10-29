// Shared Motion presets. Plain objects so Server Components can spread them onto
// `motion/react-client` elements. `data-reveal` lets the <noscript> rule in the
// root layout keep content visible when JavaScript never runs.

export const ease = [0.16, 1, 0.3, 1] as const;

/** Fade and rise once when scrolled into view. */
export const rise = (delay = 0, y = 28) => ({
  "data-reveal": "",
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease, delay },
});

/** Parent of a list whose children use `item`. */
export const stagger = (gap = 0.08, delay = 0, amount = 0.2) => ({
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount },
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  },
});

export const item = {
  "data-reveal": "",
  variants: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  },
};
