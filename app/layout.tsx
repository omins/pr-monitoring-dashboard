import type React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'PR monitoring',
  description: 'PR monitoring system bakcked by Mi:dm AI',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <Suspense fallback={null}>
          {children}
          <Analytics />
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
