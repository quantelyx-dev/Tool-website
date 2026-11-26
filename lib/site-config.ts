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

/** The company that runs the site. */
const OWNER_NAME = 'Quantelyx';

const OWNER_BIO =
  'Quantelyx builds practical online tools, calculators, and developer utilities designed to make everyday tasks easier. toolcalcs.net aims to make everyday calculations, data generation, and useful digital tools accessible, simple, and free for everyone.';

export const OWNER = {
  name: OWNER_NAME,
  bio: OWNER_BIO,
  location: 'Pakistan',
} as const;

/** Author shown in blog bylines, the author box, and Article JSON-LD. */
export const AUTHOR = {
  type: 'Organization',
  name: OWNER.name,
  bio: OWNER.bio,
  /** Page describing the author. */
  path: '/about',
} as const;

// Add profile URLs here when you have them. An icon renders only when its URL is filled in.
export const SOCIAL_LINKS = {
  facebook: '',
  twitter: '',
  instagram: '',
} as const;
