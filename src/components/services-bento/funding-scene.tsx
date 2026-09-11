"use client";

import { motion } from "motion/react";

import { sceneTransition, type ServiceSceneProps } from "@/components/services-bento/scene-motion";
import {
  SceneFrame,
  SceneHeader,
  UiBadge,
  UiCheckbox,
} from "@/components/services-bento/scene-ui";
import { cn } from "@/lib/utils";

const programmes = [
  { name: "Digital SME", body: "Equipment and software", fit: true },
  { name: "Green transition", body: "Facility upgrade", fit: false },
];

const checks = ["Eligibility", "Budget", "Narrative"];

export function FundingScene({ active, reducedMotion }: ServiceSceneProps) {
  const complete = reducedMotion || active;

  return (
    <SceneFrame>
      <SceneHeader subtitle="Programmes" title="Open routes">
        <UiBadge variant={complete ? "secondary" : "outline"}>
          {complete ? "1 fit" : "2 open"}
        </UiBadge>
      </SceneHeader>

      <div className="min-h-0 flex-1 divide-y divide-border">
        {programmes.map((programme, index) => {
          const highlight = complete && programme.fit;

          return (
            <motion.div
              animate={{
                opacity: complete && !programme.fit ? 0.5 : 1,
                y: 0,
              }}
              className="flex items-center justify-between gap-3 px-3 py-2.5"
              initial={false}
              key={programme.name}
              transition={sceneTransition(reducedMotion, 0.1 + index * 0.12, active)}
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium leading-4">{programme.name}</p>
                <p className="text-[11px] text-muted-foreground">{programme.body}</p>
              </div>
              <UiBadge variant={highlight ? "secondary" : "outline"}>
                {programme.fit ? "Fit" : "Watch"}
              </UiBadge>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-1.5 border-t border-border bg-muted/50 px-3 py-2.5">
        {checks.map((item, index) => {
          const ticked = complete ? index < 2 : index === 0;

          return (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
              initial={false}
              key={item}
              transition={sceneTransition(reducedMotion, 0.48 + index * 0.1, active)}
            >
              <UiCheckbox
                active={active}
                checked={ticked}
                delay={0.62 + index * 0.08}
                reducedMotion={reducedMotion}
              />
              <span className={cn("text-[12px]", ticked ? "text-foreground" : "text-muted-foreground")}>
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>
    </SceneFrame>
  );
}
