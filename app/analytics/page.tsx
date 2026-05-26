import type { Metadata } from 'next';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics — Vaani Hub',
  description: 'Realtime website analytics powered by Google Analytics 4',
};

/**
 * /analytics — Analytics operating system page
 * The dashboard itself is a client component (SWR + charts).
 * This server component just provides metadata and the wrapper.
 */
export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
