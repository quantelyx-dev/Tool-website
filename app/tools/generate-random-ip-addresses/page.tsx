import type { Metadata } from "next";

import { GenerateRandomIpAddressesToolContent } from "@/components/generate-random-ip-addresses/generate-random-ip-addresses-tool-content";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolPageDetails } from "@/components/shared/tool-page-details";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ipAddressFaqs } from "@/lib/tool-faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: 'Random Test IP Address Generator',
  description:
    'Generate IPv4 and IPv6 test addresses from ranges reserved for documentation. Copy one address or export a batch as CSV.',
  path: '/tools/generate-random-ip-addresses',
  keywords: [
    'random IP address generator',
    'test IP address generator',
    'documentation IP addresses',
    'IPv4 generator',
    'IPv6 generator',
    'random IP CSV',
  ],
});

export default function GenerateRandomIpAddressesPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-6xl px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "IP address generator" }]} />
        <GenerateRandomIpAddressesToolContent />
        <ToolPageDetails toolLink="/tools/generate-random-ip-addresses" faqs={ipAddressFaqs} />
      </div>
    </main>
  );
}
