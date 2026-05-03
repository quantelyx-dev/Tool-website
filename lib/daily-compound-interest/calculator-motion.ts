import { revealedPanelVariants } from '@/lib/motion-variants';

/** Full-width result panel motion (growth chart matches sun/moon calculator feel). */
export function growthChartMotionProps(reducedMotion: boolean | null) {
  return {
    variants: revealedPanelVariants(reducedMotion),
    initial: 'hidden' as const,
    animate: 'visible' as const,
    exit: 'exit' as const,
    className: 'w-full',
  };
}
