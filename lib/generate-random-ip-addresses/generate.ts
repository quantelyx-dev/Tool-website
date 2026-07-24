import { faker } from '@faker-js/faker';

export type IpVersion = 'v4' | 'v6';

export type GeneratedIp = {
  ip: string;
  version: IpVersion;
};

export function generateRandomIp(version: IpVersion): GeneratedIp {
  const ip = version === 'v4' ? faker.internet.ipv4() : faker.internet.ipv6();
  return { ip, version };
}

export function generateRandomIpBulk(
  count: number,
  version: IpVersion,
): GeneratedIp[] {
  if (count < 1) {
    return [];
  }

  return Array.from({ length: count }, () => generateRandomIp(version));
}
