/** Read at request time, so setting the variable needs a restart, not a rebuild. */
export const dynamic = 'force-dynamic';

const PUBLISHER_ID_PATTERN = /^pub-\d{16}$/;
/** Google's certification authority ID, the same for every AdSense publisher. */
const GOOGLE_CERTIFICATION_ID = 'f08c47fec0942fa0';

export function GET() {
  // AdSense shows the ID both as "pub-…" and as "ca-pub-…"; ads.txt needs the former.
  const publisherId = process.env.ADSENSE_PUBLISHER_ID?.trim().replace(/^ca-/, '');

  if (!publisherId || !PUBLISHER_ID_PATTERN.test(publisherId)) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(
    `google.com, ${publisherId}, DIRECT, ${GOOGLE_CERTIFICATION_ID}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
