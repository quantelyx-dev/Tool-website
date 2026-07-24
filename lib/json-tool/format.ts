export type JsonIndent = '2' | '4' | 'tab' | 'minify';

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortKeysDeep);
  }
  if (value !== null && typeof value === 'object') {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      sorted[key] = sortKeysDeep((value as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return value;
}

export function formatJsonValue(
  value: unknown,
  indent: JsonIndent,
  sortKeys: boolean,
): string {
  const prepared = sortKeys ? sortKeysDeep(value) : value;

  if (indent === 'minify') {
    return JSON.stringify(prepared);
  }

  const space = indent === 'tab' ? '\t' : Number(indent);
  return JSON.stringify(prepared, null, space);
}
