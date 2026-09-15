import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Reveal, RevealFade } from "@/components/reveal";
import { cn } from "@/lib/utils";

import { TypeRamp } from "./type-ramp";

export const metadata: Metadata = {
  title: "Design system | KRS AI",
  description: "Color, typography, radius, shadow, and spacing tokens currently used across the KRS website.",
  robots: { index: false, follow: false },
};

const brandColors = [
  {
    name: "Paper",
    token: "--background",
    hex: "#F4EFE6",
    className: "bg-background text-foreground",
    use: "Page canvas, cards, popovers",
  },
  {
    name: "Ink navy",
    token: "--primary",
    hex: "#011936",
    className: "bg-primary text-primary-foreground",
    use: "Primary surfaces, headings, footer",
  },
  {
    name: "Gold",
    token: "--secondary",
    hex: "#AE882F",
    className: "bg-secondary text-secondary-foreground",
    use: "Accent, CTAs, focus ring, labels",
  },
  {
    name: "Deep blue",
    token: "--tertiary",
    hex: "#0B3970",
    className: "bg-tertiary text-tertiary-foreground",
    use: "Accent panels, charts, dark cards",
  },
] as const;

const semanticColors = [
  { name: "Foreground", token: "--foreground", hex: "#011936", swatch: "bg-foreground" },
  { name: "Muted", token: "--muted", hex: "#E7DFD2", swatch: "bg-muted" },
  { name: "Muted text", token: "--muted-foreground", hex: "#53616A", swatch: "bg-muted-foreground" },
  { name: "Accent", token: "--accent", hex: "#0B3970", swatch: "bg-accent" },
  { name: "Destructive", token: "--destructive", hex: "#B23B3B", swatch: "bg-destructive" },
  { name: "Border", token: "--border", hex: "#C7D0CA", swatch: "bg-border" },
  { name: "Input", token: "--input", hex: "#C7D0CA", swatch: "bg-input" },
  { name: "Ring", token: "--ring", hex: "#AE882F", swatch: "bg-ring" },
  { name: "Chart 4", token: "--chart-4", hex: "#88979A", swatch: "bg-chart-4" },
] as const;

const pairings = [
  { label: "Primary on paper", className: "bg-background text-primary" },
  { label: "Gold on navy", className: "bg-primary text-secondary" },
  { label: "Paper on navy", className: "bg-primary text-primary-foreground" },
  { label: "Navy on gold", className: "bg-secondary text-primary" },
] as const;

const colorRamps = [
  {
    name: "Primary",
    role: "Ink navy",
    base: "#011936",
    steps: [
      { step: "50", hex: "#EBEDEF", className: "bg-primary-50 text-primary-950" },
      { step: "100", hex: "#D6DADF", className: "bg-primary-100 text-primary-950" },
      { step: "200", hex: "#AEB5BF", className: "bg-primary-200 text-primary-950" },
      { step: "300", hex: "#85919F", className: "bg-primary-300 text-primary-950" },
      { step: "400", hex: "#48596E", className: "bg-primary-400 text-primary-50" },
      { step: "500", hex: "#011936", className: "bg-primary-500 text-primary-50" },
      { step: "600", hex: "#01162E", className: "bg-primary-600 text-primary-50" },
      { step: "700", hex: "#011226", className: "bg-primary-700 text-primary-50" },
      { step: "800", hex: "#010D1C", className: "bg-primary-800 text-primary-50" },
      { step: "900", hex: "#000912", className: "bg-primary-900 text-primary-50" },
      { step: "950", hex: "#00050B", className: "bg-primary-950 text-primary-50" },
    ],
  },
  {
    name: "Secondary",
    role: "Gold",
    base: "#AE882F",
    steps: [
      { step: "50", hex: "#F9F5EE", className: "bg-secondary-50 text-secondary-950" },
      { step: "100", hex: "#F2ECDE", className: "bg-secondary-100 text-secondary-950" },
      { step: "200", hex: "#E5D9BC", className: "bg-secondary-200 text-secondary-950" },
      { step: "300", hex: "#D8C69B", className: "bg-secondary-300 text-secondary-950" },
      { step: "400", hex: "#C5A969", className: "bg-secondary-400 text-secondary-950" },
      { step: "500", hex: "#AE882F", className: "bg-secondary-500 text-secondary-50" },
      { step: "600", hex: "#967528", className: "bg-secondary-600 text-secondary-50" },
      { step: "700", hex: "#7A5F21", className: "bg-secondary-700 text-secondary-50" },
      { step: "800", hex: "#5A4718", className: "bg-secondary-800 text-secondary-50" },
      { step: "900", hex: "#3B2E10", className: "bg-secondary-900 text-secondary-50" },
      { step: "950", hex: "#231B09", className: "bg-secondary-950 text-secondary-50" },
    ],
  },
  {
    name: "Tertiary",
    role: "Deep blue",
    base: "#0B3970",
    steps: [
      { step: "50", hex: "#EBEFF4", className: "bg-tertiary-50 text-tertiary-950" },
      { step: "100", hex: "#D8DFE8", className: "bg-tertiary-100 text-tertiary-950" },
      { step: "200", hex: "#B1C0D1", className: "bg-tertiary-200 text-tertiary-950" },
      { step: "300", hex: "#8AA0BA", className: "bg-tertiary-300 text-tertiary-950" },
      { step: "400", hex: "#4F7098", className: "bg-tertiary-400 text-tertiary-50" },
      { step: "500", hex: "#0B3970", className: "bg-tertiary-500 text-tertiary-50" },
      { step: "600", hex: "#093160", className: "bg-tertiary-600 text-tertiary-50" },
      { step: "700", hex: "#08284E", className: "bg-tertiary-700 text-tertiary-50" },
      { step: "800", hex: "#061E3A", className: "bg-tertiary-800 text-tertiary-50" },
      { step: "900", hex: "#041326", className: "bg-tertiary-900 text-tertiary-50" },
      { step: "950", hex: "#020B16", className: "bg-tertiary-950 text-tertiary-50" },
    ],
  },
  {
    name: "Neutral",
    role: "Paper and quiet gray",
    base: "#F4EFE6",
    steps: [
      { step: "50", hex: "#FEFEFD", className: "bg-neutral-50 text-neutral-950" },
      { step: "100", hex: "#FCFCFC", className: "bg-neutral-100 text-neutral-950" },
      { step: "200", hex: "#FAF9F9", className: "bg-neutral-200 text-neutral-950" },
      { step: "300", hex: "#F7F6F6", className: "bg-neutral-300 text-neutral-950" },
      { step: "400", hex: "#F3F2F1", className: "bg-neutral-400 text-neutral-950" },
      { step: "500", hex: "#EEEDEC", className: "bg-neutral-500 text-neutral-950" },
      { step: "600", hex: "#CDCCCB", className: "bg-neutral-600 text-neutral-950" },
      { step: "700", hex: "#A7A6A5", className: "bg-neutral-700 text-neutral-50" },
      { step: "800", hex: "#7C7B7B", className: "bg-neutral-800 text-neutral-50" },
      { step: "900", hex: "#515150", className: "bg-neutral-900 text-neutral-50" },
      { step: "950", hex: "#302F2F", className: "bg-neutral-950 text-neutral-50" },
    ],
  },
] as const;

const washes = [
  { name: "Navy wash", className: "bg-wash-primary", token: "bg-wash-primary" },
  { name: "Gold to navy", className: "bg-wash-gold-navy", token: "bg-wash-gold-navy" },
  { name: "Gold wash", className: "bg-wash-gold", token: "bg-wash-gold" },
  { name: "Gold to blue", className: "bg-wash-gold-blue", token: "bg-wash-gold-blue" },
] as const;

const typeFaces = [
  {
    name: "Fraunces",
    role: "Display and metrics",
    sample: "Accounting, evolved.",
    className: "font-serif text-[2.5rem] font-normal leading-[1.05] tracking-tight",
    detail: "Editorial voice. Optical sizing and WONK are on for display. Use for hero display, closing statements, and large metrics.",
  },
  {
    name: "Inter",
    role: "H1 to H6, body, UI",
    sample: "Clarity for every stage of your business.",
    className: "type-h3",
    detail: "Workhorse for structure, reading, and controls. Page titles through H6, body, buttons, navigation, and form labels stay Inter.",
  },
  {
    name: "JetBrains Mono",
    role: "Overlines and metadata",
    sample: "Pricing and plans",
    className: "type-overline text-secondary",
    detail: "Section eyebrows, badges of place, and numeric metadata. Never for paragraphs.",
  },
] as const;

const displayStyles = [
  {
    name: "Display",
    token: "type-display",
    tag: "h1",
    spec: "Fraunces 400, 56 / 82 / 104 / 116 / 148, leading 1.07, tracking -0.0486em",
    use: "Homepage hero only. One per page. Pair with type-lead.",
    sample: "Accounting, evolved.",
    className: "type-display",
  },
  {
    name: "Display XL",
    token: "type-display-xl",
    tag: "h2",
    spec: "Fraunces 300, 72 / 110 / 148 / 180, leading 0.86",
    use: "Closing marketing statements. Keep to a few words.",
    sample: "Talk to KRS.",
    className: "type-display-xl",
  },
] as const;

const headingStyles = [
  {
    name: "H1",
    token: "type-h1",
    tag: "h1",
    spec: "Inter 400, 54 / 72 / 88, leading 0.94, tracking -0.03em",
    use: "Page title on pricing, services, onboarding, and library pages.",
    sample: "Clarity for every stage of your business.",
    className: "type-h1",
  },
  {
    name: "H2",
    token: "type-h2",
    tag: "h2",
    spec: "Inter 400, 48 / 60 / 72, leading 0.95, tracking -0.03em",
    use: "Major section titles. One thought, two lines at most.",
    sample: "A plan for the structure you run.",
    className: "type-h2",
  },
  {
    name: "H3",
    token: "type-h3",
    tag: "h3",
    spec: "Inter 400, 36 / 48 / 60, leading 1.02, tracking -0.03em",
    use: "Split panels, service subheads, and onboarding titles.",
    sample: "Start with the right advisor.",
    className: "type-h3",
  },
  {
    name: "H4",
    token: "type-h4",
    tag: "h4",
    spec: "Inter 500, 30 / 36, leading 1.15, tracking -0.03em",
    use: "Plan names, quotes, and nested section titles.",
    sample: "Operating company",
    className: "type-h4",
  },
  {
    name: "H5",
    token: "type-h5",
    tag: "h5",
    spec: "Inter 500, 24, leading 1.25",
    use: "Card titles, benefit names, and article teasers.",
    sample: "Monthly operating truth",
    className: "type-h5",
  },
  {
    name: "H6",
    token: "type-h6",
    tag: "h6",
    spec: "Inter 500, 20, leading 1.375",
    use: "Accordion questions, list headings, and dense UI titles.",
    sample: "Are the listed prices monthly fees?",
    className: "type-h6",
  },
] as const;

const textStyles = [
  {
    name: "Lead",
    token: "type-lead",
    tag: "p",
    spec: "Inter 400, 18, leading 32px",
    use: "Intro copy under a heading. Max about 65 characters.",
    sample: "Choose a plan that fits today, then extend it as your obligations, team, and reporting needs grow.",
    className: "type-lead text-muted-foreground",
  },
  {
    name: "Body",
    token: "type-body",
    tag: "p",
    spec: "Inter 400, 16, leading 28px",
    use: "Default reading size for paragraphs, FAQs, and longer explanations.",
    sample: "Each plan includes the recurring bookkeeping and compliance work shown in the comparison table. VAT is excluded until the scope is confirmed.",
    className: "type-body",
  },
  {
    name: "Body small",
    token: "type-body-sm",
    tag: "p",
    spec: "Inter 400, 14, leading 24px",
    use: "Supporting copy on cards, feature notes, and compact panels.",
    sample: "AADE, myDATA, EFKA, and ERGANI are not extras. They are part of the operating context.",
    className: "type-body-sm text-muted-foreground",
  },
] as const;

const captionStyles = [
  {
    name: "Caption",
    token: "type-caption",
    tag: "p",
    spec: "Inter 400, 12, leading 20px",
    use: "Legal lines, image notes, and quiet secondary sentences.",
    sample: "The estimate excludes VAT and reflects standard monthly bookkeeping.",
    className: "type-caption text-muted-foreground",
  },
  {
    name: "Overline",
    token: "type-overline",
    tag: "p",
    spec: "JetBrains Mono 600, 11.5, tracking 0.2em, uppercase",
    use: "Section eyebrows and metadata. At most one every three sections.",
    sample: "Pricing and plans",
    className: "type-overline text-secondary",
  },
] as const;

const uiStyles = [
  {
    name: "Button / nav",
    token: "type-ui",
    tag: "button",
    spec: "Inter 500, 14",
    use: "Buttons, header links, and tabs.",
    sample: "Book a consultation",
    className: "type-ui",
  },
  {
    name: "UI compact",
    token: "type-ui-sm",
    tag: "span",
    spec: "Inter 600, 12",
    use: "Badges, language selector, and dense controls.",
    sample: "Most chosen",
    className: "type-ui-sm",
  },
  {
    name: "Label",
    token: "type-label",
    tag: "label",
    spec: "Inter 600, 14, leading 20px",
    use: "Form labels sitting above the field. Never replace with a placeholder.",
    sample: "Work email",
    className: "type-label",
  },
  {
    name: "Helper",
    token: "type-helper",
    tag: "span",
    spec: "Inter 500, 12, leading 20px",
    use: "Field help, stepper notes, and confirmation lines.",
    sample: "No commitment. Your final scope is confirmed before onboarding.",
    className: "type-helper text-muted-foreground",
  },
  {
    name: "Error",
    token: "type-helper",
    tag: "span",
    spec: "Inter 500, 12, leading 20px, destructive",
    use: "Inline validation under the field that caused it.",
    sample: "Please enter a valid work email.",
    className: "type-helper text-destructive",
  },
  {
    name: "Metric",
    token: "type-metric",
    tag: "p",
    spec: "Fraunces 500, 48 / 60, leading none, tracking tight",
    use: "Prices, hours, and other large numbers. Add a body-small unit beside it.",
    sample: "€149",
    className: "type-metric",
  },
] as const;

const radii = [
  { name: "sm", token: "--radius-sm", value: "2px", className: "rounded-sm" },
  { name: "md", token: "--radius-md", value: "4px", className: "rounded-md" },
  { name: "lg", token: "--radius-lg", value: "6px", className: "rounded-lg" },
  { name: "xl", token: "--radius-xl", value: "8px", className: "rounded-xl" },
  { name: "2xl", token: "--radius-2xl", value: "10px", className: "rounded-2xl" },
  { name: "full", token: "9999px", value: "pill", className: "rounded-full" },
] as const;

const shadows = [
  { name: "xs", token: "--shadow-xs", className: "shadow-xs" },
  { name: "sm", token: "--shadow-sm", className: "shadow-sm" },
  { name: "md", token: "--shadow-md", className: "shadow-md" },
  { name: "lg", token: "--shadow-lg", className: "shadow-lg" },
  { name: "xl", token: "--shadow-xl", className: "shadow-xl" },
] as const;

const spacingSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const;

export default function DesignSystemPage() {
  return (
    <div className="bg-[#FDF8F0]">
      <section className="border-b border-primary/12">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-12">
          <div className="max-w-3xl">
            <p className="type-overline text-secondary">Brand tokens</p>
            <h1 className="type-h1 mt-5">
              The KRS visual language, as it ships today.
            </h1>
            <p className="type-lead mt-7 max-w-2xl text-muted-foreground">
              These values come from globals.css and the live marketing pages. Use this page as the source of
              truth for color, type, radius, and elevation before adding a new surface.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px border border-primary/15 bg-primary/15">
            {brandColors.map((color) => (
              <div className={cn("min-h-28 p-5", color.className)} key={color.token}>
                <p className="text-sm font-semibold">{color.name}</p>
                <p className="mt-8 font-mono text-xs opacity-80">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-primary/12" id="color">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
          <p className="type-overline text-secondary">Color</p>
          <h2 className="type-h2 mt-4 max-w-2xl">
            Warm paper, navy, and one gold accent.
          </h2>
          <p className="type-lead mt-5 max-w-2xl text-muted-foreground">
            Each brand color now has a 50 to 950 ramp. Use bg-primary for the base, and bg-primary-100 or
            bg-primary-800 when you need a lighter wash or a deeper panel. Page canvas stays paper.
          </p>

          <div className="mt-12 grid gap-8">
            {colorRamps.map((ramp) => (
              <ColorRamp key={ramp.name} ramp={ramp} />
            ))}
          </div>

          <div className="mt-12">
            <p className="type-label">Washes</p>
            <p className="type-caption mt-1 text-muted-foreground">
              Soft overlays for photography, manifesto panels, and card edges. Keep them behind type, not on it.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {washes.map((wash) => (
                <div className="border border-primary/12 bg-background" key={wash.token}>
                  <div className={cn("min-h-28 bg-primary", wash.className)} />
                  <div className="p-4">
                    <p className="type-label">{wash.name}</p>
                    <p className="type-caption mt-1 font-mono text-muted-foreground">{wash.token}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-3">
              {brandColors.map((color) => (
                <div className="grid border border-primary/12 sm:grid-cols-[140px_1fr]" key={color.token}>
                  <div className={cn("min-h-24", color.className)} />
                  <div className="bg-background p-5">
                    <p className="font-semibold">{color.name}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {color.token} / {color.hex}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{color.use}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-primary/12 bg-background p-5 sm:p-6">
              <p className="text-sm font-semibold">Semantic tokens</p>
              <ul className="mt-5 grid gap-3">
                {semanticColors.map((color) => (
                  <li className="flex items-center gap-4" key={color.token}>
                    <span className={cn("size-10 shrink-0 border border-primary/10", color.swatch)} />
                    <span>
                      <span className="block text-sm font-semibold">{color.name}</span>
                      <span className="block font-mono text-[11px] text-muted-foreground">
                        {color.token} {color.hex}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-sm font-semibold">Approved pairings</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {pairings.map((pair) => (
                <div className={cn("min-h-28 border border-primary/12 p-5", pair.className)} key={pair.label}>
                  <p className="text-sm font-semibold">{pair.label}</p>
                  <p className="mt-8 text-lg font-heading leading-none">Aa</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/12 bg-background" id="typography">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
          <p className="type-overline text-secondary">Typography</p>
          <h2 className="type-h2 mt-4 max-w-3xl">
            Display for the hero. H1 to H6 for structure. Inter for everything you read and click.
          </h2>
          <p className="type-lead mt-5 max-w-2xl text-muted-foreground">
            Use the class names below instead of one-off sizes. Fraunces stays on display and metrics.
            Inter carries H1 to H6, body, captions, and UI.
          </p>

          <nav aria-label="Type categories" className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {[
              { href: "#type-display", label: "Display" },
              { href: "#type-headings", label: "Headings" },
              { href: "#type-text", label: "Text" },
              { href: "#type-captions", label: "Captions" },
              { href: "#type-ui", label: "UI" },
            ].map((link) => (
              <a className="type-ui text-muted-foreground transition hover:text-foreground" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-12 grid gap-px border border-primary/15 bg-primary/15 lg:grid-cols-3">
            {typeFaces.map((face) => (
              <div className="flex min-h-56 flex-col justify-between bg-background p-6 sm:p-8" key={face.name}>
                <p className={cn("text-pretty", face.className)}>{face.sample}</p>
                <div className="mt-8">
                  <p className="type-label">{face.name}</p>
                  <p className="type-caption mt-1 text-muted-foreground">{face.role}</p>
                </div>
              </div>
            ))}
          </div>

          <TypeRamp />

          <TypeGroup
            description="Reserved for marketing moments. Do not use display styles for page titles, cards, or UI."
            id="type-display"
            title="Display"
          >
            <div className="grid gap-px border border-primary/15 bg-primary/15">
              <TypePoster
                className="min-h-[22rem] bg-[#FDF8F0] text-foreground sm:min-h-[28rem]"
                style={displayStyles[0]}
              />
              <TypePoster
                className="min-h-[22rem] bg-primary text-primary-foreground sm:min-h-[28rem]"
                style={displayStyles[1]}
              />
            </div>
          </TypeGroup>

          <TypeGroup
            description="H1 is the page title. H2 starts a section. H3 and H4 sit under that. All heading levels use Inter so titles stay in one family from the page down to cards and forms."
            id="type-headings"
            title="Headings"
          >
            <TypeLadder styles={headingStyles} />
            <div className="mt-px grid gap-px border border-primary/15 bg-primary/15 lg:grid-cols-2">
              <TypePoster
                className="bg-[#FDF8F0] text-foreground"
                style={headingStyles[0]}
              />
              <TypePoster
                className="bg-primary text-primary-foreground"
                style={headingStyles[0]}
              />
            </div>
          </TypeGroup>

          <TypeGroup
            description="Reading styles. Lead sits under a heading. Body is the default paragraph. Body small supports cards and asides."
            id="type-text"
            title="Text"
          >
            <div className="grid gap-px border border-primary/15 bg-primary/15 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="bg-[#FDF8F0] p-6 sm:p-10">
                <p className="type-overline text-secondary">Pricing and plans</p>
                <h3 className="type-h3 mt-5">A plan for the structure you run.</h3>
                <p className="type-lead mt-6 max-w-[38rem] text-muted-foreground">
                  Choose a plan that fits today, then extend it as your obligations, team, and reporting needs
                  grow.
                </p>
                <p className="type-body mt-6 max-w-[38rem]">
                  Each plan includes the recurring bookkeeping and compliance work shown in the comparison table.
                  VAT is excluded until the scope is confirmed.
                </p>
                <p className="type-body-sm mt-5 max-w-[38rem] text-muted-foreground">
                  AADE, myDATA, EFKA, and ERGANI are not extras. They are part of the operating context.
                </p>
                <p className="type-caption mt-8 text-muted-foreground">
                  The estimate excludes VAT and reflects standard monthly bookkeeping.
                </p>
              </article>
              <div className="bg-background">
                {textStyles.map((style) => (
                  <TypeSpecimen key={style.token} style={style} />
                ))}
              </div>
            </div>
          </TypeGroup>

          <TypeGroup
            description="Quiet supporting type. Caption is for legal and notes. Overline names a section, and should appear sparingly."
            id="type-captions"
            title="Captions"
          >
            <TypeLadder styles={captionStyles} />
          </TypeGroup>

          <TypeGroup
            description="Controls, forms, and numbers. Keep labels above fields. Keep errors under the control that failed."
            id="type-ui"
            title="UI"
          >
            <div className="grid gap-px border border-primary/15 bg-primary/15 lg:grid-cols-2">
              <div className="bg-[#FDF8F0] p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="type-ui inline-flex h-12 items-center rounded-full bg-secondary px-6 text-primary shadow-md">
                    Book a consultation
                  </span>
                  <span className="type-ui-sm inline-flex h-7 items-center rounded-full border border-primary/15 bg-background px-3">
                    Most chosen
                  </span>
                </div>
                <div className="mt-10 max-w-sm">
                  <label className="type-label" htmlFor="type-specimen-email">
                    Work email
                  </label>
                  <input
                    className="type-body mt-2 h-12 w-full border border-input bg-background px-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    defaultValue="hello@krs.ai"
                    id="type-specimen-email"
                    type="email"
                  />
                  <p className="type-helper mt-2 text-muted-foreground">
                    No commitment. Your final scope is confirmed before onboarding.
                  </p>
                  <p className="type-helper mt-1 text-destructive">Please enter a valid work email.</p>
                </div>
              </div>
              <div className="flex flex-col justify-between bg-primary p-6 text-primary-foreground sm:p-10">
                <div>
                  <p className="type-overline text-secondary">Operating company</p>
                  <p className="type-metric mt-6">€149</p>
                  <p className="type-body-sm mt-3 text-primary-foreground/70">per month, VAT excluded</p>
                </div>
                <p className="type-caption mt-16 text-primary-foreground/55">
                  Metric uses Fraunces. The unit beside it stays body small.
                </p>
              </div>
            </div>
            <div className="mt-px border border-primary/12 bg-background">
              {uiStyles.map((style) => (
                <TypeSpecimen key={`${style.name}-${style.token}`} style={style} />
              ))}
            </div>
          </TypeGroup>
        </div>
      </section>

      <section className="border-b border-primary/12 bg-[#FDF8F0]" id="motion">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
          <p className="type-overline text-secondary">Motion</p>
          <h2 className="type-h2 mt-4 max-w-3xl">
            Headings clip up. Everything else fades. Timing is 150ms and 700ms.
          </h2>
          <p className="type-lead mt-5 max-w-2xl text-muted-foreground">
            Reveals use overflow clipping and a 700ms cubic-bezier(0.4, 0, 0.2, 1). Hover stays at 150ms and
            changes opacity, gap, or color. Scroll reveals play once. Honor prefers-reduced-motion.
          </p>

          <div className="mt-12 border border-primary/12 bg-background p-6 sm:p-10">
            <p className="type-overline text-secondary">Live reveal</p>
            <h3 className="type-h3 mt-5 max-w-3xl">
              <Reveal>Clarity for every stage of your business.</Reveal>
            </h3>
            <RevealFade className="type-lead mt-5 max-w-xl text-muted-foreground" delay={0.12}>
              Section titles use Reveal. Supporting copy uses RevealFade. Hero lines stagger by about 80ms.
            </RevealFade>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <RuleCard title="Durations" body="150ms for hover and focus. 700ms for heading reveals, section fades, and image transitions." />
            <RuleCard title="Easing" body="cubic-bezier(0.4, 0, 0.2, 1). Tokens: --motion-fast, --motion-base, --motion-ease." />
            <RuleCard title="Reduced motion" body="If the visitor prefers reduced motion, skip the clip and show the type in place." />
          </div>
        </div>
      </section>

      <section className="border-b border-primary/12" id="shape">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
          <p className="type-overline text-secondary">Shape and elevation</p>
          <h2 className="type-h2 mt-4 max-w-2xl">
            Sharp panels. Pill actions.
          </h2>
          <p className="type-lead mt-5 max-w-2xl text-muted-foreground">
            Base radius is 0.125rem. Marketing cards, calculators, and form fields stay nearly square. Primary
            and secondary buttons on the site override to rounded-full.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="border border-primary/12 bg-background p-5 sm:p-8">
              <p className="text-sm font-semibold">Radius scale</p>
              <div className="mt-6 grid grid-cols-3 gap-5 sm:grid-cols-6">
                {radii.map((radius) => (
                  <div className="text-center" key={radius.name}>
                    <div className={cn("mx-auto size-16 border border-primary/20 bg-muted", radius.className)} />
                    <p className="mt-3 text-xs font-semibold">{radius.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{radius.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-primary/12 bg-background p-5 sm:p-8">
              <p className="text-sm font-semibold">Shadow scale</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-5">
                {shadows.map((shadow) => (
                  <div className="text-center" key={shadow.name}>
                    <div className={cn("mx-auto size-16 border border-primary/10 bg-background", shadow.className)} />
                    <p className="mt-3 text-xs font-semibold">{shadow.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{shadow.token}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-6 text-muted-foreground">
            Shadows are tinted navy, not pure black. Use shadow-md on primary CTAs and shadow-lg on
            elevated panels such as the pricing calculator.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/12 bg-background" id="spacing">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
          <p className="type-overline text-secondary">Spacing and layout</p>
          <h2 className="type-h2 mt-4 max-w-2xl">
            A 4px grid, contained at 1400px.
          </h2>
          <p className="type-lead mt-5 max-w-2xl text-muted-foreground">
            Spacing starts at 0.25rem. Page shells use a 1400px max width with 16/24/48px gutters and section
            padding of 64px, growing to 96px on desktop.
          </p>

          <div className="mt-12 border border-primary/12 p-5 sm:p-8">
            <div className="grid gap-3">
              {spacingSteps.map((step) => (
                <div className="flex items-center gap-4" key={step}>
                  <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">
                    {step} / {step * 4}px
                  </span>
                  <span className="h-3 bg-secondary" style={{ width: `${step * 4}px` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <RuleCard title="Borders" body="Hairlines use border-primary/12 to /16. Avoid mixing gray-200 with the semantic border token." />
            <RuleCard title="Focus" body="Interactive elements use a gold ring: focus-visible:ring-3 focus-visible:ring-ring/50 or ring-secondary." />
            <RuleCard title="Motion" body="Keep transitions on transform and opacity. Honor prefers-reduced-motion for tickers and sweeps." />
          </div>
        </div>
      </section>

      <section className="bg-[#FDF8F0]" id="utilities">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
          <p className="type-overline text-secondary">Utilities</p>
          <h2 className="type-h2 mt-4 max-w-2xl">
            Site-specific classes worth reusing.
          </h2>

          <div className="mt-12 grid gap-px border border-primary/15 bg-primary/15">
            <UtilityRow name=".type-overline" sample={<span className="type-overline text-secondary">Section eyebrow</span>} />
            <UtilityRow
              name=".type-display"
              sample={<span className="type-h4">Canonical display and heading classes live in globals.css</span>}
            />
            <UtilityRow
              name=".gradient-shell"
              sample={
                <span className="gradient-shell inline-block">
                  <span className="block bg-background px-4 py-2 text-sm font-semibold">1px gold-to-navy frame</span>
                </span>
              }
            />
            <UtilityRow
              name="text-balance"
              sample={<span className="max-w-sm text-balance text-lg">Balanced wrapping for long marketing headlines.</span>}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ColorRamp({
  ramp,
}: {
  ramp: {
    name: string;
    role: string;
    base: string;
    steps: readonly { step: string; hex: string; className: string }[];
  };
}) {
  return (
    <div className="border border-primary/12 bg-background">
      <div className="flex flex-wrap items-end justify-between gap-3 px-5 py-4 sm:px-6">
        <div>
          <p className="type-label">{ramp.name}</p>
          <p className="type-caption mt-1 text-muted-foreground">{ramp.role}</p>
        </div>
        <p className="type-caption font-mono text-muted-foreground">{ramp.base}</p>
      </div>
      <div className="grid grid-cols-11">
        {ramp.steps.map((step) => (
          <div className={cn("min-h-24 px-2 py-3", step.className)} key={step.step}>
            <p className="text-[10px] font-semibold">{step.step}</p>
            <p className="mt-8 hidden font-mono text-[9px] opacity-80 lg:block">{step.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeGroup({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="scroll-mt-44 mt-20" id={id}>
      <h3 className="type-h5">{title}</h3>
      <p className="type-body-sm mt-2 max-w-2xl text-muted-foreground">{description}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

type TypeStyle = {
  name: string;
  token: string;
  tag: string;
  spec: string;
  use: string;
  sample: string;
  className: string;
};

function TypePoster({
  style,
  className,
}: {
  style: TypeStyle;
  className?: string;
}) {
  return (
    <figure className={cn("flex min-h-64 flex-col justify-between p-6 sm:p-10", className)}>
      <p className={style.className}>{style.sample}</p>
      <figcaption className="mt-10 flex flex-wrap items-end justify-between gap-3">
        <span>
          <span className="type-label block">{style.name}</span>
          <span className="type-caption mt-1 block font-mono opacity-70">{`.${style.token}`}</span>
        </span>
        <span className="type-caption max-w-xs text-right opacity-70">{style.use}</span>
      </figcaption>
    </figure>
  );
}

function TypeLadder({ styles }: { styles: readonly TypeStyle[] }) {
  return (
    <div className="border border-primary/12 bg-[#FDF8F0]">
      {styles.map((style) => (
        <figure
          className="grid items-end gap-4 border-t border-primary/10 px-5 py-7 first:border-t-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-10 sm:px-8 sm:py-8"
          key={`${style.token}-${style.name}`}
        >
          <figcaption className="pb-1">
            <span className="type-label block">{style.name}</span>
            <span className="type-caption mt-1 block font-mono text-muted-foreground">{`.${style.token}`}</span>
          </figcaption>
          <p className={cn("min-w-0", style.className)}>{style.sample}</p>
        </figure>
      ))}
    </div>
  );
}

function TypeSpecimen({ style }: { style: TypeStyle }) {
  return (
    <figure className="grid gap-4 border-t border-primary/12 p-5 first:border-t-0 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-start sm:gap-8 sm:p-7">
      <figcaption>
        <span className="type-label block">{style.name}</span>
        <span className="type-caption mt-1 block font-mono text-muted-foreground">{`.${style.token}`}</span>
      </figcaption>
      <div>
        <p className={style.className}>{style.sample}</p>
        <p className="type-caption mt-4 text-muted-foreground">{style.use}</p>
      </div>
    </figure>
  );
}

function RuleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-primary/12 bg-background p-5">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function UtilityRow({ name, sample }: { name: string; sample: ReactNode }) {
  return (
    <div className="grid gap-4 bg-background p-6 sm:grid-cols-[220px_1fr] sm:items-center">
      <p className="font-mono text-sm font-semibold">{name}</p>
      <div>{sample}</div>
    </div>
  );
}
