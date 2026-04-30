'use client';

import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      position='top-center'
      richColors
      closeButton
      theme={
        resolvedTheme === 'dark'
          ? 'dark'
          : resolvedTheme === 'light'
            ? 'light'
            : 'system'
      }
      toastOptions={{
        classNames: {
          toast:
            'border-border bg-background text-foreground shadow-lg backdrop-blur-sm',
          title: 'font-medium',
          description: 'text-muted-foreground',
        },
      }}
    />
  );
}
