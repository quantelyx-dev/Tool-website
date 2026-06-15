export type GenerationMode = 'single' | 'bulk';

type BulkCountRegistry = {
  10: '10';
  20: '20';
  50: '50';
  100: '100';
  200: '200';
  500: '500';
};

export type BulkCount = BulkCountRegistry[keyof BulkCountRegistry];

export type BulkCountFor<Keys extends keyof BulkCountRegistry> =
  Pick<BulkCountRegistry, Keys>[Keys];

export type StandardBulkCount = BulkCountFor<10 | 50 | 100 | 200>;
export type PasswordBulkCount = BulkCountFor<10 | 20 | 50 | 100>;

export type CopyState = 'idle' | 'copied' | 'failed';
