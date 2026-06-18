export const emailFaqs = [
  {
    q: 'What is a random email generator used for?',
    a: 'A random email generator creates fictional email addresses for use in software development, QA testing, UI mockups, and demo environments. Instead of inventing fake emails manually or reusing real ones, you can generate hundreds of plausible addresses in seconds to populate test databases, seed staging data, or fill form fields during development.',
  },
  {
    q: 'Are the generated email addresses real or active?',
    a: 'No — all generated email addresses are fictional. They follow the standard user@domain.tld format and look realistic, but they are not tied to any real mailboxes. Never attempt to send emails to them. They are strictly intended for non-production testing and demo purposes.',
  },
  {
    q: 'Can I use these emails to test sign-up or login forms?',
    a: 'Absolutely. These fake emails are ideal for testing sign-up flows, login screens, and validation logic. Since they follow real email format rules, they will pass front-end format validation while remaining completely fictional — no real user will ever receive unwanted emails from your test runs.',
  },
  {
    q: 'How many emails can I generate at once?',
    a: 'You can generate up to 1,000 email addresses per request. Select your desired batch size from the dropdown, then click Generate. All results can be copied as a comma-separated list with a single click — ready to paste directly into a seed script or spreadsheet.',
  },
  {
    q: 'Why does the first generation sometimes take a few seconds?',
    a: "Email addresses are sourced from a server-side identity pool backed by randomuser.me that's cached on the server. If the cache expired from inactivity, the first request refills the pool, which takes a moment. Subsequent requests return results nearly instantly until the cache expires again.",
  },
];

export const usernameFaqs = [
  {
    q: 'What are randomly generated usernames used for?',
    a: 'Randomly generated usernames are commonly used by developers and QA engineers to seed test databases, populate user directories, and create realistic demo environments. Instead of typing placeholder names like "user1" or "testuser", you can instantly generate plausible, varied usernames that make your demos and fixtures feel authentic.',
  },
  {
    q: 'Are the generated usernames unique?',
    a: 'Usernames are drawn from a large cached identity pool, so within a single batch you will get varied, non-repeating results. Across multiple separate generations there may be occasional overlaps, so if your database enforces unique constraints, run a quick deduplication pass on large bulk sets before importing.',
  },
  {
    q: 'Can I use these usernames in a production application?',
    a: 'These usernames are intended for development, testing, and demos only. Since they are generated from a shared pool and not guaranteed unique at scale, you should not use them as production user identifiers. For production, generate usernames programmatically based on real user input.',
  },
  {
    q: 'How do I copy all the generated usernames at once?',
    a: 'After generating a batch, click the "Copy" button to copy all usernames as a comma-separated list to your clipboard. You can paste them directly into a CSV, a seed script, a spreadsheet, or any text field — no manual selection required.',
  },
  {
    q: 'Can I filter or customize the style of the usernames?',
    a: 'The current generator produces natural, human-style usernames sourced from the randomuser.me identity pool. Style customization (such as adding numbers, enforcing length, or choosing a theme like gaming handles) is a frequently requested feature and is on our roadmap.',
  },
];

export const nameFaqs = [
  {
    q: 'What can I use randomly generated names for?',
    a: "Random name generators are essential for developers seeding test databases, UX designers building realistic prototypes, and content creators generating fictional characters. Instead of typing placeholder names like 'John Doe', you can generate thousands of plausible names that make your data feel authentic without using real people's information.",
  },
  {
    q: 'Can I generate only first names or only last names?',
    a: 'Yes — you can choose to generate first names only, last names only, or full names (first + last). Select your preferred format before clicking Generate. This flexibility is useful when you need to seed specific fields in your database schema independently.',
  },
  {
    q: 'Are the names culturally diverse?',
    a: 'Names are sourced from the randomuser.me identity pool, which draws from multiple nationalities and cultural backgrounds. This means you will get a natural mix of names from different cultures, which is ideal for building inclusive, realistic test datasets that reflect real-world diversity.',
  },
  {
    q: "Are these real people's names?",
    a: "The names are algorithmically generated combinations drawn from common name datasets. While some may coincidentally match a real person's name, they are not linked to any actual individuals. They are safe to use in demos, fixtures, and UI mockups.",
  },
  {
    q: 'How many names can I generate at once?',
    a: 'You can generate up to 1,000 names per batch. Use the batch size selector to choose how many names you need, then click Generate. Copy all results as a comma-separated list in one click, ready to paste into a spreadsheet, script, or fixture file.',
  },
];

export const phoneNumberFaqs = [
  {
    q: 'Are the generated phone numbers real or callable?',
    a: "No — all generated phone numbers are fictional. They are structurally valid (they conform to each country's number length and format rules) but they are not assigned to any real subscriber. Never use them to attempt to contact people. They exist purely for testing, UI mockups, and demo data.",
  },
  {
    q: 'Which countries are supported?',
    a: 'The generator supports 50+ countries across North America, Europe, Asia, Australia, and more. Select your target country from the dropdown before generating, and the output will be formatted correctly for that country using the libphonenumber library — the same library used by Google.',
  },
  {
    q: 'Can I use these numbers to test SMS or voice verification flows?',
    a: "For testing OTP and SMS flows, you should use your SMS provider's test mode or sandbox numbers, not numbers from this generator. These fake numbers are ideal for testing UI form validation and visual layouts, but they won't actually receive SMS messages or voice calls.",
  },
  {
    q: 'Why do some US numbers use the 555-01XX range?',
    a: 'Numbers in the NANP 555-01XX range (e.g., 555-0100 through 555-0199) are permanently reserved by the North American Numbering Plan for fictional use in media and testing. Similarly, the UK uses a "drama" range. This generator deliberately uses these reserved ranges where available so there is zero risk of accidentally generating a real, in-service phone number.',
  },
  {
    q: 'How are the phone numbers formatted?',
    a: "Numbers are formatted according to each country's local standard using the libphonenumber-js library, which is the industry standard for phone number formatting. US numbers display as (XXX) XXX-XXXX, UK numbers as +44 XXXX XXXXXX, and so on — ready to use in your UI without any reformatting.",
  },
];

export const ssnFaqs = [
  {
    q: 'Are these Social Security Numbers real?',
    a: "No — every SSN generated by this tool is completely fictional. They follow the structural rules of real SSNs (three-digit area number, two-digit group number, four-digit serial number) but are algorithmically created and not assigned to any real person by the Social Security Administration.",
  },
  {
    q: 'Is it legal to generate fake SSNs?',
    a: "Generating fictional SSNs for legitimate software development, testing, and educational purposes is legal. It is illegal to use fake SSNs to commit fraud, impersonate real individuals, or deceive government agencies or financial institutions. This tool is built strictly for developers who need test data.",
  },
  {
    q: 'What makes an SSN "structurally valid"?',
    a: "A structurally valid SSN conforms to the format XXX-XX-XXXX and avoids known invalid patterns: the area number cannot be 000, 666, or in the 900–999 range; the group number cannot be 00; and the serial number cannot be 0000. Our generator respects all of these rules so the SSNs pass format validation in your test environments.",
  },
  {
    q: 'Can I use these SSNs in a production application?',
    a: "Absolutely not. These SSNs are for development and testing only — staging databases, QA fixtures, demo environments, and seed scripts. Never store, transmit, or display these in a live production system or use them in any way that could mislead users or real systems into treating them as legitimate identifiers.",
  },
  {
    q: 'How many SSNs can I generate at once?',
    a: 'You can generate SSNs individually or in bulk. Switch to bulk mode and choose your desired batch size. All results can be copied at once, making it easy to seed a test database or paste into a fixture file without manually creating records one by one.',
  },
];

export const addressFaqs = [
  {
    q: 'Are the generated addresses real places?',
    a: "No — all generated addresses are completely fictional. While street names, cities, states, and zip codes are formatted realistically, they are algorithmically constructed and do not correspond to real, deliverable postal addresses. They are designed to look authentic in demos and test environments without putting any real location's data at risk.",
  },
  {
    q: 'Can I use fake addresses to test shipping or checkout flows?',
    a: "Yes — fake addresses are perfect for testing checkout forms, shipping rate calculators, address validation UIs, and e-commerce flows. They will trigger your form validation logic and help you test edge cases like long street names, apartment numbers, and state abbreviations without needing real customer data.",
  },
  {
    q: 'What format are the addresses in?',
    a: "Addresses follow the standard U.S. mailing format: street number and name, optional apartment/suite, city, state abbreviation, and ZIP code. This format is compatible with most shipping APIs, form validators, and database schemas used in North American applications.",
  },
  {
    q: 'Can I export the generated addresses as a CSV file?',
    a: 'Yes — when generating multiple addresses in bulk mode, you can export the entire batch as a CSV file with a single click. The CSV is formatted with column headers, making it easy to import directly into spreadsheets, databases, or data processing scripts.',
  },
  {
    q: 'How are the fictional street names and cities generated?',
    a: 'Street names, cities, and ZIP codes are drawn from a curated dataset of plausible but fictional U.S. location data. The generator mixes realistic-sounding street names, valid state abbreviations, and formatted ZIP codes to produce addresses that look genuine without being tied to any real property or location.',
  },
];

export const uuidFaqs = [
  {
    q: 'What is a UUIDv7 and how is it different from UUIDv4?',
    a: "UUIDv7 is a newer UUID format (RFC 9562) that embeds a millisecond-precision Unix timestamp in the first 48 bits, making UUIDs naturally sortable by creation time. UUIDv4 is entirely random with no time component, so rows inserted into a database using UUIDv4 primary keys arrive in random order, causing index fragmentation. UUIDv7 keeps your indexes nearly sequential — dramatically improving write performance on large tables.",
  },
  {
    q: 'Are UUIDv7 identifiers safe to use as database primary keys?',
    a: "Yes — UUIDv7 is one of the best choices for distributed primary keys. It is globally unique (collision probability is astronomically low), time-ordered (reduces B-tree index fragmentation), and human-readable in its time component. It works natively with PostgreSQL's uuid type, MySQL's CHAR(36) or BINARY(16), and most modern ORMs.",
  },
  {
    q: 'Are the generated UUIDs truly unique?',
    a: "UUIDs are 128-bit values with 74 bits of randomness in UUIDv7. The probability of generating two identical UUIDs is vanishingly small — far less than the chance of hardware failure. For all practical purposes, each generated UUID is globally unique and safe to use as a unique identifier without any coordination between systems.",
  },
  {
    q: 'What does the format of a UUIDv7 look like?',
    a: "A UUIDv7 follows the standard UUID format: xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx. The first 12 hex characters encode the Unix timestamp in milliseconds, the '7' indicates the version, and the remaining bits are random. Example: 01944f3a-b2c1-7d4e-a8f0-1234567890ab.",
  },
  {
    q: 'Can I generate UUIDs in bulk for seeding data?',
    a: "Absolutely. Switch to bulk mode and select how many UUIDs you need. All generated UUIDs can be copied at once or exported, making it easy to paste a list into a SQL seed script, a fixture file, or an API payload. Since UUIDv7s are time-ordered, bulk-generated sets will also be naturally ordered by generation time.",
  },
];

export const passwordFaqs = [
  {
    q: 'How secure are the passwords generated by this tool?',
    a: "Security depends on the options you choose. Longer passwords with all character sets (uppercase, lowercase, numbers, and symbols) are exponentially harder to crack than short, character-restricted ones. Each generated password is scored using the zxcvbn library — the same algorithm used by Dropbox — so you get an objective strength estimate before deciding whether to use it.",
  },
  {
    q: 'What character sets can I include in my password?',
    a: "You can choose any combination of: uppercase letters (A–Z), lowercase letters (a–z), numbers (0–9), and special symbols (!@#$%^&* etc.). For maximum security, enable all four character sets and set the length to at least 16 characters. Restricting to certain sets is useful for systems with character limitations.",
  },
  {
    q: 'What does the password strength score mean?',
    a: 'The strength score is calculated by zxcvbn, which estimates how many guesses it would take to crack the password using common attack patterns, dictionaries, and keyboard walks. Scores range from Very Weak to Very Strong. A "Strong" or "Very Strong" rating means the password would take billions of guesses to crack even with modern hardware.',
  },
  {
    q: 'Are my generated passwords saved or stored anywhere?',
    a: "No. Password generation happens entirely in your browser. Your generated passwords are never sent to our servers, logged, or stored in any way. Once you navigate away from the page, the passwords are gone. Always copy and store your passwords in a trusted password manager immediately after generating them.",
  },
  {
    q: 'Can I generate multiple passwords at once?',
    a: 'Yes — bulk mode lets you generate multiple passwords in a single click. This is useful when setting up multiple test accounts, seeding a development environment, or generating a set of one-time access credentials. All passwords share the same configuration settings you have chosen.',
  },
];

export const compoundInterestFaqs = [
  {
    q: 'What is daily compounding and why does it matter?',
    a: "Daily compounding means your interest is calculated and added to your principal every single day, rather than monthly, quarterly, or annually. Because interest earns interest more frequently, the compounding effect is more powerful. The difference seems small at first but becomes dramatic over years — a $10,000 investment at 6% annual interest grows to $18,167 over 10 years with annual compounding, but $18,220 with daily compounding. The gap widens significantly with higher rates or longer periods.",
  },
  {
    q: 'How is daily compounding different from monthly compounding?',
    a: "With monthly compounding, interest is added to your balance 12 times per year. With daily compounding, it's added 365 times per year. The more frequently interest compounds, the faster your balance grows, because each day's interest base is slightly larger than the day before. For savings accounts and high-yield accounts, daily compounding is the most common and most beneficial compounding frequency.",
  },
  {
    q: 'Can I factor in regular contributions to the calculator?',
    a: "Yes — the calculator supports optional periodic contributions (daily, weekly, monthly, or annual deposits). Adding regular contributions dramatically accelerates growth compared to a one-time lump sum. For example, contributing $200 per month in addition to an initial deposit has a far greater long-term impact than a larger upfront sum with no ongoing additions.",
  },
  {
    q: 'What does "reinvestment" mean in the context of this calculator?',
    a: "Reinvestment means that instead of withdrawing the interest earned, you leave it in the account so it can continue to compound. This is the core mechanic of compound interest — it's only powerful when returns are reinvested. The calculator assumes full reinvestment by default, which gives you the maximum growth projection.",
  },
  {
    q: 'What currencies are supported?',
    a: "The calculator supports multiple currencies including USD, EUR, GBP, JPY, and others. Currency selection affects the display formatting of the result — the underlying math is the same regardless of currency. For cross-currency comparisons, run separate calculations with the same rate and period.",
  },
];

export const childSupportFaqs = [
  {
    q: 'How does Indiana calculate child support?',
    a: "Indiana uses the Income Shares Model, which bases child support on the combined gross income of both parents and the percentage each parent contributes to that combined income. The model assumes children should receive the same proportion of parental income they would have received if the family remained intact. The calculated amount is then adjusted based on each parent's parenting time.",
  },
  {
    q: 'What is the Income Shares Model?',
    a: "The Income Shares Model treats child-rearing as a shared financial responsibility proportional to each parent's income. First, the total support obligation for the child is determined from Indiana's support schedules based on combined weekly income. Then each parent's share is calculated proportionally. The parent who earns more contributes more; the parent who spends more parenting time typically receives net payments from the other.",
  },
  {
    q: 'What information do I need to use this calculator?',
    a: "You will need both parents' weekly gross income (before taxes and deductions), the number of children covered by the support order, and each parent's approximate overnight parenting time per year. Additional inputs like childcare costs, health insurance premiums, and other child-related expenses can also factor into the final calculation.",
  },
  {
    q: 'How does parenting time affect child support in Indiana?',
    a: "Indiana provides a parenting time credit that reduces a parent's support obligation based on the number of overnights they spend with the child. Parents who have the child for more nights per year receive a larger credit, which lowers the net amount they owe. This incentivizes active parenting involvement from both parents.",
  },
  {
    q: 'Is this calculator legally binding or an official Indiana tool?',
    a: "No — this calculator is an independent estimation tool for informational and planning purposes only. It is not affiliated with, endorsed by, or certified by the State of Indiana or any court. Child support orders are determined by a judge and enforced by the Indiana Child Support Bureau. Always consult a licensed Indiana family law attorney for advice specific to your situation.",
  },
];

export const sunMoonRisingFaqs = [
  {
    q: 'What is the "Big Three" in astrology?',
    a: 'The Big Three refers to your three most foundational astrological placements: your Sun sign, Moon sign, and Rising sign (also called the Ascendant). Together, they form the core of your astrological profile. Most people only know their Sun sign (based on their birthday), but the Moon and Rising signs add significant depth — they describe your emotional inner world and how others perceive you at first glance.',
  },
  {
    q: 'What is the difference between my Sun sign and Moon sign?',
    a: "Your Sun sign represents your core identity, ego, and the conscious self you project into the world. It changes roughly every 30 days as the Sun moves through the zodiac. Your Moon sign represents your emotional nature, instincts, subconscious reactions, and what makes you feel secure. It changes every 2–3 days, which is why two people born a week apart can have very different Moon signs — and very different emotional responses to the same situation.",
  },
  {
    q: 'Why do I need my exact birth time to find my Rising sign?',
    a: "Your Rising sign (Ascendant) is the zodiac sign that was literally rising on the eastern horizon at the exact moment and location of your birth. Because the Earth rotates completely in 24 hours, the Rising sign changes every 2 hours. Without an accurate birth time, it's impossible to determine your Rising sign precisely. If you're unsure of your birth time, check your birth certificate — it is usually recorded there.",
  },
  {
    q: 'How accurate is this calculator?',
    a: "The Sun and Moon sign calculations are highly accurate because the Sun and Moon move slowly enough that a rough birth time is sufficient. The Rising sign calculation requires your birth time and birth location to be accurate to within about 15 minutes — the more precise, the better. If your birth time is off by more than 30 minutes, your Rising sign result may be in error.",
  },
  {
    q: "What if I don't know my exact birth time?",
    a: "If you don't know your exact birth time, you can still find your Sun sign (accurate for anyone born on that date) and your Moon sign (accurate if you were born early or late in the day, since it changes every ~2.5 days). For the Rising sign, try searching your birth certificate, hospital records, or asking a family member. Without a birth time, it's conventional to use solar charts — which set the Rising sign equal to the Sun sign — as a rough approximation.",
  },
];
