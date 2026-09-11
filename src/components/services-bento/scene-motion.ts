export const sceneEase = [0.16, 1, 0.3, 1] as const;

export type ServiceSceneProps = {
  active: boolean;
  reducedMotion: boolean;
};

export function sceneTransition(
  reducedMotion: boolean,
  delay: number,
  active: boolean,
) {
  return {
    duration: reducedMotion ? 0 : active ? 0.55 : 0.4,
    delay: reducedMotion ? 0 : active ? delay : delay * 0.25,
    ease: sceneEase,
  };
}
