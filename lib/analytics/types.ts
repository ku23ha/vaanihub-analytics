/**
 * Analytics module — TypeScript type definitions
 * All data shapes for GA4 realtime & historical metrics
 */

// ─── Realtime ─────────────────────────────────────────────────

export interface RealtimeActivePage {
  page: string;
  activeUsers: number;
}

export interface RealtimeDeviceBreakdown {
  device: string;
  activeUsers: number;
}

export interface RealtimeCountry {
  country: string;
  activeUsers: number;
}

export interface RealtimeData {
  activeUsers: number;
  activePages: RealtimeActivePage[];
  deviceBreakdown: RealtimeDeviceBreakdown[];
  topCountries: RealtimeCountry[];
  timestamp: string;
}

// ─── Historical ───────────────────────────────────────────────

export interface DailyMetric {
  /** Formatted as "MMM DD", e.g. "Jan 15" */
  date: string;
  sessions: number;
  pageviews: number;
  users: number;
  newUsers: number;
}

export interface OverviewMetrics {
  sessions: number;
  pageviews: number;
  users: number;
  newUsers: number;
  /** percentage 0-100 */
  bounceRate: number;
  /** seconds */
  avgEngagementTime: number;
  /** period-over-period % change */
  sessionsChange: number;
  pageviewsChange: number;
  usersChange: number;
  bounceRateChange: number;
  engagementTimeChange: number;
}

export interface TrafficSource {
  source: string;
  sessions: number;
  users: number;
  percentage: number;
}

export interface DeviceData {
  device: string;
  sessions: number;
  users: number;
  percentage: number;
}

export interface TopPage {
  path: string;
  title: string;
  pageviews: number;
  sessions: number;
  /** percentage 0-100 */
  bounceRate: number;
  /** seconds */
  avgTime: number;
}

export interface GeoData {
  country: string;
  sessions: number;
  users: number;
}

export interface HistoricalData {
  overview: OverviewMetrics;
  dailyTrend: DailyMetric[];
  trafficSources: TrafficSource[];
  devices: DeviceData[];
  topPages: TopPage[];
  geography: GeoData[];
}

// ─── API Response ─────────────────────────────────────────────

export interface AnalyticsApiResponse<T> {
  data: T | null;
  error: string | null;
  timestamp: string;
}
