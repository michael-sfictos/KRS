"use client";

import { useState } from "react";
import { ArrowRight, Check, CircleCheck } from "lucide-react";

import { Reveal } from "@/components/reveal";

import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  label: string;
  price: string;
  unit: string;
  description: string;
  chooseIf: string[];
  details: string[];
  featured?: boolean;
};

type ComparisonRow = { feature: string; values: string[] };

const existingPlans: Plan[] = [
  {
    name: "Independent",
    label: "Freelancers and sole traders",
    price: "€79",
    unit: "/ month",
    description: "For independent professionals who want a dependable accounting and tax rhythm without carrying the administration alone.",
    chooseIf: ["You operate as a freelancer or sole trader", "You need VAT and myDATA work kept on track", "You value direct access to an advisor who knows your file"],
    details: ["Monthly income and expense bookkeeping", "myDATA classification and monitoring", "VAT return preparation", "Annual income tax return preparation", "AADE deadline calendar", "Secure document collection", "Direct advisor support"],
  },
  {
    name: "IKE / EPE",
    label: "Established private companies",
    price: "€149",
    unit: "/ month",
    description: "The core operating plan for an IKE or EPE that needs visible monthly close, filings, and financial context.",
    chooseIf: ["You run one IKE or EPE with standard operations", "You want monthly close and tax obligations in one place", "You need a structured accounting partner as the business grows"],
    details: ["Everything in Independent", "Monthly bookkeeping close", "Corporate tax return preparation", "Annual financial statements", "Basic management reporting", "Director and shareholder coordination", "Advisor-routed operating questions"],
    featured: true,
  },
  {
    name: "AE",
    label: "Société Anonyme",
    price: "€299",
    unit: "/ month",
    description: "For AEs that need deeper reporting, more formal financial coordination, and a regular management review rhythm.",
    chooseIf: ["You operate through an AE", "You have a team, payroll, or formal reporting needs", "You want a senior financial partner close to the operating file"],
    details: ["Everything in IKE / EPE", "Enhanced financial statement preparation", "Detailed management reporting", "Monthly management review", "Board-ready finance coordination", "Priority advisor response", "Complex filing scoping support"],
  },
  {
    name: "Custom",
    label: "Groups and complex operations",
    price: "Tailored",
    unit: "scope",
    description: "For groups, holdings, larger teams, and cross-border operations that need a dedicated financial operating model.",
    chooseIf: ["You have multiple entities or an international footprint", "Your business needs a dedicated finance partner", "Your tax, reporting, or payroll scope does not fit a standard plan"],
    details: ["Everything in AE", "Multi-entity coordination", "Cross-border accounting support", "Dedicated financial partner", "Custom reporting cadence", "Priority planning and review", "Specialist filing coordination"],
  },
];

const formationPlans: Plan[] = [
  {
    name: "Independent Start",
    label: "Open a sole trade",
    price: "€79",
    unit: "/ month",
    description: "For professionals who want to open correctly, understand their first obligations, and begin with their bookkeeping ready.",
    chooseIf: ["You are starting as a freelancer or sole trader", "You want registration and the first accounting steps coordinated", "You need help understanding early VAT and myDATA obligations"],
    details: ["Business activity and tax registration guidance", "AADE and myDATA onboarding support", "Opening document checklist", "First VAT return preparation", "Monthly income and expense bookkeeping", "Annual income tax return preparation", "Direct advisor support"],
  },
  {
    name: "IKE / EPE Start",
    label: "Form a private company",
    price: "€149",
    unit: "/ month",
    description: "For founders who want formation steps, opening registrations, and their ongoing accounting file coordinated as one launch.",
    chooseIf: ["You are incorporating an IKE or EPE", "You want the formation sequence made visible", "You want accounting and tax support ready at launch"],
    details: ["IKE or EPE formation coordination", "Registration and opening document checklist", "AADE and myDATA onboarding support", "Opening accounting file", "First monthly bookkeeping close", "Corporate tax and filing calendar", "Advisor support through launch"],
    featured: true,
  },
  {
    name: "AE Start",
    label: "Form a Société Anonyme",
    price: "€299",
    unit: "/ month",
    description: "For founders setting up an AE who need a rigorous launch path and the reporting foundation to operate with confidence.",
    chooseIf: ["You are establishing an AE", "Your launch involves a team, investors, or formal governance", "You want reporting and payroll readiness from the start"],
    details: ["AE formation coordination", "Opening registration and governance checklist", "AADE and myDATA onboarding support", "Opening accounting file and balances", "Payroll and ERGANI readiness", "Board-ready reporting foundation", "Priority advisor coordination"],
  },
  {
    name: "Custom Start",
    label: "Groups, holdings, and complex launches",
    price: "Tailored",
    unit: "scope",
    description: "For a formation that needs a bespoke team, complex ownership planning, or coordination across more than one jurisdiction.",
    chooseIf: ["You are forming a group, holding, or multi-entity operation", "Your launch has a complex shareholder or international structure", "You want a finance partner to map the full operating model"],
    details: ["Formation workstream coordination", "Complex ownership and governance checklist", "Multi-entity opening file design", "Cross-border tax scoping", "Payroll readiness planning", "Custom reporting foundation", "Dedicated launch coordination"],
  },
];

const existingComparison: ComparisonRow[] = [
  { feature: "Monthly bookkeeping and document review", values: ["Included", "Included", "Included", "Included"] },
  { feature: "myDATA classification and monitoring", values: ["Included", "Included", "Included", "Included"] },
  { feature: "VAT return preparation", values: ["Included", "Included", "Included", "Included"] },
  { feature: "Annual financial statements and tax return", values: ["Guided", "Included", "Enhanced", "Custom"] },
  { feature: "Management reporting", values: ["-", "Core view", "Detailed view", "Custom reporting"] },
  { feature: "Payroll and ERGANI coordination", values: ["Add-on", "Add-on", "Included", "Custom"] },
  { feature: "Advisor review", values: ["Direct support", "Structured support", "Monthly", "Dedicated"] },
  { feature: "Multi-entity and cross-border support", values: ["-", "On request", "On request", "Included in scope"] },
];

const formationComparison: ComparisonRow[] = [
  { feature: "Formation and registration coordination", values: ["Included", "Included", "Included", "Custom"] },
  { feature: "AADE and myDATA onboarding support", values: ["Included", "Included", "Included", "Included"] },
  { feature: "Opening document checklist", values: ["Included", "Included", "Included", "Custom"] },
  { feature: "Opening accounting file", values: ["-", "Included", "Included", "Included"] },
  { feature: "Governance and ownership coordination", values: ["-", "Core support", "Formal foundation", "Custom"] },
  { feature: "Payroll and ERGANI launch readiness", values: ["Add-on", "Add-on", "Included", "Custom"] },
  { feature: "First reporting view", values: ["-", "Core view", "Board-ready foundation", "Custom"] },
  { feature: "Ongoing monthly plan after launch", values: ["Independent", "IKE / EPE", "AE", "Custom"] },
];

function PlanCard({ plan }: { plan: Plan }) {
  const featured = plan.featured;
  const muted = featured ? "text-primary-foreground/68" : "text-muted-foreground";

  return (
    <article className={`relative flex h-full flex-col border p-6 sm:p-7 ${featured ? "border-secondary bg-primary text-primary-foreground shadow-[var(--shadow-xl)]" : "border-primary/15 bg-background"}`}>
      {featured ? <p className="mono-label absolute right-5 top-5 text-secondary">Most chosen</p> : null}
      <p className={`mono-label ${muted}`}>{plan.label}</p>
      <h3 className="mt-5 text-4xl leading-none">{plan.name}</h3>
      <p className={`mt-4 min-h-20 text-sm leading-6 ${muted}`}>{plan.description}</p>
      <div className="mt-7 border-t border-current/15 pt-5">
        <p className={`text-sm font-medium ${muted}`}>Starting at</p>
        <p className="mt-2 font-heading text-5xl leading-none">{plan.price}</p>
        <p className={`mt-2 text-sm ${muted}`}>{plan.unit === "/ month" ? "All-inclusive monthly fee, excluding VAT" : "A tailored monthly scope, confirmed before work begins"}</p>
      </div>
      <div className="mt-7 grid gap-3">
        <Button asChild className={`h-11 w-full rounded-full ${featured ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : ""}`} variant={featured ? "secondary" : "outline"}>
          <a href="/onboarding">
            Book a consultation
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </a>
        </Button>
        <a className={`inline-flex min-h-10 items-center justify-center gap-2 text-sm font-semibold underline decoration-current/35 underline-offset-4 transition hover:text-secondary ${featured ? "text-primary-foreground" : "text-foreground"}`} href="#calculator">
          Calculate pricing
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </a>
      </div>
      <div className="mt-8 border-t border-current/15 pt-6">
        <h4 className="text-base font-semibold">Choose {plan.name} if you:</h4>
        <ul className="mt-4 grid gap-3 text-sm leading-6">
          {plan.chooseIf.map((reason) => <li className="flex gap-3" key={reason}><Check className="mt-1 size-4 shrink-0 text-secondary" strokeWidth={2} />{reason}</li>)}
        </ul>
      </div>
      <div className="mt-7 border-t border-current/15 pt-6">
        <h4 className="text-base font-semibold">Financial administration</h4>
        <ul className="mt-4 grid gap-3 text-sm leading-6">
          {plan.details.map((detail) => <li className="flex gap-3" key={detail}><Check className="mt-1 size-4 shrink-0 text-secondary" strokeWidth={2} />{detail}</li>)}
        </ul>
      </div>
      <div className="mt-auto border-t border-current/15 pt-6">
        <h4 className="text-base font-semibold">Payroll</h4>
        <p className={`mt-2 text-sm leading-6 ${muted}`}>Starting at €14 per employee / month</p>
        <p className={`mt-2 flex gap-3 text-sm leading-6 ${muted}`}>
          <Check className="mt-1 size-4 shrink-0 text-secondary" strokeWidth={2} />
          Payroll administration and ERGANI coordination.
        </p>
      </div>
    </article>
  );
}

export function PricingPlans() {
  const [journey, setJourney] = useState<"existing" | "formation">("existing");
  const plans = journey === "existing" ? existingPlans : formationPlans;
  const rows = journey === "existing" ? existingComparison : formationComparison;
  const headings = journey === "existing" ? ["Independent", "IKE / EPE", "AE", "Custom"] : ["Independent Start", "IKE / EPE Start", "AE Start", "Custom Start"];

  return <>
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid gap-6 border-b border-primary/12 pb-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div><p className="mono-label text-secondary">Monthly plans</p><h2 className="mt-4 text-balance text-5xl leading-[0.98] sm:text-6xl"><Reveal>A plan for the structure you run.</Reveal></h2></div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">Select the route that describes you today. Existing companies get a clear operating rhythm. New companies get formation support before that rhythm begins.</p>
        </div>
        <div aria-label="Select your business journey" className="mt-8 inline-grid w-full border border-primary/15 bg-muted/55 p-1 sm:w-auto sm:grid-cols-2" role="tablist">
          <button aria-selected={journey === "existing"} className={`min-h-12 px-5 text-sm font-semibold transition ${journey === "existing" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`} onClick={() => setJourney("existing")} role="tab" type="button">I have a business</button>
          <button aria-selected={journey === "formation"} className={`min-h-12 px-5 text-sm font-semibold transition ${journey === "formation" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`} onClick={() => setJourney("formation")} role="tab" type="button">I&apos;m starting a business</button>
        </div>
        <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">{plans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}</div>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">Prices are monthly starting points, excluding VAT. Formation steps, specialist tax work, and complex legal or notarial requirements are confirmed in writing before work begins.</p>
      </div>
    </section>
    <section className="py-16 md:py-24" id="comparison">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl"><p className="mono-label text-secondary">Compare plans</p><h2 className="mt-4 text-balance text-5xl leading-[0.98] sm:text-6xl"><Reveal>The detail behind the monthly fee.</Reveal></h2><p className="mt-5 text-lg leading-8 text-muted-foreground">The table follows the selected path above, so you can compare recurring work or the setup work that prepares your company to operate.</p></div>
        <div className="mt-10 overflow-x-auto border border-primary/15 bg-background"><div className="min-w-240"><div className="grid grid-cols-[1.8fr_repeat(4,1fr)] border-b border-primary/15 bg-muted/55 text-sm font-semibold"><div className="p-5">Included work</div>{headings.map((heading, index) => <div className={`p-5 ${index === 1 ? "bg-primary text-primary-foreground" : ""}`} key={heading}>{heading}</div>)}</div>{rows.map((row, rowIndex) => <div className={`grid grid-cols-[1.8fr_repeat(4,1fr)] text-sm ${rowIndex < rows.length - 1 ? "border-b border-primary/10" : ""}`} key={row.feature}><div className="p-5 font-semibold text-foreground">{row.feature}</div>{row.values.map((value, valueIndex) => <div className={`flex items-center gap-2 p-5 ${valueIndex === 1 ? "bg-primary/[0.035]" : ""}`} key={`${row.feature}-${valueIndex}`}>{value !== "-" ? <CircleCheck className="size-4 shrink-0 text-secondary" strokeWidth={1.75} /> : null}<span className={value === "-" ? "text-muted-foreground" : "text-foreground"}>{value}</span></div>)}</div>)}</div></div>
      </div>
    </section>
  </>;
}
