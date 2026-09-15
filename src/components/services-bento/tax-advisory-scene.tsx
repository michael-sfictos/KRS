"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { sceneTransition, type ServiceSceneProps } from "@/components/services-bento/scene-motion";
import { SceneFrame, SceneHeader, UiBadge } from "@/components/services-bento/scene-ui";

export function TaxAdvisoryScene({ active, reducedMotion }: ServiceSceneProps) {
  const replied = reducedMotion || active;

  return (
    <SceneFrame>
      <SceneHeader subtitle="Thread" title="VAT position">
        <UiBadge variant={replied ? "secondary" : "outline"}>{replied ? "Reviewed" : "Open"}</UiBadge>
      </SceneHeader>

      <div className="flex min-h-0 flex-1 flex-col justify-start gap-2 overflow-hidden p-3">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[92%] rounded-[var(--radius-xl)] bg-muted px-3 py-2"
          data-demo-spot={1}
          initial={false}
          transition={sceneTransition(reducedMotion, 0.05, active)}
        >
          <p className="text-[10px] text-muted-foreground">You · 09:18</p>
          <p className="mt-1 text-[13px] leading-5">
            Does EU software sold to a Greek SME need local VAT?
          </p>
        </motion.div>

        <motion.div
          animate={{
            opacity: replied ? 1 : 0,
            y: replied ? 0 : 10,
          }}
          className="ml-auto max-w-[94%] rounded-[var(--radius-xl)] border border-border bg-card px-3 py-2 shadow-xs"
          data-demo-spot={2}
          initial={false}
          transition={sceneTransition(reducedMotion, 0.32, active)}
        >
          <div className="flex items-center gap-2">
            <Image
              alt=""
              className="size-5 rounded-full object-cover"
              height={40}
              src="/images/krs-expert-tax-advisor.webp"
              width={40}
            />
            <p className="text-[10px] text-muted-foreground">Alexis · Tax advisor</p>
          </div>
          <p className="mt-1.5 text-[13px] leading-5">
            Reverse charge. Keep the place-of-supply evidence with the invoice.
          </p>
        </motion.div>
      </div>
    </SceneFrame>
  );
}
