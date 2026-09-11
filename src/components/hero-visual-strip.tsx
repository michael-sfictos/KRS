"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const heroSlides = [
  {
    category: "Blog / Press releases",
    title: "KRS: The multi-award-winning company",
    image: "/images/krs-hero-awards.jpg",
    imageAlt: "KRS team members at an awards event",
  },
  {
    category: "Expertise / Short-term rentals",
    title: "Short-term rentals have shaped KRS in recent years.",
    image: "/images/krs-hero-rentals.jpg",
    imageAlt: "A refined short-term rental interior",
  },
  {
    category: "Expertise / Payroll",
    title: "Employment law remains one of business's greatest challenges.",
    image: "/images/krs-hero-payroll.jpg",
    imageAlt: "Colleagues collaborating in a modern workplace",
  },
  {
    category: "Expertise / Startups",
    title: "Turning ambitious ideas into real businesses.",
    image: "/images/krs-hero-startups.jpg",
    imageAlt: "Startup team working together around a table",
  },
] as const;

const carouselTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] } as const;

const authorityNodes = ["AADE", "EFKA", "ERGANI", "KRS", "myDATA", "gov.gr"] as const;

export function HeroVisualStrip() {
  const prefersReducedMotion = useReducedMotion();
  const [imageIndex, setImageIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const contentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const slideTimer = setTimeout(() => {
      const next = (imageIndex + 1) % heroSlides.length;
      setImageIndex(next);
      if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
      contentTimerRef.current = setTimeout(() => setContentIndex(next), 280);
    }, 4200);

    return () => clearTimeout(slideTimer);
  }, [imageIndex, isPaused, prefersReducedMotion]);

  useEffect(
    () => () => {
      if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
    },
    []
  );

  const selectSlide = (index: number) => {
    setImageIndex(index);
    if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
    contentTimerRef.current = setTimeout(
      () => setContentIndex(index),
      prefersReducedMotion ? 0 : 180
    );
  };

  const imageSlide = heroSlides[imageIndex];
  const contentSlide = heroSlides[contentIndex];

  return (
    <div
      className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-4"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[360px] overflow-hidden bg-primary">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0"
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.025 }}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.035 }}
            key={imageSlide.image}
            transition={prefersReducedMotion ? { duration: 0 } : carouselTransition}
          >
            <Image
              alt={imageSlide.imageAlt}
              className="object-cover"
              fill
              priority={imageIndex === 0}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              src={imageSlide.image}
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/22 via-transparent to-transparent" />
      </div>

      <div className="relative flex min-h-[360px] flex-col overflow-hidden bg-secondary p-5 text-secondary-foreground">
        <div className="flex items-start justify-between gap-5">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mono-label max-w-[13rem] text-secondary-foreground/72"
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              key={contentSlide.category}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.42, ease: "easeOut" }}
            >
              {contentSlide.category}
            </motion.p>
          </AnimatePresence>

          <div aria-label="Choose a hero story" className="flex gap-1.5" role="group">
            {heroSlides.map((slide, index) => (
              <button
                aria-label={`Show slide ${index + 1}: ${slide.title}`}
                aria-pressed={contentIndex === index}
                className="group flex h-7 w-5 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                key={slide.title}
                onClick={() => selectSlide(index)}
                type="button"
              >
                <span
                  className={cn(
                    "h-0.5 w-3 bg-secondary-foreground/35 transition-all duration-300 group-hover:w-4 group-hover:bg-white/80",
                    contentIndex === index && "w-5 bg-white"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between pt-9">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-7xl font-medium leading-none text-secondary-foreground/72"
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              key={`number-${contentIndex}`}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.48, ease: "easeOut" }}
            >
              {String(contentIndex + 1).padStart(2, "0")}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence initial={false} mode="wait">
            <motion.h2
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[16rem] text-balance font-heading text-[1.7rem] font-medium leading-[1.08] text-white sm:text-[1.85rem]"
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              key={contentSlide.title}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.04, ease: "easeOut" }}
            >
              {contentSlide.title}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      <div className="min-h-[360px] bg-tertiary p-5 text-tertiary-foreground">
        <div className="flex h-full flex-col justify-between">
          <p className="mono-label text-tertiary-foreground/68">Since 2011</p>
          <div>
            <p className="max-w-[17rem] text-balance text-base font-medium leading-6 text-tertiary-foreground/88">
              Founded in 2011, hundreds of companies have joined KRS. We are a growing network, showing what is
              possible when growth is powered, not limited, by the platform.
            </p>
          </div>
        </div>
      </div>

      <HeroConnectionPanel />
    </div>
  );
}

export function HeroConnectionPanel() {
  return (
    <div className="relative min-h-[360px] overflow-hidden bg-primary text-primary-foreground">
      <div className="relative flex h-full flex-col justify-end p-5">
        <div>
          <div className="mb-6 grid grid-cols-3 gap-3">
            {authorityNodes.map((node, index) => (
              <span
                className={cn(
                  "flex aspect-square items-center justify-center border border-primary-foreground/16 bg-primary-foreground/5 text-center font-mono text-[0.62rem] uppercase text-primary-foreground/58",
                  index === 3 && "border-primary-foreground bg-primary-foreground text-primary"
                )}
                key={node}
              >
                {node}
              </span>
            ))}
          </div>
          <p className="max-w-56 text-balance font-heading text-3xl font-medium leading-tight">
            Controlled connection beats scattered portals.
          </p>
        </div>
      </div>
    </div>
  );
}

