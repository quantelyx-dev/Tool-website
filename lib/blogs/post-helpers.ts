import type { BlogSection } from "@/lib/blogs/types";

export function h2(text: string): BlogSection {
  return { type: "heading", level: 2, text };
}

export function h3(text: string): BlogSection {
  return { type: "heading", level: 3, text };
}

export function p(text: string): BlogSection {
  return { type: "paragraph", text };
}

export function ul(items: string[]): BlogSection {
  return { type: "list", items };
}

export function ol(items: string[]): BlogSection {
  return { type: "list", ordered: true, items };
}

export function callout(text: string): BlogSection {
  return { type: "callout", text };
}

export function toolCta(): BlogSection {
  return { type: "toolCta" };
}
