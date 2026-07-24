import type { Metadata } from "next";

import { ToolBlogPromo } from "@/components/blog/tool-blog-promo";
import { GenerateRandomIpAddressesToolContent } from "@/components/generate-random-ip-addresses/generate-random-ip-addresses-tool-content";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolFaqSection } from "@/components/shared/tool-faq-section";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ipAddressFaqs } from "@/lib/tool-faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Random IP Address Generator — IPv4 & IPv6",
  description:
    "Generate fictional IPv4 or IPv6 addresses instantly. Create a single address to copy or a bulk batch to export as CSV — for test data, fixtures, and demos.",
  path: "/tools/generate-random-ip-addresses",
  keywords: [
    "random IP address generator",
    "fake IP generator",
    "IPv4 generator",
    "IPv6 generator",
    "generate IP address",
    "test IP addresses",
    "random IP CSV",
  ],
});

export default function GenerateRandomIpAddressesPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-6xl px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "IP address generator" }]} />
        <GenerateRandomIpAddressesToolContent />
        <ToolBlogPromo toolLink="/tools/generate-random-ip-addresses" />
        <ToolFaqSection faqs={ipAddressFaqs} />
      </div>
    </main>
  );
}
