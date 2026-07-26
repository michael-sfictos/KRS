import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Gauge,
  MessageSquareText,
  Network,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AgentsSection } from "@/components/agents-section";
import { HeroVisualStrip } from "@/components/hero-visual-strip";
import { Button } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/process-timeline";
import { ServicesTabs } from "@/components/services-tabs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { cn } from "@/lib/utils";

const mediaSignals = [
  { label: "Money Review", mark: "MR", note: "AI accounting operations", href: "https://www.moneyreview.gr/" },
  { label: "Kathimerini Business", mark: "K", note: "Greek SME advisory", href: "https://www.kathimerini.gr/economy/business/" },
  { label: "Naftemporiki", mark: "N", note: "Tax technology", href: "https://www.naftemporiki.gr/" },
  { label: "Startupper", mark: "S", note: "Founder finance", href: "https://www.startupper.gr/" },
];

const processSteps = [
  {
    time: "Day 1",
    title: "Start",
    text: "After signature, KRS opens the operating file, confirms authorisations, and maps the first tax and accounting obligations.",
    cta: "Explore tax advisor service",
  },
  {
    time: "Every month",
    title: "Monthly accounting close",
    text: "Receipts, bank activity, payroll changes, and myDATA requirements move through one review sequence before the month closes.",
    cta: "Discover accounting services",
  },
  {
    time: "Once a year",
    title: "Annual filings and tax return",
    text: "Financial statements, tax returns, and supporting evidence are prepared with visible status before submission deadlines.",
    cta: "Discover annual filings",
  },
  {
    time: "Always",
    title: "Talk to real experts",
    text: "Ask questions directly to KRS advisors and get instant help from real people who understand and care for your business.",
    cta: "Talk to our team",
  },
];

const benefits: Array<{ value: string; text: string; icon: LucideIcon }> = [
  {
    value: "One platform",
    text: "for accounting, payroll, tax advisory, and document control.",
    icon: PanelsTopLeft,
  },
  {
    value: "24h response logic",
    text: "for structured tax and accounting questions.",
    icon: MessageSquareText,
  },
  {
    value: "Greek compliance graph",
    text: "connecting authorities, deadlines, and advisor review.",
    icon: Network,
  },
  {
    value: "Realtime transparency",
    text: "across missing documents, filings, and monthly close status.",
    icon: Gauge,
  },
];

const fieldNotes = [
  {
    type: "Brief",
    read: "08 min",
    title: "What agentic accounting changes for Greek SMEs.",
    text: "Why the next leap is not replacing accountants, but giving advisors a better operating file before decisions are made.",
  },
  {
    type: "Guide",
    read: "11 min",
    title: "myDATA as an operating rhythm, not an afterthought.",
    text: "A practical view of document evidence, monthly review, and how leadership teams can avoid year-end uncertainty.",
  },
  {
    type: "Conversation",
    read: "17 min",
    title: "The CFO question founders ask too late.",
    text: "How tax structure, payroll controls, and reporting discipline become a growth advantage before financing rounds.",
  },
];

const socialVideos = [
  {
    id: "Wl6-gvmHT88",
    href: "https://www.youtube.com/shorts/Wl6-gvmHT88",
    title: "Inside the KRS AI operating file.",
    text: "A short look at how accounting questions become structured advisor work.",
  },
  {
    id: "_HIrEfhkh6Y",
    href: "https://www.youtube.com/shorts/_HIrEfhkh6Y",
    title: "How agentic workflows support advisors.",
    text: "A practical glimpse at human review, routing, and evidence collection.",
  },
  {
    id: "-_k56R5dp7U",
    href: "https://www.youtube.com/shorts/-_k56R5dp7U",
    title: "What modern tax support feels like.",
    text: "Short-form context on faster answers, clearer files, and better visibility.",
  },
];

const faqs = [
  {
    question: "Does KRS AI do all bookkeeping tasks for me?",
    answer:
      "KRS AI supports document routing, classification, deadline tracking, and evidence gathering. Licensed accounting professionals review and complete the reserved accounting work, while you provide context or documents when something is missing.",
  },
  {
    question: "Does KRS AI replace my accountant?",
    answer:
      "No. The platform improves preparation and visibility. Human KRS advisors remain responsible for judgment, review, and professional work that must be handled by licensed specialists.",
  },
  {
    question: "Which Greek compliance systems does KRS AI support?",
    answer:
      "The operating model is designed around AADE, myDATA, Taxisnet, EFKA, ERGANI, gov.gr workflows, and the documents Greek businesses need for accounting, payroll, and tax continuity.",
  },
  {
    question: "What kind of questions can I ask my tax team?",
    answer:
      "You can ask about VAT, payroll obligations, entity structure, deductibility, deadlines, filings, monthly reports, and operational tax choices. KRS routes the question to the right advisor with the relevant file context.",
  },
];

const careersClockTicks = Array.from({ length: 12 }, (_, index) => ({
  angle: index * 30,
  highlighted: index < 6,
}));

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <HeroSection />
      <MediaSection />
      <ManifestoSection />
      <ServicesSection />
      <SlimCta />
      <AgentsSection />
      <ProcessSection />
      <WhySection />
      <TestimonialSection />
      <FieldNotesSection />
      <CareersSection />
      <FaqSection />
      <SocialVideosSection />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-primary/12 bg-[#FDF8F0]">
      <div className="relative mx-auto max-w-[1400px] px-4 pb-8 pt-10 sm:px-6 lg:px-12 lg:pt-16">
        <div className="mb-20 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between lg:mb-32">
          <div className="max-w-[640px] font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary/55">
            Premium accounting, payroll and tax advisory for modern businesses
          </div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary/55">Athens / EU / 2026</p>
        </div>

        <div className="grid grid-cols-12 items-end gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="hero-headline max-w-5xl text-balance text-[56px] text-foreground sm:text-[82px] md:text-[104px] lg:text-[116px] xl:text-[148px]">
              Accounting
              <br />
              <span className="hero-headline-accent italic text-secondary">evolved into</span>
              <br />
              agentic AI.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pb-3">
            <p className="mono-label mb-4 text-secondary">Statement of intent</p>
            <p className="max-w-md text-lg leading-8 text-foreground/72">
              KRS combines licensed accounting and tax professionals with agentic workflows that organize filings,
              documents, payroll obligations, and advisory questions before they become urgent.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild className="h-12 rounded-full px-6 text-base shadow-[var(--shadow-md)]" variant="secondary">
                <a href="/onboarding">
                  Schedule an initial consultation
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
          </div>
        </div>

        <HeroVisualStrip />
      </div>
    </section>
  );
}

function MediaSection() {
  return (
    <section className="border-y border-primary/12 bg-card py-10" id="media">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:items-center">
          <div>
            <p className="mono-label text-secondary">KRS AI in the media</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">Known where finance operators pay attention.</h2>
          </div>
          <div className="overflow-hidden py-4">
            <div className="ticker-track flex w-max gap-3">
              {[...mediaSignals, ...mediaSignals].map((item, index) => (
                <a
                  className="group/media grid w-72 grid-cols-[auto_1fr] gap-4 border-r border-primary/12 pr-6 outline-none transition-colors hover:text-primary focus-visible:text-primary"
                  href={item.href}
                  key={`${item.label}-${index}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="mt-0.5 flex size-9 items-center justify-center border border-primary/16 bg-background font-heading text-sm font-semibold text-secondary transition-colors group-hover/media:border-secondary group-hover/media:bg-secondary group-hover/media:text-secondary-foreground">
                    {item.mark}
                  </span>
                  <div>
                    <p className="font-semibold underline decoration-primary/0 underline-offset-4 transition group-hover/media:decoration-secondary group-focus-visible/media:decoration-secondary">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground lg:py-36" id="about">
      <div className="font-heading absolute -right-8 top-0 select-none text-[360px] font-light leading-[0.75] text-secondary/8 sm:text-[520px]">
        04
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[max(1rem,calc((100%-1400px)/2+1rem))] w-[min(22rem,40%)] bg-left-bottom bg-no-repeat sm:left-[max(1.5rem,calc((100%-1400px)/2+1.5rem))] lg:left-[max(3rem,calc((100%-1400px)/2+3rem))]"
        style={{
          backgroundImage: "url('/images/FounderKRS.webp')",
          backgroundSize: "min(22rem, 100%) auto",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-4 sm:px-6 lg:px-12">
        <div className="relative col-span-12 min-h-[420px] lg:col-span-3 lg:min-h-[520px]">
          <p className="mono-label text-secondary">Manifesto / 01</p>
          <p className="mt-5 max-w-xs text-sm leading-7 text-primary-foreground/56">
            Accounting should feel like an operating discipline, not a periodic scramble through portals, folders, and
            inboxes.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <p className="font-heading text-balance text-4xl font-light leading-[1.04] sm:text-5xl md:text-6xl lg:text-7xl">
            We believe trust is built through evidence, cadence, and accountable review.
            <span className="italic text-secondary"> AI should not obscure the work.</span> It should make the work inspectable.
          </p>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 font-mono text-sm text-primary-foreground/60">
            <span className="uppercase tracking-widest">Signed</span>
            <span>KRS AI</span>
            <span>Athens</span>
            <span>MMXXVI</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  inverted = false,
  className,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end", className)}>
      <div>
        <p className={cn("mono-label", inverted ? "text-secondary" : "text-secondary")}>{eyebrow}</p>
        <h2
          className={cn(
            "mt-5 max-w-4xl text-balance text-5xl font-normal leading-[0.95] sm:text-6xl lg:text-7xl",
            inverted ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {title}
        </h2>
      </div>
      {text ? (
        <p className={cn("max-w-xl text-lg leading-8", inverted ? "text-primary-foreground/68" : "text-muted-foreground")}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-12" id="services">
      <div className="mx-auto max-w-[1400px]">
        <SectionIntro
          className="lg:grid-cols-[0.65fr_0.35fr]"
          eyebrow="Index of service"
          text="Four service lines, one operating file: advisory, accounting, payroll, and statutory returns move through the same controlled system."
          title="Business services designed for decision speed and compliance discipline."
        />
        <ServicesTabs />
      </div>
    </section>
  );
}

function SlimCta() {
  return (
    <section className="border-y border-primary/12 bg-card px-4 py-8 sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="hidden size-11 items-center justify-center rounded-full bg-primary text-primary-foreground sm:flex">
            <Sparkles className="size-5 text-secondary" />
          </span>
          <p className="font-heading text-balance text-2xl font-medium leading-tight">Ready for an accounting file that stays ready?</p>
        </div>
        <Button asChild className="h-11 w-fit rounded-full bg-primary px-5">
          <a href="/onboarding">
            Schedule an initial consultation
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="relative overflow-hidden border-y border-primary/12 bg-muted/55 px-4 py-24 text-foreground sm:px-6 lg:px-12" id="process">
      <div className="relative mx-auto max-w-[1400px]">
        <SectionIntro
          className="lg:grid-cols-[0.65fr_0.35fr]"
          eyebrow="Your start at KRS AI"
          text="The timeline remains simple: start, monthly close, annual filings, and ongoing advisory. Each phase has visible evidence and a clear owner."
          title="A timeline for accounting work that normally disappears into inboxes."
        />
        <ProcessTimeline steps={processSteps} />
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-card px-4 py-24 sm:px-6 lg:px-12" id="why">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="mono-label text-secondary">Why KRS AI?</p>
            <h2 className="mt-5 max-w-3xl text-balance text-5xl font-normal leading-[0.95] sm:text-6xl">
              A precise operating layer for founders, finance teams, and owners.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              The benefit is not a prettier portal. It is fewer unknowns, earlier questions, and better-reviewed
              decisions across accounting, payroll, tax, and filings.
            </p>
          </div>
          <div className="gradient-shell shadow-[var(--shadow-lg)]">
            <Image
              alt="A connected KRS AI operating layer for accounting, advice, compliance, and live reporting"
              className="w-full bg-card"
              height={640}
              src="/images/krs-why-ai-phone.jpg"
              width={960}
            />
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-primary/12 bg-primary/12 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div className="bg-background p-6" key={benefit.value}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-secondary">0{index + 1}</span>
                  <Icon className="size-5 text-muted-foreground" />
                </div>
                <h3 className="mt-16 text-2xl font-semibold leading-tight">{benefit.value}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{benefit.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return <TestimonialsCarousel />;
}

function FieldNotesSection() {
  return (
    <section className="bg-card px-4 pb-24 sm:px-6 lg:px-12" id="field-notes">
      <div className="mx-auto max-w-[1400px] border-t border-primary/16 pt-16">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label text-secondary">Read more on our blog</p>
            <h2 className="mt-5 text-balance text-5xl font-normal leading-[0.95] sm:text-6xl">
              Dispatches from the finance operating file.
            </h2>
          </div>
          <a className="inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3" href="#">
            Read all articles
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {fieldNotes.map((note, index) => (
            <article className="group cursor-pointer" key={note.title}>
              <div
                className={cn(
                  "relative mb-5 aspect-[4/5] overflow-hidden bg-primary",
                  index === 1 && "bg-secondary",
                  index === 2 && "bg-tertiary"
                )}
              >
                {index === 0 ? (
                  <Image
                    alt=""
                    className="object-cover transition duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    src="/images/krs-athens-operations.png"
                  />
                ) : (
                  <div className="relative flex h-full flex-col justify-between p-7 text-primary-foreground">
                    <p className="relative mono-label text-primary-foreground/58">note / 0{index + 1}</p>
                    <p className="font-heading relative text-balance text-5xl font-normal leading-[0.92]">
                      {index === 1 ? "The month closes before year-end." : "Advisory begins with evidence."}
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span>{note.type}</span>
                <span>/</span>
                <span>{note.read}</span>
              </div>
              <h3 className="text-2xl font-semibold leading-tight">{note.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{note.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CareersSection() {
  return (
    <section className="bg-accent px-4 py-24 text-primary-foreground sm:px-6 lg:px-12" id="careers">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
        <div className="gradient-shell shadow-[var(--shadow-xl)]">
          <div className="relative aspect-[3/4] overflow-hidden bg-background p-8 text-foreground">
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <Image alt="KRS AI" className="h-8 w-auto" height={157} src="/logos/Full%20logo%20Dark.svg" unoptimized width={382} />
                <span className="mono-label text-muted-foreground">No. 1619</span>
              </div>
              <div className="relative mx-auto flex aspect-square w-[74%] items-center justify-center rounded-full border border-primary/10 bg-primary text-primary-foreground">
                <span aria-hidden="true" className="pointer-events-none absolute inset-5 rounded-full">
                  {careersClockTicks.map((tick) => (
                    <span
                      className="absolute left-1/2 top-1/2 h-full w-px"
                      key={tick.angle}
                      style={{ transform: `translate(-50%, -50%) rotate(${tick.angle}deg)` }}
                    >
                      <span
                        className={cn(
                          "absolute left-1/2 top-1 -translate-x-1/2 rounded-full",
                          tick.highlighted ? "h-9 w-1.5 bg-secondary" : "h-5 w-px bg-primary-foreground/18"
                        )}
                      />
                    </span>
                  ))}
                </span>
                <div className="relative flex size-44 items-center justify-center rounded-full border border-secondary/70">
                  <span className="absolute right-9 top-9 size-3 rounded-full bg-secondary" />
                  <div className="relative z-10 text-center">
                    <p className="font-heading text-7xl font-medium leading-none text-secondary">6h</p>
                    <p className="mono-label mt-2 text-primary-foreground/62">focused day</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="font-heading text-balance text-4xl font-normal leading-none">
                  Six focused hours. Work worth doing.
                </p>
                <p className="mono-label mt-5 text-muted-foreground">Athens / Remote / Healthy rhythm</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="mono-label text-secondary">FEATURE / SPRING EDITION</p>
          <h2 className="mt-6 text-balance text-5xl font-normal leading-[0.95] sm:text-6xl">
            Join the team building a 6-hour working day with Agentic AI.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-primary-foreground/72">
            KRS AI is built around focused work, healthy lifestyle, and fewer repetitive loops. Agentic workflows handle
            document chasing, routing, and mundane portal work so advisors, operators, and engineers can spend their best
            hours on judgment, systems, and client outcomes.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              ["6h", "focused working day"],
              ["AI", "agentic workflows"],
              ["No", "mundane work"],
              ["Life", "healthy lifestyle"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-heading text-5xl font-medium text-secondary">{value}</p>
                <p className="mono-label mt-2 text-primary-foreground/58">{label}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-10 h-12 rounded-full bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90">
            <a href="#careers">
              See open positions
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-12" id="faq">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label text-secondary">Frequently asked questions</p>
            <h2 className="mt-5 text-balance text-5xl font-normal leading-[0.95] sm:text-6xl">
              Frequently asked questions, organized as working notes.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            A practical index for how KRS AI, licensed advisors, and the client operating file work together.
          </p>
        </div>

        <Accordion className="border-t border-primary/16" defaultValue={["item-0"]} type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem className="border-b border-primary/16" key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="grid grid-cols-[auto_1fr_auto] gap-5 rounded-none py-8 text-left text-xl font-semibold hover:no-underline sm:text-2xl">
                <span className="font-mono text-base text-secondary">0{index + 1}</span>
                <span>{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="ml-11 max-w-3xl pb-8 text-base leading-8 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function SocialVideosSection() {
  return (
    <section className="bg-card px-4 pb-24 sm:px-6 lg:px-12" id="social-videos">
      <div className="mx-auto max-w-[1400px] pt-16">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label text-secondary">Watch on social</p>
            <h2 className="mt-5 text-balance text-5xl font-normal leading-[0.95] sm:text-6xl">
              Short videos from the KRS AI workflow.
            </h2>
          </div>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
            href="https://www.youtube.com/results?search_query=KRS+AI"
            rel="noreferrer"
            target="_blank"
          >
            View more videos
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {socialVideos.map((video, index) => (
            <article className="group" key={video.id}>
              <div
                className={cn(
                  "relative mb-5 aspect-[9/16] overflow-hidden bg-primary shadow-[var(--shadow-sm)] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lg)]",
                  index === 1 && "bg-secondary",
                  index === 2 && "bg-tertiary"
                )}
              >
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                />
              </div>
              <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span>Short</span>
                <span>/</span>
                <span>0{index + 1}</span>
              </div>
              <h3 className="text-2xl font-semibold leading-tight">{video.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{video.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-secondary px-4 py-24 text-primary sm:px-6 lg:px-12 lg:py-36" id="contact">
      <div className="absolute inset-0 opacity-18">
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 900 420" aria-hidden="true">
          <g fill="#F4EFE6">
            {Array.from({ length: 36 }).map((_, index) => (
              <circle
                cx={80 + (index % 12) * 70}
                cy={80 + Math.floor(index / 12) * 120 + (index % 2) * 18}
                key={index}
                r={index % 3 === 0 ? 2.2 : 1.4}
              />
            ))}
          </g>
        </svg>
      </div>
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 items-end gap-8">
        <div className="col-span-12 lg:col-span-8">
          <p className="mono-label mb-6 text-primary-foreground">TAKE THE NEXT STEP</p>
          <h2 className="text-balance text-[72px] font-light leading-[0.86] text-primary-foreground sm:text-[110px] md:text-[148px] lg:text-[180px]">
            Begin
            <br />
            together.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:pb-6">
          <p className="max-w-md text-lg leading-8 text-primary/74">
            Bring us your current accounting file, tax questions, payroll obligations, and deadline pressure. We will map
            the path forward with a KRS advisor.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Button asChild className="h-13 justify-between rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              <a href="/onboarding">
                Get free advice now
                <ArrowRight className="size-5" />
              </a>
            </Button>
            <Button
              asChild
              className="h-13 justify-between rounded-full border-primary-foreground/72 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              variant="outline"
            >
              <a href="#services">
                Review service lines
                <ArrowRight className="size-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
