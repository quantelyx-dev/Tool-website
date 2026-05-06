/** JSON bodies for GET /api/generate-random-names — shared by route and clients. */

export type RandomNameType = 'firstName' | 'lastName' | 'fullName';

export type GenerateRandomNamesSuccessBody = {
  ok: true;
  requested: number;
  count: number;
  nameType: RandomNameType;
  names: string[];
};

export type GenerateRandomNamesErrorCode =
  | 'redis_unconfigured'
  | 'randomuser_error';

export type GenerateRandomNamesErrorBody = {
  ok: false;
  error: string;
  code?: GenerateRandomNamesErrorCode;
};

export type GenerateRandomNamesJsonBody =
  | GenerateRandomNamesSuccessBody
  | GenerateRandomNamesErrorBody;
