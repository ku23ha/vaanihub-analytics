/**
 * GET /api/analytics/realtime
 * Returns live active-user metrics from GA4 Realtime API.
 * Intended to be polled every 30 seconds by the client.
 */

import type { NextRequest } from 'next/server';
import { getAnalyticsClient, getPropertyId } from '@/lib/analytics/client';
import { generateDemoRealtimeData } from '@/lib/analytics/utils';
import type { RealtimeData, AnalyticsApiResponse } from '@/lib/analytics/types';

// Always dynamic — realtime data must never be cached at the CDN layer
export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest): Promise<Response> {
  try {
    const client = getAnalyticsClient();
    const property = getPropertyId();

    // Run three lightweight reports in parallel to minimise latency
    const [totalRes, deviceRes, pagesRes, countryRes] = await Promise.all([
      // 1. Overall active users (no dimension → accurate deduped total)
      client.runRealtimeReport({
        property,
        metrics: [{ name: 'activeUsers' }],
      }),
      // 2. Breakdown by device category
      client.runRealtimeReport({
        property,
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }],
      }),
      // 3. Top active pages
      client.runRealtimeReport({
        property,
        dimensions: [{ name: 'unifiedScreenName' }],
        metrics: [{ name: 'activeUsers' }],
        limit: 8,
      }),
      // 4. Top countries
      client.runRealtimeReport({
        property,
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
        limit: 5,
      }),
    ]);

    const activeUsers =
      parseInt(totalRes[0].rows?.[0]?.metricValues?.[0]?.value ?? '0', 10);

    const deviceBreakdown = (deviceRes[0].rows ?? []).map((row) => ({
      device: row.dimensionValues?.[0]?.value ?? 'unknown',
      activeUsers: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
    }));

    const activePages = (pagesRes[0].rows ?? []).map((row) => ({
      page: row.dimensionValues?.[0]?.value ?? '/',
      activeUsers: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
    }));

    const topCountries = (countryRes[0].rows ?? []).map((row) => ({
      country: row.dimensionValues?.[0]?.value ?? 'Unknown',
      activeUsers: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
    }));

    const data: RealtimeData = {
      activeUsers,
      activePages,
      deviceBreakdown,
      topCountries,
      timestamp: new Date().toISOString(),
    };

    const body: AnalyticsApiResponse<RealtimeData> = {
      data,
      error: null,
      timestamp: new Date().toISOString(),
    };

    return Response.json(body, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (err) {
    console.error('[GA4 Realtime] Error — falling back to demo data:', err);

    // Graceful degradation: return demo data so the UI always renders
    const body: AnalyticsApiResponse<RealtimeData> = {
      data: generateDemoRealtimeData(),
      error: err instanceof Error ? err.message : 'GA4 realtime fetch failed',
      timestamp: new Date().toISOString(),
    };

    return Response.json(body, {
      status: 200, // return 200 with error field so SWR still hydrates the UI
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  }
}
