"use client";

import Image from "next/image";
import {
  FileCheck2,
  Landmark,
  MessageSquareText,
  ReceiptText,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { createRef, useMemo, useRef, type RefObject } from "react";

import { AnimatedBeam } from "@/components/animated-beam";
import { Reveal, RevealFade } from "@/components/reveal";
import { cn } from "@/lib/utils";

type Connection = {
  id: string;
  title: string;
  text: string;
  icon: typeof Landmark;
};

const rails: Connection[] = [
  {
    id: "tax",
    title: "AADE and myDATA",
    text: "VAT, certificates, and digital books stay on the same file your advisor reviews.",
    icon: Landmark,
  },
  {
    id: "payroll",
    title: "Payroll and EFKA",
    text: "Hires, contributions, and ERGANI notices stay attached to the employee record.",
    icon: FileCheck2,
  },
];

const company: Connection[] = [
  {
    id: "invoices",
    title: "Invoices and evidence",
    text: "Sales, expenses, and attachments land in one queue before the month closes.",
    icon: ReceiptText,
  },
  {
    id: "advice",
    title: "Advisor questions",
    text: "Decisions come back to a person, with the file already prepared.",
    icon: MessageSquareText,
  },
];

const filePrinciples = [
  {
    label: "People lead",
    text: "Advisors make the calls that need judgment.",
  },
  {
    label: "AI prepares",
    text: "Evidence and deadlines are ready before review.",
  },
  {
    label: "Work stays visible",
    text: "Every task has an owner and a path back.",
  },
];

const reelEase = [0.16, 1, 0.3, 1] as const;

export function AgentsSection() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const railRefs = useMemo(() => rails.map(() => createRef<HTMLSpanElement>()), []);
  const companyRefs = useMemo(() => company.map(() => createRef<HTMLSpanElement>()), []);

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-24 text-primary-foreground sm:px-6 lg:px-12" id="agents">
      <div className="grain-overlay absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="absolute left-1/2 top-24 h-72 w-[56rem] -translate-x-1/2 bg-secondary/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-16">
        <div className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr] lg:items-end">
          <div>
            <p className="mono-label text-secondary">The operating file</p>
            <h2 className="type-h3 mt-5 max-w-4xl text-balance">
              <Reveal>One system. Connected to everything.</Reveal>
            </h2>
          </div>
          <RevealFade className="max-w-xl text-lg leading-8 text-primary-foreground/68" delay={0.1}>
            Accounting, tax, payroll, and advice share one reviewed file. KRS advisors stay in charge. KRS AI prepares
            the evidence before the next call.
          </RevealFade>
        </div>

        <div
          className="relative grid gap-4 lg:grid-cols-[minmax(220px,340px)_minmax(300px,460px)_minmax(220px,340px)] lg:items-center lg:justify-center lg:gap-[clamp(2.5rem,5vw,4.5rem)]"
          ref={containerRef}
        >
          <ConnectionColumn items={rails} pointRefs={railRefs} side="left" title="Greek rails" />

          <div className="relative z-20 order-first lg:order-none" ref={hubRef}>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.12, ease: reelEase }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            >
              <div className="gradient-shell shadow-[var(--shadow-xl)]">
                <div className="relative overflow-hidden bg-card p-5 text-primary sm:p-7">
                  <div className="absolute inset-x-0 top-0 h-px bg-secondary/60" aria-hidden="true" />
                  <p className="mono-label text-muted-foreground">Operating file</p>
                  <h3 className="mt-4 max-w-md text-balance text-3xl font-normal leading-[1.1] sm:text-4xl">
                    The file that keeps the work connected.
                  </h3>

                  <div className="mx-auto mt-8 flex w-full max-w-sm items-center justify-center -space-x-8">
                    <div className="relative z-20 flex size-32 overflow-hidden rounded-full border border-secondary/45 bg-primary shadow-[0_18px_40px_rgba(0,30,61,0.22)] sm:size-36">
                      <Image
                        alt="KRS accountant advisor"
                        className="object-cover"
                        fill
                        sizes="9rem"
                        src="/images/krs-accountant-advisor.png"
                      />
                      <span className="absolute inset-0 bg-primary/10 mix-blend-multiply" aria-hidden="true" />
                    </div>
                    <div className="relative z-10 flex size-32 items-center justify-center rounded-full border border-secondary/40 bg-primary p-7 sm:size-36">
                      <Image alt="KRS AI" className="h-auto w-full" height={180} src="/logos/Logo.svg" unoptimized width={180} />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-px border border-primary/12 bg-primary/12">
                    {filePrinciples.map((item) => (
                      <div className="grid gap-1 bg-card px-4 py-3 sm:grid-cols-[9.5rem_1fr] sm:items-baseline" key={item.label}>
                        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-secondary">
                          {item.label}
                        </p>
                        <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <ConnectionColumn items={company} pointRefs={companyRefs} side="right" title="Client company" />

          {reduce
            ? null
            : railRefs.map((ref, index) => (
                <AnimatedBeam
                  className="z-10 hidden lg:block"
                  containerRef={containerRef}
                  curvature={(index - (railRefs.length - 1) / 2) * 28}
                  delay={index * 1.2}
                  duration={12}
                  fromRef={ref}
                  gradientStartColor="#ae882f"
                  gradientStopColor="#f4efe6"
                  highlightOpacity={1}
                  key={`rail-beam-${rails[index].id}`}
                  pathColor="rgba(244, 239, 230, 0.68)"
                  pathOpacity={0.54}
                  pathWidth={1.15}
                  toRef={hubRef}
                />
              ))}
          {reduce
            ? null
            : companyRefs.map((ref, index) => (
                <AnimatedBeam
                  className="z-10 hidden lg:block"
                  containerRef={containerRef}
                  curvature={(index - (companyRefs.length - 1) / 2) * 28}
                  delay={(index + rails.length) * 1.2}
                  duration={12}
                  fromRef={ref}
                  gradientStartColor="#ae882f"
                  gradientStopColor="#f4efe6"
                  highlightOpacity={1}
                  key={`company-beam-${company[index].id}`}
                  pathColor="rgba(244, 239, 230, 0.68)"
                  pathOpacity={0.54}
                  pathWidth={1.15}
                  toRef={hubRef}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

function ConnectionColumn({
  items,
  pointRefs,
  side,
  title,
}: {
  items: Connection[];
  pointRefs: RefObject<HTMLSpanElement | null>[];
  side: "left" | "right";
  title: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative z-20 grid gap-3", side === "left" ? "lg:text-right" : "")}>
      <p className={cn("mono-label text-primary-foreground/56", side === "left" ? "lg:mr-1" : "lg:ml-1")}>{title}</p>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            key={item.id}
            transition={{
              duration: reduce ? 0 : 0.6,
              delay: reduce ? 0 : 0.16 + index * 0.08,
              ease: reelEase,
            }}
            viewport={{ once: true, amount: 0.4 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          >
            <ConnectionCard item={item} pointRef={pointRefs[index]} side={side} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ConnectionCard({
  item,
  pointRef,
  side,
}: {
  item: Connection;
  pointRef: RefObject<HTMLSpanElement | null>;
  side: "left" | "right";
}) {
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
          "absolute top-1/2 hidden size-1.5 -translate-y-1/2 rounded-full bg-secondary lg:block",
          side === "left" ? "-right-0.5" : "-left-0.5"
        )}
        ref={pointRef}
      />
      <div
        className={cn(
          "grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start",
          side === "left" ? "lg:grid-cols-[1fr_auto]" : ""
        )}
      >
        <span
          className={cn(
            "flex size-11 items-center justify-center border border-primary-foreground/14 bg-primary-foreground/8",
            side === "left" ? "lg:order-2" : ""
          )}
        >
          <Icon className="size-5 text-secondary" strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-primary-foreground/62">{item.text}</p>
        </div>
      </div>
    </div>
  );
}
