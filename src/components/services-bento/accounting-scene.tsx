"use client";

import { motion } from "motion/react";

import { sceneTransition, type ServiceSceneProps } from "@/components/services-bento/scene-motion";
import {
  SceneFrame,
  SceneHeader,
  UiBadge,
  UiButton,
  UiCheckbox,
} from "@/components/services-bento/scene-ui";
import { cn } from "@/lib/utils";

const rows = [
  { vendor: "Alpha Supplies", account: "64.02", amount: "€1,240", confidence: 98, sure: true },
  { vendor: "Cosmote", account: "64.20", amount: "€86", confidence: 94, sure: true },
  { vendor: "Office Depot", account: "20.01", amount: "€450", confidence: 71, sure: false },
  { vendor: "Piraeus fee", account: "65.10", amount: "€12", confidence: 54, sure: false },
];

export function AccountingScene({ active, reducedMotion }: ServiceSceneProps) {
  const ready = reducedMotion || active;
  const approved = ready ? rows.filter((row) => row.sure).length : 0;

  return (
    <SceneFrame>
      <SceneHeader subtitle="Inbox" title="March close">
        <UiBadge variant={ready ? "secondary" : "outline"}>
          {ready ? `${approved} approved` : `${rows.length} queued`}
        </UiBadge>
      </SceneHeader>

      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="hidden grid-cols-[auto_minmax(0,1fr)_4.5rem_4.25rem_2.75rem] gap-2 px-3 py-1.5 text-[10px] text-muted-foreground sm:grid">
          <span className="w-4" />
          <span>Vendor</span>
          <span>Account</span>
          <span className="text-right">Amount</span>
          <span className="text-right">AI</span>
        </div>

        <div className="divide-y divide-border">
          {rows.map((row, index) => {
            const checked = reducedMotion || (active && row.sure) || (!active && index === 0 && row.sure);

            return (
              <motion.div
                animate={{
                  opacity: ready || index < 2 ? 1 : 0.55,
                  y: ready || index < 2 ? 0 : 8,
                }}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 sm:grid-cols-[auto_minmax(0,1fr)_4.5rem_4.25rem_2.75rem] sm:gap-2"
                initial={false}
                key={row.vendor}
                transition={sceneTransition(reducedMotion, 0.08 + index * 0.12, active)}
              >
                <UiCheckbox
                  active={active}
                  checked={checked}
                  delay={0.18 + index * 0.1}
                  demoSpot={row.sure ? index + 1 : undefined}
                  reducedMotion={reducedMotion}
                />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium leading-4">{row.vendor}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground sm:hidden">
                    {row.account} · {row.amount}
                  </p>
                </div>
                <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">
                  {row.account}
                </span>
                <span className="hidden text-right text-[13px] tabular-nums sm:block">{row.amount}</span>
                <UiBadge
                  className={cn(
                    "justify-self-end",
                    row.confidence >= 90
                      ? "border-transparent bg-primary text-primary-foreground"
                      : row.confidence >= 70
                        ? undefined
                        : "text-muted-foreground",
                  )}
                  variant={row.confidence >= 90 ? "default" : "outline"}
                >
                  {row.confidence}%
                </UiBadge>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border bg-muted/60 px-3 py-2">
        <span className="text-[11px] text-muted-foreground">
          {ready ? "Sure matches selected" : "Select sure matches"}
        </span>
        <div className="flex items-center gap-1.5">
          <UiButton variant="outline">Review</UiButton>
          <UiButton demoSpot={3} variant={ready ? "secondary" : "default"}>
            Approve
          </UiButton>
        </div>
      </div>
    </SceneFrame>
  );
}
