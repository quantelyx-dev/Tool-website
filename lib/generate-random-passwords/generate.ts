import zxcvbn from 'zxcvbn';

export type PasswordGenerationMode = 'single' | 'bulk';

export type PasswordGenerationOptions = {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
};

export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4;
  label: 'Very weak' | 'Weak' | 'Fair' | 'Strong' | 'Very strong';
  crackTimeDisplay: string;
  feedbackWarning: string;
  feedbackSuggestions: string[];
};

export type GeneratedPassword = {
  password: string;
  length: number;
  strength: PasswordStrength;
};

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()-_=+[]{}|;:,.<>?/`~';

function randomInt(maxExclusive: number): number {
  const max = Math.floor(maxExclusive);

  if (max <= 0) {
    return 0;
  }

  const cryptoObj = globalThis.crypto;

  if (!cryptoObj) {
    return Math.floor(Math.random() * max);
  }

  const maxUint32 = 2 ** 32;
  const threshold = maxUint32 - (maxUint32 % max);

  while (true) {
    const value = cryptoObj.getRandomValues(new Uint32Array(1))[0] ?? 0;

    if (value < threshold) {
      return value % max;
    }
  }
}

function scoreToLabel(score: number): PasswordStrength['label'] {
  if (score <= 0) {
    return 'Very weak';
  }

  if (score === 1) {
    return 'Weak';
  }

  if (score === 2) {
    return 'Fair';
  }

  if (score === 3) {
    return 'Strong';
  }

  return 'Very strong';
}

export function estimatePasswordStrength(password: string): PasswordStrength {
  const result = zxcvbn(password);

  return {
    score: result.score as 0 | 1 | 2 | 3 | 4,
    label: scoreToLabel(result.score),
    crackTimeDisplay: result.crack_times_display.offline_slow_hashing_1e4_per_second,
    feedbackWarning: result.feedback.warning,
    feedbackSuggestions: result.feedback.suggestions,
  };
}

function buildCharSets(options: PasswordGenerationOptions): string[] {
  const charSets: string[] = [];

  if (options.includeUppercase) {
    charSets.push(UPPERCASE_CHARS);
  }

  if (options.includeLowercase) {
    charSets.push(LOWERCASE_CHARS);
  }

  if (options.includeNumbers) {
    charSets.push(NUMBER_CHARS);
  }

  if (options.includeSymbols) {
    charSets.push(SYMBOL_CHARS);
  }

  return charSets;
}

function pickRandomChar(chars: string): string {
  const index = randomInt(chars.length);
  return chars[index] ?? '';
}

function shuffleString(value: string): string {
  const chars = value.split('');

  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    const current = chars[index] ?? '';
    chars[index] = chars[swapIndex] ?? '';
    chars[swapIndex] = current;
  }

  return chars.join('');
}

export function generatePassword(options: PasswordGenerationOptions): GeneratedPassword {
  const charSets = buildCharSets(options);

  if (charSets.length === 0) {
    throw new Error('Select at least one character type.');
  }

  if (options.length < charSets.length) {
    throw new Error('Length is too short for the selected character types.');
  }

  const allChars = charSets.join('');
  const parts: string[] = [];

  charSets.forEach(charSet => {
    parts.push(pickRandomChar(charSet));
  });

  const remainingCount = options.length - parts.length;

  for (let index = 0; index < remainingCount; index += 1) {
    parts.push(pickRandomChar(allChars));
  }

  const password = shuffleString(parts.join(''));

  return {
    password,
    length: password.length,
    strength: estimatePasswordStrength(password),
  };
}

export function generatePasswords(
  count: number,
  options: PasswordGenerationOptions,
): GeneratedPassword[] {
  if (count < 1) {
    return [];
  }

  return Array.from({ length: count }, () => generatePassword(options));
}
