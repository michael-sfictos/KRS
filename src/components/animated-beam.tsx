"use client";

import type { RefObject } from "react";
import { useId, useLayoutEffect, useState } from "react";

import { cn } from "@/lib/utils";

type AnimatedBeamProps = {
  className?: string;
  containerRef: RefObject<Element | null>;
  fromRef: RefObject<Element | null>;
  toRef: RefObject<Element | null>;
  curvature?: number;
  duration?: number;
  delay?: number;
  repeat?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  highlightOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
};

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  duration = 4,
  delay = 0,
  reverse = false,
  pathColor = "rgba(244, 239, 230, 0.22)",
  pathWidth = 1.15,
  pathOpacity = 1,
  highlightOpacity = 1,
  gradientStartColor = "#ae882f",
  gradientStopColor = "#f4efe6",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId().replace(/:/g, "");
  const [geometry, setGeometry] = useState({
    height: 0,
    path: "",
    width: 0,
  });

  useLayoutEffect(() => {
    let frame = 0;
    let observer: ResizeObserver | null = null;

    const updatePath = () => {
      const container = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;

      if (!container || !from || !to) {
        frame = requestAnimationFrame(updatePath);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();
      const goingRight = fromRect.left < toRect.left;

      const startX = (goingRight ? fromRect.right : fromRect.left) - containerRect.left + startXOffset;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
      const endX = (goingRight ? toRect.left : toRect.right) - containerRect.left + endXOffset;
      const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;
      const controlX = (startX + endX) / 2;

      setGeometry({
        height: containerRect.height,
        path: `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`,
        width: containerRect.width,
      });

      if (!observer) {
        observer = new ResizeObserver(updatePath);
        observer.observe(container);
        observer.observe(from);
        observer.observe(to);
        window.addEventListener("resize", updatePath);
      }
    };

    updatePath();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, endXOffset, endYOffset, fromRef, startXOffset, startYOffset, toRef]);

  if (!geometry.path || !geometry.height || !geometry.width) return null;

  const travelFrom = reverse ? "110%;-30%" : "-30%;110%";
  const travelTo = reverse ? "140%;0%" : "0%;140%";

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      fill="none"
      height={geometry.height}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      width={geometry.width}
    >
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id={id} x1="0" x2="0" y1="0" y2="0">
          <stop offset="0" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="0.5" stopColor={gradientStartColor} />
          <stop offset="1" stopColor={gradientStopColor} stopOpacity="0.9" />
          <animate
            attributeName="x1"
            begin={`${delay}s`}
            dur={`${duration}s`}
            repeatCount="indefinite"
            values={travelFrom}
          />
          <animate
            attributeName="x2"
            begin={`${delay}s`}
            dur={`${duration}s`}
            repeatCount="indefinite"
            values={travelTo}
          />
        </linearGradient>
      </defs>
      <path
        className="agent-beam-route"
        d={geometry.path}
        stroke={pathColor}
        strokeLinecap="round"
        strokeOpacity={pathOpacity}
        strokeWidth={pathWidth}
      />
      <path
        className="agent-beam-highlight motion-reduce:hidden"
        d={geometry.path}
        stroke={`url(#${id})`}
        strokeLinecap="round"
        strokeOpacity={highlightOpacity}
        strokeWidth={pathWidth + 0.55}
      />
    </svg>
  );
}
