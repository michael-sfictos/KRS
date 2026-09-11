"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const revealEase = [0.4, 0, 0.2, 1] as const;

const clipVariants = {
  hidden: { y: "108%" },
  shown: { y: 0 },
};

const fadeVariants = {
  hidden: { y: 16, opacity: 0 },
  shown: { y: 0, opacity: 1 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Scroll into view (default) or play once on mount, for above-the-fold heroes. */
  play?: "view" | "mount";
};

function RevealFrame({
  as,
  children,
  className,
  delay = 0,
  play = "view",
  variants,
  clip,
}: RevealProps & {
  as: "span" | "div";
  variants: typeof clipVariants | typeof fadeVariants;
  clip?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag = as === "span" ? motion.span : motion.div;
  const skipMotion = Boolean(reduce);

  return (
    <MotionTag
      animate={play === "mount" || skipMotion ? "shown" : undefined}
      className={cn(clip && "overflow-hidden pb-[0.1em]", as === "span" && "block", className)}
      initial={skipMotion ? false : "hidden"}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={!skipMotion && play === "view" ? "shown" : undefined}
    >
      <MotionTag
        className="block"
        transition={{ duration: skipMotion ? 0 : 0.7, delay: skipMotion ? 0 : delay, ease: revealEase }}
        variants={variants}
      >
        {children}
      </MotionTag>
    </MotionTag>
  );
}

export function Reveal({ children, className, delay = 0, play = "view" }: RevealProps) {
  return (
    <RevealFrame as="span" className={className} clip delay={delay} play={play} variants={clipVariants}>
      {children}
    </RevealFrame>
  );
}

export function RevealFade({ children, className, delay = 0, play = "view" }: RevealProps) {
  return (
    <RevealFrame as="div" className={className} delay={delay} play={play} variants={fadeVariants}>
      {children}
    </RevealFrame>
  );
}
