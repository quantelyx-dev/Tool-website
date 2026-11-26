import type { Metadata } from "next";

import { Base64ToolContent } from "@/components/base64-tool/base64-tool-content";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolPageDetails } from "@/components/shared/tool-page-details";
import { createPageMetadata } from "@/lib/seo/metadata";
import { base64ToolFaqs } from "@/lib/tool-faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: 'Base64 Encoder, Decoder & JWT Viewer',
  description:
    'Encode and decode Base64 text and files, build data URIs, and view JWT contents. Everything runs in your browser.',
  path: '/tools/base64-encoder-decoder',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'base64 to image',
    'file to base64',
    'jwt decoder',
    'base64url',
    'data uri generator',
  ],
});

export default function Base64EncoderDecoderPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-6xl px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "Base64 encoder & decoder" }]} />
        <Base64ToolContent />
        <ToolPageDetails toolLink="/tools/base64-encoder-decoder" faqs={base64ToolFaqs} />
      </div>
    </main>
  );
}
