export type JsonParseError = {
  message: string;
  index: number;
  line: number;
  column: number;
};

export type JsonParseResult =
  | { ok: true; value: unknown }
  | { ok: false; error: JsonParseError };

const WHITESPACE = new Set([' ', '\t', '\n', '\r']);

class JsonScanError extends Error {
  index: number;

  constructor(message: string, index: number) {
    super(message);
    this.index = index;
  }
}

/**
 * Hand-rolled recursive-descent JSON validator used only to locate the exact
 * line/column of a syntax error. Native JSON.parse error messages vary across
 * browsers (and even Node versions) and often omit a position entirely, so we
 * can't rely on them for a "jump to error" experience.
 */
function scanJson(input: string): void {
  let i = 0;
  const len = input.length;

  const fail = (message: string, at: number = i): never => {
    throw new JsonScanError(message, at);
  };

  const skipWhitespace = () => {
    while (i < len && WHITESPACE.has(input[i])) i++;
  };

  const expect = (char: string) => {
    if (input[i] !== char) {
      fail(
        input[i] === undefined
          ? `Unexpected end of input, expected '${char}'`
          : `Expected '${char}' but found '${input[i]}'`,
      );
    }
    i++;
  };

  const parseString = () => {
    expect('"');
    while (true) {
      if (i >= len) fail('Unterminated string literal', i);
      const c = input[i];
      if (c === '"') {
        i++;
        return;
      }
      if (c === '\\') {
        const escape = input[i + 1];
        if (escape === undefined) fail('Unterminated escape sequence', i);
        if ('"\\/bfnrt'.includes(escape)) {
          i += 2;
          continue;
        }
        if (escape === 'u') {
          const hex = input.slice(i + 2, i + 6);
          if (hex.length < 4 || !/^[0-9a-fA-F]{4}$/.test(hex)) {
            fail('Invalid unicode escape sequence, expected 4 hex digits', i);
          }
          i += 6;
          continue;
        }
        fail(`Invalid escape character '\\${escape}'`, i);
      }
      const code = c.charCodeAt(0);
      if (code < 0x20) {
        fail('Control characters must be escaped inside strings', i);
      }
      i++;
    }
  };

  const parseNumber = () => {
    const start = i;
    if (input[i] === '-') i++;
    if (input[i] === '0') {
      i++;
    } else if (input[i] >= '1' && input[i] <= '9') {
      while (input[i] >= '0' && input[i] <= '9') i++;
    } else {
      fail('Invalid number: expected a digit', i);
    }
    if (input[i] === '.') {
      i++;
      if (!(input[i] >= '0' && input[i] <= '9')) {
        fail('Invalid number: expected a digit after decimal point', i);
      }
      while (input[i] >= '0' && input[i] <= '9') i++;
    }
    if (input[i] === 'e' || input[i] === 'E') {
      i++;
      if (input[i] === '+' || input[i] === '-') i++;
      if (!(input[i] >= '0' && input[i] <= '9')) {
        fail('Invalid number: expected a digit in exponent', i);
      }
      while (input[i] >= '0' && input[i] <= '9') i++;
    }
    if (i === start) fail('Invalid number', i);
  };

  const parseLiteral = (literal: string) => {
    if (input.startsWith(literal, i)) {
      i += literal.length;
      return;
    }
    fail(`Unexpected token, expected '${literal}'`, i);
  };

  const parseValue = () => {
    skipWhitespace();
    const c = input[i];
    if (c === '{') return parseObject();
    if (c === '[') return parseArray();
    if (c === '"') return parseString();
    if (c === '-' || (c >= '0' && c <= '9')) return parseNumber();
    if (c === 't') return parseLiteral('true');
    if (c === 'f') return parseLiteral('false');
    if (c === 'n') return parseLiteral('null');
    if (c === undefined) {
      fail('Unexpected end of input, expected a value', i);
    }
    fail(
      `Unexpected token '${c}', expected a value (object, array, string, number, true, false, or null)`,
      i,
    );
  };

  function parseObject() {
    expect('{');
    skipWhitespace();
    if (input[i] === '}') {
      i++;
      return;
    }
    while (true) {
      skipWhitespace();
      if (input[i] !== '"') {
        fail(
          input[i] === undefined
            ? 'Unexpected end of input, expected a double-quoted property name'
            : `Expected a double-quoted property name but found '${input[i]}'`,
        );
      }
      parseString();
      skipWhitespace();
      expect(':');
      parseValue();
      skipWhitespace();
      if (input[i] === ',') {
        i++;
        continue;
      }
      if (input[i] === '}') {
        i++;
        return;
      }
      fail(
        input[i] === undefined
          ? "Unexpected end of input, expected ',' or '}'"
          : `Expected ',' or '}' but found '${input[i]}'`,
      );
    }
  }

  function parseArray() {
    expect('[');
    skipWhitespace();
    if (input[i] === ']') {
      i++;
      return;
    }
    while (true) {
      parseValue();
      skipWhitespace();
      if (input[i] === ',') {
        i++;
        continue;
      }
      if (input[i] === ']') {
        i++;
        return;
      }
      fail(
        input[i] === undefined
          ? "Unexpected end of input, expected ',' or ']'"
          : `Expected ',' or ']' but found '${input[i]}'`,
      );
    }
  }

  skipWhitespace();
  if (i >= len) fail('Input is empty', 0);
  parseValue();
  skipWhitespace();
  if (i < len) {
    fail(`Unexpected trailing content after the JSON value: '${input[i]}'`, i);
  }
}

function locate(input: string, index: number): { line: number; column: number } {
  let line = 1;
  let column = 1;
  const clamped = Math.min(index, input.length);
  for (let k = 0; k < clamped; k++) {
    if (input[k] === '\n') {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return { line, column };
}

export function parseJson(input: string): JsonParseResult {
  try {
    return { ok: true, value: JSON.parse(input) };
  } catch {
    try {
      scanJson(input);
      // Our scanner didn't find a problem but native parsing failed anyway —
      // fall back to a generic error at the start of the input.
      return {
        ok: false,
        error: { message: 'Invalid JSON', index: 0, line: 1, column: 1 },
      };
    } catch (scanError) {
      const index = scanError instanceof JsonScanError ? scanError.index : 0;
      const message =
        scanError instanceof Error ? scanError.message : 'Invalid JSON';
      const { line, column } = locate(input, index);
      return { ok: false, error: { message, index, line, column } };
    }
  }
}
