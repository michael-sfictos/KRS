"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  FileClock,
  ReceiptText,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const AUTO_ROTATE_MS = 6500;

export type ServiceTab = {
  value: string;
  label: string;
  eyebrow: string;
  title: string;
  cta: string;
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  routing: string[];
  features: Array<{ title: string; text: string }>;
};

const serviceTabs: ServiceTab[] = [
  {
    value: "advisory",
    label: "Tax Advisory",
    eyebrow: "Board-ready counsel",
    title: "Tax advisory for decisions before they become filings.",
    cta: "Discuss tax advisory",
    icon: ShieldCheck,
    stat: "24h",
    statLabel: "structured response window",
    routing: ["Entity structure", "VAT position", "Greek tax calendar"],
    features: [
      {
        title: "Greek tax planning with operator context",
        text: "Advisors review entity structure, VAT exposure, investment plans, and owner decisions through one evidence trail.",
      },
      {
        title: "A clear path from question to position",
        text: "Every advisory request is triaged, documented, reviewed, and returned with the next operational action.",
      },
      {
        title: "Human sign-off where judgment matters",
        text: "AI agents prepare the context; licensed KRS professionals validate the position before it reaches you.",
      },
    ],
  },
  {
    value: "accounting",
    label: "Accounting",
    eyebrow: "Monthly operating truth",
    title: "Accounting that closes the month with less friction.",
    cta: "Explore accounting",
    icon: ReceiptText,
    stat: "98%",
    statLabel: "document routing assisted",
    routing: ["myDATA matching", "Bank feed review", "Monthly close"],
    features: [
      {
        title: "Books, receipts, and bank activity in sequence",
        text: "Transactions are connected to documents and reviewed before they become management reports.",
      },
      {
        title: "Monthly visibility, not a year-end surprise",
        text: "Missing evidence, categorizations, and open questions are visible early enough to act.",
      },
      {
        title: "Prepared for Greek reporting workflows",
        text: "The accounting flow is designed around myDATA, VAT, and the practical realities of Greek SMEs.",
      },
    ],
  },
  {
    value: "payroll",
    label: "Payroll",
    eyebrow: "People operations control",
    title: "Payroll, employer obligations, and notices kept in motion.",
    cta: "Review payroll support",
    icon: UsersRound,
    stat: "1",
    statLabel: "controlled employee record",
    routing: ["Payroll run", "EFKA checks", "ERGANI notices"],
    features: [
      {
        title: "Employee data with a complete trail",
        text: "New hires, changes, departures, payslips, and employer obligations are coordinated in one place.",
      },
      {
        title: "Fewer last-minute payroll loops",
        text: "KRS agents flag missing employee data and route the next question before payroll deadlines tighten.",
      },
      {
        title: "Expert review for sensitive moments",
        text: "Payroll specialists stay close to contracts, adjustments, and compliance-sensitive employee events.",
      },
    ],
  },
  {
    value: "filings",
    label: "Statements & Returns",
    eyebrow: "Annual certainty",
    title: "Financial statements and tax returns with a visible runway.",
    cta: "Plan statements and returns",
    icon: FileClock,
    stat: "0",
    statLabel: "untracked statutory deadlines",
    routing: ["Annual statements", "Income tax return", "Submission pack"],
    features: [
      {
        title: "Deadline logic made explicit",
        text: "Annual obligations are tracked with document status, review ownership, and submission readiness.",
      },
      {
        title: "A clean handoff into advisory",
        text: "Statements and returns surface planning topics instead of burying them in PDFs at the end.",
      },
      {
        title: "KRS prepares, professionals approve",
        text: "Reserved accounting and tax work remains with licensed professionals while AI improves preparation speed.",
      },
    ],
  },
];

const serviceVisuals: Record<string, { src: string; alt: string }> = {
  advisory: {
    src: "/images/krs-tax-advisory-balanced.jpg",
    alt: "A client VAT question with a clear recommendation from a KRS tax advisor",
  },
  accounting: {
    src: "/images/krs-accounting-vignette.jpg",
    alt: "A monthly accounting close reviewed by a KRS accountant",
  },
  payroll: {
    src: "/images/krs-payroll-vignette.jpg",
    alt: "An employee change included in a KRS-reviewed payroll run",
  },
  filings: {
    src: "/images/krs-statements-vignette.jpg",
    alt: "Financial statements and an income tax return ready for signature",
  },
};

function ServiceOperatingPanel({ service }: { service: ServiceTab }) {
  const visual = serviceVisuals[service.value] ?? serviceVisuals.advisory;

  return (
    <div className="relative min-h-full overflow-hidden bg-[#fdf8f0]">
      <div className="relative h-full min-h-[520px] w-full overflow-hidden bg-[#fdf8f0]">
        <Image
          alt={visual.alt}
          className="object-cover object-center"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          src={visual.src}
        />
      </div>
    </div>
  );
}

export function ServicesTabs() {
  const [activeTab, setActiveTab] = useState(serviceTabs[0]?.value ?? "");
  const [autoRotate, setAutoRotate] = useState(true);

  const handleTabChange = useCallback((value: string) => {
    setAutoRotate(false);
    setActiveTab(value);
  }, []);

  useEffect(() => {
    if (!autoRotate || serviceTabs.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = serviceTabs.findIndex((service) => service.value === current);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % serviceTabs.length;
        return serviceTabs[nextIndex]?.value ?? current;
      });
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(interval);
  }, [autoRotate]);

  return (
    <Tabs className="mt-14" onValueChange={handleTabChange} value={activeTab}>
      <TabsList
        className="grid h-auto w-full grid-cols-1 gap-px rounded-none border border-primary/15 bg-primary/15 p-0 group-data-horizontal/tabs:h-auto sm:grid-cols-2 lg:grid-cols-4"
        variant="default"
      >
        {serviceTabs.map((service, index) => (
          <TabsTrigger
            className={cn(
              "h-auto min-h-20 justify-start rounded-none bg-background px-4 py-4 text-left text-sm font-semibold leading-tight text-foreground/70 whitespace-normal transition",
              "hover:bg-card hover:text-foreground",
              "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-active:bg-primary data-active:text-primary-foreground"
            )}
            key={service.value}
            value={service.value}
          >
            <span className="mr-3 font-mono text-xs text-secondary">0{index + 1}</span>
            {service.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {serviceTabs.map((service) => (
        <TabsContent
          className="mt-6 animate-in fade-in-50 duration-300 data-[state=inactive]:hidden"
          key={service.value}
          value={service.value}
        >
          <div className="grid overflow-hidden border border-primary/15 bg-card shadow-[var(--shadow-lg)] lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
            <ServiceOperatingPanel service={service} />
            <div className="grid content-between gap-5 p-5 sm:p-6 lg:p-7">
              <div className="grid gap-px border border-primary/12 bg-primary/12">
                {service.features.map((feature, index) => (
                  <div className="bg-card p-4" key={feature.title}>
                    <div className="flex gap-3">
                      <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                        <Check className="size-4" />
                      </span>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">0{index + 1}</p>
                        <h4 className="mt-1.5 text-lg font-semibold leading-tight">{feature.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="max-w-md text-xs leading-6 text-muted-foreground">
                The technical platform is operated by KRS AI Services. Reserved tasks are performed by licensed
                accounting and tax professionals within the KRS network.
              </p>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
