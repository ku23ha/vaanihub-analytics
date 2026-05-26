'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { useAnalyticsDashboard } from '@/hooks/useAnalytics';
import MetricCards from './MetricCards';
import TrafficChart from './TrafficChart';
import RealtimeWidget from './RealtimeWidget';
import TrafficSources from './TrafficSources';
import DeviceAnalytics from './DeviceAnalytics';
import GeoAnalytics from './GeoAnalytics';
import TopPages from './TopPages';
import LookerEmbed from './LookerEmbed';
import { DashboardSkeleton } from './LoadingSkeleton';
import { generateDemoHistoricalData, generateDemoRealtimeData } from '@/lib/analytics/utils';

// ─── Error State ─────────────────────────────────────────────

function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
    >
      <AlertCircle size={15} className="shrink-0" />
      <span>
        <strong>Using demo data</strong> — GA4 connection issue:{' '}
        {message.slice(0, 120)}
      </span>
    </motion.div>
  );
}

// ─── Header ───────────────────────────────────────────────────

interface HeaderProps {
  lastUpdated: string | null;
  onRefresh: () => void;
  isRefreshing: boolean;
}

function DashboardHeader({ lastUpdated, onRefresh, isRefreshing }: HeaderProps) {
  const formattedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600">
            <TrendingUp size={15} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Analytics</h1>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Website performance for{' '}
          <span className="font-medium text-slate-700">vaani.iisc.ac.in</span>
          {formattedTime && (
            <span className="ml-1.5 text-slate-400">· Updated {formattedTime}</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Date range badge */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
          <Calendar size={12} />
          Last 30 days
        </div>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 disabled:opacity-60"
        >
          <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────

export default function AnalyticsDashboard() {
  const {
    realtimeData,
    historicalData,
    realtimeError,
    historicalError,
    isAnyLoading,
    isHistoricalLoading,
    refreshRealtime,
    refreshHistorical,
    lastUpdated,
  } = useAnalyticsDashboard();

  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  async function handleRefresh() {
    setIsManualRefreshing(true);
    await Promise.all([refreshRealtime(), refreshHistorical()]);
    setIsManualRefreshing(false);
  }

  // Show skeleton on initial load
  if (isAnyLoading && !historicalData && !realtimeData) {
    return <DashboardSkeleton />;
  }

  // Use real data or fall back to demo
  const historical = historicalData ?? generateDemoHistoricalData();
  const realtime = realtimeData ?? generateDemoRealtimeData();
  const hasError = !!(realtimeError || historicalError);
  const errorMessage = historicalError ?? realtimeError ?? '';

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <DashboardHeader
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        isRefreshing={isManualRefreshing || isHistoricalLoading}
      />

      {/* Error banner (non-blocking) */}
      <AnimatePresence>
        {hasError && <ErrorBanner key="err" message={errorMessage} />}
      </AnimatePresence>

      {/* ── KPI Metric Cards ──────────────────────────────── */}
      <MetricCards overview={historical.overview} />

      {/* ── Traffic Chart + Realtime ──────────────────────── */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TrafficChart data={historical.dailyTrend} />
        </div>
        <RealtimeWidget
          data={realtime}
          error={realtimeError}
        />
      </div>

      {/* ── Sources / Devices / Geo ───────────────────────── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <TrafficSources data={historical.trafficSources} />
        <DeviceAnalytics data={historical.devices} />
        <GeoAnalytics data={historical.geography} />
      </div>

      {/* ── Top Pages table ────────────────────────────────── */}
      <TopPages data={historical.topPages} />

      {/* ── Looker Studio embed ─────────────────────────────── */}
      <LookerEmbed />

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
