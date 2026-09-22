import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function GlassScene({
  children,
  cardClassName,
}: {
  children: ReactNode;
  cardClassName?: string;
}) {
  return (
    <div className="pointer-events-none relative flex h-full items-center justify-center overflow-hidden p-5 sm:p-8">
      <div aria-hidden className="absolute inset-0 bg-[#eef1f4]" />
      <div
        aria-hidden
        className="absolute -top-16 -left-10 size-72 rounded-full bg-[radial-gradient(circle,var(--secondary)_0%,transparent_68%)] opacity-45 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-16 bottom-0 size-80 rounded-full bg-[radial-gradient(circle,var(--tertiary)_0%,transparent_70%)] opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/3 size-56 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--chart-2)_0%,transparent_70%)] opacity-35 blur-3xl"
      />
      <div
        className={cn(
          "relative flex w-full max-w-[440px] flex-col overflow-hidden rounded-2xl border border-white/80 bg-card/80 shadow-[0_28px_60px_-32px_rgba(1,25,54,0.55)] backdrop-blur-md",
          cardClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
