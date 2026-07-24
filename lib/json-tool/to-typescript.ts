function toPascalCase(hint: string): string {
  const cleaned = hint.replace(/[^a-zA-Z0-9]+/g, ' ').trim();
  if (!cleaned) return 'Value';
  const pascal = cleaned
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return /^[0-9]/.test(pascal) ? `_${pascal}` : pascal;
}

function isValidIdentifier(key: string): boolean {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
}

function quoteKeyIfNeeded(key: string): string {
  return isValidIdentifier(key) ? key : JSON.stringify(key);
}

/** Structural signature so identically-shaped objects reuse one interface
 * instead of generating a duplicate for every array element. */
function shapeSignature(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) {
    return `[${value.map(shapeSignature).join(',')}]`;
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value as Record<string, unknown>).sort();
    return `{${keys
      .map(key => `${key}:${shapeSignature((value as Record<string, unknown>)[key])}`)
      .join(',')}}`;
  }
  return typeof value;
}

type GeneratedInterface = { name: string; body: string };

export function jsonToTypeScript(value: unknown, rootName = 'Root'): string {
  const interfaces: GeneratedInterface[] = [];
  const usedNames = new Set<string>();
  const objectCache = new Map<string, string>();

  const uniqueName = (base: string): string => {
    let name = base;
    let counter = 2;
    while (usedNames.has(name)) {
      name = `${base}${counter}`;
      counter++;
    }
    usedNames.add(name);
    return name;
  };

  const typeOf = (val: unknown, nameHint: string): string => {
    if (val === null) return 'null';

    if (Array.isArray(val)) {
      if (val.length === 0) return 'unknown[]';
      const elementHint = `${nameHint}Item`;
      const elementTypes = new Set<string>();
      for (const item of val) {
        elementTypes.add(typeOf(item, elementHint));
      }
      const union = Array.from(elementTypes).join(' | ');
      return elementTypes.size > 1 ? `(${union})[]` : `${union}[]`;
    }

    if (typeof val === 'object') {
      const signature = shapeSignature(val);
      const cached = objectCache.get(signature);
      if (cached) return cached;

      const interfaceName = uniqueName(toPascalCase(nameHint));
      objectCache.set(signature, interfaceName);

      const entries = Object.entries(val as Record<string, unknown>);
      if (entries.length === 0) {
        interfaces.push({ name: interfaceName, body: `interface ${interfaceName} {}` });
        return interfaceName;
      }

      const lines = entries.map(
        ([key, entryValue]) => `  ${quoteKeyIfNeeded(key)}: ${typeOf(entryValue, key)};`,
      );
      interfaces.push({
        name: interfaceName,
        body: `interface ${interfaceName} {\n${lines.join('\n')}\n}`,
      });
      return interfaceName;
    }

    if (typeof val === 'string') return 'string';
    if (typeof val === 'number') return 'number';
    if (typeof val === 'boolean') return 'boolean';
    return 'unknown';
  };

  const rootType = typeOf(value, rootName);
  const declarations = interfaces
    .slice()
    .reverse()
    .map(entry => entry.body);

  const rootIsNamedInterface = interfaces.some(
    entry => entry.name === rootType && entry === interfaces[interfaces.length - 1],
  );

  if (!rootIsNamedInterface) {
    declarations.push(`type ${uniqueName(toPascalCase(rootName))} = ${rootType};`);
  }

  return `${declarations.join('\n\n')}\n`;
}
