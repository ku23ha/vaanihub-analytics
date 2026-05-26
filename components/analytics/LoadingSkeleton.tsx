'use client';

import { motion } from 'framer-motion';

// ─── Pulse animation ──────────────────────────────────────────

const pulse = {
  animate: { opacity: [0.4, 0.7, 0.4] },
  transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' as const },
};

// ─── Primitives ───────────────────────────────────────────────

function SkeletonBox({ className }: { className?: string }) {
  return (
    <motion.div
      {...pulse}
      className={`rounded-md bg-slate-200 ${className ?? ''}`}
    />
  );
}

// ─── Metric Card Skeleton ─────────────────────────────────────

export function MetricCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <SkeletonBox className="h-3 w-20" />
        <SkeletonBox className="size-8 rounded-lg" />
      </div>
      <SkeletonBox className="mt-4 h-8 w-28" />
      <SkeletonBox className="mt-2 h-3 w-16" />
    </div>
  );
}

/** Grid of four metric card skeletons */
export function MetricCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <MetricCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ─── Chart Skeleton ───────────────────────────────────────────

export function ChartSkeleton({ height = 280 }: { height?: number }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-3 w-48" />
        </div>
        <SkeletonBox className="h-6 w-20 rounded-full" />
      </div>
      <motion.div
        {...pulse}
        className="mt-6 rounded-lg bg-slate-100"
        style={{ height }}
      />
    </div>
  );
}

// ─── Realtime Widget Skeleton ─────────────────────────────────

export function RealtimeWidgetSkeleton() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <SkeletonBox className="size-2 rounded-full" />
        <SkeletonBox className="h-3 w-16" />
      </div>
      <SkeletonBox className="mt-4 h-12 w-20" />
      <SkeletonBox className="mt-2 h-3 w-28" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <SkeletonBox className="h-3 w-32" />
            <SkeletonBox className="h-3 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Table Skeleton ───────────────────────────────────────────

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <SkeletonBox className="h-4 w-24" />
        <SkeletonBox className="h-6 w-20 rounded-full" />
      </div>
      <div className="divide-y divide-slate-50 px-5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3">
            <SkeletonBox className="h-3 flex-1" />
            <SkeletonBox className="h-3 w-12" />
            <SkeletonBox className="h-3 w-12" />
            <SkeletonBox className="h-3 w-12" />
            <SkeletonBox className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Full Dashboard Skeleton ──────────────────────────────────

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <SkeletonBox className="h-7 w-32" />
          <SkeletonBox className="h-3 w-48" />
        </div>
        <SkeletonBox className="h-8 w-24 rounded-lg" />
      </div>

      {/* KPI cards */}
      <MetricCardsSkeleton />

      {/* Chart + Realtime */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ChartSkeleton height={260} />
        </div>
        <RealtimeWidgetSkeleton />
      </div>

      {/* Lower row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartSkeleton height={200} />
        <ChartSkeleton height={200} />
        <ChartSkeleton height={200} />
      </div>

      {/* Table */}
      <TableSkeleton />
    </div>
  );
}
