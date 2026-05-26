'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { GeoData } from '@/lib/analytics/types';
import { formatNumber } from '@/lib/analytics/utils';

// ─── Custom Tooltip ───────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-lg">
      <p className="text-xs font-semibold text-slate-800">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="mt-0.5 text-xs text-slate-500">
          {p.name}: {formatNumber(p.value)}
        </p>
      ))}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────

interface GeoAnalyticsProps {
  data: GeoData[];
}

export default function GeoAnalytics({ data }: GeoAnalyticsProps) {
  // Truncate country names for display
  const chartData = data.slice(0, 8).map((d) => ({
    ...d,
    country:
      d.country.length > 12 ? d.country.slice(0, 11) + '…' : d.country,
    fullCountry: d.country,
  }));

  const maxSessions = Math.max(...data.map((d) => d.sessions), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35 }}
      className="flex flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Geographic Analytics</h3>
        <p className="text-xs text-slate-400">Top countries by sessions</p>
      </div>

      {/* Horizontal bar chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatNumber}
            />
            <YAxis
              type="category"
              dataKey="country"
              tick={{ fontSize: 10, fill: '#64748b' }}
              tickLine={false}
              axisLine={false}
              width={68}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="sessions" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 3 highlighted */}
      <div className="mt-3 space-y-2">
        {data.slice(0, 3).map((d, i) => (
          <motion.div
            key={d.country}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="flex items-center gap-2"
          >
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">
              {i + 1}
            </span>
            <span className="flex-1 text-xs text-slate-700">{d.country}</span>
            <span className="text-xs font-medium text-slate-500">
              {formatNumber(d.sessions)}
            </span>
            <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(d.sessions / maxSessions) * 100}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="h-full rounded-full bg-indigo-400"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
