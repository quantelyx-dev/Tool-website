import type { LucideIcon } from 'lucide-react';
import {
  LayersIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WorkflowIcon,
} from 'lucide-react';

export const ABOUT_MISSION =
  'Tools brings developer, design, and productivity utilities into one fast, focused web experience. We believe everyday tasks deserve polished interfaces, predictable behavior, and respect for your privacy—without jumping between dozens of single-purpose sites.';

export const ABOUT_STORY =
  'What started as a small set of helpers grew into a cohesive suite: one place to convert units, format data, inspect assets, and ship faster. Every tool shares the same attention to accessibility, keyboard flows, and dark-mode-friendly design so the whole product feels like one product—not a grab bag of widgets.';

export type AboutPillar = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    title: 'One unified suite',
    description:
      'Consistent patterns and navigation across utilities so you spend less time hunting for the right tab.',
    icon: LayersIcon,
  },
  {
    title: 'Privacy by design',
    description:
      'Processing stays in your browser whenever possible—your inputs are yours, not training data.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Built for flow',
    description:
      'Keyboard shortcuts, fast loads, and thoughtful defaults so small tasks stay small.',
    icon: WorkflowIcon,
  },
  {
    title: 'Always evolving',
    description:
      'New utilities ship regularly based on real workflows—tell us what you need next.',
    icon: SparklesIcon,
  },
];
