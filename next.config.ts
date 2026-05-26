import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow Looker Studio iframes
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
              "img-src 'self' data: https:",
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
