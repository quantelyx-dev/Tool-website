export type ParsedDataUri = {
  mime: string;
  base64: string;
};

const DATA_URI_PATTERN = /^data:([^;,]*)(;charset=[^;,]+)?(;base64)?,([\s\S]*)$/i;

export function buildDataUri(mime: string, base64: string): string {
  return `data:${mime};base64,${base64}`;
}

export function parseDataUri(value: string): ParsedDataUri | null {
  const match = DATA_URI_PATTERN.exec(value.trim());

  if (!match || !match[3]) {
    return null;
  }

  const mime = match[1] || 'application/octet-stream';
  return { mime, base64: match[4] };
}
