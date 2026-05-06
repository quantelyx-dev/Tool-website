/** JSON bodies for GET /api/generate-random-usernames — shared by route and clients. */

export type GenerateRandomUsernamesSuccessBody = {
  ok: true;
  requested: number;
  count: number;
  usernames: string[];
};

export type GenerateRandomUsernamesErrorCode =
  | 'redis_unconfigured'
  | 'randomuser_error';

export type GenerateRandomUsernamesErrorBody = {
  ok: false;
  error: string;
  code?: GenerateRandomUsernamesErrorCode;
};

export type GenerateRandomUsernamesJsonBody =
  | GenerateRandomUsernamesSuccessBody
  | GenerateRandomUsernamesErrorBody;
