import { revealedPanelVariants } from '@/lib/motion-variants';

export function calculatorSwapMotionProps(reducedMotion: boolean | null) {
  return {
    variants: revealedPanelVariants(reducedMotion),
    initial: 'hidden' as const,
    animate: 'visible' as const,
    exit: 'exit' as const,
    className: 'w-full max-w-xl',
  };
}
