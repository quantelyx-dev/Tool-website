import type { ToolContent } from '@/lib/tool-content/types';

export const developerToolContent: ToolContent[] = [
  {
    link: '/tools/cron-expression-generator',
    about: [
      'This tool builds cron expressions from presets or individual fields, explains each one in plain English, and previews the next five run times in the time zone you choose. It helps you check a schedule before you add it to a server, CI workflow, or job scheduler.',
    ],
    steps: [
      'Choose the standard five-field format or the six-field format with seconds.',
      'Pick a preset such as daily or weekdays, or choose Custom and set each field.',
      'Select the time zone used for the preview.',
      'Check the description and next run times, then copy the expression.',
    ],
    howItWorks: [
      'A cron expression is a list of fields separated by spaces. In the five-field form they are, in order:',
    ],
    howItWorksList: [
      'Minute: 0 to 59.',
      'Hour: 0 to 23.',
      'Day of month: 1 to 31.',
      'Month: 1 to 12.',
      'Day of week: 0 to 6, where 0 is Sunday.',
      'The six-field form adds seconds (0 to 59) at the front.',
      'An asterisk means every value. */15 means every 15th value starting from the lowest. 9-17 is an inclusive range, and 1,15 is a list.',
    ],
    example: [
      'To run a report at 8:30 in the morning from Monday to Friday, the expression is 30 8 * * 1-5. The minute is 30, the hour is 8, any day of the month and any month are allowed, and the day of week runs from 1 (Monday) to 5 (Friday).',
      'In the six-field form the same schedule is 0 30 8 * * 1-5. If you evaluate it after 8:30 on a Friday, the next run is the following Monday. An expression such as */15 * * * * runs at minutes 0, 15, 30, and 45 of every hour.',
    ],
    limitations: [
      'A cron expression contains no time zone. The scheduler that runs it decides which zone applies, and GitHub Actions schedules use UTC unless you configure a time zone. Daylight saving changes can skip or repeat a local time.',
      'Dialects differ. Quartz uses a ? in one of the day fields and numbers weekdays differently, and some systems support extras such as L, W, or names that the builder does not create. In standard cron, when both day-of-month and day-of-week are restricted, the job runs when either one matches. Always confirm a new schedule against your scheduler’s own documentation.',
    ],
    related: [
      '/tools/regex-tester',
      '/tools/json-formatter-validator',
      '/tools/generate-random-uuids',
    ],
  },
  {
    link: '/tools/regex-tester',
    about: [
      'The regex tester runs a regular expression against your sample text and shows every match, its position, and its capture groups as you type. Use it to build validation patterns, extract values from logs, or work out why a pattern matches more or less than you expected.',
    ],
    steps: [
      'Type the pattern without surrounding slashes.',
      'Turn flags on or off.',
      'Paste sample text that includes both values that should match and values that should not.',
      'Read the highlighted matches and the table of groups, then adjust the pattern.',
    ],
    howItWorks: [
      'The tester builds a standard JavaScript RegExp in your browser, so behavior matches the engine your browser uses. If the pattern is not valid, the engine’s error message is shown. With the g flag it keeps searching from the end of the previous match, and it moves forward by one position after an empty match to avoid an endless loop. Without g it stops at the first match. It lists at most 1,000 matches.',
    ],
    howItWorksList: [
      'g finds all matches and i ignores letter case.',
      'm makes ^ and $ match at the start and end of each line.',
      's lets the dot match line breaks.',
      'u treats the pattern as Unicode code points.',
      'y matches only at the current position.',
    ],
    example: [
      'The pattern (\\d{4})-(\\d{2})-(\\d{2}) with the g flag, applied to “Released 2024-01-15, patched 2024-03-02.”, finds two matches. The first is 2024-01-15 at index 9, with groups 2024, 01, and 15. The second is 2024-03-02 at index 29. Indexes count from zero.',
      'The pattern checks only the shape. It would also match 2024-99-99, so a program still needs to confirm that the month and day form a real date.',
    ],
    limitations: [
      'Other regex engines differ. PCRE, Python, Go, Java, and .NET have different syntax and features, so retest in your target language. Patterns with nested repetition, such as (a+)+$, can take an extremely long time on some inputs and freeze the tab. The same pattern could be abused in a server to cause a denial of service. The tester does not perform replacements or explain patterns token by token. A pattern that works on a small sample can still fail on real data, so include edge cases such as empty strings, extra spaces, and non-English characters.',
    ],
    related: [
      '/tools/json-formatter-validator',
      '/tools/base64-encoder-decoder',
      '/tools/cron-expression-generator',
    ],
  },
  {
    link: '/tools/base64-encoder-decoder',
    about: [
      'This tool encodes and decodes Base64 text, turns files and images into data URIs with a preview, converts Base64 back into files, and decodes the readable parts of a JSON Web Token (JWT). All processing happens in your browser.',
    ],
    steps: [
      'Open the Text, File and image, or JWT tab.',
      'Paste text or a token, or choose a file of up to 5 MB.',
      'For text, switch the URL-safe and padding options to match your target system.',
      'Copy the result or download the decoded file.',
    ],
    howItWorks: [
      'Base64 represents binary data using 64 characters: A to Z, a to z, 0 to 9, plus, and slash. Text is first converted to UTF-8 bytes. Every three bytes (24 bits) are split into four groups of six bits, and each group selects one character. When the final group has one or two bytes, = signs pad the output to a multiple of four characters. The result is about one third larger than the input.',
      'The URL-safe variant uses - instead of + and _ instead of /, and often leaves out padding. A JWT is three URL-safe segments separated by dots: a header, a payload, and a signature. The first two decode to JSON. The tool reads the exp, nbf, and iat times and says whether the token appears expired or not yet valid.',
    ],
    example: [
      'The text Hi! is the bytes 48 69 21 in hexadecimal. In binary that is 01001000 01101001 00100001. Regrouped into six bits it becomes 010010, 000110, 100100, and 100001, which are the values 18, 6, 36, and 33. Those positions in the Base64 alphabet are S, G, k, and h, so the encoded result is SGkh.',
      'Encoding the two-byte text Hi gives SGk=, where the single = shows that one byte of padding was needed.',
    ],
    limitations: [
      'Base64 is encoding, not encryption. Anyone can reverse it, so it does not protect passwords or keys. Decoding a JWT does not verify its signature: a forged token decodes just as easily, so never trust claims until your server has verified them with the correct key. Decoded bytes that are not valid UTF-8 cannot be shown as text; use the file tab for binary data. Large files increase memory use and make data URIs impractical inside web pages.',
    ],
    related: [
      '/tools/json-formatter-validator',
      '/tools/regex-tester',
      '/tools/generate-random-uuids',
    ],
    sources: [{ label: 'RFC 4648: Base16, Base32, and Base64 encodings', href: 'https://www.rfc-editor.org/rfc/rfc4648' }],
  },
  {
    link: '/tools/json-formatter-validator',
    about: [
      'The JSON formatter and validator checks whether text is valid JSON, points to the line and column of the first syntax error, and formats or minifies valid documents. It also shows data as a collapsible tree and generates TypeScript interfaces from its structure. Everything runs in your browser.',
    ],
    steps: [
      'Paste JSON into the input box.',
      'If there is an error, jump to the reported position and fix it.',
      'Format or minify the document, optionally sorting object keys.',
      'Switch to the tree view or the TypeScript tab, then copy or download the output.',
    ],
    howItWorks: [
      'Valid input is parsed with the browser’s JSON.parse. When parsing fails, the tool runs its own character-by-character check of the JSON grammar, because browser error messages differ and do not always include a position. It reports the first problem with its line, column, and reason.',
      'Strict JSON requires double-quoted property names and strings. It does not allow comments, trailing commas, single quotes, undefined, NaN, or Infinity.',
      'For TypeScript, the tool walks the parsed value. Each object shape becomes an interface named after its property, identical shapes are reused, arrays become array types, and property names that are not valid identifiers are quoted. Statistics include size in bytes, nesting depth, and counts of keys and value types.',
    ],
    example: [
      'The input {"a":1,} is rejected at line 1, column 8, with the message that a double-quoted property name was expected. Removing the trailing comma fixes it.',
      'The valid input {"user":{"id":7,"tags":["a","b"]}} produces an interface Root with a property user of type User, and an interface User with id: number and tags: string[].',
    ],
    limitations: [
      'Types are inferred only from the sample you paste. A field that is optional or sometimes null in real responses will not be marked that way unless the sample shows it, so review the output against your API documentation. The tool does not validate against JSON Schema.',
      'JavaScript numbers lose precision above 9,007,199,254,740,991, so very large integer IDs can change when reformatted. Keep such values as strings. Very large documents can make the tree view slow. Duplicate keys in an object are accepted by JSON.parse, and only the last value is kept.',
    ],
    related: [
      '/tools/base64-encoder-decoder',
      '/tools/regex-tester',
      '/tools/cron-expression-generator',
    ],
  },
  {
    link: '/tools/text-to-speech-generator',
    about: [
      'The text to speech generator turns a written script into spoken audio with one of 12 AI voices. You can preview each voice, adjust delivery, listen on the page, and download an MP3 to use as narration in a video, presentation, or draft.',
    ],
    steps: [
      'Start from a quick-start style or paste your own script of 200 to 1,000 characters.',
      'Preview voices and choose one.',
      'Optionally open the fine-tune settings for quality, speed, and stability.',
      'Generate the speech, listen to it, and download the MP3.',
    ],
    howItWorks: [
      'Your text and settings are sent to our server, which forwards them to the Start The Vision service to generate audio with ElevenLabs voices. The page checks for the finished clip, and the audio is streamed back through our server. We do not save your text or audio.',
      'Speed ranges from 0.7× to 1.2×. Stability controls how consistent the delivery is: lower values sound more expressive and varied, higher values more even. The three quality choices trade expressiveness for faster results.',
      'The length estimate assumes about 14.5 characters per second at normal speed, then divides by your speed setting. It also tells you whether the estimate fits a 15, 30, 60, or 90 second video.',
      'Each visitor can create 6 clips per day, and the allowance resets at midnight UTC. Shared network and site-wide limits also apply to prevent abuse.',
    ],
    example: [
      'A 435-character script at 1.0× is estimated at 435 ÷ 14.5 = 30 seconds. At 1.1×, the same script is about 435 ÷ 15.95, or 27 seconds. If your video must be exactly 30 seconds, the faster setting leaves a few seconds for a title card.',
      'For clearer narration, write numbers and abbreviations the way you want them spoken, and use short sentences with normal punctuation to create natural pauses.',
    ],
    limitations: [
      'The duration is an estimate; actual timing depends on the voice, punctuation, and wording. AI voices can mispronounce names, acronyms, and unusual words, so listen to the whole clip before publishing. Because your text is processed by an outside provider, do not enter passwords, personal data, or confidential material. Only use text you have the right to use, check the provider’s terms before commercial use, and never use generated speech to impersonate a real person or mislead listeners.',
    ],
    related: [
      '/tools/generate-random-names',
      '/tools/json-formatter-validator',
      '/tools/base64-encoder-decoder',
    ],
  },
];
