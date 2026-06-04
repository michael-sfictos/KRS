"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLayoutEffect, useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    label: "founder testimonial",
    quote:
      "KRS gives us the operating clarity we wanted from an internal finance team, without losing the judgement of real tax advisors.",
    name: "Nikos Vardakis",
    role: "Co-founder, HelioStack Technologies",
  },
  {
    label: "operator testimonial",
    quote:
      "The monthly close is no longer a chase. We see what is missing, who owns it, and which filings need advisor review.",
    name: "Eleni Markou",
    role: "Managing Director, Agora Foods",
  },
  {
    label: "finance lead testimonial",
    quote:
      "KRS turned payroll, myDATA, and tax questions into one accountable operating file instead of scattered reminders.",
    name: "Dimitris Pappas",
    role: "Finance Lead, Meridian Labs",
  },
];

const QUOTE_LINE_HEIGHT = 1.08;
const QUOTE_MIN_SIZE = 24;

function quoteBaseSize(quote: string) {
  if (quote.length > 118) {
    return 40;
  }

  if (quote.length > 98) {
    return 44;
  }

  return 48;
}

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const quoteFrameRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const active = testimonials[activeIndex] ?? testimonials[0];
  const total = testimonials.length;

  const controls = useMemo(
    () => ({
      previous: () => setActiveIndex((current) => (current - 1 + total) % total),
      next: () => setActiveIndex((current) => (current + 1) % total),
    }),
    [total]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      controls.next();
    }, 6500);

    return () => window.clearInterval(interval);
  }, [controls]);

  useLayoutEffect(() => {
    const frame = quoteFrameRef.current;
    const quote = quoteRef.current;
    if (!frame || !quote) return;

    let animationFrame = 0;

    const applyQuoteSize = (size: number) => {
      quote.style.fontSize = `${size}px`;
      quote.style.lineHeight = `${Math.round(size * QUOTE_LINE_HEIGHT)}px`;
    };

    const fitQuote = () => {
      const responsiveBase = window.innerWidth < 640 ? 34 : window.innerWidth < 1024 ? 40 : quoteBaseSize(active.quote);
      let size = Math.min(quoteBaseSize(active.quote), responsiveBase);
      applyQuoteSize(size);

      while ((quote.scrollHeight > frame.clientHeight || quote.scrollWidth > frame.clientWidth) && size > QUOTE_MIN_SIZE) {
        size -= 1;
        applyQuoteSize(size);
      }
    };

    fitQuote();

    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(fitQuote);
    });

    resizeObserver.observe(frame);
    window.addEventListener("resize", fitQuote);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", fitQuote);
    };
  }, [active.quote]);

  return (
    <section className="border-y border-primary/12 bg-background px-4 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-stretch">
        <div className="flex flex-col justify-between border-t border-primary/12 pt-6">
          <div>
            <p className="mono-label text-secondary">Client testimony</p>
            <h2 className="mt-5 text-balance text-5xl font-normal leading-[0.95]">What finance leaders notice first.</h2>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              aria-label="Previous testimonial"
              className="h-11 rounded-full px-4"
              onClick={controls.previous}
              type="button"
              variant="outline"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <Button
              aria-label="Next testimonial"
              className="h-11 rounded-full px-4"
              onClick={controls.next}
              type="button"
              variant="outline"
            >
              Next
              <ArrowRight className="size-4" />
            </Button>
            <div className="ml-1 flex items-center gap-2" aria-label="Testimonial position">
              {testimonials.map((testimonial, index) => (
                <span
                  className={cn(
                    "size-1.5 rounded-full bg-primary/24 transition-all",
                    index === activeIndex && "w-6 bg-secondary"
                  )}
                  key={testimonial.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="gradient-shell h-[720px] shadow-[var(--shadow-xl)] sm:h-[680px] lg:h-[560px]">
          <div className="grid h-full grid-rows-[0.45fr_0.55fr] items-stretch gap-px bg-primary/12 lg:grid-cols-[0.48fr_0.52fr] lg:grid-rows-none">
            <div className="relative min-h-0 overflow-hidden bg-primary">
              <Image
                alt="Portrait of testimonial speaker"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                src="/images/krs-testimonial-profile.png"
              />
            </div>
            <div className="flex min-h-0 flex-col bg-card p-8 sm:p-10 lg:p-11" aria-live="polite">
              <Badge className="rounded-full bg-secondary text-secondary-foreground" variant="secondary">
                {active.label}
              </Badge>
              <div className="mt-8 min-h-0 flex-1 overflow-hidden" ref={quoteFrameRef}>
                <blockquote
                  className="text-balance font-semibold"
                  ref={quoteRef}
                  style={{
                    fontSize: quoteBaseSize(active.quote),
                    lineHeight: `${Math.round(quoteBaseSize(active.quote) * QUOTE_LINE_HEIGHT)}px`,
                  }}
                >
                  {active.quote}
                </blockquote>
              </div>
              <div className="mt-6 shrink-0 border-t border-primary/12 pt-6">
                <p className="font-semibold">{active.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{active.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
