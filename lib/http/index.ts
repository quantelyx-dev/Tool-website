/**
 * Shared JSON-over-fetch primitives. Each feature exposes typed calls from
 * `lib/<feature>/api.ts` using {@link postJson}.
 */
export { ApiError, postJson } from './post-json';
export type { PostJsonOptions } from './post-json';
