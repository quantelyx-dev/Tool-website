export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** The one brand name used in titles, the navbar, the footer, emails, and structured data. */
export const BRAND_NAME = 'toolcalcs.net';

/**
 * Public contact address. Set NEXT_PUBLIC_CONTACT_EMAIL (for example
 * contact@toolcalcs.net) once the domain mailbox exists.
 */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'quantelyx.ai@gmail.com';

/** Shown on the Privacy Policy, Terms of Service, and Disclaimer. */
export const LEGAL_EFFECTIVE_DATE = 'November 26, 2026';

// TODO(owner): fill in your real name. While empty, pages show neutral wording
// ("the toolcalcs.net team") and structured data lists an organization as author.
const OWNER_NAME: string = '';

// TODO(owner): two or three true sentences about you (background, why you build these
// tools). While empty, the bio is hidden.
const OWNER_BIO: string = '';

export const OWNER = {
  name: OWNER_NAME.trim(),
  bio: OWNER_BIO.trim(),
  location: 'Pakistan',
} as const;

/** Author shown in blog bylines, the author box, and Article JSON-LD. */
export const AUTHOR = {
  type: OWNER.name ? ('Person' as const) : ('Organization' as const),
  name: OWNER.name || `The ${BRAND_NAME} team`,
  bio:
    OWNER.bio ||
    `Guides on ${BRAND_NAME} explain how each tool works, including its formulas, sources, and limits.`,
  /** Page describing the author. */
  path: '/about',
};

// TODO(owner): add profile URLs. An icon renders only when its URL is filled in.
export const SOCIAL_LINKS = {
  facebook: '',
  twitter: '',
  instagram: '',
} as const;
