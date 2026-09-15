"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const typeRampSteps = [
  { name: "Display", className: "type-display", sample: "Aa", weight: 400 },
  { name: "Display XL", className: "type-display-xl", sample: "KRS", weight: 300 },
  { name: "H1", className: "type-h1", sample: "Clarity", weight: 400 },
  { name: "H2", className: "type-h2", sample: "A plan", weight: 400 },
  { name: "H3", className: "type-h3", sample: "Start here", weight: 400 },
  { name: "H4", className: "type-h4", sample: "Operating", weight: 500 },
  { name: "H5", className: "type-h5", sample: "Monthly truth", weight: 500 },
  { name: "H6", className: "type-h6", sample: "Listed prices", weight: 500 },
  { name: "Lead", className: "type-lead", sample: "Choose a plan that fits today.", weight: 400 },
  { name: "Body", className: "type-body", sample: "Each plan includes the recurring work.", weight: 400 },
  { name: "Body sm", className: "type-body-sm", sample: "AADE and myDATA are part of the context.", weight: 400 },
  { name: "Caption", className: "type-caption", sample: "The estimate excludes VAT.", weight: 400 },
  { name: "Overline", className: "type-overline text-secondary", sample: "Pricing and plans", weight: 600 },
  { name: "UI", className: "type-ui", sample: "Book a consultation", weight: 500 },
  { name: "Metric", className: "type-metric", sample: "€149", weight: 500 },
] as const;

function livePx(size: string) {
  const value = Math.round(Number.parseFloat(size) * 10) / 10;
  return `${value}px`;
}

function TypeRampRow({
  name,
  className,
  sample,
  weight,
}: (typeof typeRampSteps)[number]) {
  const sampleRef = useRef<HTMLParagraphElement>(null);
  const [liveSize, setLiveSize] = useState<string | null>(null);

  useEffect(() => {
    const el = sampleRef.current;
    if (!el) return;

    const update = () => {
      setLiveSize(livePx(getComputedStyle(el).fontSize));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="grid items-end gap-4 border-t border-primary/10 px-5 py-6 first:border-t-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8 sm:px-8 sm:py-8">
      <div className="pb-1">
        <p className="type-caption font-mono text-muted-foreground">{name}</p>
        <p className="type-caption mt-1 font-mono text-foreground">
          {weight}{liveSize ? ` / ${liveSize}` : ""}
        </p>
      </div>
      <p className={cn("min-w-0", className)} ref={sampleRef}>
        {sample}
      </p>
    </div>
  );
}

export function TypeRamp() {
  return (
    <div className="mt-12 border border-primary/12 bg-[#FDF8F0]">
      <div className="border-b border-primary/12 px-5 py-5 sm:px-8">
        <p className="type-label">Type scale</p>
        <p className="type-caption mt-1 text-muted-foreground">
          Weight and live size at this viewport. Display sits at the top. Reading and UI sit at the bottom.
        </p>
      </div>
      <div>
        {typeRampSteps.map((step) => (
          <TypeRampRow key={step.name} {...step} />
        ))}
      </div>
    </div>
  );
}
