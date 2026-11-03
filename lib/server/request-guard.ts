/**
 * Cheap checks that a request came from a real browser on our own site. They stop
 * casual scripts and bots, but every header here can be forged, so they complement
 * (never replace) the quota limits in `tts-quota.ts`.
 */

const MIN_USER_AGENT_LENGTH = 20;
const MAX_USER_AGENT_LENGTH = 512;

const AUTOMATED_USER_AGENT =
  /(curl|wget|python-requests|python-urllib|httpx|aiohttp|go-http-client|okhttp|axios|node-fetch|undici|libwww|scrapy|postman|insomnia|headlesschrome|phantomjs|puppeteer|playwright|selenium|crawler|spider|bot\b)/i;

export type RequestGuardFailure =
  | 'bad_user_agent'
  | 'automated_client'
  | 'missing_language'
  | 'cross_origin';

export type RequestGuardResult = { ok: true } | { ok: false; reason: RequestGuardFailure };

export function assessBrowserRequest(request: Request): RequestGuardResult {
  const userAgent = request.headers.get('user-agent')?.trim() ?? '';
  if (userAgent.length < MIN_USER_AGENT_LENGTH || userAgent.length > MAX_USER_AGENT_LENGTH) {
    return { ok: false, reason: 'bad_user_agent' };
  }
  if (AUTOMATED_USER_AGENT.test(userAgent)) {
    return { ok: false, reason: 'automated_client' };
  }

  if (!request.headers.get('accept-language')?.trim()) {
    return { ok: false, reason: 'missing_language' };
  }

  // Browsers always send Origin on a POST. It must match the host that served us.
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  const fetchSite = request.headers.get('sec-fetch-site');
  try {
    if (!origin || !host || new URL(origin).host !== host) {
      return { ok: false, reason: 'cross_origin' };
    }
  } catch {
    return { ok: false, reason: 'cross_origin' };
  }
  if (fetchSite && fetchSite !== 'same-origin') {
    return { ok: false, reason: 'cross_origin' };
  }

  return { ok: true };
}

/** Header values that, together, describe the visitor's browser (not unique, but a useful signal). */
export function browserFingerprintSource(request: Request): string {
  return [
    'user-agent',
    'accept-language',
    'accept-encoding',
    'sec-ch-ua',
    'sec-ch-ua-platform',
    'sec-ch-ua-mobile',
  ]
    .map(name => request.headers.get(name)?.trim() ?? '')
    .join('|');
}

/** Groups addresses into the network a visitor could hop within: IPv4 /24 or IPv6 /64. */
export function networkPrefix(ip: string): string {
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(ip);
  const address = mapped?.[1] ?? ip;

  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(address)) {
    return `v4:${address.split('.').slice(0, 3).join('.')}`;
  }

  if (address.includes(':')) {
    const [head = '', tail = ''] = address.split('::');
    const headParts = head ? head.split(':') : [];
    const tailParts = tail ? tail.split(':') : [];
    const missing = Math.max(0, 8 - headParts.length - tailParts.length);
    const groups = [...headParts, ...Array<string>(missing).fill('0'), ...tailParts];
    return `v6:${groups.slice(0, 4).map(group => group.toLowerCase()).join(':')}`;
  }

  return `raw:${address}`;
}
