/** RFC 2606 domains, which can never receive anyone's real mail. */
export const RESERVED_EMAIL_DOMAINS = ['example.com', 'example.net', 'example.org'] as const;

/**
 * Guarantees a reserved domain no matter what the upstream identity source returns.
 * The domain is picked from the local part, so one address always maps the same way.
 */
export function toReservedEmail(email: string): string {
  const local = email.split('@')[0]?.replace(/[^a-zA-Z0-9._+-]/g, '') || 'user';
  const hash = [...local].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return `${local}@${RESERVED_EMAIL_DOMAINS[hash % RESERVED_EMAIL_DOMAINS.length]}`;
}
