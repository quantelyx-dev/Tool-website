export type IpVersion = 'v4' | 'v6';

export type GeneratedIp = {
  ip: string;
  version: IpVersion;
};

/** RFC 5737: TEST-NET-1, 2, and 3 are reserved for documentation. */
export const IPV4_DOCUMENTATION_BLOCKS = ['192.0.2', '198.51.100', '203.0.113'] as const;
/** RFC 3849: the IPv6 documentation prefix. */
export const IPV6_DOCUMENTATION_PREFIX = '2001:0db8';

function randomInteger(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomHextet(): string {
  return randomInteger(0, 0xffff).toString(16).padStart(4, '0');
}

export function generateRandomIp(version: IpVersion): GeneratedIp {
  if (version === 'v6') {
    const hextets = Array.from({ length: 6 }, randomHextet);
    return { ip: `${IPV6_DOCUMENTATION_PREFIX}:${hextets.join(':')}`, version };
  }

  const block =
    IPV4_DOCUMENTATION_BLOCKS[randomInteger(0, IPV4_DOCUMENTATION_BLOCKS.length - 1)];
  // .0 and .255 are the network and broadcast addresses of each /24.
  return { ip: `${block}.${randomInteger(1, 254)}`, version };
}

/** Addresses are unique within a batch (the three IPv4 blocks hold 762 hosts). */
export function generateRandomIpBulk(
  count: number,
  version: IpVersion,
): GeneratedIp[] {
  if (count < 1) {
    return [];
  }

  const unique = new Map<string, GeneratedIp>();
  const target = version === 'v4' ? Math.min(count, 762) : count;
  while (unique.size < target) {
    const next = generateRandomIp(version);
    unique.set(next.ip, next);
  }

  return [...unique.values()];
}
