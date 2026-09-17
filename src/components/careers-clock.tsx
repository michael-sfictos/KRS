import { cn } from "@/lib/utils";

const ticks = Array.from({ length: 12 }, (_, index) => ({
  angle: index * 30,
  highlighted: index < 6,
}));

export function CareersClock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-square w-[74%] items-center justify-center rounded-full border border-primary/10 bg-primary text-primary-foreground",
        className
      )}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-5 rounded-full">
        {ticks.map((tick) => (
          <span
            className="absolute left-1/2 top-1/2 h-full w-px"
            key={tick.angle}
            style={{ transform: `translate(-50%, -50%) rotate(${tick.angle}deg)` }}
          >
            <span
              className={cn(
                "absolute left-1/2 top-1 -translate-x-1/2 rounded-full",
                tick.highlighted ? "h-9 w-1.5 bg-secondary" : "h-5 w-px bg-primary-foreground/18"
              )}
            />
          </span>
        ))}
      </span>
      <div className="relative flex size-44 items-center justify-center rounded-full border border-secondary/70">
        <span className="absolute right-9 top-9 size-3 rounded-full bg-secondary" />
        <div className="relative z-10 text-center">
          <p className="font-heading text-7xl font-medium leading-none text-secondary">6h</p>
          <p className="mono-label mt-2 text-primary-foreground/62">focused day</p>
        </div>
      </div>
    </div>
  );
}
