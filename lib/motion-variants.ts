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

/** Panel that appears after an action (e.g. chart results). */
export function revealedPanelVariants(reducedMotion: boolean | null): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
      exit: { opacity: 1 },
    };
  }
  return {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.52, ease: easeOut },
    },
    exit: {
      opacity: 0,
      y: 16,
      scale: 0.985,
      transition: { duration: 0.32, ease: easeOut },
    },
  };
}

/** Brief transitional panel (e.g. calculation in flight). */
export function loadingPanelVariants(reducedMotion: boolean | null): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
      exit: { opacity: 1 },
    };
  }
  return {
    hidden: { opacity: 0, y: 18, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.38, ease: easeOut },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.99,
      transition: { duration: 0.26, ease: easeOut },
    },
  };
}

/** Skeleton row shimmer inside loading panels. */
export function loadingShimmerVariants(reducedMotion: boolean | null): Variants {
  if (reducedMotion) {
    return {
      pulse: { opacity: 0.72 },
    };
  }
  return {
    pulse: {
      opacity: [0.38, 0.82, 0.38],
      transition: {
        duration: 1.55,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };
}
