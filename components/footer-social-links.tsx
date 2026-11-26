import { FacebookIcon, InstagramIcon, TwitterIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { SOCIAL_LINKS } from '@/lib/site-config';

const SOCIAL_ITEMS = [
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: 'Twitter', href: SOCIAL_LINKS.twitter, Icon: TwitterIcon },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
];

/** Renders only the profiles that have a URL in `SOCIAL_LINKS`. */
export function FooterSocialLinks() {
  const links = SOCIAL_ITEMS.filter(item => Boolean(item.href));
  if (links.length === 0) return null;

  return (
    <div className='flex items-center gap-2'>
      {links.map(({ label, href, Icon }) => (
        <Button key={label} variant='ghost' size='icon' asChild>
          <a
            href={href}
            aria-label={label}
            target='_blank'
            rel='noopener noreferrer'
            className='text-zinc-500 hover:text-indigo-600 transition-colors'>
            <Icon className='size-5' />
          </a>
        </Button>
      ))}
    </div>
  );
}
