"use client";

import { useCallback, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  FileClock,
  Landmark,
  ReceiptText,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

function ServiceOperatingPanel({ service }: { service: ServiceTab }) {
  const Icon = service.icon;

  return (
    <div className="relative min-h-full overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute left-0 top-1/2 h-px w-full bg-primary-foreground/14" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-primary-foreground/14" />
      <div className="relative grid min-h-[520px] grid-rows-[auto_1fr_auto] gap-6 p-6 sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="mono-label text-secondary">{service.eyebrow}</p>
            <p className="font-heading mt-5 max-w-xl text-balance text-3xl font-medium leading-[1.04] sm:text-4xl">
              {service.title}
            </p>
          </div>
          <span className="flex size-12 shrink-0 items-center justify-center border border-primary-foreground/20 bg-primary-foreground/8">
            <Icon className="size-6 text-secondary" />
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-[0.82fr_1.18fr]">
          <div className="gradient-shell">
            <div className="flex h-full min-h-64 flex-col justify-between bg-tertiary p-5 text-tertiary-foreground">
              <div>
                <p className="mono-label text-primary-foreground/56">Operating metric</p>
                <p className="font-heading mt-5 text-7xl font-medium leading-none text-secondary">{service.stat}</p>
                <p className="mt-3 max-w-44 text-sm leading-6 text-primary-foreground/68">{service.statLabel}</p>
              </div>
              <div className="mt-8 grid grid-cols-4 items-end gap-2">
                {[44, 72, 58, 92, 66, 84, 76, 96].map((height, index) => (
                  <span
                    className={cn(
                      "block bg-primary-foreground/28",
                      index === 3 || index === 7 ? "bg-secondary" : ""
                    )}
                    key={`${service.value}-${height}-${index}`}
                    style={{ height }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="bg-card p-5 text-foreground">
              <div className="flex items-center justify-between gap-4">
                <p className="mono-label text-muted-foreground">Routing map</p>
                <Badge className="border-primary/15 bg-transparent text-foreground" variant="outline">
                  advisor reviewed
                </Badge>
              </div>
              <div className="mt-5 grid gap-3">
                {service.routing.map((item, index) => (
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-border pt-3" key={item}>
                    <span className="font-mono text-xs text-secondary">0{index + 1}</span>
                    <span className="text-sm font-semibold">{item}</span>
                    <BadgeCheck className="size-4 text-secondary" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "AADE", icon: Landmark },
                { label: "myDATA", icon: Building2 },
              ].map((item) => {
                const ItemIcon = item.icon;

                return (
                  <div className="flex min-h-28 flex-col justify-between bg-primary-foreground/8 p-4" key={item.label}>
                    <ItemIcon className="size-5 text-secondary" />
                    <p className="mono-label text-primary-foreground/72">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Button
          asChild
          className="h-12 w-fit rounded-full bg-primary-foreground px-5 text-primary hover:bg-primary-foreground/90"
          variant="secondary"
        >
          <a href="#contact">
            {service.cta}
            <ArrowRight className="size-4" />
          </a>
        </Button>
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
          <div className="grid overflow-hidden border border-primary/15 bg-card shadow-[var(--shadow-lg)] lg:grid-cols-[1.08fr_0.92fr]">
            <ServiceOperatingPanel service={service} />
            <div className="grid content-between gap-8 p-6 sm:p-8 lg:p-10">
              <div className="grid gap-px border border-primary/12 bg-primary/12">
                {service.features.map((feature, index) => (
                  <div className="bg-card p-5" key={feature.title}>
                    <div className="flex gap-4">
                      <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                        <Check className="size-4" />
                      </span>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">0{index + 1}</p>
                        <h4 className="mt-2 text-xl font-semibold leading-tight">{feature.title}</h4>
                        <p className="mt-3 leading-7 text-muted-foreground">{feature.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="max-w-xl text-sm leading-7 text-muted-foreground">
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
