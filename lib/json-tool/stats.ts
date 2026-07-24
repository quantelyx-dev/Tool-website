export type JsonStats = {
  sizeBytes: number;
  maxDepth: number;
  objectCount: number;
  arrayCount: number;
  stringCount: number;
  numberCount: number;
  booleanCount: number;
  nullCount: number;
  keyCount: number;
};

function walk(value: unknown, depth: number, stats: JsonStats): number {
  if (Array.isArray(value)) {
    stats.arrayCount++;
    if (value.length === 0) return depth;
    return Math.max(...value.map(item => walk(item, depth + 1, stats)));
  }

  if (value !== null && typeof value === 'object') {
    stats.objectCount++;
    const entries = Object.entries(value as Record<string, unknown>);
    stats.keyCount += entries.length;
    if (entries.length === 0) return depth;
    return Math.max(
      ...entries.map(([, entryValue]) => walk(entryValue, depth + 1, stats)),
    );
  }

  if (typeof value === 'string') stats.stringCount++;
  else if (typeof value === 'number') stats.numberCount++;
  else if (typeof value === 'boolean') stats.booleanCount++;
  else if (value === null) stats.nullCount++;

  return depth;
}

export function computeJsonStats(value: unknown, rawInput: string): JsonStats {
  const stats: JsonStats = {
    sizeBytes: new TextEncoder().encode(rawInput).length,
    maxDepth: 0,
    objectCount: 0,
    arrayCount: 0,
    stringCount: 0,
    numberCount: 0,
    booleanCount: 0,
    nullCount: 0,
    keyCount: 0,
  };

  stats.maxDepth = walk(value, 1, stats);
  return stats;
}
