import type { Metadata } from "next";

import { CronExpressionGeneratorToolContent } from "@/components/cron-expression-generator/cron-expression-generator-tool-content";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolPageDetails } from "@/components/shared/tool-page-details";
import { createPageMetadata } from "@/lib/seo/metadata";
import { cronExpressionFaqs } from "@/lib/tool-faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: 'Cron Expression Generator',
  description:
    'Build 5-field or 6-field cron schedules with presets or custom fields, read them in plain English, and preview the next five run times.',
  path: '/tools/cron-expression-generator',
  keywords: [
    'cron expression generator',
    'cron builder',
    'crontab generator',
    'cron schedule maker',
    'cron expression builder',
    'generate cron expression',
    'cron job scheduler',
    'spring cron expression generator',
    'jenkins cron generator',
    'java cron generator',
    'crontab expression generator',
  ],
});

export default function CronExpressionGeneratorPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-6xl px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "Cron expression generator" }]} />
        <CronExpressionGeneratorToolContent />
        <ToolPageDetails toolLink="/tools/cron-expression-generator" faqs={cronExpressionFaqs} />
      </div>
    </main>
  );
}
