import { ArrowRight } from "lucide-react";

import { HeroVisualStrip } from "@/components/hero-visual-strip";
import { Reveal, RevealFade } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function HeroSectionLegacy() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4.5rem)] flex-col overflow-hidden border-b border-primary/12 bg-[#FDF8F0] lg:min-h-[900px] lg:flex-1">
      <div className="relative mx-auto max-w-[1400px] px-4 pb-8 pt-10 sm:px-6 lg:px-12 lg:pt-16">
        <div className="grid grid-cols-12 items-end gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="type-display max-w-5xl text-foreground">
              <Reveal play="mount">Accounting</Reveal>
              <Reveal delay={0.08} play="mount">
                <span className="hero-headline-accent italic text-secondary">evolved into</span>
              </Reveal>
              <Reveal delay={0.16} play="mount">
                agentic AI.
              </Reveal>
            </h1>
          </div>
          <RevealFade className="col-span-12 lg:col-span-4 lg:pb-3" delay={0.24} play="mount">
            <p className="mono-label mb-4 text-secondary">Statement of intent</p>
            <p className="max-w-md text-lg leading-8 text-foreground/72">
              KRS combines licensed accounting and tax professionals with agentic workflows that organize filings,
              documents, payroll obligations, and advisory questions before they become urgent.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild className="h-12 rounded-full px-6 text-base shadow-[var(--shadow-md)]" variant="secondary">
                <a href="/onboarding">
                  Schedule an initial free consultation
                  <ArrowRight className="size-5" />
                </a>
              </Button>
              <Button asChild className="h-12 rounded-full border-primary/20 bg-card/60 px-6 text-base" variant="outline">
                <a href="#services">
                  Discover our service
                  <ArrowRight className="size-5" />
                </a>
              </Button>
            </div>
          </RevealFade>
        </div>

        <HeroVisualStrip />
      </div>
    </section>
  );
}
