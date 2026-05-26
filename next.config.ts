import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ── Remote image domains ──────────────────────────────────────
  // Allows next/image to fetch logos directly from vaani.iisc.ac.in
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vaani.iisc.ac.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'translation-plugin.bhashini.co.in',
        pathname: '/**',
      },
    ],
  },

  // ── Security headers ─────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
              "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com https://cdn.fontshare.com",
              // Allow logos from vaani.iisc.ac.in + local assets
              "img-src 'self' data: https://vaani.iisc.ac.in https:",
              // Allow Looker Studio and GA4 API resources
              "frame-src 'self' https://lookerstudio.google.com https://datastudio.google.com",
              "connect-src 'self' https://analyticsdata.googleapis.com https://oauth2.googleapis.com https://api.fontshare.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
