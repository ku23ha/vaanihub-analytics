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
  Cell,
} from 'recharts';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import type { DeviceData } from '@/lib/analytics/types';
import { formatNumber } from '@/lib/analytics/utils';

// ─── Device Icon ──────────────────────────────────────────────

function DeviceIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower === 'mobile') return <Smartphone size={13} />;
  if (lower === 'tablet') return <Tablet size={13} />;
  return <Monitor size={13} />;
}

// ─── Colors ───────────────────────────────────────────────────

const DEVICE_COLORS: Record<string, string> = {
  desktop: '#6366f1',
  mobile: '#10b981',
  tablet: '#f59e0b',
};

function getDeviceColor(name: string) {
  return DEVICE_COLORS[name.toLowerCase()] ?? '#94a3b8';
}

// ─── Custom Tooltip ───────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-lg">
      <p className="text-xs font-semibold text-slate-800">{label}</p>
      <p className="mt-0.5 text-xs text-slate-500">{formatNumber(payload[0].value)} sessions</p>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────

interface DeviceAnalyticsProps {
  data: DeviceData[];
}

export default function DeviceAnalytics({ data }: DeviceAnalyticsProps) {
  const maxSessions = Math.max(...data.map((d) => d.sessions), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.3 }}
      className="flex flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Device Breakdown</h3>
        <p className="text-xs text-slate-400">Sessions by device type</p>
      </div>

      {/* Bar chart */}
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="device"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatNumber}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.device} fill={getDeviceColor(entry.device)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats rows */}
      <div className="mt-3 space-y-2">
        {data.map((d) => (
          <div key={d.device} className="flex items-center gap-2">
            <span style={{ color: getDeviceColor(d.device) }}>
              <DeviceIcon name={d.device} />
            </span>
            <span className="flex-1 text-xs text-slate-600">{d.device}</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(d.sessions / maxSessions) * 100}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getDeviceColor(d.device) }}
                />
              </div>
              <span className="w-8 text-right text-[11px] font-medium text-slate-700">
                {d.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
