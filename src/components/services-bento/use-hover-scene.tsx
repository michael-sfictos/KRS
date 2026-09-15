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
import { useReducedMotion } from "motion/react";

type BentoSceneContextValue = {
  activeId: string | null;
  featuredId: string | null;
  activate: (id: string) => void;
  deactivate: (id: string) => void;
  reportVisibility: (id: string, ratio: number) => void;
  reducedMotion: boolean;
  canHover: boolean;
  demoEnabled: boolean;
};

const BentoSceneContext = createContext<BentoSceneContextValue | null>(null);

export function BentoSceneProvider({ children }: { children: ReactNode }) {
  const reducedMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [featuredId, setFeaturedId] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  const [demoEnabled, setDemoEnabled] = useState(false);
  const ratiosRef = useRef(new Map<string, number>());

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const compact = window.matchMedia("(max-width: 1023px)");
    const sync = () => {
      setCanHover(hover.matches);
      setDemoEnabled(!reducedMotion && (compact.matches || !hover.matches));
    };
    sync();
    hover.addEventListener("change", sync);
    compact.addEventListener("change", sync);
    return () => {
      hover.removeEventListener("change", sync);
      compact.removeEventListener("change", sync);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (demoEnabled) {
      return;
    }

    setFeaturedId(null);
    ratiosRef.current.clear();
  }, [demoEnabled]);

  const activate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const deactivate = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : current));
  }, []);

  const reportVisibility = useCallback((id: string, ratio: number) => {
    const ratios = ratiosRef.current;
    if (ratio <= 0) {
      ratios.delete(id);
    } else {
      ratios.set(id, ratio);
    }

    let nextId: string | null = null;
    let best = 0.32;
    for (const [key, value] of ratios) {
      if (value > best) {
        best = value;
        nextId = key;
      }
    }

    setFeaturedId((current) => (current === nextId ? current : nextId));
  }, []);

  return (
    <BentoSceneContext.Provider
      value={{
        activeId,
        featuredId,
        activate,
        deactivate,
        reportVisibility,
        reducedMotion,
        canHover,
        demoEnabled,
      }}
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

  const {
    activeId,
    featuredId,
    activate,
    deactivate,
    reportVisibility,
    reducedMotion,
    canHover,
    demoEnabled,
  } = context;
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!demoEnabled) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        reportVisibility(id, entry.intersectionRatio);
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.75, 1] },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      reportVisibility(id, 0);
    };
  }, [demoEnabled, id, reportVisibility]);

  const featured = demoEnabled && featuredId === id;

  useEffect(() => {
    if (featured) {
      return;
    }

    deactivate(id);
  }, [deactivate, featured, id]);

  const onPointerEnter = () => {
    if (reducedMotion || (!canHover && !demoEnabled)) {
      return;
    }

    activate(id);
  };

  const onPointerLeave = () => {
    if (reducedMotion || (!canHover && !demoEnabled)) {
      return;
    }

    if (featured) {
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
    featured,
    demoEnabled,
    canHover,
    reducedMotion,
    activate,
    deactivate,
    onBlur,
    onFocus,
    onPointerEnter,
    onPointerLeave,
  };
}
