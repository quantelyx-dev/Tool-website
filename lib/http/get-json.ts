import { ApiError, readJsonBody } from './post-json';

export type GetJsonOptions = Omit<RequestInit, 'body' | 'method'>;

/**
 * GET helper using native fetch. Throws {@link ApiError} for non-2xx responses.
 */
export async function getJson<TResponse>(
  url: string,
  init?: GetJsonOptions,
): Promise<TResponse> {
  const res = await fetch(url, {
    ...init,
    method: 'GET',
    headers: { Accept: 'application/json', ...init?.headers },
  });

  const payload = await readJsonBody(res);

  if (!res.ok) {
    throw new ApiError(res.status, payload);
  }

  return payload as TResponse;
}
