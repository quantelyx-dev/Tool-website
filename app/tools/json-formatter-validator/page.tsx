import type { Metadata } from "next";

import { JsonToolContent } from "@/components/json-tool/json-tool-content";
import { ToolBlogPromo } from "@/components/blog/tool-blog-promo";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolFaqSection } from "@/components/shared/tool-faq-section";
import { createPageMetadata } from "@/lib/seo/metadata";
import { jsonToolFaqs } from "@/lib/tool-faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "JSON Formatter, Validator & TypeScript Generator",
  description:
    "Format and validate JSON with exact line/column error locations, explore it as a collapsible tree, or generate TypeScript interfaces instantly — all client-side.",
  path: "/tools/json-formatter-validator",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json to typescript",
    "json tree viewer",
    "json minifier",
    "format json online",
  ],
});

export default function JsonFormatterValidatorPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-6xl px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "JSON formatter & validator" }]} />
        <JsonToolContent />
        <ToolBlogPromo toolLink="/tools/json-formatter-validator" />
        <ToolFaqSection faqs={jsonToolFaqs} />
      </div>
    </main>
  );
}
