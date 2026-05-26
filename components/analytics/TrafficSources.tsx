'use client';

import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TrafficSource } from '@/lib/analytics/types';
import { formatNumber } from '@/lib/analytics/utils';

// ─── Palette ──────────────────────────────────────────────────

const COLORS = ['#6366f1', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6'];

// ─── Custom Tooltip ───────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: TrafficSource }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-lg">
      <p className="text-xs font-semibold text-slate-800">{d.source}</p>
      <p className="mt-0.5 text-xs text-slate-500">
        {formatNumber(d.sessions)} sessions ({d.percentage}%)
      </p>
    </div>
  );
}

// ─── Custom legend row ────────────────────────────────────────

interface LegendRowProps {
  item: TrafficSource;
  color: string;
  index: number;
}

function LegendRow({ item, color, index }: LegendRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
      className="flex items-center gap-2"
    >
      <span
        className="inline-block size-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="flex-1 truncate text-xs text-slate-600">{item.source}</span>
      <span className="text-xs font-semibold text-slate-900">{item.percentage}%</span>
    </motion.div>
  );
}

// ─── Component ───────────────────────────────────────────────

interface TrafficSourcesProps {
  data: TrafficSource[];
}

export default function TrafficSources({ data }: TrafficSourcesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
      className="flex flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Traffic Sources</h3>
        <p className="text-xs text-slate-400">Channel breakdown — last 30 days</p>
      </div>

      {/* Donut chart */}
      <div className="flex h-[160px] items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={70}
              paddingAngle={2}
              dataKey="sessions"
              nameKey="source"
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-2">
        {data.slice(0, 5).map((item, i) => (
          <LegendRow
            key={item.source}
            item={item}
            color={COLORS[i % COLORS.length]}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}
