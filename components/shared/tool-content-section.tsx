import Link from 'next/link';

import { getBlogPostByToolLink } from '@/lib/blogs';
import type { ToolContent } from '@/lib/tool-content/types';
import { findToolByLink } from '@/lib/tools-data';
import { cn } from '@/lib/utils';

const HEADING_CLASS = 'mt-8 mb-3 text-xl font-semibold tracking-tight';
const TEXT_CLASS = 'mb-3 text-[15px] leading-[1.75] text-muted-foreground';
const LIST_CLASS = cn(TEXT_CLASS, 'ml-5 space-y-2');
const LINK_CLASS = 'underline underline-offset-2 hover:text-foreground';

function Paragraphs({ items }: { items: string[] }) {
  return items.map(text => (
    <p key={text} className={TEXT_CLASS}>
      {text}
    </p>
  ));
}

/** Server-rendered explainer: what the tool does, how it works, an example, and limits. */
export function ToolContentSection({ content }: { content: ToolContent }) {
  const toolName = findToolByLink(content.link)?.name ?? 'this tool';
  const guide = getBlogPostByToolLink(content.link);

  return (
    <article
      data-slot='tool-content'
      aria-label={`About the ${toolName}`}
      className='mx-auto mt-12 max-w-3xl border-t border-border/60 pt-8'>
      <h2 className={cn(HEADING_CLASS, 'mt-0')}>What this tool does</h2>
      <Paragraphs items={content.about} />

      <h2 className={HEADING_CLASS}>How to use it</h2>
      <ol className={cn(LIST_CLASS, 'list-decimal')}>
        {content.steps.map(step => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2 className={HEADING_CLASS}>How it works</h2>
      <Paragraphs items={content.howItWorks} />
      {content.howItWorksList ? (
        <ul className={cn(LIST_CLASS, 'list-disc')}>
          {content.howItWorksList.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      <h2 className={HEADING_CLASS}>Worked example</h2>
      <Paragraphs items={content.example} />

      <h2 className={HEADING_CLASS}>Limitations</h2>
      <Paragraphs items={content.limitations} />

      {content.sources ? (
        <>
          <h2 className={HEADING_CLASS}>Sources</h2>
          <ul className={cn(LIST_CLASS, 'list-disc')}>
            {content.sources.map(source => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={LINK_CLASS}>
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <nav aria-label='Related reading and tools'>
        <h2 className={HEADING_CLASS}>Guide and related tools</h2>
        <ul className={cn(LIST_CLASS, 'list-disc')}>
          {guide ? (
            <li>
              <Link href={`/blog/${guide.slug}`} prefetch={false} className={LINK_CLASS}>
                Guide: {guide.title}
              </Link>
            </li>
          ) : null}
          {content.related.map(link => {
            const tool = findToolByLink(link);
            return tool ? (
              <li key={link}>
                <Link href={link} prefetch={false} className={LINK_CLASS}>
                  {tool.name}
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </nav>
    </article>
  );
}
