'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { DailyMetric } from '@/lib/analytics/types';
import { formatNumber } from '@/lib/analytics/utils';

// ─── Custom Tooltip ───────────────────────────────────────────

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-lg">
      <p className="mb-2 text-xs font-semibold text-slate-500">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="inline-block size-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-600 capitalize">{entry.name}:</span>
          <span className="font-semibold text-slate-900">{formatNumber(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Tab bar ─────────────────────────────────────────────────

type MetricKey = 'sessions' | 'pageviews' | 'users';

const TABS: { key: MetricKey; label: string; color: string; fill: string }[] = [
  { key: 'sessions', label: 'Sessions', color: '#6366f1', fill: '#6366f1' },
  { key: 'pageviews', label: 'Page Views', color: '#8b5cf6', fill: '#8b5cf6' },
  { key: 'users', label: 'Users', color: '#0ea5e9', fill: '#0ea5e9' },
];

// ─── Component ───────────────────────────────────────────────

interface TrafficChartProps {
  data: DailyMetric[];
}

export default function TrafficChart({ data }: TrafficChartProps) {
  const [activeMetrics, setActiveMetrics] = useState<Set<MetricKey>>(
    new Set(['sessions', 'pageviews']),
  );

  function toggle(key: MetricKey) {
    setActiveMetrics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key); // keep at least one
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Traffic Trends</h3>
          <p className="text-xs text-slate-400">Last 30 days — daily breakdown</p>
        </div>

        {/* Metric toggles */}
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => toggle(tab.key)}
              className={`
                flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all
                ${activeMetrics.has(tab.key)
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
                }
              `}
            >
              <span
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: activeMetrics.has(tab.key) ? tab.color : '#cbd5e1' }}
              />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mt-5 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <defs>
              {TABS.map((tab) => (
                <linearGradient
                  key={tab.key}
                  id={`gradient-${tab.key}`}
                  x1="0" y1="0" x2="0" y2="1"
                >
                  <stop offset="0%" stopColor={tab.color} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={tab.color} stopOpacity={0.01} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatNumber}
            />
            <Tooltip content={<CustomTooltip />} />
            {TABS.filter((t) => activeMetrics.has(t.key)).map((tab) => (
              <Area
                key={tab.key}
                type="monotone"
                dataKey={tab.key}
                stroke={tab.color}
                strokeWidth={2}
                fill={`url(#gradient-${tab.key})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
