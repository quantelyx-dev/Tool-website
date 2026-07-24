export type JsonNodeType =
  | 'object'
  | 'array'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null';

export function getJsonNodeType(value: unknown): JsonNodeType {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  return 'boolean';
}

export function isContainer(value: unknown): value is Record<string, unknown> | unknown[] {
  const type = getJsonNodeType(value);
  return type === 'object' || type === 'array';
}

export function formatPrimitive(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string') return JSON.stringify(value);
  return String(value);
}

/** Every JSONPath-style path (e.g. `$.users[0].name`) that points at an
 * object or array, used to drive expand-all / collapse-all in the tree view. */
export function collectContainerPaths(value: unknown, path = '$', acc: string[] = []): string[] {
  if (!isContainer(value)) return acc;

  acc.push(path);

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectContainerPaths(item, `${path}[${index}]`, acc));
  } else {
    for (const [key, entryValue] of Object.entries(value)) {
      const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? `.${key}` : `[${JSON.stringify(key)}]`;
      collectContainerPaths(entryValue, `${path}${safeKey}`, acc);
    }
  }

  return acc;
}
