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
  curvature = 0,
  duration = 6,
  delay = 0,
  repeat = Infinity,
  reverse = false,
  pathColor = "rgba(244, 239, 230, 0.4)",
  pathWidth = 1.2,
  pathOpacity = 0.45,
  highlightOpacity = 0.95,
  gradientStartColor = "#ae882f",
  gradientStopColor = "#f4efe6",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId().replace(/:/g, "");
  const [geometry, setGeometry] = useState({
    endX: 0,
    endY: 0,
    height: 0,
    path: "",
    startX: 0,
    startY: 0,
    width: 0,
  });
  const repeatCount = repeat === Infinity ? "indefinite" : String(repeat);

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

      const startX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
      const endX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
      const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;
      const distanceX = endX - startX;
      const controlX1 = startX + distanceX * 0.46;
      const controlX2 = startX + distanceX * 0.54;

      setGeometry({
        endX,
        endY,
        height: containerRect.height,
        path: `M ${startX},${startY} C ${controlX1},${startY + curvature} ${controlX2},${
          endY + curvature
        } ${endX},${endY}`,
        startX,
        startY,
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
  }, [containerRef, curvature, endXOffset, endYOffset, fromRef, startXOffset, startYOffset, toRef]);

  if (!geometry.path || !geometry.height || !geometry.width) return null;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      fill="none"
      height={geometry.height}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      width={geometry.width}
    >
      <path
        className="agent-beam-route"
        d={geometry.path}
        pathLength={1}
        stroke={pathColor}
        strokeLinecap="round"
        strokeOpacity={pathOpacity}
        strokeWidth={pathWidth}
      />
      <path
        className="agent-beam-highlight"
        d={geometry.path}
        filter="drop-shadow(0 0 4px rgba(174, 136, 47, 0.58))"
        pathLength={1}
        stroke={`url(#${id})`}
        strokeDasharray="0.46 0.54"
        strokeLinecap="round"
        strokeOpacity={highlightOpacity}
        strokeWidth={pathWidth + 0.55}
      >
        <animate
          attributeName="stroke-dashoffset"
          dur={`${duration}s`}
          from={reverse ? "0" : "1"}
          repeatCount={repeatCount}
          to={reverse ? "1" : "0"}
          begin={`${delay}s`}
        />
      </path>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={id}
          x1={reverse ? geometry.endX : geometry.startX}
          x2={reverse ? geometry.startX : geometry.endX}
          y1={reverse ? geometry.endY : geometry.startY}
          y2={reverse ? geometry.startY : geometry.endY}
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0.18" />
          <stop offset="25%" stopColor={gradientStartColor} stopOpacity="0.55" />
          <stop offset="55%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
