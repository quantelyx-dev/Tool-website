import type { Metadata } from "next";

import { ToolBlogPromo } from "@/components/blog/tool-blog-promo";
import { RegexTesterToolContent } from "@/components/regex-tester/regex-tester-tool-content";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolFaqSection } from "@/components/shared/tool-faq-section";
import { createPageMetadata } from "@/lib/seo/metadata";
import { regexTesterFaqs } from "@/lib/tool-faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Regex Tester — Test Regular Expressions Online",
  description:
    "Test and debug regular expressions instantly. Enter a pattern, select flags, and see highlighted matches, capture groups, and match positions in real time.",
  path: "/tools/regex-tester",
  keywords: [
    "regex tester",
    "regular expression tester",
    "regex validator",
    "test regex online",
    "regex debugger",
    "regexp tester",
    "regex matcher",
  ],
});

export default function RegexTesterPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-6xl px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "Regex tester" }]} />
        <RegexTesterToolContent />
        <ToolBlogPromo toolLink="/tools/regex-tester" />
        <ToolFaqSection faqs={regexTesterFaqs} />
      </div>
    </main>
  );
}
