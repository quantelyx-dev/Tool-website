import type { Metadata } from "next";

import { JsonToolContent } from "@/components/json-tool/json-tool-content";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolPageDetails } from "@/components/shared/tool-page-details";
import { createPageMetadata } from "@/lib/seo/metadata";
import { jsonToolFaqs } from "@/lib/tool-faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: 'JSON Formatter & Validator',
  description:
    'Format and validate JSON with line and column errors, explore it as a tree, and generate TypeScript interfaces in your browser.',
  path: '/tools/json-formatter-validator',
  keywords: [
    'json formatter',
    'json validator',
    'json beautifier',
    'json to typescript',
    'json tree viewer',
    'json minifier',
    'format json online',
  ],
});

export default function JsonFormatterValidatorPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-6xl px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "JSON formatter & validator" }]} />
        <JsonToolContent />
        <ToolPageDetails toolLink="/tools/json-formatter-validator" faqs={jsonToolFaqs} />
      </div>
    </main>
  );
}
