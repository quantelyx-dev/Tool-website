import type { Transition, Variants } from 'framer-motion';

const easeOut = [0.22, 1, 0.36, 1] as const;

export const CONTENT_TRANSITION: Transition = {
  duration: 0.45,
  ease: easeOut,
};

export function fadeUpVariants(reducedMotion: boolean | null): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: CONTENT_TRANSITION,
    },
  };
}

export function staggerContainerVariants(
  reducedMotion: boolean | null,
  stagger = 0.09,
): Variants {
  if (reducedMotion) {
    return {
      hidden: {},
      visible: {},
    };
  }
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: 0.06 },
    },
  };
}

export function cardItemVariants(reducedMotion: boolean | null): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  };
}
