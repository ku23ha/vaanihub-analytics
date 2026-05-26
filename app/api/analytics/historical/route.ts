/**
 * GET /api/analytics/historical
 * Returns aggregated GA4 data for the last 30 days.
 * Includes: overview KPIs, daily trend, sources, devices, pages, geography.
 * Polled every 5 minutes by the client.
 */

import type { NextRequest } from 'next/server';
import { getAnalyticsClient, getPropertyId } from '@/lib/analytics/client';
import {
  formatGA4Date,
  calculateChange,
  generateDemoHistoricalData,
} from '@/lib/analytics/utils';
import type {
  HistoricalData,
  DailyMetric,
  OverviewMetrics,
  TrafficSource,
  DeviceData,
  TopPage,
  GeoData,
  AnalyticsApiResponse,
} from '@/lib/analytics/types';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest): Promise<Response> {
  try {
    const client = getAnalyticsClient();
    const property = getPropertyId();

    // ── Run all GA4 reports in parallel ────────────────────────────
    const [
      overviewRes,
      trendRes,
      sourcesRes,
      devicesRes,
      pagesRes,
      geoRes,
    ] = await Promise.all([
      // 1. Overview — current 30d vs previous 30d (for % change)
      client.runReport({
        property,
        dateRanges: [
          { startDate: '30daysAgo', endDate: 'yesterday' },
          { startDate: '60daysAgo', endDate: '31daysAgo' },
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'newUsers' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
      }),

      // 2. Daily trend — sessions, pageviews, users for last 30 days
      client.runReport({
        property,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'newUsers' },
        ],
        orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
      }),

      // 3. Traffic sources — channel group
      client.runReport({
        property,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      }),

      // 4. Device breakdown
      client.runReport({
        property,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      }),

      // 5. Top pages
      client.runReport({
        property,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      }),

      // 6. Geography
      client.runReport({
        property,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
    ]);

    // ── Parse overview (two date ranges returned) ─────────────────
    const getMetric = (
      rows: typeof overviewRes[0]['rows'],
      dateRangeIndex: number,
      metricIndex: number,
    ): number => {
      const row = rows?.find(
        (r) => r.dimensionValues?.[0]?.value === `date_range_${dateRangeIndex}`,
      );
      return parseFloat(row?.metricValues?.[metricIndex]?.value ?? '0');
    };

    // GA4 returns rows with a date_range dimension when multiple ranges given
    const curSessions = getMetric(overviewRes[0].rows, 0, 0);
    const prevSessions = getMetric(overviewRes[0].rows, 1, 0);
    const curPageviews = getMetric(overviewRes[0].rows, 0, 1);
    const prevPageviews = getMetric(overviewRes[0].rows, 1, 1);
    const curUsers = getMetric(overviewRes[0].rows, 0, 2);
    const prevUsers = getMetric(overviewRes[0].rows, 1, 2);
    const curNewUsers = getMetric(overviewRes[0].rows, 0, 3);
    const curBounce = getMetric(overviewRes[0].rows, 0, 4);
    const prevBounce = getMetric(overviewRes[0].rows, 1, 4);
    const curEngagement = getMetric(overviewRes[0].rows, 0, 5);
    const prevEngagement = getMetric(overviewRes[0].rows, 1, 5);

    // If GA4 didn't split by date_range dimension, fall back to totals row
    const totals = overviewRes[0].totals ?? [];
    const cur = totals[0]?.metricValues ?? [];
    const prev = totals[1]?.metricValues ?? [];

    const s0 = curSessions || parseFloat(cur[0]?.value ?? '0');
    const s1 = prevSessions || parseFloat(prev[0]?.value ?? '0');
    const pv0 = curPageviews || parseFloat(cur[1]?.value ?? '0');
    const pv1 = prevPageviews || parseFloat(prev[1]?.value ?? '0');
    const u0 = curUsers || parseFloat(cur[2]?.value ?? '0');
    const u1 = prevUsers || parseFloat(prev[2]?.value ?? '0');
    const nu0 = curNewUsers || parseFloat(cur[3]?.value ?? '0');
    const b0 = curBounce || parseFloat(cur[4]?.value ?? '0');
    const b1 = prevBounce || parseFloat(prev[4]?.value ?? '0');
    const e0 = curEngagement || parseFloat(cur[5]?.value ?? '0');
    const e1 = prevEngagement || parseFloat(prev[5]?.value ?? '0');

    const overview: OverviewMetrics = {
      sessions: Math.round(s0),
      pageviews: Math.round(pv0),
      users: Math.round(u0),
      newUsers: Math.round(nu0),
      bounceRate: parseFloat((b0 * 100).toFixed(1)),
      avgEngagementTime: Math.round(e0),
      sessionsChange: parseFloat(calculateChange(s0, s1).toFixed(1)),
      pageviewsChange: parseFloat(calculateChange(pv0, pv1).toFixed(1)),
      usersChange: parseFloat(calculateChange(u0, u1).toFixed(1)),
      bounceRateChange: parseFloat(calculateChange(b0, b1).toFixed(1)),
      engagementTimeChange: parseFloat(calculateChange(e0, e1).toFixed(1)),
    };

    // ── Parse daily trend ─────────────────────────────────────────
    const dailyTrend: DailyMetric[] = (trendRes[0].rows ?? []).map((row) => ({
      date: formatGA4Date(row.dimensionValues?.[0]?.value ?? ''),
      sessions: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
      pageviews: parseInt(row.metricValues?.[1]?.value ?? '0', 10),
      users: parseInt(row.metricValues?.[2]?.value ?? '0', 10),
      newUsers: parseInt(row.metricValues?.[3]?.value ?? '0', 10),
    }));

    // ── Parse traffic sources ─────────────────────────────────────
    const totalSrcSessions = (sourcesRes[0].rows ?? []).reduce(
      (sum, r) => sum + parseInt(r.metricValues?.[0]?.value ?? '0', 10),
      0,
    );
    const trafficSources: TrafficSource[] = (sourcesRes[0].rows ?? []).map((row) => {
      const sessions = parseInt(row.metricValues?.[0]?.value ?? '0', 10);
      return {
        source: row.dimensionValues?.[0]?.value ?? '(Other)',
        sessions,
        users: parseInt(row.metricValues?.[1]?.value ?? '0', 10),
        percentage:
          totalSrcSessions > 0
            ? parseFloat(((sessions / totalSrcSessions) * 100).toFixed(1))
            : 0,
      };
    });

    // ── Parse devices ─────────────────────────────────────────────
    const totalDevSessions = (devicesRes[0].rows ?? []).reduce(
      (sum, r) => sum + parseInt(r.metricValues?.[0]?.value ?? '0', 10),
      0,
    );
    const devices: DeviceData[] = (devicesRes[0].rows ?? []).map((row) => {
      const sessions = parseInt(row.metricValues?.[0]?.value ?? '0', 10);
      const rawDevice = row.dimensionValues?.[0]?.value ?? 'desktop';
      return {
        device: rawDevice.charAt(0).toUpperCase() + rawDevice.slice(1),
        sessions,
        users: parseInt(row.metricValues?.[1]?.value ?? '0', 10),
        percentage:
          totalDevSessions > 0
            ? parseFloat(((sessions / totalDevSessions) * 100).toFixed(1))
            : 0,
      };
    });

    // ── Parse top pages ───────────────────────────────────────────
    const topPages: TopPage[] = (pagesRes[0].rows ?? []).map((row) => {
      const bounce = parseFloat(row.metricValues?.[2]?.value ?? '0');
      return {
        path: row.dimensionValues?.[0]?.value ?? '/',
        title: row.dimensionValues?.[1]?.value ?? '—',
        pageviews: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
        sessions: parseInt(row.metricValues?.[1]?.value ?? '0', 10),
        bounceRate: parseFloat((bounce * 100).toFixed(1)),
        avgTime: Math.round(parseFloat(row.metricValues?.[3]?.value ?? '0')),
      };
    });

    // ── Parse geography ───────────────────────────────────────────
    const geography: GeoData[] = (geoRes[0].rows ?? []).map((row) => ({
      country: row.dimensionValues?.[0]?.value ?? 'Unknown',
      sessions: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
      users: parseInt(row.metricValues?.[1]?.value ?? '0', 10),
    }));

    // ── Build response ────────────────────────────────────────────
    const historicalData: HistoricalData = {
      overview,
      dailyTrend,
      trafficSources,
      devices,
      topPages,
      geography,
    };

    const body: AnalyticsApiResponse<HistoricalData> = {
      data: historicalData,
      error: null,
      timestamp: new Date().toISOString(),
    };

    return Response.json(body, {
      headers: {
        'Cache-Control': 'private, max-age=300', // 5-minute browser cache
      },
    });
  } catch (err) {
    console.error('[GA4 Historical] Error — falling back to demo data:', err);

    const body: AnalyticsApiResponse<HistoricalData> = {
      data: generateDemoHistoricalData(),
      error: err instanceof Error ? err.message : 'GA4 historical fetch failed',
      timestamp: new Date().toISOString(),
    };

    return Response.json(body, { status: 200 });
  }
}
