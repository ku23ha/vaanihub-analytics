/**
 * Analytics utilities
 * Formatting helpers, demo data generators, and color helpers
 */

import type { HistoricalData } from './types';

/** Format large numbers with compact notation (1200 → "1.2K") */
export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

/** Format seconds into human-readable duration (154 → "2m 34s") */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  }
  return `${mins}m ${secs > 0 ? ` ${secs}s` : ''}`;
}

/** Format a percentage change with sign (+12.3% / -2.1%) */
export function formatChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

/** Format bounce rate (accepts 0-1 decimal or 0-100) */
export function formatBounceRate(value: number): string {
  const pct = value > 1 ? value : value * 100;
  return `${pct.toFixed(1)}%`;
}

/** Parse GA4 "YYYYMMDD" to "MMM DD" display string */
export function formatGA4Date(dateStr: string): string {
  if (dateStr.length !== 8) return dateStr;
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const d = new Date(`${year}-${month}-${day}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}

/** Calculate % change between two periods */
export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Tailwind text color for a change indicator
 * For bounce rate, pass metric = 'negative' (lower is better)
 */
export function getChangeColor(
  value: number,
  metric: 'positive' | 'negative' = 'positive',
): string {
  const good = metric === 'positive' ? value >= 0 : value <= 0;
  return good ? 'text-emerald-600' : 'text-red-500';
}

/** Tailwind bg color for a change pill */
export function getChangeBgColor(
  value: number,
  metric: 'positive' | 'negative' = 'positive',
): string {
  const good = metric === 'positive' ? value >= 0 : value <= 0;
  return good ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600';
}

/**
 * Generate deterministic demo data for dev / fallback states.
 * Data looks realistic but is not real GA4 data.
 */
export function generateDemoHistoricalData(): HistoricalData {
  const days = 30;
  const today = new Date();

  const dailyTrend = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (days - 1 - i));
    const label = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    // Sinusoidal base + random noise for realistic shape
    const base = Math.sin((i / days) * Math.PI) * 400;
    return {
      date: label,
      sessions: Math.floor(base + Math.random() * 250 + 700),
      pageviews: Math.floor(base * 2 + Math.random() * 600 + 1800),
      users: Math.floor(base * 0.85 + Math.random() * 200 + 550),
      newUsers: Math.floor(base * 0.4 + Math.random() * 100 + 280),
    };
  });

  return {
    overview: {
      sessions: 24830,
      pageviews: 68421,
      users: 18920,
      newUsers: 11034,
      bounceRate: 38.2,
      avgEngagementTime: 154,
      sessionsChange: 12.3,
      pageviewsChange: 8.7,
      usersChange: 15.2,
      bounceRateChange: -2.1,
      engagementTimeChange: 15.4,
    },
    dailyTrend,
    trafficSources: [
      { source: 'Organic Search', sessions: 9932, users: 7568, percentage: 40 },
      { source: 'Direct', sessions: 6208, users: 4730, percentage: 25 },
      { source: 'Referral', sessions: 4966, users: 3784, percentage: 20 },
      { source: 'Organic Social', sessions: 2483, users: 1892, percentage: 10 },
      { source: 'Email', sessions: 1241, users: 946, percentage: 5 },
    ],
    devices: [
      { device: 'Desktop', sessions: 13656, users: 10406, percentage: 55 },
      { device: 'Mobile', sessions: 8690, users: 6622, percentage: 35 },
      { device: 'Tablet', sessions: 2483, users: 1892, percentage: 10 },
    ],
    topPages: [
      { path: '/transcription', title: 'Transcription', pageviews: 12840, sessions: 9630, bounceRate: 32.1, avgTime: 187 },
      { path: '/audio', title: 'Audio', pageviews: 9430, sessions: 7072, bounceRate: 28.4, avgTime: 243 },
      { path: '/', title: 'Summary', pageviews: 8210, sessions: 6157, bounceRate: 45.2, avgTime: 96 },
      { path: '/experiments', title: 'Experiments', pageviews: 6540, sessions: 4905, bounceRate: 38.9, avgTime: 312 },
      { path: '/feedback', title: 'Feedback Summary', pageviews: 5120, sessions: 3840, bounceRate: 35.6, avgTime: 198 },
      { path: '/qc-ops', title: 'QC Ops', pageviews: 4200, sessions: 3150, bounceRate: 41.2, avgTime: 156 },
      { path: '/resources', title: 'Resources', pageviews: 3860, sessions: 2895, bounceRate: 55.4, avgTime: 82 },
      { path: '/delivery-plan', title: 'Delivery Plan', pageviews: 3240, sessions: 2430, bounceRate: 36.8, avgTime: 274 },
    ],
    geography: [
      { country: 'India', sessions: 14898, users: 11352 },
      { country: 'United States', sessions: 4966, users: 3784 },
      { country: 'United Kingdom', sessions: 1490, users: 1135 },
      { country: 'Germany', sessions: 994, users: 757 },
      { country: 'Canada', sessions: 745, users: 568 },
      { country: 'Australia', sessions: 497, users: 379 },
      { country: 'Singapore', sessions: 372, users: 283 },
      { country: 'Japan', sessions: 248, users: 189 },
    ],
  };
}

export function generateDemoRealtimeData() {
  return {
    activeUsers: Math.floor(Math.random() * 30 + 15),
    activePages: [
      { page: '/transcription', activeUsers: 8 },
      { page: '/audio', activeUsers: 5 },
      { page: '/', activeUsers: 4 },
      { page: '/experiments', activeUsers: 2 },
      { page: '/feedback', activeUsers: 1 },
    ],
    deviceBreakdown: [
      { device: 'desktop', activeUsers: 18 },
      { device: 'mobile', activeUsers: 10 },
      { device: 'tablet', activeUsers: 2 },
    ],
    topCountries: [
      { country: 'India', activeUsers: 22 },
      { country: 'United States', activeUsers: 6 },
      { country: 'United Kingdom', activeUsers: 2 },
    ],
    timestamp: new Date().toISOString(),
  };
}
