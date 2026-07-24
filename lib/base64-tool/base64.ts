export type Base64Options = {
  urlSafe: boolean;
  padding: boolean;
};

export type Base64DecodeResult =
  | { ok: true; bytes: Uint8Array }
  | { ok: false; error: string };

export type TextDecodeResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

const CHUNK_SIZE = 0x8000;

function bytesToBinaryString(bytes: Uint8Array): string {
  let result = '';
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const chunk = bytes.subarray(i, i + CHUNK_SIZE);
    result += String.fromCharCode(...chunk);
  }
  return result;
}

function applyUrlSafeAlphabet(base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_');
}

function revertUrlSafeAlphabet(base64: string): string {
  return base64.replace(/-/g, '+').replace(/_/g, '/');
}

function stripPadding(base64: string): string {
  return base64.replace(/=+$/, '');
}

function restorePadding(base64: string): string {
  const remainder = base64.length % 4;
  if (remainder === 0) {
    return base64;
  }
  return base64 + '='.repeat(4 - remainder);
}

export function bytesToBase64(
  bytes: Uint8Array,
  options: Base64Options,
): string {
  let base64 = btoa(bytesToBinaryString(bytes));

  if (options.urlSafe) {
    base64 = applyUrlSafeAlphabet(base64);
  }

  if (!options.padding) {
    base64 = stripPadding(base64);
  }

  return base64;
}

export function base64ToBytes(input: string): Base64DecodeResult {
  const trimmed = input.replace(/\s+/g, '');

  if (trimmed === '') {
    return { ok: true, bytes: new Uint8Array(0) };
  }

  const normalized = restorePadding(revertUrlSafeAlphabet(trimmed));

  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized)) {
    return {
      ok: false,
      error: 'Contains characters outside the Base64 alphabet.',
    };
  }

  try {
    const binaryString = atob(normalized);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return { ok: true, bytes };
  } catch {
    return {
      ok: false,
      error: 'Invalid Base64 input — check the length and padding.',
    };
  }
}

export function encodeTextToBase64(
  text: string,
  options: Base64Options,
): string {
  return bytesToBase64(new TextEncoder().encode(text), options);
}

export function decodeBase64ToText(input: string): TextDecodeResult {
  const decoded = base64ToBytes(input);

  if (!decoded.ok) {
    return decoded;
  }

  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(
      decoded.bytes,
    );
    return { ok: true, text };
  } catch {
    return {
      ok: false,
      error: 'Decoded bytes are not valid UTF-8 text — this may be binary data. Try the File & image tab instead.',
    };
  }
}
