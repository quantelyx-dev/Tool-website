export type BlogFaq = {
  q: string;
  a: string;
};

export type BlogSection =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; text: string }
  | { type: "toolCta" };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  keywords: string[];
  toolLink: string;
  toolName: string;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  relatedSlugs: string[];
  /** Keeps the post reachable by URL but noindex and out of lists, related links, and the sitemap. */
  hidden?: boolean;
  sections: BlogSection[];
  faqs: BlogFaq[];
};
