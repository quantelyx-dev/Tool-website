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

const blogLastModified = readBlogLastModified();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/icon.png"],
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/about": 0.8,
      "/blog": 0.85,
      "/contact": 0.7,
      "/request-a-tool": 0.7,
      "/privacy-policy": 0.5,
      "/terms-of-service": 0.5,
    };

    const changeFreqs = {
      "/": "daily",
      "/about": "monthly",
      "/blog": "weekly",
      "/contact": "monthly",
      "/request-a-tool": "monthly",
      "/privacy-policy": "yearly",
      "/terms-of-service": "yearly",
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
      // Only blog posts have a known content date. Everything else omits lastmod,
      // because a build-time timestamp would mark every page as changed on each
      // deploy and Google ignores inaccurate lastmod values.
      lastmod: blogLastModified[path],
    };
  },
};
