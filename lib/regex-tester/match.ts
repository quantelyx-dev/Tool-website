export type RegexMatch = {
  fullMatch: string;
  index: number;
  groups: (string | undefined)[];
};

export type RegexMatchResult = {
  matches: RegexMatch[];
  matchCount: number;
  hasGlobalFlag: boolean;
};

export type RegexExecuteError = {
  error: string;
};

export function isRegexError(
  result: RegexMatchResult | RegexExecuteError,
): result is RegexExecuteError {
  return "error" in result;
}

const MAX_MATCHES = 1000;

export function executeRegex(
  pattern: string,
  flags: string,
  input: string,
): RegexMatchResult | RegexExecuteError {
  if (!pattern) {
    return { matches: [], matchCount: 0, hasGlobalFlag: flags.includes("g") };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags);
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Invalid regular expression",
    };
  }

  const hasGlobalFlag = flags.includes("g");
  const matches: RegexMatch[] = [];

  if (hasGlobalFlag) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(input)) !== null && matches.length < MAX_MATCHES) {
      const groups: (string | undefined)[] = [];
      for (let g = 1; g < match.length; g++) {
        groups.push(match[g]);
      }
      matches.push({ fullMatch: match[0], index: match.index, groups });
      if (match[0].length === 0) {
        regex.lastIndex++;
        if (regex.lastIndex > input.length) break;
      }
    }
  } else {
    const match = regex.exec(input);
    if (match !== null) {
      const groups: (string | undefined)[] = [];
      for (let g = 1; g < match.length; g++) {
        groups.push(match[g]);
      }
      matches.push({ fullMatch: match[0], index: match.index, groups });
    }
  }

  return { matches, matchCount: matches.length, hasGlobalFlag };
}
