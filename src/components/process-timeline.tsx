"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, CalendarClock, FileCheck2, MessageSquareText } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  time: string;
  title: string;
  text: string;
  cta: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

const timelineIcons = [BadgeCheck, CalendarClock, FileCheck2, MessageSquareText];

function TimelineDot({ active, index }: { active: boolean; index: number }) {
  return (
    <div className="relative flex size-12 items-center justify-center">
      <span
        className={cn(
          "absolute size-12 rounded-full border transition-colors duration-500",
          active ? "border-secondary bg-secondary/16" : "border-primary-foreground/20 bg-primary-foreground/6"
        )}
      />
      <span
        className={cn(
          "relative flex size-7 items-center justify-center rounded-full font-mono text-[0.65rem] transition-all duration-500",
          active ? "scale-100 bg-secondary text-secondary-foreground" : "scale-90 bg-primary-foreground/18 text-primary-foreground/62"
        )}
      >
        0{index + 1}
      </span>
    </div>
  );
}

function TimelineCard({
  step,
  active,
  index,
}: {
  step: ProcessStep;
  active: boolean;
  index: number;
}) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.58, y: active ? 0 : 10 }}
      className="w-full max-w-md lg:ml-auto lg:text-right"
      initial={false}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div
        className={cn(
          "w-full border border-primary-foreground/14 bg-primary-foreground/8 p-6 text-primary-foreground shadow-[var(--shadow-sm)] backdrop-blur transition-colors duration-500 sm:p-7",
          active && "border-secondary/50 bg-primary-foreground/12"
        )}
      >
        <div className="flex items-center justify-between gap-4 lg:flex-row-reverse">
          <Badge
            className={cn(
              "rounded-full border-transparent",
              active ? "bg-secondary text-secondary-foreground" : "bg-primary-foreground/12 text-primary-foreground/72"
            )}
            variant="secondary"
          >
            {step.time}
          </Badge>
          <span className="font-mono text-xs text-primary-foreground/38">T+0{index}</span>
        </div>
        <h3 className="mt-6 text-2xl font-semibold leading-tight">{step.title}</h3>
        <p className="mt-4 leading-7 text-primary-foreground/72">{step.text}</p>
        <a
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground transition-colors hover:text-secondary lg:justify-end"
          href="#contact"
        >
          {step.cta}
          <ArrowRight className="size-4" />
        </a>
      </div>
    </motion.div>
  );
}

function TimelineProofPanel({
  active,
  step,
  index,
}: {
  active: boolean;
  step: ProcessStep;
  index: number;
}) {
  const Icon = timelineIcons[index % timelineIcons.length] ?? BadgeCheck;
  const bars = [
    [42, 66, 82],
    [58, 76, 64],
    [48, 72, 90],
    [70, 54, 84],
  ][index] ?? [48, 72, 90];

  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.58, y: active ? 0 : 10 }}
      className="w-full max-w-md"
      initial={false}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div
        className={cn(
          "gradient-shell shadow-[var(--shadow-sm)] transition-opacity duration-500",
          active ? "opacity-100" : "opacity-70"
        )}
      >
        <div className="relative min-h-72 overflow-hidden bg-primary p-6 text-primary-foreground">
          <div className="relative flex items-start justify-between">
            <div>
              <p className="mono-label text-primary-foreground/48">Workflow evidence</p>
              <p className="font-heading mt-3 max-w-52 text-balance text-2xl font-medium leading-tight">{step.title}</p>
            </div>
            <span className="flex size-12 items-center justify-center border border-primary-foreground/18 bg-primary-foreground/8">
              <Icon className="size-6 text-secondary" />
            </span>
          </div>

          <div className="relative mt-12 grid grid-cols-[0.7fr_1.3fr] gap-5">
            <div className="space-y-3">
              {[0, 1, 2].map((item) => (
                <div className="h-9 border border-primary-foreground/14 bg-primary-foreground/7" key={item}>
                  <div
                    className={cn("h-full bg-secondary/76", item === 1 ? "w-2/3" : item === 2 ? "w-5/6" : "w-1/2")}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-end gap-3 border-l border-primary-foreground/14 pl-5">
              {bars.map((height, item) => (
                <div className="flex flex-1 flex-col items-center gap-3" key={`${height}-${item}`}>
                  <span className={cn("w-full bg-primary-foreground/24", item === 1 && "bg-secondary")} style={{ height }} />
                  <span className="h-1 w-full bg-primary-foreground/18" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 flex items-center justify-between border-t border-primary-foreground/14 pt-4">
            <p className="font-mono text-xs text-primary-foreground/52">Reviewed by KRS</p>
            <span className={cn("size-2 rounded-full", active ? "bg-secondary" : "bg-primary-foreground/34")} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const handleVisible = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="relative mt-16" ref={containerRef}>
      <div className="absolute bottom-0 left-6 top-0 w-px bg-primary-foreground/18 lg:left-1/2 lg:-translate-x-1/2" />
      <motion.div
        className="absolute left-6 top-0 w-px origin-top bg-secondary lg:left-1/2 lg:-translate-x-1/2"
        style={{ height: progressHeight }}
      />

      <div className="space-y-10 lg:space-y-0">
        {steps.map((step, index) => (
          <TimelineRow
            active={activeIndex === index}
            index={index}
            key={step.title}
            onVisible={handleVisible}
            step={step}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({
  step,
  index,
  active,
  onVisible,
}: {
  step: ProcessStep;
  index: number;
  active: boolean;
  onVisible: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(index);
        }
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index, onVisible]);

  return (
    <div
      className={cn(
        "relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-0 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-10 lg:py-16",
        index === 0 && "lg:pt-0"
      )}
      ref={ref}
    >
      <div className="relative z-10 flex justify-center lg:col-start-2 lg:row-start-1">
        <TimelineDot active={active} index={index} />
      </div>

      <div className="col-start-2 min-w-0 lg:col-start-1 lg:row-start-1 lg:justify-self-end">
        <TimelineCard active={active} index={index} step={step} />
      </div>

      <div className="col-start-2 mt-4 w-full min-w-0 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:justify-self-start">
        <TimelineProofPanel active={active} index={index} step={step} />
      </div>
    </div>
  );
}
