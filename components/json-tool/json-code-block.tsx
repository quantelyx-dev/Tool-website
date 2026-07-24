'use client';

import { useTheme } from 'next-themes';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
import oneLight from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';

import { cn } from '@/lib/utils';

type JsonCodeBlockProps = {
  code: string;
  placeholder: string;
  className?: string;
};

const CODE_TAG_PROPS = { style: { fontFamily: 'inherit' } };

export function JsonCodeBlock({ code, placeholder, className }: JsonCodeBlockProps) {
  const { resolvedTheme } = useTheme();

  if (!code) {
    return (
      <pre
        className={cn(
          'flex items-center justify-center whitespace-pre-wrap break-all text-center font-mono text-sm text-muted-foreground',
          className,
        )}>
        {placeholder}
      </pre>
    );
  }

  return (
    <div className={cn('font-mono text-sm leading-relaxed', className)}>
      <SyntaxHighlighter
        language='typescript'
        style={resolvedTheme === 'dark' ? oneDark : oneLight}
        customStyle={{ margin: 0, padding: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 'inherit' }}
        codeTagProps={CODE_TAG_PROPS}
        wrapLongLines>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
