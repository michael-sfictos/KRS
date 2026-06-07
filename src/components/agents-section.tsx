"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  FileCheck2,
  Landmark,
  MessageSquareText,
  PanelsTopLeft,
  ReceiptText,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { createRef, forwardRef, type RefObject, useMemo, useRef } from "react";

import { AnimatedBeam } from "@/components/animated-beam";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ConnectionNode = {
  name: string;
  description: string;
  status: string;
  icon: LucideIcon;
  logoSrc?: string;
};

const governmentConnections: ConnectionNode[] = [
  {
    name: "AADE",
    description: "VAT, myDATA, tax certificates, company obligations.",
    status: "Tax authority",
    icon: Landmark,
    logoSrc: "/logos/authorities/aade.png",
  },
  {
    name: "EFKA",
    description: "Employer insurance contributions and payroll obligations.",
    status: "Social security",
    icon: ShieldCheck,
    logoSrc: "/logos/authorities/efka.png",
  },
  {
    name: "Taxisnet",
    description: "Declarations, authorisations, and tax account access.",
    status: "Identity gateway",
    icon: FileCheck2,
    logoSrc: "/logos/authorities/taxisnet.png",
  },
  {
    name: "ERGANI",
    description: "Hiring, payroll notices, and labour compliance flows.",
    status: "Labour filings",
    icon: Workflow,
    logoSrc: "/logos/authorities/ergani.png",
  },
  {
    name: "gov.gr",
    description: "Certificates, statements, and public-service documents.",
    status: "Public services",
    icon: BadgeCheck,
    logoSrc: "/logos/authorities/govgr.png",
  },
  {
    name: "myDATA",
    description: "Document matching, e-books, and reporting continuity.",
    status: "Digital books",
    icon: ReceiptText,
    logoSrc: "/logos/authorities/mydata.png",
  },
];

const clientCompanyConnections: ConnectionNode[] = [
  {
    name: "Company file",
    description: "Entity data, ownership, authorisations, and recurring obligations.",
    status: "Business source",
    icon: PanelsTopLeft,
  },
  {
    name: "Invoices & receipts",
    description: "Sales, expenses, attachments, and evidence needed for review.",
    status: "Document flow",
    icon: ReceiptText,
  },
  {
    name: "Payroll changes",
    description: "Hires, departures, salary updates, and employee records.",
    status: "People data",
    icon: Workflow,
  },
  {
    name: "Advisor questions",
    description: "Owner decisions, tax questions, and exceptions that need judgment.",
    status: "Human review",
    icon: MessageSquareText,
  },
];

const agentCapabilities = [
  {
    label: "Prepare context",
    text: "Collect documents, authorisations, deadlines, and open questions before review starts.",
  },
  {
    label: "Route workflow",
    text: "Match the task to the right authority path, service line, and KRS professional.",
  },
  {
    label: "Escalate exceptions",
    text: "Flag missing evidence, deadline pressure, and decisions that need licensed judgment.",
  },
];

export function AgentsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const connectionCardRef = useRef<HTMLDivElement>(null);
  const authorityRefs = useMemo(() => governmentConnections.map(() => createRef<HTMLSpanElement>()), []);
  const companyRefs = useMemo(() => clientCompanyConnections.map(() => createRef<HTMLSpanElement>()), []);

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-24 text-primary-foreground sm:px-6 lg:px-12" id="agents">
      <div className="grain-overlay absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="absolute left-1/2 top-28 h-72 w-[56rem] -translate-x-1/2 bg-secondary/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-8">
        <div className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr] lg:items-end">
          <div>
            <p className="mono-label text-secondary">KRS AI Agents</p>
            <h2 className="mt-5 max-w-4xl text-balance text-5xl font-normal leading-[0.95] sm:text-6xl lg:text-7xl">
              KRS AI sits between your company and every Greek compliance workflow.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-primary-foreground/68">
            Agents turn scattered business evidence into authority-ready work packages, with licensed KRS professionals
            handling the judgment calls.
          </p>
        </div>

        <div
          className="relative grid gap-4 lg:grid-cols-[minmax(220px,360px)_minmax(320px,500px)_minmax(220px,360px)] lg:items-center lg:justify-center lg:gap-[clamp(3rem,6vw,5.625rem)]"
          ref={containerRef}
        >
          <AgentConnectionColumn
            items={governmentConnections}
            pointRefs={authorityRefs}
            side="left"
            title="Relevant authorities"
          />

          <div className="relative z-20 order-first lg:order-none" ref={connectionCardRef}>
            <div className="gradient-shell shadow-[var(--shadow-xl)]">
              <div className="relative overflow-hidden bg-card p-5 text-primary sm:p-7">
                <div className="absolute inset-x-0 top-0 h-px bg-secondary/60" aria-hidden="true" />
                <div className="relative grid min-h-[560px] content-between gap-8">
                  <div>
                    <div className="flex items-center justify-between gap-6">
                      <p className="mono-label text-muted-foreground">Connection layer</p>
                      <Badge className="h-7 rounded-full bg-primary px-3 text-primary-foreground">
                        Advisor reviewed
                      </Badge>
                    </div>
                    <h3 className="mt-4 max-w-md text-balance text-4xl font-normal leading-[1] sm:text-5xl">
                      One operating file. Many authority paths.
                    </h3>
                  </div>

                  <div className="grid gap-5">
                    <div
                      className="mx-auto flex size-44 items-center justify-center rounded-full border border-secondary/40 bg-primary p-8 shadow-[inset_0_1px_0_rgba(244,239,230,0.18)]"
                    >
                      <Image
                        alt="KRS AI"
                        className="h-auto w-full"
                        height={220}
                        src="/logos/Logo.svg"
                        unoptimized
                        width={220}
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-heading text-4xl font-medium leading-none text-primary">KRS AI</p>
                      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                        Context, routing, and exception handling for Greek accounting, payroll, and tax work.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-px border border-primary/12 bg-primary/12 sm:grid-cols-3">
                    {agentCapabilities.map((capability) => (
                      <div className="bg-card p-4" key={capability.label}>
                        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-secondary">
                          {capability.label}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{capability.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AgentConnectionColumn
            items={clientCompanyConnections}
            pointRefs={companyRefs}
            side="right"
            title="Client company"
          />

          {authorityRefs.map((ref, index) => (
            <AnimatedBeam
              className="z-10 hidden lg:block"
              containerRef={containerRef}
              curvature={(index - (authorityRefs.length - 1) / 2) * 22}
              delay={index * 1.15}
              duration={13}
              fromRef={ref}
              gradientStartColor="#ae882f"
              gradientStopColor="#f4efe6"
              highlightOpacity={1}
              key={`authority-beam-${index}`}
              pathColor="rgba(244, 239, 230, 0.68)"
              pathOpacity={0.54}
              pathWidth={1.15}
              toRef={connectionCardRef}
            />
          ))}
          {companyRefs.map((ref, index) => (
            <AnimatedBeam
              className="z-10 hidden lg:block"
              containerRef={containerRef}
              curvature={(index - (companyRefs.length - 1) / 2) * 24}
              delay={(index + 6) * 1.15}
              duration={13}
              fromRef={ref}
              gradientStartColor="#ae882f"
              gradientStopColor="#f4efe6"
              highlightOpacity={1}
              key={`company-beam-${index}`}
              pathColor="rgba(244, 239, 230, 0.68)"
              pathOpacity={0.54}
              pathWidth={1.15}
              toRef={connectionCardRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentConnectionColumn({
  items,
  pointRefs,
  side,
  title,
}: {
  items: ConnectionNode[];
  pointRefs: RefObject<HTMLSpanElement | null>[];
  side: "left" | "right";
  title: string;
}) {
  return (
    <div className={cn("relative z-20 grid gap-3", side === "left" ? "lg:text-right" : "")}>
      <p className={cn("mono-label text-primary-foreground/56", side === "left" ? "lg:mr-1" : "lg:ml-1")}>{title}</p>
      <div className="relative grid gap-3">
        {items.map((item, index) => (
          <AgentConnectionCard item={item} key={item.name} ref={pointRefs[index]} side={side} />
        ))}
      </div>
    </div>
  );
}

const AgentConnectionCard = forwardRef<HTMLSpanElement, { item: ConnectionNode; side: "left" | "right" }>(
  ({ item, side }, ref) => {
    const Icon = item.icon;

    return (
      <div
        className={cn(
          "group relative border border-primary-foreground/12 bg-primary-foreground/[0.055] p-4 transition duration-200 hover:border-secondary/50 hover:bg-primary-foreground/[0.085]",
          side === "left" ? "lg:pl-5 lg:pr-4" : "lg:pl-4 lg:pr-5"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 hidden size-1 -translate-y-1/2 rounded-full bg-secondary lg:block",
            side === "left" ? "-right-0.5" : "-left-0.5"
          )}
          ref={ref}
        />
        <div
          className={cn(
            "grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start",
            side === "left" ? "lg:grid-cols-[1fr_auto]" : ""
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center border border-primary-foreground/14 bg-primary-foreground/8",
              item.logoSrc ? "size-14 bg-primary-foreground p-0" : "size-11",
              side === "left" ? "lg:order-2" : ""
            )}
          >
            {item.logoSrc ? (
              <Image
                alt=""
                className="max-h-full w-full object-contain"
                height={64}
                src={item.logoSrc}
                unoptimized
                width={64}
              />
            ) : (
              <Icon className="size-5 text-secondary" strokeWidth={1.75} />
            )}
          </span>
          <div>
            <div className={cn("flex flex-wrap items-center gap-2", side === "left" ? "lg:justify-end" : "")}>
              <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
              <Badge className="rounded-full border-primary-foreground/12 bg-primary-foreground/8 text-primary-foreground" variant="outline">
                {item.status}
              </Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-primary-foreground/62">{item.description}</p>
          </div>
        </div>
      </div>
    );
  }
);

AgentConnectionCard.displayName = "AgentConnectionCard";
