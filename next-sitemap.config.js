/* eslint-disable @typescript-eslint/no-require-imports -- next-sitemap loads this file as CommonJS */
const fs = require("fs");
const { join } = require("path");

const BLOG_POSTS_DIR = join(__dirname, "lib", "blogs", "posts");

/**
 * Maps each blog path to its post's `updatedAt` date, so `lastmod` reflects
 * when the content actually changed instead of when the site was last built.
 * Reads the post files directly because this config can't import TypeScript.
 */
function readBlogLastModified() {
  const lastModified = {};

  for (const file of fs.readdirSync(BLOG_POSTS_DIR)) {
    if (!file.endsWith(".ts")) continue;
    const source = fs.readFileSync(join(BLOG_POSTS_DIR, file), "utf8");
    const slug = source.match(/^\s*slug:\s*"([^"]+)"/m)?.[1];
    const updatedAt = source.match(
      /^\s*updatedAt:\s*"(\d{4}-\d{2}-\d{2})"/m,
    )?.[1];
    if (slug && updatedAt) lastModified[`/blog/${slug}`] = updatedAt;
  }

  return lastModified;
}

/**
 * Maps each tool route to the `updatedAt` in its `TOOL_GROUPS` entry. Commented-out
 * (hidden) entries never match, because their lines start with `//`.
 */
function readToolLastModified() {
  const source = fs.readFileSync(join(__dirname, "lib", "tools-data.ts"), "utf8");
  const entries = source.matchAll(
    /^\s*link:\s*"([^"]+)",\n\s*updatedAt:\s*"(\d{4}-\d{2}-\d{2})"/gm,
  );
  return Object.fromEntries([...entries].map((match) => [match[1], match[2]]));
}

/** Last content change for the core pages. Update the date when you edit one. */
const CORE_PAGE_LAST_MODIFIED = {
  "/": "2026-11-26",
  "/about": "2026-11-26",
  "/blog": "2026-11-26",
  "/contact": "2026-11-26",
  "/disclaimer": "2026-11-26",
  "/privacy-policy": "2026-11-26",
  "/request-a-tool": "2026-11-26",
  "/terms-of-service": "2026-11-26",
};

/** Used only when a page has no recorded date. */
const buildDate = new Date().toISOString().slice(0, 10);

const blogLastModified = readBlogLastModified();
const lastModified = {
  ...CORE_PAGE_LAST_MODIFIED,
  ...readToolLastModified(),
  ...blogLastModified,
};

/** Blog posts marked `hidden: true` are noindex, so they stay out of the sitemap too. */
function readHiddenBlogPaths() {
  const hidden = [];

  for (const file of fs.readdirSync(BLOG_POSTS_DIR)) {
    if (!file.endsWith(".ts")) continue;
    const source = fs.readFileSync(join(BLOG_POSTS_DIR, file), "utf8");
    const slug = source.match(/^\s*slug:\s*"([^"]+)"/m)?.[1];
    if (slug && /^\s*hidden:\s*true/m.test(source)) hidden.push(`/blog/${slug}`);
  }

  return hidden;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: [
    "/api/*",
    "/icon.png",
    "/robots.txt",
    "/ads.txt",
    // Generated social images (opengraph-image routes) are not pages.
    "/opengraph-image",
    "/*/opengraph-image",
    "/*/*/opengraph-image",
    "/**/opengraph-image/**",
    "/**/opengraph-image-*",
    // Hidden, noindex tools (see lib/tools-data.ts).
    "/tools/generate-random-ssn",
    "/tools/generate-random-credit-cards",
    ...readHiddenBlogPaths(),
  ],
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/about": 0.8,
      "/blog": 0.85,
      "/contact": 0.7,
      "/request-a-tool": 0.7,
      "/privacy-policy": 0.5,
      "/terms-of-service": 0.5,
      "/disclaimer": 0.5,
    };

    const changeFreqs = {
      "/": "daily",
      "/about": "monthly",
      "/blog": "weekly",
      "/contact": "monthly",
      "/request-a-tool": "monthly",
      "/privacy-policy": "yearly",
      "/terms-of-service": "yearly",
      "/disclaimer": "yearly",
    };

    const isToolPage = path.startsWith("/tools/");
    const isBlogPost = path.startsWith("/blog/");

    return {
      loc: path,
      changefreq:
        changeFreqs[path] ??
        (isToolPage ? "weekly" : isBlogPost ? "monthly" : "monthly"),
      priority:
        priorities[path] ?? (isToolPage ? 0.9 : isBlogPost ? 0.85 : 0.6),
      // Real content dates where recorded. Google ignores lastmod values that
      // change on every deploy, so the build date is only the fallback.
      lastmod: lastModified[path] ?? buildDate,
    };
  },
};
