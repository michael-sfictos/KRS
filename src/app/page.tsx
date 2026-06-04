import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  Gauge,
  Landmark,
  Languages,
  MessageSquareText,
  Network,
  PanelsTopLeft,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/process-timeline";
import { ServicesTabs } from "@/components/services-tabs";
import { SiteFooter } from "@/components/site-footer";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#why" },
  { label: "Guides", href: "#process" },
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#field-notes" },
];

const mediaSignals = [
  { label: "Money Review", mark: "MR", note: "AI accounting operations", href: "https://www.moneyreview.gr/" },
  { label: "Kathimerini Business", mark: "K", note: "Greek SME advisory", href: "https://www.kathimerini.gr/economy/business/" },
  { label: "Naftemporiki", mark: "N", note: "Tax technology", href: "https://www.naftemporiki.gr/" },
  { label: "Startupper", mark: "S", note: "Founder finance", href: "https://www.startupper.gr/" },
];

const governmentConnections: Array<{
  name: string;
  description: string;
  status: string;
  icon: LucideIcon;
}> = [
  {
    name: "AADE",
    description: "VAT, myDATA, tax certificates, company obligations.",
    status: "Tax authority",
    icon: Landmark,
  },
  {
    name: "EFKA",
    description: "Employer insurance contributions and payroll obligations.",
    status: "Social security",
    icon: ShieldCheck,
  },
  {
    name: "Taxisnet",
    description: "Declarations, authorisations, and tax account access.",
    status: "Identity gateway",
    icon: FileCheck2,
  },
  {
    name: "ERGANI",
    description: "Hiring, payroll notices, and labour compliance flows.",
    status: "Labour filings",
    icon: Workflow,
  },
  {
    name: "gov.gr",
    description: "Certificates, statements, and public-service documents.",
    status: "Public services",
    icon: BadgeCheck,
  },
  {
    name: "myDATA",
    description: "Document matching, e-books, and reporting continuity.",
    status: "Digital books",
    icon: ReceiptText,
  },
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
    title: "Proactive advisory",
    text: "Questions are routed to the right KRS expert, supported by context gathered by agents, and returned with a clear next action.",
    cta: "Learn more",
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

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <AnnouncementBar />
      <Header />
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
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

function AnnouncementBar() {
  return (
    <div className="border-b border-primary/12 bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground/84">
      KRS AI for Greek companies: accounting, payroll, tax advisory, and agentic compliance operations.
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/12 bg-background/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-12">
        <a aria-label="KRS AI home" className="flex items-center" href="#">
          <Image alt="KRS AI" className="h-9 w-auto" height={36} src="/logos/krs-full-logo-dark.svg" unoptimized width={152} />
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div aria-label="Language selector" className="hidden items-center gap-2 border-l border-primary/12 pl-4 sm:flex">
            <Languages className="size-3.5 text-secondary" strokeWidth={1.75} />
            <span className="font-mono text-[0.68rem] font-semibold uppercase text-foreground">EN</span>
            <span className="h-3 w-px bg-primary/18" aria-hidden="true" />
            <span className="font-mono text-[0.68rem] font-semibold uppercase text-muted-foreground">EL</span>
          </div>
          <Button asChild className="hidden h-10 rounded-full px-5 sm:inline-flex" variant="ghost">
            <a href="#login">Log-in</a>
          </Button>
          <Button asChild className="h-10 rounded-full px-5 shadow-sm">
            <a href="#contact">
              Contact
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-primary/12 bg-background">
      <div className="relative mx-auto max-w-[1400px] px-4 pb-8 pt-10 sm:px-6 lg:px-12 lg:pt-16">
        <div className="mb-20 flex flex-col gap-5 md:mb-24 md:flex-row md:items-end md:justify-between lg:mb-32">
          <div className="mono-label flex flex-wrap gap-x-5 gap-y-2 text-muted-foreground">
            <span>No. 001</span>
            <span>Field Manual</span>
            <span>Greek Business Services</span>
          </div>
          <p className="mono-label text-muted-foreground">Athens / EU / 2026</p>
        </div>

        <div className="grid grid-cols-12 items-end gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="max-w-5xl text-balance text-[56px] font-light leading-[0.88] text-foreground sm:text-[82px] md:text-[104px] lg:text-[116px] xl:text-[132px]">
              Accounting, <span className="font-light italic text-secondary">evolved into</span> agentic AI.
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
                <a href="#contact">
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

function HeroVisualStrip() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-4">
      <div className="relative min-h-[360px] overflow-hidden bg-primary">
        <Image
          alt="Modern Athens accounting operations desk"
          className="object-cover"
          fill
          priority
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          src="/images/krs-athens-operations.png"
        />
      </div>

      <div className="flex min-h-[360px] flex-col justify-between bg-primary p-5 text-primary-foreground">
        <div className="mono-label text-primary-foreground/48">Close state</div>
        <div>
          <p className="font-heading text-7xl font-medium leading-none text-secondary">02</p>
          <p className="mono-label mt-3 text-primary-foreground/62">open questions</p>
        </div>
      </div>

      <div className="min-h-[360px] bg-card p-5">
        <div className="flex h-full flex-col justify-between">
          <p className="mono-label text-muted-foreground">Advisor queue</p>
          <div className="space-y-3">
            {["VAT position", "Payroll change", "myDATA match"].map((item, index) => (
              <div className="grid grid-cols-[auto_1fr] items-center gap-3 border-t border-primary/12 pt-3" key={item}>
                <span className="font-mono text-xs text-secondary">0{index + 1}</span>
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
          <Badge className="w-fit rounded-full bg-primary text-primary-foreground">live file</Badge>
        </div>
      </div>

      <div className="relative min-h-[360px] overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute left-0 top-1/2 h-px w-full bg-primary-foreground/12" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-primary-foreground/12" />
        <div className="relative flex h-full flex-col justify-between p-5">
          <p className="mono-label text-secondary">Topology</p>
          <div>
            <div className="mb-6 grid grid-cols-3 gap-3">
              {["AADE", "EFKA", "ERGANI", "KRS", "myDATA", "gov.gr"].map((node, index) => (
                <span
                  className={cn(
                    "flex aspect-square items-center justify-center border border-primary-foreground/14 text-center font-mono text-[0.62rem] uppercase text-primary-foreground/54",
                    index === 3 && "bg-secondary text-secondary-foreground"
                  )}
                  key={node}
                >
                  {node}
                </span>
              ))}
            </div>
            <p className="font-heading max-w-56 text-balance text-3xl font-medium leading-tight">Controlled connection beats scattered portals.</p>
          </div>
        </div>
      </div>
    </div>
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
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-4 sm:px-6 lg:px-12">
        <div className="col-span-12 lg:col-span-3">
          <p className="mono-label text-secondary">Manifesto / 01</p>
          <p className="mt-5 max-w-xs text-sm leading-7 text-primary-foreground/56">
            Accounting should feel like an operating discipline, not a periodic scramble through portals, folders, and
            inboxes.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <p className="font-heading text-balance text-4xl font-light leading-[1.04] sm:text-5xl md:text-6xl lg:text-7xl">
            We believe trust is built through evidence, cadence, and accountable review.
            <span className="text-secondary"> AI should not obscure the work.</span> It should make the work inspectable.
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
          <a href="#contact">
            Schedule an initial consultation
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}

function AgentsSection() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-24 text-primary-foreground sm:px-6 lg:px-12" id="agents">
      <div className="relative mx-auto max-w-[1400px]">
        <SectionIntro
          eyebrow="KRS AI Agents"
          inverted
          text="Agents prepare the context, connect the relevant authority workflow, and route exceptions to the right licensed professional before a deadline becomes a problem."
          title="The connection layer between your business file and Greek compliance systems."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="gradient-shell shadow-[var(--shadow-xl)]">
            <div className="relative min-h-[520px] overflow-hidden bg-primary">
              <Image
                alt="KRS AI agent network connecting Greek compliance systems"
                className="h-full min-h-[520px] w-full object-contain p-4"
                height={640}
                src="/images/krs-agent-network.svg"
                unoptimized
                width={960}
              />
            </div>
          </div>

          <div className="grid gap-px border border-primary-foreground/12 bg-primary-foreground/12">
            {governmentConnections.map((connection) => {
              const Icon = connection.icon;

              return (
                <div className="grid gap-4 bg-primary p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center" key={connection.name}>
                  <span className="flex size-11 items-center justify-center border border-primary-foreground/14 bg-primary-foreground/8">
                    <Icon className="size-5 text-secondary" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold">{connection.name}</h3>
                      <Badge className="rounded-full bg-secondary text-secondary-foreground" variant="secondary">
                        {connection.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-primary-foreground/62">{connection.description}</p>
                  </div>
                  <ArrowRight className="hidden size-5 text-primary-foreground/34 sm:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-24 text-primary-foreground sm:px-6 lg:px-12" id="process">
      <div className="relative mx-auto max-w-[1400px]">
        <SectionIntro
          className="lg:grid-cols-[0.65fr_0.35fr]"
          eyebrow="Your start at KRS AI"
          inverted
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
              alt="Vector visualization of KRS AI benefits"
              className="w-full bg-card"
              height={640}
              src="/images/krs-why-vector.svg"
              unoptimized
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
                <Image alt="KRS AI" className="h-8 w-auto" height={32} src="/logos/krs-full-logo-dark.svg" unoptimized width={135} />
                <span className="mono-label text-muted-foreground">No. 1619</span>
              </div>
              <div className="mx-auto flex aspect-square w-[74%] items-center justify-center rounded-full bg-primary">
                <div className="relative size-40 rounded-full border border-secondary/70">
                  <span className="absolute left-1/2 top-0 size-4 -translate-x-1/2 rounded-full bg-secondary" />
                  <span className="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 rounded-full bg-secondary" />
                  <span className="absolute left-0 top-1/2 size-4 -translate-y-1/2 rounded-full bg-secondary" />
                  <span className="absolute right-0 top-1/2 size-4 -translate-y-1/2 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-heading text-balance text-4xl font-normal leading-none">Build the advisory firm operators deserve.</p>
                <p className="mono-label mt-5 text-muted-foreground">Athens / Remote</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="mono-label text-secondary">FEATURE / SPRING EDITION</p>
          <h2 className="mt-6 text-balance text-5xl font-normal leading-[0.95] sm:text-6xl">
            Join the team turning accounting into an operating advantage.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-primary-foreground/72">
            KRS AI is looking for advisors, operators, engineers, and client-facing specialists who care about precision,
            calm execution, and the future of Greek business services.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              ["12", "operating disciplines"],
              ["24h", "response culture"],
              ["EU", "business scope"],
              ["01", "shared file"],
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
              <a href="mailto:hello@krs.ai">
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
