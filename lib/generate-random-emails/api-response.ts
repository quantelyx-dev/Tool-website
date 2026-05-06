/** JSON bodies for GET /api/generate-random-emails — shared by route and clients. */

export type GenerateRandomEmailsSuccessBody = {
  ok: true;
  requested: number;
  count: number;
  emails: string[];
};

export type GenerateRandomEmailsErrorCode =
  | 'redis_unconfigured'
  | 'randomuser_error';

export type GenerateRandomEmailsErrorBody = {
  ok: false;
  error: string;
  code?: GenerateRandomEmailsErrorCode;
};

export type GenerateRandomEmailsJsonBody =
  | GenerateRandomEmailsSuccessBody
  | GenerateRandomEmailsErrorBody;
