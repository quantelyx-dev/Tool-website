export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const siteDomain = (() => {
  try {
    return new URL(siteUrl).hostname;
  } catch {
    return 'toolcalcs.net';
  }
})();
