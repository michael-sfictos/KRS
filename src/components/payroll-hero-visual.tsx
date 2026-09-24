"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { sceneTransition } from "@/components/services-bento/scene-motion";
import { SceneFrame, SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";

const lines = [
  { label: "April payroll", value: "In review", ready: true },
  { label: "ERGANI hire", value: "Filed", ready: true },
  { label: "APD", value: "This month", ready: false },
];

export function PayrollHeroVisual() {
  const reduce = Boolean(useReducedMotion());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduce) {
      setReady(true);
      return;
    }
    const timer = window.setTimeout(() => setReady(true), 280);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <SceneFrame className="h-full bg-background/80 p-1.5 shadow-[var(--shadow-lg)]">
      <SceneHeader subtitle="Pay calendar" title="Next run">
        <UiBadge variant={ready ? "secondary" : "outline"}>{ready ? "Watched" : "Loading"}</UiBadge>
      </SceneHeader>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5 p-3">
        {lines.map((line, index) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between gap-3 rounded-[var(--radius-lg)] px-2 py-1.5"
            initial={reduce ? false : { opacity: 0, x: 12 }}
            key={line.label}
            transition={sceneTransition(reduce, 0.08 + index * 0.1, ready)}
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={
                  ready && line.ready ? "size-1.5 rounded-full bg-secondary" : "size-1.5 rounded-full bg-muted-foreground/35"
                }
              />
              <p className="truncate text-[12px] font-medium">{line.label}</p>
            </div>
            <p className="text-[12px] text-muted-foreground">{line.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="border-t border-border px-3 py-2">
        <p className="text-[11px] text-muted-foreground">{ready ? "Payday has an owner" : "Checking the open run"}</p>
      </div>
    </SceneFrame>
  );
}
