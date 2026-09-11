"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useInView, useReducedMotion } from "motion/react";

type BentoSceneContextValue = {
  activeId: string | null;
  activate: (id: string) => void;
  deactivate: (id: string) => void;
  reducedMotion: boolean;
  canHover: boolean;
};

const BentoSceneContext = createContext<BentoSceneContextValue | null>(null);

export function BentoSceneProvider({ children }: { children: ReactNode }) {
  const reducedMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (canHover) {
      setActiveId(null);
    }
  }, [canHover]);

  const activate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const deactivate = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : current));
  }, []);

  return (
    <BentoSceneContext.Provider
      value={{ activeId, activate, deactivate, reducedMotion, canHover }}
    >
      {children}
    </BentoSceneContext.Provider>
  );
}

export function useHoverScene(id: string) {
  const context = useContext(BentoSceneContext);

  if (!context) {
    throw new Error("useHoverScene must be used within BentoSceneProvider");
  }

  const { activeId, activate, deactivate, reducedMotion, canHover } = context;
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (reducedMotion || canHover) {
      return;
    }

    if (inView) {
      activate(id);
      return;
    }

    deactivate(id);
  }, [activate, canHover, deactivate, id, inView, reducedMotion]);

  const onPointerEnter = () => {
    if (!canHover || reducedMotion) {
      return;
    }

    activate(id);
  };

  const onPointerLeave = () => {
    if (!canHover || reducedMotion) {
      return;
    }

    deactivate(id);
  };

  const onFocus = () => {
    if (reducedMotion) {
      return;
    }

    activate(id);
  };

  const onBlur = () => {
    if (reducedMotion) {
      return;
    }

    deactivate(id);
  };

  return {
    ref,
    active: reducedMotion || activeId === id,
    reducedMotion,
    onBlur,
    onFocus,
    onPointerEnter,
    onPointerLeave,
  };
}
