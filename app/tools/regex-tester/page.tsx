import type { Metadata } from "next";

import { RegexTesterToolContent } from "@/components/regex-tester/regex-tester-tool-content";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolPageDetails } from "@/components/shared/tool-page-details";
import { createPageMetadata } from "@/lib/seo/metadata";
import { regexTesterFaqs } from "@/lib/tool-faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: 'Regex Tester with Match Highlighting',
  description:
    'Test JavaScript regular expressions in real time with flags, highlighted matches, capture groups, and match positions.',
  path: '/tools/regex-tester',
  keywords: [
    'regex tester',
    'regular expression tester',
    'regex validator',
    'test regex online',
    'regex debugger',
    'regexp tester',
    'regex matcher',
  ],
});

export default function RegexTesterPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-6xl px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "Regex tester" }]} />
        <RegexTesterToolContent />
        <ToolPageDetails toolLink="/tools/regex-tester" faqs={regexTesterFaqs} />
      </div>
    </main>
  );
}
