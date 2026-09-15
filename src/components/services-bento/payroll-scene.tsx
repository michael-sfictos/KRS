"use client";

import { motion } from "motion/react";

import { sceneTransition, type ServiceSceneProps } from "@/components/services-bento/scene-motion";
import {
  SceneFrame,
  SceneHeader,
  UiAvatar,
  UiBadge,
} from "@/components/services-bento/scene-ui";

const employees = [
  { initials: "MN", name: "Maria N.", role: "Accountant", ready: true },
  { initials: "NP", name: "Nikos P.", role: "New hire", ready: false },
];

export function PayrollScene({ active, reducedMotion }: ServiceSceneProps) {
  const complete = reducedMotion || active;

  return (
    <SceneFrame>
      <SceneHeader subtitle="Run" title="28 March">
        <UiBadge variant={complete ? "secondary" : "outline"}>
          {complete ? "Ready" : "2 open"}
        </UiBadge>
      </SceneHeader>

      <div className="min-h-0 flex-1 divide-y divide-border">
        {employees.map((employee, index) => {
          const ready = reducedMotion || active || employee.ready;

          return (
            <motion.div
              animate={{
                opacity: ready || index === 0 ? 1 : 0.5,
                y: ready || index === 0 ? 0 : 10,
              }}
              className="flex items-center justify-between gap-3 px-3 py-2.5"
              initial={false}
              key={employee.name}
              transition={sceneTransition(reducedMotion, 0.1 + index * 0.16, active)}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <UiAvatar initials={employee.initials} />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium leading-4">{employee.name}</p>
                  <p className="text-[11px] text-muted-foreground">{employee.role}</p>
                </div>
              </div>
              <UiBadge demoSpot={index === 1 ? 1 : undefined} variant={ready ? "default" : "outline"}>
                {ready ? "Ready" : "Pending"}
              </UiBadge>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
        {["EFKA", "ERGANI"].map((item, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-card px-3 py-2"
            initial={false}
            key={item}
            transition={sceneTransition(reducedMotion, 0.48 + index * 0.1, active)}
          >
            <span className="text-[11px] text-muted-foreground">{item}</span>
            <UiBadge demoSpot={index === 0 ? 2 : 3} variant={complete ? "secondary" : "outline"}>
              {complete ? "Filed" : "Queued"}
            </UiBadge>
          </motion.div>
        ))}
      </div>
    </SceneFrame>
  );
}
