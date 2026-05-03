export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `Request failed (${status})`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

async function readJsonBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export type PostJsonOptions = Omit<RequestInit, 'body' | 'method'>;

/**
 * POST helper using native fetch. Relative URLs resolve against the current origin in the browser.
 */
export async function postJson<TResponse>(
  url: string,
  body: unknown,
  init?: PostJsonOptions,
): Promise<TResponse> {
  const { signal, headers, ...rest } = init ?? {};

  const extraHeaders =
    headers === undefined
      ? {}
      : headers instanceof Headers
        ? Object.fromEntries(headers.entries())
        : Array.isArray(headers)
          ? Object.fromEntries(headers)
          : headers;

  const res = await fetch(url, {
    ...rest,
    signal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });

  const payload = await readJsonBody(res);

  if (!res.ok) {
    throw new ApiError(res.status, payload);
  }

  return payload as TResponse;
}
