import type { ToolContent } from '@/lib/tool-content/types';

export const dataToolContent: ToolContent[] = [
  {
    link: '/tools/generate-random-usernames',
    disclaimer: 'test-data',
    about: [
      'The random username generator returns batches of readable, human-style usernames for filling test databases, demo dashboards, and interface mockups. Names that look natural show layout problems that placeholders such as user1 and user2 tend to hide, like truncation in narrow columns or awkward line breaks.',
    ],
    steps: [
      'Choose a batch size of 10, 50, 100, 500, or 1,000.',
      'Press Generate and wait for the list to load.',
      'Copy the batch as comma-separated text and paste it into a seed script or spreadsheet.',
      'Generate again for a reshuffled selection.',
    ],
    howItWorks: [
      'Our server keeps a pool of up to 1,000 sample identities from randomuser.me, a public service that produces made-up user profiles. The pool is cached for 24 hours, so most requests do not contact that service again.',
      'For each identity, the first and last names are converted to lowercase, accents are removed, and anything other than letters and digits is dropped. A random number from 100 to 999 is added. If the cleaned name is shorter than three characters, the sample login name from the source is used instead.',
      'The pool is shuffled when it is stored and each batch is shuffled again before it is returned, so the order differs between requests. Requesting a batch does not remove entries from the pool.',
    ],
    example: [
      'A sample identity named Zoë O’Brien becomes the base zoeobrien: the accent on the e is removed, the apostrophe is dropped, and everything is lowercased. With a suffix of 427, the username is zoeobrien427.',
      'For a test of a members table, generate 500 usernames, paste them into a spreadsheet, split the comma-separated text into rows, and add your own ID and role columns. You now have a realistic fixture without copying any customer data.',
    ],
    limitations: [
      'Usernames are not guaranteed to be unique. Batches come from a shared pool of limited size, so repeats across separate requests are expected, and duplicates are possible inside very large sets. Deduplicate before loading data into a column with a unique constraint.',
      'The generator does not check whether a username is available or already taken on any service, and it has no options for length, symbols, or themes. A generated string could match a real person’s handle by coincidence, so do not use these values to create accounts on other websites or to contact anyone. For production accounts, let real users choose their names and enforce your own uniqueness and moderation rules.',
    ],
    related: [
      '/tools/generate-random-emails',
      '/tools/generate-random-names',
      '/tools/generate-random-passwords',
    ],
  },
  {
    link: '/tools/generate-random-emails',
    disclaimer: 'test-data',
    about: [
      'The random email generator produces test email addresses that look realistic but sit only on example.com, example.net, and example.org. Those domains are reserved for documentation and testing, so a list generated here can pass through a staging system without any message reaching a real person’s inbox.',
    ],
    steps: [
      'Choose how many addresses you need, up to 1,000.',
      'Press Generate.',
      'Copy the list as comma-separated text.',
      'Paste it into your fixtures, mockups, import file, or test script.',
    ],
    howItWorks: [
      'Addresses come from a pool of up to 1,000 sample identities that our server obtains from randomuser.me and caches for 24 hours. Before any address is returned, the server keeps the part before the @ sign, removes characters outside letters, digits, dots, underscores, plus signs, and hyphens, and then forces the domain to one of the three reserved ones.',
      'The domain is chosen from the characters of the local part, so a given sample name always maps to the same domain. This enforcement happens in our code, so it holds even if the upstream source changes its output.',
      'RFC 2606 reserves example.com, example.net, and example.org for exactly this purpose. They cannot be registered by anyone else, which is why they are safer than invented domains that someone could buy tomorrow.',
    ],
    example: [
      'A sample identity with the address maria.lopez@some-provider.test is returned as maria.lopez on a reserved domain, for example maria.lopez@example.org. The local part stays readable, and the domain is guaranteed to be safe.',
      'To test a sign-up form’s duplicate check, generate 100 addresses, submit one of them twice, and confirm that the second attempt is rejected. To test column widths, sort the list by length and paste the longest addresses into your table.',
    ],
    limitations: [
      'These addresses cannot receive mail. Do not use them to test delivery, verification links, or one-time codes. Use your email provider’s sandbox or a mail-catching tool for that. Some validation services and sign-up forms deliberately reject example domains, which is expected behavior.',
      'Addresses are not guaranteed to be unique across batches because they come from a shared cached pool. If you need strict uniqueness, add a plus tag or row number to the local part in your own script before importing.',
    ],
    related: [
      '/tools/generate-random-usernames',
      '/tools/generate-random-names',
      '/tools/generate-random-phone-numbers',
    ],
  },
  {
    link: '/tools/generate-random-names',
    disclaimer: 'test-data',
    about: [
      'The random name generator creates batches of first names, last names, or full names for test records, prototypes, and fiction drafts. Using varied names instead of repeating John Doe helps you see how an interface handles different lengths, accents, and spellings.',
    ],
    steps: [
      'Choose first names, last names, or full names.',
      'Choose a batch size of up to 1,000.',
      'Press Generate.',
      'Copy the list as comma-separated text for a spreadsheet, SQL script, or fixture file.',
    ],
    howItWorks: [
      'Our server stores up to 1,000 sample identities obtained from randomuser.me, which draws names from several nationalities. The pool is cached for 24 hours. When you request names, the server takes the number you asked for, shuffles them, and returns the part you chose.',
      'A full name is the sample identity’s first name followed by its last name with a single space. Choosing first names or last names returns only that field, so you can fill separate database columns independently and combine them in whatever way your test needs.',
      'Because the names arrive with their original spelling, some contain accented letters or non-Latin characters. That is useful: it exposes encoding, sorting, and search bugs that plain ASCII test data never reaches.',
    ],
    example: [
      'Suppose you are testing a customer list that shows “Last, First”. Generate 100 full names, load them into your staging table, and sort by last name. Check that accented names sort where your users expect them, that long names do not push other columns off screen, and that searching without accents still finds accented records if that is your intent.',
      'For a quick profile card mockup, generate 10 full names and paste them into your design file. Replace the shortest and longest placeholders first, since those are the cases that usually break a layout.',
    ],
    limitations: [
      'The names are common combinations, so some will match real people by coincidence. They are not linked to any actual person’s data, and they must not be presented as real customers, reviewers, or witnesses.',
      'You cannot filter by country, gender, or language, and the same name can appear in more than one batch. The pool is not a statistical sample of any population, so do not use it to model demographics or to test fairness claims about real groups of people.',
    ],
    related: [
      '/tools/generate-random-usernames',
      '/tools/generate-random-emails',
      '/tools/generate-random-addresses',
    ],
  },
  {
    link: '/tools/generate-random-phone-numbers',
    disclaimer: 'test-data',
    about: [
      'This generator creates phone numbers for forms, mockups, and test records using only ranges that telephone regulators keep for fiction. It supports the United States, Canada, the United Kingdom, and Australian landlines. Countries without a reserved range that we could verify are deliberately left out, because a random number in an ordinary range could belong to someone.',
    ],
    steps: [
      'Choose a country. The reserved range for that country is shown under the selector.',
      'Press Generate.',
      'Copy the number in international, E.164, or national digit form.',
      'Generate again whenever you need another one.',
    ],
    howItWorks: [
      'The tool picks one reserved block for the country, then a random number inside it. The international form is spaced with the libphonenumber-js formatter. The E.164 form is the plus sign, the country code, and the digits with no spaces. The national field shows the digits without the country code or leading zero.',
    ],
    howItWorksList: [
      'United States and Canada: 555-0100 to 555-0199, kept for fictional use, combined with a real area code.',
      'United Kingdom: Ofcom’s drama blocks, including 020 7946 0000 to 0999, 07700 900000 to 900999, 01632 960000 to 960999, and the 496 0xxx blocks for several city codes.',
      'Australia: (02), (03), (07), and (08) 5550 xxxx landlines from the ACMA’s numbers for creative works.',
    ],
    example: [
      'With the United States selected, the tool might choose area code 415 and line 42. The result is +1 415 555 0142, with E.164 form +14155550142 and national digits 4155550142. A test of your database should store the E.164 value and format it only when displaying it.',
    ],
    limitations: [
      'These numbers are not meant to be called or texted, and they will not receive verification codes. For SMS or voice testing, use your telephony provider’s test numbers.',
      'Some validation libraries and carrier lookup services mark fiction numbers as invalid, because they are never assigned to subscribers. If your form rejects them, test the format rules separately. Each country’s pool is small, so values repeat in large data sets. Australian mobile numbers are not offered. Regulators can change their ranges, so check the official lists before relying on them for public media.',
    ],
    related: [
      '/tools/generate-random-addresses',
      '/tools/generate-random-emails',
      '/tools/generate-random-names',
    ],
    sources: [
      { label: 'NANPA: 555 line numbers', href: 'https://nanpa.com/numbering/555-line-numbers' },
      { label: 'Ofcom: numbers for use in TV and radio drama', href: 'https://www.ofcom.org.uk/phones-and-broadband/phone-numbers/numbers-for-drama' },
      { label: 'ACMA: phone numbers for use in creative works', href: 'https://www.acma.gov.au/phone-numbers-use-tv-shows-films-and-creative-works' },
    ],
  },
  {
    link: '/tools/generate-random-addresses',
    disclaimer: 'test-data',
    about: [
      'The random address generator builds made-up postal addresses for testing checkout forms, CRM layouts, import scripts, and printed templates. Each result has a street line, city, state, postal code, and country, plus a single formatted line that joins them.',
    ],
    steps: [
      'Choose single mode for one address or bulk mode for 10, 50, 100, or 200.',
      'Press Generate.',
      'Copy a single result as JSON, or download a bulk batch as a CSV file.',
      'Import the file into your test database or spreadsheet.',
    ],
    howItWorks: [
      'Addresses are assembled in your browser by the Faker library using its US English data set. The street line combines a building number with a generated street name. The city is a generated place name. The state is a two-letter US abbreviation, the postal code is drawn from that state’s ZIP range, and the country is always United States.',
      'The state and ZIP code are matched at the range level only. A generated ZIP code may be one the postal service has not assigned, and the city and street are made up independently, so they do not belong to that ZIP code.',
      'The formatted line follows this pattern: street, city, state and postal code, country. Nothing is sent to our servers, and no address database is consulted.',
    ],
    example: [
      'One result might have a street line such as 4821 Maple Crossing, a generated city, the state OH, and a ZIP code such as 44318, which falls in Ohio’s range. A validator that only compares state and ZIP prefix may accept it, while one that checks the city or street against postal data should reject it.',
      'To check a shipping form’s length limits, generate 200 addresses, sort them by the length of the formatted line, and paste the longest ones into the form. Then confirm that labels, invoices, and confirmation screens still show every part of the address.',
    ],
    limitations: [
      'Do not use these addresses to ship anything or to test delivery. They are not verified against any postal service, so a generated combination could by chance resemble a real property. Never present one as a real person’s address.',
      'Only United States addresses are produced, without apartment or suite lines. If your tests need real, fully consistent locations, for example to get a tax or shipping rate, use a sandbox data set from your address verification or payment provider.',
    ],
    related: [
      '/tools/generate-random-names',
      '/tools/generate-random-phone-numbers',
      '/tools/generate-random-emails',
    ],
  },
  {
    link: '/tools/generate-random-uuids',
    about: [
      'This tool generates version 7 UUIDs, identifiers that start with a timestamp so that values created later sort after earlier ones. They are a good fit for database primary keys, event IDs, and test fixtures where you want uniqueness without a central counter and an order that follows creation time.',
    ],
    steps: [
      'Choose single mode, or bulk mode with 10, 50, 100, or 200 identifiers.',
      'Press Generate.',
      'Copy a single result as JSON, or download a batch as a CSV file.',
      'Paste the values into your seed data or tests.',
    ],
    howItWorks: [
      'A UUIDv7 is 128 bits, written as 32 hexadecimal digits in five groups. RFC 9562 defines its layout from left to right.',
    ],
    howItWorksList: [
      'Bits 0 to 47: the Unix time in milliseconds (unix_ts_ms).',
      'Bits 48 to 51: the version, always 0111, so the third group starts with 7.',
      'Bits 52 to 63: 12 bits called rand_a.',
      'Bits 64 to 65: the variant, binary 10, so the fourth group starts with 8, 9, a, or b.',
      'Bits 66 to 127: 62 bits called rand_b.',
      'The RFC lets part of rand_a and rand_b act as a counter. The uuid library used here does this: a randomly seeded counter follows the version bits and increases for values made in the same millisecond, and the remaining 42 bits are random.',
    ],
    example: [
      'Midnight UTC on January 1, 2026 is 1,767,225,600,000 milliseconds after the Unix epoch. In 12 hexadecimal digits that is 019b76daa800, so every UUIDv7 created in that millisecond begins 019b76da-a800-7. A value created one millisecond later begins 019b76da-a801-7 and therefore sorts after it as plain text and as binary.',
      'To read the time from any UUIDv7, join its first two groups and convert them from hexadecimal to a decimal number of milliseconds.',
    ],
    limitations: [
      'A UUIDv7 reveals when it was created. Do not use one where creation time is sensitive, and never use any UUID as a password, session token, or secret. Ordering across different machines is only as accurate as their clocks, and values made on separate systems in the same millisecond have no guaranteed order. Uniqueness is extremely likely but your database should still enforce a unique constraint. Check that your database stores UUIDs in a binary or native type for the best index performance.',
    ],
    related: [
      '/tools/generate-random-passwords',
      '/tools/json-formatter-validator',
      '/tools/base64-encoder-decoder',
    ],
    sources: [{ label: 'RFC 9562: Universally Unique IDentifiers', href: 'https://www.rfc-editor.org/rfc/rfc9562' }],
  },
  {
    link: '/tools/generate-random-passwords',
    about: [
      'The random password generator creates passwords from the character types you select and estimates how hard each one would be to guess. Passwords are generated in your browser and are not sent to our servers.',
    ],
    steps: [
      'Set a length from 8 to 64 characters.',
      'Choose uppercase letters, lowercase letters, numbers, and symbols. At least one type is required.',
      'Choose a single password or a bulk batch of 10, 20, 50, or 100.',
      'Generate, review the strength estimate, and save the password in a password manager.',
    ],
    howItWorks: [
      'Randomness comes from the Web Crypto API (crypto.getRandomValues) in modern browsers. To keep every character equally likely, values that would bias the result are thrown away and drawn again, a method called rejection sampling.',
      'The generator first picks one character from each selected type, so none is missing. It fills the rest from all selected types combined, then shuffles the whole string so the guaranteed characters do not sit in predictable positions.',
      'Strength is estimated with zxcvbn, which looks for dictionary words, names, keyboard patterns, repeats, and sequences. It scores each password from 0 (very weak) to 4 (very strong) and estimates a cracking time for an offline attack against a slow password hash.',
    ],
    howItWorksList: [
      'Uppercase and lowercase letters give 26 choices each, numbers give 10, and the symbol set gives 29.',
    ],
    example: [
      'With all four types selected there are 91 possible characters. A 16-character password drawn from them has roughly 16 × log2(91), or about 104 bits of entropy. The requirement to include each type removes a very small number of combinations, so the true figure is slightly lower.',
      'With only lowercase letters, the same length gives about 16 × log2(26), or 75 bits. Adding length is usually the easiest way to gain strength, particularly when a website restricts symbols.',
    ],
    limitations: [
      'A strong password does not protect you if it is reused, typed into a phishing page, or captured by malware. Use a different password for every account, store them in a password manager, and turn on multi-factor authentication. The strength score is an estimate, not a guarantee. Clipboard contents may be readable by other software, so clear it after pasting. On very old browsers without Web Crypto, the code falls back to a weaker random source, so use an up-to-date browser for real passwords.',
    ],
    related: [
      '/tools/generate-random-uuids',
      '/tools/generate-random-usernames',
      '/tools/base64-encoder-decoder',
    ],
  },
  {
    link: '/tools/generate-random-ip-addresses',
    disclaimer: 'test-data',
    about: [
      'This tool generates IPv4 and IPv6 addresses for log samples, dashboards, documentation, and validation tests. Every address comes from a block reserved for documentation, so your test data never points at a real organization’s network.',
    ],
    steps: [
      'Choose IPv4 or IPv6.',
      'Choose a single address, or a bulk batch of 10, 50, 100, or 200.',
      'Press Generate.',
      'Copy a single address or download the batch as a CSV file with address and version columns.',
    ],
    howItWorks: [
      'Addresses are built in your browser. An IPv4 address is 32 bits written as four numbers from 0 to 255. The generator picks one of three /24 blocks set aside by RFC 5737, then chooses a host number from 1 to 254. It skips 0 and 255, the network and broadcast addresses.',
      'An IPv6 address is 128 bits written as eight groups of four hexadecimal digits. The generator starts with the documentation prefix 2001:db8::/32 from RFC 3849 and fills the remaining six groups with random values. Within one batch, addresses are not repeated.',
    ],
    howItWorksList: [
      '192.0.2.0/24 (TEST-NET-1)',
      '198.51.100.0/24 (TEST-NET-2)',
      '203.0.113.0/24 (TEST-NET-3)',
      '2001:db8::/32 (IPv6 documentation)',
    ],
    example: [
      'An IPv4 result such as 198.51.100.37 belongs to TEST-NET-2. An IPv6 result such as 2001:0db8:4f2a:0000:9c11:a3d0:55be:0e72 can be shortened by removing leading zeros: 2001:db8:4f2a:0:9c11:a3d0:55be:e72. Your parser should treat both forms as the same address.',
      'To test a log viewer, generate 200 IPv4 addresses, pair each with a timestamp and status code in your script, and load the rows. Add a few malformed values by hand to confirm they are rejected.',
    ],
    limitations: [
      'Documentation addresses are not routed on the public internet, so you cannot ping them, connect to them, or get meaningful geolocation results. Software that rejects reserved ranges will flag them, which is correct behavior.',
      'The three IPv4 blocks contain only 762 usable addresses, so repeats across batches are normal. The tool does not produce private ranges such as 10.0.0.0/8, subnet masks, or CIDR plans. If you need to test public-address handling, mock the lookup in your code rather than using a stranger’s real address.',
    ],
    related: [
      '/tools/regex-tester',
      '/tools/generate-random-uuids',
      '/tools/json-formatter-validator',
    ],
    sources: [
      { label: 'RFC 5737: IPv4 address blocks reserved for documentation', href: 'https://www.rfc-editor.org/rfc/rfc5737' },
      { label: 'RFC 3849: IPv6 address prefix reserved for documentation', href: 'https://www.rfc-editor.org/rfc/rfc3849' },
    ],
  },
];
