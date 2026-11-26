import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { phoneNumberFaqs } from "@/lib/tool-faqs";

export const fakePhoneNumberPost: BlogPost = {
  slug: "fake-phone-number-generator-guide",
  title: "Test Phone Numbers: Reserved Ranges",
  excerpt:
    "Which phone numbers are safe for testing? Learn the fiction ranges in the US, Canada, the UK, and Australia, and how to use them in forms and databases.",
  keywords: [
    "test phone numbers",
    "random phone number generator",
    "555 phone numbers",
    "reserved phone number ranges",
    "phone number test data",
  ],
  toolLink: "/tools/generate-random-phone-numbers",
  toolName: "Random phone number generator",
  publishedAt: "2026-06-04",
  updatedAt: "2026-11-26",
  readTimeMinutes: 4,
  relatedSlugs: [
    "fake-email-generator-for-testing-guide",
    "fake-address-generator-guide",
  ],
  sections: [
    p(
      "Phone fields appear in sign-up flows, checkout forms, contact records, and account recovery screens. Testing them calls for numbers that look right but cannot reach a stranger. A number invented at random can easily belong to somebody, especially if it passes validation.",
    ),
    p(
      "Some telephone regulators solve this by setting numbers aside for television, film, and other creative work. This guide explains the ranges our generator uses and how to work with them in testing.",
    ),
    h2("Valid format does not mean safe"),
    p(
      "A number can match a country’s length and prefix rules and still be assigned to a real person. Validation libraries check structure, not ownership. If a staging system sends messages by mistake, a realistic random number can receive them. Reserved fiction numbers lower that risk because they are not handed out to ordinary subscribers.",
    ),
    toolCta(),
    h2("Reserved ranges by country"),
    h3("United States and Canada"),
    p(
      "Both use the North American numbering plan, which keeps 555-0100 through 555-0199 for fictional use in entertainment and advertising. Combine that block with an area code, as in +1 415 555 0142. Do not assume that every number beginning with 555 is reserved; only this block is covered.",
    ),
    h3("United Kingdom"),
    p(
      "Ofcom publishes drama numbers in blocks of 1,000. Examples include 020 7946 0000 to 0999 for London, 07700 900000 to 900999 for mobiles, and 01632 960000 to 960999 for a general geographic number. Several large cities have their own 496 0xxx block.",
    ),
    h3("Australia"),
    p(
      "The Australian Communications and Media Authority lists numbers for creative works. Our generator uses its 5550 xxxx landline ranges in the (02), (03), (07), and (08) areas. The authority also reserves some mobile numbers, which the generator does not currently offer.",
    ),
    p(
      "Other countries are not offered. We add a country only when we can verify a reserved range from its numbering authority. Ranges can change, so check the official lists before publishing numbers in public media.",
    ),
    h2("Storing and displaying test numbers"),
    ol([
      "Store numbers in E.164 form, such as +14155550142, and format them only for display.",
      "Test input masks with spaces, brackets, hyphens, and a leading plus sign.",
      "Switch country in your form and confirm that the calling code and layout update.",
      "Check that duplicate detection compares normalized values, not typed strings.",
      "Confirm that your validator’s handling of fiction numbers is what you expect.",
    ]),
    p(
      "Strict validation libraries and carrier lookups may report fiction numbers as invalid, since they are never assigned. If your application rejects them, test the format rules with mocked validation results in your test suite.",
    ),
    callout(
      "These numbers cannot receive calls or text messages. For one-time codes and delivery testing, use the test numbers or sandbox from your SMS or authentication provider.",
    ),
    h2("Responsible use"),
    ul([
      "Use the numbers only for testing, demos, documentation, and creative work.",
      "Never use them to create accounts on other services or to get around verification.",
      "Never present one as a real person’s or business’s contact number.",
      "Label test records so they are not mixed with customer data.",
    ]),
    p(
      "Each country’s pool is limited, especially in North America, where each area code has only 100 reserved numbers. Large fixtures will repeat values, so add a unique ID of your own if records must be distinct.",
    ),
    toolCta(),
  ],
  faqs: phoneNumberFaqs,
};
