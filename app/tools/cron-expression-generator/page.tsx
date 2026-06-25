import type { Metadata } from "next";

import { CronExpressionGeneratorToolContent } from "@/components/cron-expression-generator/cron-expression-generator-tool-content";
import { ToolBlogPromo } from "@/components/blog/tool-blog-promo";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolFaqSection } from "@/components/shared/tool-faq-section";
import { createPageMetadata } from "@/lib/seo/metadata";
import { cronExpressionFaqs } from "@/lib/tool-faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Cron Expression Generator — Build & Validate Schedules",
  description:
    "Build cron expressions visually with presets or custom fields. Generate 5-field or 6-field schedules, get human-readable explanations, and preview the next five run times.",
  path: "/tools/cron-expression-generator",
  keywords: [
    "cron expression generator",
    "cron builder",
    "crontab generator",
    "cron schedule maker",
    "cron expression builder",
    "generate cron expression",
    "cron job scheduler",
  ],
});

export default function CronExpressionGeneratorPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-6xl px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "Cron expression generator" }]} />
        <CronExpressionGeneratorToolContent />
        <ToolBlogPromo toolLink="/tools/cron-expression-generator" />
        <ToolFaqSection faqs={cronExpressionFaqs} />
      </div>
    </main>
  );
}
