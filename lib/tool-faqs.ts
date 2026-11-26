export const emailFaqs = [
  {
    q: 'What is a random email generator used for?',
    a: 'A random email generator creates fictional email addresses for use in software development, QA testing, UI mockups, and demo environments. Instead of inventing test emails manually or reusing real ones, you can generate hundreds of plausible addresses in seconds to populate test databases, seed staging data, or fill form fields during development.',
  },
  {
    q: "Are the generated email addresses real or active?",
    a: "No. Every address is placed on example.com, example.net, or example.org, which are reserved for documentation and testing and cannot be registered by anyone. The part before the @ sign comes from made-up sample identities. Mail sent to these addresses reaches nobody, so they are suitable only for test data and demos.",
  },
  {
    q: "Can I use these emails to test sign-up or login forms?",
    a: "Yes, for testing forms in your own applications and test environments. The addresses follow normal email format, so they pass typical format validation, but they cannot receive verification messages. Do not use them to create accounts on other people's services. Some systems deliberately reject example domains, which is expected.",
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
    a: "Not guaranteed. Usernames come from a shared pool of up to 1,000 sample identities that our server caches, so repeats across separate requests are expected, and large sets can contain duplicates. If your database enforces a unique constraint, remove duplicates or add your own suffix before you import the data.",
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
    a: "There are no style options at the moment. Each username is a cleaned-up version of a sample first and last name followed by a three-digit number, such as zoeobrien427. If you need a particular length, symbol, or theme, adjust the copied list in a spreadsheet or in your own script before using it.",
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
    a: "They are first and last names taken from made-up sample profiles supplied by the randomuser.me service. Common names will match some real people by coincidence, but the profiles are not records about any particular person. Use them only as test data, and never present them as real customers, reviewers, or witnesses.",
  },
  {
    q: 'How many names can I generate at once?',
    a: 'You can generate up to 1,000 names per batch. Use the batch size selector to choose how many names you need, then click Generate. Copy all results as a comma-separated list in one click, ready to paste into a spreadsheet, script, or fixture file.',
  },
];

export const phoneNumberFaqs = [
  {
    q: "Are the generated phone numbers real or callable?",
    a: "They are not meant to be called. Every number comes from a range that a telephone regulator keeps for fiction, such as 555-0100 to 555-0199 in North America or Ofcom's drama numbers in the UK. Those ranges are not given to ordinary subscribers. Do not use any generated number to contact people or to verify an account.",
  },
  {
    q: "Which countries are supported?",
    a: "The United States, Canada, the United Kingdom, and Australia, where Australia covers landlines only. We include a country only when we can verify that its numbering authority reserves numbers for fiction. Other countries are left out because a random number in a normal range could belong to a real person or business.",
  },
  {
    q: "Can I use these numbers to test SMS or voice verification flows?",
    a: "No. These numbers cannot receive SMS messages or voice calls, so one-time codes will never arrive. Use the test numbers or sandbox mode provided by your telephony or authentication provider for verification flows. Use this generator for form layouts, database fixtures, mockups, documentation, and other places where a number only has to be displayed or stored.",
  },
  {
    q: "Why do some US numbers use the 555-01XX range?",
    a: "The North American numbering plan keeps 555-0100 through 555-0199 for fictional use in entertainment and advertising. Every US and Canadian number from this generator uses that block with a real area code. Other 555 numbers are not covered by the same reservation, so simply starting a number with 555 does not make it safe to publish.",
  },
  {
    q: "How are the phone numbers formatted?",
    a: "Each result is shown three ways. The international form is spaced using the libphonenumber-js formatter. The E.164 form is a plus sign, the country code, and the digits with no spaces, which suits database storage. The national field lists the digits without the country code or leading zero. Some strict validators reject fiction numbers because they are never assigned.",
  },
];

export const ssnFaqs = [
  {
    q: "Are these Social Security Numbers real?",
    a: "No. The digits are generated at random and follow the XXX-XX-XXXX format while avoiding patterns that are never valid. A random result could still match a number the Social Security Administration has issued to someone, so never treat one as belonging to nobody. Use them only inside isolated software tests, and never for identification.",
  },
  {
    q: "Is it legal to generate test SSNs?",
    a: "Creating made-up numbers to test your own software is a common development practice. Using any Social Security number to commit fraud, impersonate a person, open accounts, or deceive an agency or business is illegal. This tool is only for non-production test data, and you are responsible for following the laws that apply to you.",
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
    q: "Are the generated addresses real places?",
    a: "Treat them as made up. Streets and cities are generated, and each ZIP code is drawn from the chosen state's range, but nothing is checked against a postal database. A combination could resemble a real property by coincidence. Do not ship anything to them, present them as somebody's address, or use them to register for third-party services.",
  },
  {
    q: "Can I use random addresses to test shipping or checkout flows?",
    a: "You can use them to test layout, field lengths, required fields, and data imports. The state and ZIP range agree, but the street and city are invented, so address verification and shipping-rate services are likely to reject them. That helps test error handling. For successful rate or tax calculations, use your provider's sandbox addresses.",
  },
  {
    q: "What format are the addresses in?",
    a: "Each result has a street line, city, two-letter US state abbreviation, a five-digit or nine-digit ZIP code from that state's range, and United States as the country, plus one formatted line combining them. There is no apartment or suite line, so add one yourself if your form needs to test it.",
  },
  {
    q: "Can I export the generated addresses as a CSV file?",
    a: "Yes. In bulk mode you can generate 10, 50, 100, or 200 addresses and download the whole batch as a CSV file with column headings. You can open it in a spreadsheet or load it with a database import or seed script. In single mode, you can copy the one result as JSON instead.",
  },
  {
    q: "How are the street names and cities generated?",
    a: "The Faker library builds them in your browser from its US English data set. Street lines combine a building number with a generated street name, and city names are assembled from name fragments or common patterns. Only the state and ZIP range are linked, and nothing is sent to our servers.",
  },
];

export const uuidFaqs = [
  {
    q: 'What is a UUIDv7 and how is it different from UUIDv4?',
    a: "UUIDv7 is a newer UUID format (RFC 9562) that embeds a millisecond-precision Unix timestamp in the first 48 bits, making UUIDs naturally sortable by creation time. UUIDv4 is entirely random with no time component, so rows inserted into a database using UUIDv4 primary keys arrive in random order, causing index fragmentation. UUIDv7 keeps your indexes nearly sequential — dramatically improving write performance on large tables.",
  },
  {
    q: 'Are UUIDv7 identifiers safe to use as database primary keys?',
    a: "Yes, they work well as primary keys, particularly when several services create IDs independently. Values begin with a millisecond timestamp, so new rows tend to land at the end of a B-tree index, which reduces fragmentation compared with random UUIDv4 keys. Keep a unique constraint in place, and remember that anyone who sees an ID can read its creation time.",
  },
  {
    q: 'Are the generated UUIDs truly unique?',
    a: "Collisions are extremely unlikely. This generator places a 48-bit millisecond timestamp first, then a counter that starts at a random value and increases for IDs made in the same millisecond, followed by 42 further random bits. No central coordination is needed, but your database should still enforce uniqueness, as it should for any identifier.",
  },
  {
    q: 'What does the format of a UUIDv7 look like?',
    a: "It looks like xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx. The first 12 hexadecimal digits are the Unix time in milliseconds, the 7 marks the version, and y is 8, 9, a, or b to mark the variant. The remaining digits hold a counter and random bits. For example, IDs created at midnight UTC on 1 January 2026 begin 019b76da-a800-7.",
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
    q: "What is daily compounding and why does it matter?",
    a: "Daily compounding adds interest to the balance every day, so the next day's interest is calculated on a slightly larger amount. At a 6% nominal rate, $10,000 grows to about $18,220 over 10 years with daily compounding, compared with about $18,194 compounded monthly and $17,908 compounded once a year, before taxes and fees.",
  },
  {
    q: "How is daily compounding different from monthly compounding?",
    a: "Monthly compounding adds interest 12 times a year, while daily compounding adds it 365 times at one 365th of the nominal rate. With the same nominal rate, daily compounding ends slightly higher. If two accounts quote APY instead, compounding frequency is already included, so compare the APY figures directly and then check fees and conditions.",
  },
  {
    q: "Can I factor in regular contributions to the calculator?",
    a: "Yes. You can add a recurring deposit daily, weekly, every two weeks, monthly, or quarterly. The calculator spaces them every 1, 7, 14, 30, or 90 days, and each deposit starts earning interest the following day. Because a month is treated as 30 days, a 365-day projection with monthly deposits includes 12 of them.",
  },
  {
    q: "What does \"reinvestment\" mean in the context of this calculator?",
    a: "With reinvestment on, which is the default, each day's interest joins the balance and earns interest itself. With it off, interest is still counted but kept aside, so only your principal and deposits earn. For example, $10,000 at a 5% nominal rate over 365 days earns $512.67 with reinvestment and $500.00 without it.",
  },
  {
    q: "What currencies are supported?",
    a: "You can pick from a list of major currencies, including US dollars, euros, British pounds, and Japanese yen. The choice mainly controls how amounts are shown; the growth calculation treats the number you enter as an amount in that currency. It does not predict exchange-rate movements, which can change the value of savings held in another currency.",
  },
];

export const childSupportFaqs = [
  {
    q: "How does Indiana calculate child support?",
    a: "Indiana uses the Income Shares Model. Each parent's weekly gross income is reduced by a few allowed adjustments and the results are combined. A schedule gives the basic obligation for that income and number of children. Child care and children's health premiums are added, the total is split by income share, and the paying parent's credits are subtracted.",
  },
  {
    q: "What is the Income Shares Model?",
    a: "It is based on the idea that children should receive the same proportion of parental income they would have received if the parents lived together. Indiana's schedule estimates that amount from combined weekly adjusted income. Each parent is responsible for a share that matches their percentage of the combined income, so a parent earning 60% carries 60% of the total.",
  },
  {
    q: "What information do I need to use this calculator?",
    a: "You need each parent's gross income before taxes, the number of children, and each child's yearly overnights with the paying parent. If they apply, also gather weekly amounts for work-related child care, the children's share of health premiums, support for prior-born children, and maintenance paid, plus the number of later-born or adopted children each parent supports.",
  },
  {
    q: "How does parenting time affect child support in Indiana?",
    a: "The paying parent receives a parenting time credit starting at 52 overnights a year. The Parenting Time Table gives two factors for each overnight band, which are applied to the basic obligation and the paying parent's income share. More overnights mean a larger credit. With near-equal time, the payment can even run from the other parent.",
  },
  {
    q: "Is this calculator legally binding or an official Indiana tool?",
    a: "No. It is an independent estimate and is not affiliated with or approved by the State of Indiana or any court. It follows the standard worksheet but leaves out post-secondary education, split custody, Social Security credits, and imputed income. A judge sets the order and may deviate from the guideline amount, so verify it with official sources or an attorney.",
  },
  {
    q: "Does this calculator also cover Indiana alimony or spousal support?",
    a: "No. Indiana's child support worksheet does not produce a figure for spousal maintenance, and the maintenance statute, Indiana Code 31-15-7-2, sets no schedule or formula. A court may order it only in limited situations, such as incapacity, caring for a child with a disability, or short-term rehabilitative support. A family law attorney can explain how those apply.",
  },
  {
    q: "How is Indiana spousal maintenance decided if there is no formula?",
    a: "The court first decides whether a legal ground for maintenance exists, then looks at the facts of the case. For rehabilitative maintenance, the statute lists factors including each spouse's education at the marriage and now, interrupted education or work, earning capacity, and the time and expense needed to train for suitable work. Outcomes vary, so get advice on your circumstances.",
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
  {
    q: 'How do I find my "Big 3" — Sun, Moon, and Rising?',
    a: 'Enter your birth date, exact birth time, and birth city into the calculator above — it computes all three placements at once using your birth details. Your Sun sign only needs the date, your Moon sign benefits from a rough time of day, and your Rising sign requires an accurate birth time and location since it changes roughly every two hours as the Earth rotates.',
  },
  {
    q: "What's the difference between my Rising sign and my Moon sign?",
    a: "Your Rising sign (Ascendant) is about outward presentation — it's the mask you wear, the first impression, your instinctive approach to new situations and unfamiliar people. Your Moon sign is about inward experience — your emotional needs, subconscious habits, and what makes you feel safe once someone actually gets to know you. A Rising sign in a bold Fire sign paired with a Moon in a cautious Earth sign, for example, is common and explains why someone can seem more outgoing at first than they feel internally.",
  },
];

export const cronExpressionFaqs = [
  {
    q: "What is a cron expression?",
    a: "A cron expression is a compact string that defines when a scheduled job should run. It uses five or six space-separated fields representing time units — such as minute, hour, day of month, month, and day of week. Cron is used by Linux crontab, GitHub Actions, Kubernetes CronJobs, AWS EventBridge, and many other schedulers to automate recurring tasks like backups, reports, and data syncs.",
  },
  {
    q: "What is the difference between 5-field and 6-field cron?",
    a: "Standard Unix cron uses five fields: minute, hour, day of month, month, and day of week. Some systems — including Node.js cron libraries, Spring, and Quartz-style schedulers — add a sixth seconds field at the beginning. A 5-field expression like `0 9 * * *` runs daily at 9:00 AM. The 6-field equivalent `0 0 9 * * *` means the same schedule with an explicit seconds value of 0. Always check which format your target system expects.",
  },
  {
    q: "What do *, */5, and ranges mean in cron?",
    a: "The asterisk (*) means every value in that field — for example, * in the hour field means every hour. A step expression like */5 in the minute field means every 5 minutes (0, 5, 10, 15…). A range like 9-17 in the hour field means from 9 through 17 inclusive. You can also combine specific values with commas, such as 1,15 in the day-of-month field to run on the 1st and 15th.",
  },
  {
    q: "Which timezone are the next run times shown in?",
    a: "Next run times are calculated in the timezone you select in the form — defaulting to your browser's local timezone when available. Cron expressions themselves do not include timezone information; the scheduler that runs the job interprets the expression in its configured timezone. When deploying to production, always confirm the timezone setting on your cron daemon, CI platform, or cloud scheduler matches your intent.",
  },
  {
    q: "Can I use this for Linux crontab, GitHub Actions, or Kubernetes CronJob?",
    a: "Yes. Standard 5-field expressions generated here work with Linux crontab, GitHub Actions schedule syntax, Kubernetes CronJob spec, and most POSIX-compatible schedulers. GitHub Actions uses UTC by default — set the workflow timezone explicitly if needed. Kubernetes CronJobs run in the controller's timezone unless you configure otherwise. For systems that require 6 fields, switch to the 6-field format in this tool.",
  },
  {
    q: "Are my schedules sent to a server?",
    a: "No. The expression, its plain-English description, and the next-run preview are all produced in your browser from your choices and the selected time zone. Your schedule is not sent to our servers, logged, or stored. Standard website analytics may still record that the page was used, as described in our privacy policy.",
  },
  {
    q: "Does this work for Spring @Scheduled or Quartz cron expressions?",
    a: 'Yes — switch to the 6-field format and the generator produces a second-first expression compatible with Spring\'s @Scheduled(cron = "...") annotation and Quartz-style schedulers. Note that Spring/Quartz cron differs from standard 5-field cron in two ways: it adds a leading seconds field, and day-of-month/day-of-week typically require one of the two to be "?" rather than "*" in Quartz specifically — check your framework\'s exact parser if the 6-field expression is rejected.',
  },
  {
    q: "Does the generated expression work with Jenkins cron syntax?",
    a: "Yes. Jenkins uses five fields in the usual order: minute, hour, day of month, month, and day of week, so standard expressions from this tool work in a Build periodically or Poll SCM trigger. Jenkins also supports an H symbol, as in H 9 * * *, to spread jobs across an hour. This builder does not generate H, but you can add it by hand.",
  },
];

export const ipAddressFaqs = [
  {
    q: "Are the generated IP addresses real or in use?",
    a: "No public host should use them. IPv4 results come from 192.0.2.0/24, 198.51.100.0/24, and 203.0.113.0/24, and IPv6 results from 2001:db8::/32. Internet standards reserve all of these for documentation, so they are not routed on the public internet. That makes them safe to show in examples, screenshots, test data, and tutorials.",
  },
  {
    q: "What is the difference between IPv4 and IPv6?",
    a: "IPv4 addresses are 32-bit values written as four decimal numbers separated by dots, such as 192.0.2.1, giving about 4.3 billion possible addresses. IPv6 addresses are 128-bit values written as eight groups of hexadecimal digits separated by colons, such as 2001:db8::1. IPv6 has a vastly larger address space and was designed to cope with IPv4 running out.",
  },
  {
    q: "What can I use randomly generated IP addresses for?",
    a: "They suit database fixtures, sample logs, dashboard mockups, documentation, firewall rule examples, and format validation tests. Because the addresses are reserved for documentation, they will not give meaningful geolocation or reputation results, and some software treats them as special. To test those features, mock the lookup response in your own code.",
  },
  {
    q: "How many IP addresses can I generate at once?",
    a: "You can generate one address, or a bulk batch of 10, 50, 100, or 200. A single result can be copied to the clipboard, and a bulk batch can be downloaded as a CSV file with address and version columns. Addresses are not repeated within a batch, although separate batches can overlap, especially for IPv4.",
  },
  {
    q: "Can I generate both IPv4 and IPv6 addresses in the same batch?",
    a: "No. Each run produces one version, chosen before you press Generate. If your test needs both, generate an IPv4 batch and an IPv6 batch, download each as CSV, and combine the files. The version column in each export lets you tell the two kinds apart after you merge them.",
  },
];

export const base64ToolFaqs = [
  {
    q: "Is Base64 encoding the same as encryption?",
    a: "No — this is one of the most common misconceptions. Base64 is a reversible encoding scheme, not encryption. Anyone can decode a Base64 string back to its original form instantly, with no key or password required — this tool does it entirely in your browser. Never use Base64 to protect sensitive data like passwords or API keys; use real encryption (e.g. AES) for that, and only use Base64 to safely represent binary data as text.",
  },
  {
    q: "What is the difference between standard and URL-safe Base64?",
    a: "Standard Base64 uses the characters + and / plus = padding, which have special meaning in URLs and file paths. URL-safe Base64 (also called Base64url) replaces + with -, / with _, and typically omits padding, so the result can be used directly inside a URL, filename, or cookie without extra escaping. JWTs always use URL-safe Base64 without padding for this reason — toggle the URL-safe switch in the Text tab to match what your target system expects.",
  },
  {
    q: "Can I convert an image to Base64 for use in CSS or HTML?",
    a: "Yes — use the File & image tab. Drop in an image and the tool generates a ready-to-use data URI (data:image/png;base64,...) that you can paste directly into a CSS background-image, an <img src> attribute, or an inline SVG, with a live preview so you can confirm it renders correctly before copying. This avoids an extra HTTP request for small icons or inline assets.",
  },
  {
    q: "Does this tool verify JWT signatures?",
    a: "No — the JWT decoder tab only decodes the header and payload so you can inspect the claims (like exp, iat, and custom fields) during debugging. It cannot and does not verify the signature, because that requires the issuer's secret or public key, which never leaves the server that minted the token. Never trust the contents of a JWT you haven't verified server-side, even though this tool can read them.",
  },
  {
    q: "Is my data uploaded anywhere when I use this tool?",
    a: "No — every conversion (text, file, and JWT decoding) runs entirely in your browser using JavaScript's built-in encoding APIs. Nothing you type, paste, or drop is ever sent to our servers or any third party, which makes it safe to use with confidential files, internal API payloads, or tokens containing sensitive claims.",
  },
];

export const jsonToolFaqs = [
  {
    q: "Why does this JSON validator show a different error than my browser console?",
    a: "Browsers and Node.js word JSON errors differently, and some messages give only a character position or no location at all. This tool runs its own grammar check when parsing fails, so it reports the line, column, and a readable reason for the first syntax problem. Use Go to error to jump to that spot in the input and fix it.",
  },
  {
    q: "What's the difference between the Format & validate, Tree view, and JSON → TypeScript tabs?",
    a: "All three tabs read the same JSON you paste once — there's no need to re-paste it for each view. Format & validate beautifies or minifies it, sorts keys, and shows size/depth/key-count stats. Tree view turns it into a collapsible, color-coded tree so you can explore deeply nested structures and copy the exact JSONPath (like $.users[2].email) to any value. JSON → TypeScript infers and generates ready-to-use TypeScript interfaces from the shape of your data, including nested objects and arrays.",
  },
  {
    q: "Can I generate TypeScript types straight from an API response?",
    a: "Yes — paste a sample JSON response into the tool and switch to the JSON → TypeScript tab. It infers a named interface for every nested object (reusing one interface for array elements that share the same shape, instead of duplicating it per item), gives you a root type alias when the top-level value is a primitive or array, and quotes any property names that aren't valid TypeScript identifiers. Set a custom root type name before copying or downloading the .ts file.",
  },
  {
    q: "Does sorting keys or changing the indent modify the meaning of my JSON?",
    a: "No — sorting object keys alphabetically and changing indentation (2 spaces, 4 spaces, tabs, or fully minified) only affects the text layout. JSON object keys are unordered by the spec, so reordering them doesn't change how any JSON parser interprets the data. Minify is useful for shrinking a payload before sending it over the network; sorted keys make it easier to diff two JSON files that came from different sources.",
  },
  {
    q: "Is my JSON data uploaded anywhere?",
    a: "No — parsing, validation, formatting, the tree view, and TypeScript generation all run entirely in your browser using JavaScript. Nothing you paste is ever sent to our servers or any third party, so it's safe to use with API responses, config files, or payloads containing internal or sensitive data.",
  },
];

export const regexTesterFaqs = [
  {
    q: "What is a regex tester used for?",
    a: "A regex tester lets you interactively build and debug regular expressions against a sample string without writing any code. You enter a pattern, select flags, and see matches highlighted in real time — making it easy to iterate on patterns for input validation, text extraction, search-and-replace operations, and log parsing.",
  },
  {
    q: "What regex flags does this tester support?",
    a: "The tester supports all six standard JavaScript regex flags: g (global — find all matches, not just the first), i (case-insensitive), m (multiline — ^ and $ match line boundaries), s (dotAll — dot matches newlines too), u (Unicode mode — treats the pattern as Unicode code points), and y (sticky — match only from the current lastIndex position).",
  },
  {
    q: "How do capture groups work in the results?",
    a: "Capture groups are defined with parentheses in your pattern. For example, (\\d{4})-(\\d{2})-(\\d{2}) creates three groups. The match details table shows each match's full text plus any captured substrings in separate Group columns — useful for extracting specific parts like year, month, and day from a date string.",
  },
  {
    q: "Why does removing the g flag change the number of matches?",
    a: "Without the g (global) flag, JavaScript's RegExp stops after the first match. The tester reflects this behavior exactly. Enable g to find every occurrence in your test string. Leave it off if you only need to verify whether a pattern matches at all or want to inspect the first match and its groups in detail.",
  },
  {
    q: "Does this work with lookaheads, lookbehinds, and named groups?",
    a: "Yes — the tester runs on your browser's native JavaScript regex engine, which fully supports ES2018+ features including positive and negative lookaheads (?=...) and (?!...), positive and negative lookbehinds (?<=...) and (?<!...), and named capture groups (?<name>...). Named groups appear alongside positional groups in the match details table.",
  },
];

export const paycheckCalculatorFaqs = [
  {
    q: 'How is my take-home pay calculated?',
    a: "The calculator starts with your gross pay for the period, subtracts pre-tax deductions such as a traditional 401(k), health insurance, and HSA or FSA contributions, then applies federal income tax, Social Security, Medicare, and your state's income tax. Any post-tax deductions, such as Roth 401(k) contributions, come out last. What remains is your estimated net (take-home) pay.",
  },
  {
    q: 'Which taxes are taken out of a US paycheck?',
    a: 'Employees typically pay federal income tax, Social Security tax (6.2% on wages up to $184,500 in 2026), and Medicare tax (1.45%, plus an extra 0.9% on wages above $200,000). Most states also withhold state income tax. Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming do not tax wages. Some cities and counties add local income taxes, and a few states charge disability or paid-leave payroll taxes.',
  },
  {
    q: 'Do 401(k) and health insurance deductions lower my taxes?',
    a: 'Yes. Traditional 401(k) contributions reduce the wages used for federal and most state income tax, though not for Social Security or Medicare. Health insurance premiums, HSA contributions, and FSA contributions taken through your employer reduce income tax and payroll tax. Roth 401(k) contributions are made after tax, so they do not lower your taxes today. Pennsylvania and New Jersey still tax 401(k) contributions at the state level, and the calculator accounts for that.',
  },
  {
    q: 'How accurate is this paycheck calculator?',
    a: "It is a planning estimate built on 2026 federal brackets, the 2026 standard deduction, current FICA limits, and published state brackets. Your employer's payroll software may differ slightly because of your exact Form W-4 entries, pay-period rounding, local taxes, bonuses taxed at a flat supplemental rate, or state credits not modeled here. Your pay stub is the final word, and a tax professional can give advice specific to your situation.",
  },
  {
    q: 'Can I calculate hourly pay, overtime, and different pay frequencies?',
    a: 'Yes. Choose Hourly to enter your rate, regular hours, and weekly overtime hours, which are paid at 1.5 times your rate. You can set pay to weekly, every two weeks, twice a month, or monthly, and switch the results between per paycheck, weekly, monthly, and annual views. The results also show your effective tax rate and your take-home pay per hour.',
  },
];

export const textToSpeechFaqs = [
  {
    q: 'How does the text to speech generator work?',
    a: 'Pick a quick-start style or paste your own script, choose one of 12 popular AI voices (you can play a short preview of each), and press Generate speech. Your text is turned into natural-sounding speech, usually within a few seconds. You can play the result on the page and download it as an MP3 file.',
  },
  {
    q: 'Is the text to speech generator really free?',
    a: 'Yes. There is no sign-up or payment. To keep it free for everyone, each visitor can create 6 audio clips per day, and each clip can contain up to 1,000 characters, which is roughly a minute of speech. Your allowance resets every day at midnight UTC.',
  },
  {
    q: 'Why do I need at least 200 characters?',
    a: 'The AI voice service we use requires a minimum of 200 characters per request, which is roughly two to three sentences or about 14 seconds of speech. If you have less text, add a little context or combine several short lines. The quick-start styles load an example script of the right length.',
  },
  {
    q: 'Can I use it for TikTok, Instagram Reels, and YouTube Shorts?',
    a: 'Yes. Download the MP3 and import it into CapCut, Premiere, or any video editor as your voiceover track. The script box estimates how long your narration will run and which short-form length it fits (15, 30, 60, or 90 seconds). For commercial or monetized work, review the voice provider\'s terms, and never use generated speech to impersonate a real person or mislead listeners.',
  },
  {
    q: 'Is my text private?',
    a: 'Your text is sent securely to our AI voice provider so it can create the audio, and the finished audio is streamed back to you. We do not save your text or audio on this site. Your last-used voice and speed are remembered in your own browser only. Because the text leaves your browser, avoid entering passwords, personal data, or confidential information.',
  },
];
