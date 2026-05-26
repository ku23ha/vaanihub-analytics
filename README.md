# Vaani Hub Analytics

> Enterprise-grade realtime analytics operating system embedded inside Vaani Hub.  
> Powered by **Google Analytics 4 Data API** · **Next.js 16** · **Recharts** · **Framer Motion**

---

## Architecture Overview

```
vaanihub-analytics/
├── app/
│   ├── layout.tsx                  # Root layout — AppShell wrapper
│   ├── page.tsx                    # / — Vaani Hub Summary page (preserved)
│   ├── analytics/
│   │   └── page.tsx                # /analytics — Analytics dashboard
│   └── api/
│       └── analytics/
│           ├── realtime/route.ts   # GA4 realtime API (server-only)
│           └── historical/route.ts # GA4 historical API (server-only)
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx            # Fixed sidebar + scrollable content
│   │   └── Sidebar.tsx             # Navigation sidebar (client)
│   └── analytics/
│       ├── AnalyticsDashboard.tsx  # Main orchestrator
│       ├── MetricCards.tsx         # 6 KPI metric cards with trend
│       ├── TrafficChart.tsx        # Area chart — sessions/pageviews/users
│       ├── RealtimeWidget.tsx      # Live active users widget (30s poll)
│       ├── TrafficSources.tsx      # Donut chart — channel breakdown
│       ├── DeviceAnalytics.tsx     # Bar chart — device categories
│       ├── GeoAnalytics.tsx        # Horizontal bars — top countries
│       ├── TopPages.tsx            # Table — most visited pages
│       ├── LookerEmbed.tsx         # Looker Studio iframe (15min refresh)
│       └── LoadingSkeleton.tsx     # Skeleton loaders
│
├── hooks/
│   └── useAnalytics.ts             # SWR hooks (realtime 30s / historical 5min)
│
├── lib/
│   └── analytics/
│       ├── client.ts               # GA4 BetaAnalyticsDataClient (server-only)
│       ├── types.ts                # TypeScript interfaces
│       └── utils.ts                # Formatters + demo data generator
│
└── .env.local                      # Environment variables (never commit)
```

---

## Local Development

### 1. Prerequisites

Node.js 20+ and npm.

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

The `.env.local` file is pre-configured with the Vaani Hub service account.

```env
GA4_PROPERTY_ID=347321374
GOOGLE_CLIENT_EMAIL=vaani-hub-analytics@durable-footing-497506-v4.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> ⚠️ **Never commit `.env.local` to version control.**

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000/analytics](http://localhost:3000/analytics)

---

## API Routes

| Route | Description | Client refresh |
|---|---|---|
| `GET /api/analytics/realtime` | Active users, top pages, devices, countries | 30 seconds |
| `GET /api/analytics/historical` | KPIs, trend chart, sources, devices, pages, geo | 5 minutes |

---

## GA4 Service Account Setup

The service account needs **Viewer** access on the GA4 property:

1. [Google Analytics](https://analytics.google.com) → Admin → Property Access Management
2. Add `vaani-hub-analytics@durable-footing-497506-v4.iam.gserviceaccount.com`
3. Role: **Viewer**

Property ID: `347321374` · Measurement ID: `G-NLEC1V5PE2`

---

## Looker Studio

Embedded report URL:
```
https://lookerstudio.google.com/reporting/11725ac7-9f2d-41c1-8a15-3d37e8d6f2bb
```
Auto-refreshes every **15 minutes**. If auth is required, a fallback link is shown.

---

## Vercel Deployment

```bash
git add . && git commit -m "feat: add analytics OS" && git push
```

In Vercel → Project Settings → Environment Variables, add:

```
GA4_PROPERTY_ID        = 347321374
GOOGLE_CLIENT_EMAIL    = vaani-hub-analytics@...iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY     = -----BEGIN PRIVATE KEY-----\nMII...\n-----END PRIVATE KEY-----\n
```

> Paste `GOOGLE_PRIVATE_KEY` **without** outer quotes in the Vercel UI.

---

## Graceful Degradation

All API routes fall back to **demo data** when GA4 is unavailable. The dashboard always renders. A subtle amber banner alerts the user that demo data is being shown.

---

## Security

- Credentials are **server-only** — never in the browser bundle
- API routes run in Node.js runtime (not Edge)
- Analytics module is fully isolated from existing Vaani Hub logic

---

## Original Next.js readme

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
