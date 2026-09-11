"use client";

import { motion } from "motion/react";

import { sceneTransition, type ServiceSceneProps } from "@/components/services-bento/scene-motion";
import { SceneFrame, SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";

const metrics = [
  { label: "Hire", value: "+1 advisor", hint: "Q2 plan" },
  { label: "Cash", value: "€18k / mo", hint: "April view" },
];

export function ConsultingScene({ active, reducedMotion }: ServiceSceneProps) {
  const complete = reducedMotion || active;

  return (
    <SceneFrame>
      <SceneHeader subtitle="Board" title="Q2 capacity">
        <UiBadge variant={complete ? "secondary" : "outline"}>
          {complete ? "Next action" : "Draft"}
        </UiBadge>
      </SceneHeader>

      <div className="grid grid-cols-2 gap-2 p-3">
        {metrics.map((item, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[var(--radius-lg)] border border-border bg-card px-3 py-2 shadow-xs"
            initial={false}
            key={item.label}
            transition={sceneTransition(reducedMotion, 0.06 + index * 0.08, active)}
          >
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-sm font-medium">{item.value}</p>
            <p className="text-[10px] text-muted-foreground">{item.hint}</p>
          </motion.div>
        ))}
      </div>

      <div className="px-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground">Forecast</p>
          <p className="text-[13px] font-medium tabular-nums">{complete ? "82%" : "41%"}</p>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            animate={{ scaleX: complete ? 0.82 : 0.41 }}
            className="h-full origin-left rounded-full bg-secondary"
            initial={false}
            transition={sceneTransition(reducedMotion, 0.28, active)}
          />
        </div>
      </div>

      <motion.div
        animate={{
          opacity: complete ? 1 : 0.45,
          y: complete ? 0 : 8,
        }}
        className="mx-3 mb-3 mt-3 rounded-[var(--radius-lg)] border border-border bg-muted/80 px-3 py-2"
        initial={false}
        transition={sceneTransition(reducedMotion, 0.62, active)}
      >
        <p className="text-[10px] text-muted-foreground">Next action</p>
        <p className="mt-1 text-[13px] font-medium leading-5">
          Confirm the hire against the April cash view.
        </p>
      </motion.div>
    </SceneFrame>
  );
}
