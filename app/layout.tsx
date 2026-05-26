import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Vaani Hub',
  description: 'Vaani Hub — speech data platform with integrated analytics',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Fontshare — General Sans & Satoshi (loaded via <link>, not @import, to avoid PostCSS ordering conflict) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,700&display=swap"
        />
      </head>
      <body className="h-full">
        {/*
         * AppShell renders the fixed sidebar + scrollable main content.
         * It is a client component that wraps all pages.
         * Analytics is a fully isolated module at /analytics.
         */}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
