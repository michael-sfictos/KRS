"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const structures = [
  { id: "professional", label: "Sole trader", base: 79, formation: 90 },
  { id: "ike-epe", label: "IKE / EPE", base: 149, formation: 350 },
  { id: "ae", label: "AE", base: 299, formation: 800 },
  { id: "custom", label: "Custom", base: 499, formation: 1200 },
] as const;

function Stepper({
  label,
  value,
  onChange,
  note,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  note: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-primary/12 py-4 first:border-t-0 first:pt-0">
      <div>
        <p className="font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{note}</p>
      </div>
      <div className="flex shrink-0 items-center border border-primary/18 bg-background">
        <button
          aria-label={`Decrease ${label}`}
          className="grid size-9 place-items-center text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
          disabled={value === 0}
          onClick={() => onChange(Math.max(0, value - 1))}
          type="button"
        >
          <Minus className="size-4" strokeWidth={1.75} />
        </button>
        <span aria-live="polite" className="grid w-9 place-items-center text-sm font-semibold tabular-nums text-foreground">
          {value}
        </span>
        <button
          aria-label={`Increase ${label}`}
          className="grid size-9 place-items-center text-muted-foreground transition hover:bg-muted hover:text-foreground"
          onClick={() => onChange(value + 1)}
          type="button"
        >
          <Plus className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

export function PricingCalculator() {
  const [journey, setJourney] = useState<"existing" | "formation">("existing");
  const [structure, setStructure] = useState<(typeof structures)[number]["id"]>("ike-epe");
  const [documents, setDocuments] = useState(20);
  const [employees, setEmployees] = useState(0);

  const estimate = useMemo(() => {
    const selected = structures.find((item) => item.id === structure) ?? structures[1];
    const documentAdjustment = Math.max(0, Math.ceil((documents - 20) / 25)) * 25;
    const payrollAdjustment = employees * 14;
    return selected.base + documentAdjustment + payrollAdjustment;
  }, [documents, employees, structure]);
  const selected = structures.find((item) => item.id === structure) ?? structures[1];

  return (
    <section aria-labelledby="calculator-heading" className="border-y border-primary/12 bg-muted/55" id="calculator">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-18 lg:px-12">
        <div className="max-w-xl">
          <p className="mono-label text-secondary">Pricing calculator</p>
          <h2 className="mt-5 text-balance text-5xl leading-[0.98] text-foreground sm:text-6xl" id="calculator-heading">
            <Reveal>A starting point, not a surprise invoice.</Reveal>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
            Tell us a little about the operating load. We use this estimate to start a transparent scoping conversation,
            including the Greek filings and support your business needs.
          </p>
          <div className="mt-10 border-l-2 border-secondary pl-5 text-sm leading-6 text-muted-foreground">
            The estimate excludes VAT and reflects standard monthly bookkeeping. If you are starting a business, we also
            show a separate starting estimate for formation support. Specialist tax work and complex legal or notarial matters are scoped separately.
          </div>
        </div>

        <div className="border border-primary/16 bg-background p-5 shadow-[var(--shadow-lg)] sm:p-8">
          <fieldset>
            <legend className="text-sm font-semibold text-foreground">Where are you today?</legend>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button aria-pressed={journey === "existing"} className={`min-h-12 border px-4 text-left text-sm font-semibold transition ${journey === "existing" ? "border-primary bg-primary text-primary-foreground" : "border-primary/15 bg-card text-foreground hover:border-primary/42"}`} onClick={() => setJourney("existing")} type="button">I have a business</button>
              <button aria-pressed={journey === "formation"} className={`min-h-12 border px-4 text-left text-sm font-semibold transition ${journey === "formation" ? "border-primary bg-primary text-primary-foreground" : "border-primary/15 bg-card text-foreground hover:border-primary/42"}`} onClick={() => setJourney("formation")} type="button">I&apos;m starting a business</button>
            </div>
          </fieldset>
          <fieldset>
            <legend className="mt-8 text-sm font-semibold text-foreground">Your business structure</legend>
            <div className="mt-4 grid gap-2 sm:grid-cols-4">
              {structures.map((item) => {
                const active = structure === item.id;
                return (
                  <button
                    aria-pressed={active}
                    className={`min-h-22 border p-3 text-left text-sm font-semibold leading-5 transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary/15 bg-card text-foreground hover:border-primary/42"
                    }`}
                    key={item.id}
                    onClick={() => setStructure(item.id)}
                    type="button"
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8">
            <Stepper label="Monthly documents" note="Invoices, receipts, and bank movements" onChange={setDocuments} value={documents} />
            <Stepper label="Employees" note="Payroll administration and ERGANI workflow" onChange={setEmployees} value={employees} />
          </div>

          <div className="mt-8 grid gap-5 border-t border-primary/12 pt-7 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="mono-label text-secondary">Indicative monthly fee</p>
              <p className="mt-2 font-heading text-6xl leading-none tracking-tight text-foreground">
                €{estimate}
                <span className="ml-2 font-sans text-base font-medium tracking-normal text-muted-foreground">/ month</span>
              </p>
              {journey === "formation" ? <p className="mt-3 text-sm leading-6 text-muted-foreground">Estimated one-time formation support from <span className="font-semibold text-foreground">€{selected.formation}</span>, excluding VAT.</p> : null}
            </div>
            <Button asChild className="h-12 rounded-full px-6 shadow-[var(--shadow-md)]" variant="secondary">
              <a href="/onboarding">
                Book a consultation
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
            </Button>
          </div>
          <p className="mt-5 flex gap-2 text-xs leading-5 text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-secondary" strokeWidth={2} />
            No commitment. Your final scope and pricing will be confirmed before onboarding.
          </p>
        </div>
      </div>
    </section>
  );
}
