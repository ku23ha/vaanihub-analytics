/**
 * Analytics SWR hooks
 * Client-side data fetching with auto-refresh intervals.
 */

'use client';

import useSWR from 'swr';
import type { RealtimeData, HistoricalData, AnalyticsApiResponse } from '@/lib/analytics/types';

// ─── Generic Fetcher ──────────────────────────────────────────

async function fetcher<T>(url: string): Promise<AnalyticsApiResponse<T>> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── Hooks ────────────────────────────────────────────────────

/**
 * Real-time active users — refreshes every 30 seconds.
 */
export function useRealtimeMetrics() {
  const { data, error, isLoading, mutate } = useSWR<
    AnalyticsApiResponse<RealtimeData>
  >('/api/analytics/realtime', fetcher, {
    refreshInterval: 30_000,
    revalidateOnFocus: false,
    dedupingInterval: 25_000,
    onErrorRetry(err, _key, _cfg, revalidate, { retryCount }) {
      // Retry up to 3 times on error with exponential backoff
      if (retryCount >= 3) return;
      setTimeout(() => revalidate({ retryCount }), 2 ** retryCount * 5_000);
    },
  });

  return {
    realtimeData: data?.data ?? null,
    realtimeError: error?.message ?? data?.error ?? null,
    isRealtimeLoading: isLoading,
    refreshRealtime: mutate,
  };
}

/**
 * Historical analytics — refreshes every 5 minutes.
 */
export function useHistoricalData() {
  const { data, error, isLoading, mutate } = useSWR<
    AnalyticsApiResponse<HistoricalData>
  >('/api/analytics/historical', fetcher, {
    refreshInterval: 300_000,
    revalidateOnFocus: false,
    dedupingInterval: 290_000,
    onErrorRetry(err, _key, _cfg, revalidate, { retryCount }) {
      if (retryCount >= 3) return;
      setTimeout(() => revalidate({ retryCount }), 2 ** retryCount * 10_000);
    },
  });

  return {
    historicalData: data?.data ?? null,
    historicalError: error?.message ?? data?.error ?? null,
    isHistoricalLoading: isLoading,
    refreshHistorical: mutate,
    lastUpdated: data?.timestamp ?? null,
  };
}

/**
 * Combined hook — use when a component needs both realtime + historical.
 */
export function useAnalyticsDashboard() {
  const realtime = useRealtimeMetrics();
  const historical = useHistoricalData();

  return {
    ...realtime,
    ...historical,
    isAnyLoading: realtime.isRealtimeLoading || historical.isHistoricalLoading,
  };
}
