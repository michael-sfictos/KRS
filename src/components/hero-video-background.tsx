"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function HeroVideoBackground() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-primary-900">
      <Image
        alt=""
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src="/videos/krs-hero-poster.jpg"
      />
      {mounted && reduceMotion === false ? (
        <video
          aria-hidden="true"
          autoPlay
          className="pointer-events-none absolute inset-0 size-full object-cover"
          loop
          muted
          playsInline
          poster="/videos/krs-hero-poster.jpg"
          preload="metadata"
        >
          <source src="/videos/krs-hero.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/60 to-primary-900/95" />
    </div>
  );
}
