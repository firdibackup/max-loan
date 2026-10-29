"use client";
import React, { useRef } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
  MotionValue,
} from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : isMobile ? [9, 0] : [16, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : isMobile ? [0.92, 1] : [0.96, 1],
  );
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : isMobile ? [28, 0] : [72, 0],
  );

  return (
    <div
      className="relative flex w-full items-center justify-center py-4 sm:py-8 lg:py-10"
      ref={containerRef}
    >
      <div
        className="relative w-full"
        style={{
          perspective: "1200px",
        }}
      >
        {titleComponent ? (
          <Header translate={translate} titleComponent={titleComponent} />
        ) : null}
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto mb-8 max-w-5xl text-center sm:mb-12"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 16px 40px rgba(0, 14, 53, 0.16), 0 44px 90px rgba(0, 8, 31, 0.18)",
      }}
      className="mx-auto aspect-video w-full max-w-6xl overflow-hidden rounded-[18px] border border-white/15 bg-ink-deep p-1.5 shadow-2xl sm:rounded-[26px] sm:p-2 lg:rounded-[32px] lg:p-3"
    >
      <div className="h-full w-full overflow-hidden rounded-[13px] bg-ink sm:rounded-[19px] lg:rounded-[22px]">
        {children}
      </div>
    </motion.div>
  );
};
