import { Check } from "lucide-react";
import { motion } from "motion/react";

import { sceneTransition } from "@/components/services-bento/scene-motion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SceneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none flex h-full min-h-0 flex-col overflow-hidden rounded-[var(--radius-xl)] bg-muted p-2",
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-xs">
        {children}
      </div>
    </div>
  );
}

export function SceneHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5">
      <div className="min-w-0">
        {subtitle ? <p className="text-[11px] leading-none text-muted-foreground">{subtitle}</p> : null}
        <p className={cn("truncate text-sm font-medium", subtitle && "mt-1")}>{title}</p>
      </div>
      {children}
    </div>
  );
}

export function UiBadge({
  children,
  variant = "outline",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
}) {
  return (
    <Badge className={className} variant={variant}>
      {children}
    </Badge>
  );
}

export function UiButton({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost";
  className?: string;
}) {
  return (
    <span className={cn(buttonVariants({ variant, size: "xs" }), className)}>{children}</span>
  );
}

export function UiCheckbox({
  checked,
  reducedMotion,
  delay = 0,
  active,
}: {
  checked: boolean;
  reducedMotion: boolean;
  delay?: number;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-[4px] border",
        checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background",
      )}
    >
      <motion.span
        animate={{ opacity: checked ? 1 : 0, scale: checked ? 1 : 0.65 }}
        className="flex"
        initial={false}
        transition={sceneTransition(reducedMotion, delay, active)}
      >
        <Check className="size-2.5" strokeWidth={3} />
      </motion.span>
    </span>
  );
}

export function UiAvatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground",
        className,
      )}
    >
      {initials}
    </span>
  );
}
