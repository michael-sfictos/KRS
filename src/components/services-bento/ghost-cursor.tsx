"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      window.clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };

    if (signal.aborted) {
      onAbort();
      return;
    }

    signal.addEventListener("abort", onAbort, { once: true });
  });
}

function spotsIn(card: HTMLElement): Point[] {
  const cardRect = card.getBoundingClientRect();
  return [...card.querySelectorAll<HTMLElement>("[data-demo-spot]")]
    .map((el) => {
      const rect = el.getBoundingClientRect();
      const order = Number(el.dataset.demoSpot ?? "0");
      return {
        order,
        x: rect.left - cardRect.left + rect.width * 0.55,
        y: rect.top - cardRect.top + rect.height * 0.45,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ x, y }) => ({ x, y }));
}

const cursorMark = (
  <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
    <path
      d="M5 2.4 L5 18.6 L9.1 14.4 L11.9 20.4 L14.2 19.3 L11.4 13.5 L17 13 Z"
      fill="var(--background)"
      stroke="var(--background)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.2"
    />
    <path
      d="M5 2.4 L5 18.6 L9.1 14.4 L11.9 20.4 L14.2 19.3 L11.4 13.5 L17 13 Z"
      fill="var(--primary)"
      stroke="var(--primary)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
    />
  </svg>
);

export function SceneGhostCursor({
  playing,
  onEngage,
  onRelease,
}: {
  playing: boolean;
  onEngage: () => void;
  onRelease: () => void;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(24);
  const y = useMotionValue(88);
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0.72);
  const handScale = useMotionValue(1);

  useEffect(() => {
    if (!playing) {
      opacity.set(0);
      return;
    }

    const controller = new AbortController();
    const running: Array<{ stop: () => void }> = [];

    const move = (value: typeof x, to: number, duration = 0.55) => {
      const playback = animate(value, to, {
        type: "spring",
        stiffness: 170,
        damping: 22,
        duration,
      });
      running.push(playback);
      return playback;
    };

    const run = async () => {
      const card = rootRef.current?.closest<HTMLElement>("[data-scene-active]");
      if (!card) {
        return;
      }

      try {
        while (!controller.signal.aborted) {
          const rect = card.getBoundingClientRect();
          const path = spotsIn(card);
          const fallback: Point[] = [
            { x: rect.width * 0.18, y: rect.height * 0.42 },
            { x: rect.width * 0.18, y: rect.height * 0.56 },
            { x: rect.width * 0.82, y: rect.height * 0.86 },
          ];
          const tour = path.length > 0 ? path : fallback;
          const start = tour[0];

          x.set(start.x + 36);
          y.set(start.y - 28);
          scale.set(0.7);
          handScale.set(1);

          await sleep(180, controller.signal);
          move(opacity, 1, 0.22);
          move(scale, 1);

          await Promise.all([move(x, start.x), move(y, start.y)]);
          move(handScale, 0.78, 0.08);
          onEngage();
          await sleep(90, controller.signal);
          move(handScale, 1);

          await sleep(480, controller.signal);
          const rest = spotsIn(card).slice(1);
          for (const point of rest) {
            await Promise.all([move(x, point.x), move(y, point.y)]);
            move(handScale, 0.78, 0.08);
            await sleep(90, controller.signal);
            move(handScale, 1);
            await sleep(480, controller.signal);
          }

          await sleep(1700, controller.signal);
          onRelease();
          await move(opacity, 0, 0.28);
          await sleep(1100, controller.signal);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          throw error;
        }
      }
    };

    void run();

    return () => {
      controller.abort();
      running.forEach((playback) => playback.stop());
      opacity.set(0);
    };
  }, [handScale, onEngage, onRelease, opacity, playing, scale, x, y]);

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-20 origin-top-left drop-shadow-[0_2px_3px_rgba(1,25,54,0.28)] motion-reduce:hidden"
      ref={rootRef}
      style={{ x, y, opacity, scale }}
    >
      <motion.span className="block" style={{ scale: handScale }}>
        {cursorMark}
      </motion.span>
    </motion.span>
  );
}
