/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      // Allow all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Allow Google AdSense crawler explicitly
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
    ],
    additionalSitemaps: [],
  },
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
      lastmod: new Date().toISOString(),
    };
  },
};
