"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { SceneGhostCursor } from "@/components/services-bento/ghost-cursor";
import { cn } from "@/lib/utils";

export type FeatureSceneProps = {
  active: boolean;
  reducedMotion: boolean;
  focus: number;
};

export function FeatureDemoFrame({
  children,
  className,
  focus,
}: {
  children: (props: FeatureSceneProps) => ReactNode;
  className?: string;
  focus: number;
}) {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      { threshold: [0, 0.15, 0.35, 0.5, 0.75] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const sceneActive = reduce || active || inView;
  const playing = !reduce && inView && !pointerInside;
  const engage = useCallback(() => setActive(true), []);
  const release = useCallback(() => setActive(false), []);

  return (
    <div
      className={cn("krs-app relative h-full min-h-[320px] overflow-hidden", className)}
      data-scene-active={sceneActive ? "true" : "false"}
      onPointerEnter={() => {
        setPointerInside(true);
        setActive(true);
      }}
      onPointerLeave={() => {
        setPointerInside(false);
        if (!inView) {
          setActive(false);
        }
      }}
      ref={ref}
    >
      {children({ active: sceneActive, reducedMotion: reduce, focus })}
      {playing ? (
        <SceneGhostCursor onEngage={engage} onRelease={release} playing />
      ) : null}
    </div>
  );
}
