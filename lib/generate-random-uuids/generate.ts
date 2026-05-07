import { v7 } from 'uuid';

export type GeneratedUuid = {
  uuid: string;
};

export function generateUuidV7(): GeneratedUuid {
  return {
    uuid: v7(),
  };
}

export function generateUuidV7Bulk(count: number): GeneratedUuid[] {
  if (count < 1) {
    return [];
  }

  return Array.from({ length: count }, () => generateUuidV7());
}
