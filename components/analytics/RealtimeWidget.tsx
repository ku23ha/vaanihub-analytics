'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Monitor, Smartphone, Tablet, Globe, Zap } from 'lucide-react';
import type { RealtimeData } from '@/lib/analytics/types';

// ─── Pulsing dot ─────────────────────────────────────────────

function LiveDot() {
  return (
    <span className="relative flex size-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
    </span>
  );
}

// ─── Device icon helper ───────────────────────────────────────

function DeviceIcon({ device }: { device: string }) {
  const lower = device.toLowerCase();
  if (lower === 'mobile') return <Smartphone size={12} className="text-slate-400" />;
  if (lower === 'tablet') return <Tablet size={12} className="text-slate-400" />;
  return <Monitor size={12} className="text-slate-400" />;
}

// ─── Component ───────────────────────────────────────────────

interface RealtimeWidgetProps {
  data: RealtimeData;
  isLoading?: boolean;
  error?: string | null;
}

export default function RealtimeWidget({ data, isLoading, error }: RealtimeWidgetProps) {
  const [tick, setTick] = useState(0);

  // Tick every second to show "last updated X seconds ago"
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [data.timestamp]);

  const secondsAgo = Math.floor(
    (Date.now() - new Date(data.timestamp).getTime()) / 1000,
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col rounded-xl border border-emerald-100 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <LiveDot />
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Realtime
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          {secondsAgo < 10 ? 'just now' : `${secondsAgo}s ago`}
        </span>
      </div>

      {/* Active users hero number */}
      <div className="px-5 py-4">
        <div className="flex items-end gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={data.activeUsers}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-4xl font-extrabold tracking-tight text-slate-900"
            >
              {data.activeUsers}
            </motion.span>
          </AnimatePresence>
          <span className="mb-1 text-sm text-slate-500">active users</span>
        </div>
        <p className="mt-0.5 text-xs text-slate-400">in the last 30 minutes</p>
      </div>

      {/* Active pages */}
      {data.activePages.length > 0 && (
        <div className="border-t border-slate-50 px-5 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Active Pages
          </p>
          <div className="space-y-1.5">
            {data.activePages.slice(0, 5).map((page) => (
              <div key={page.page} className="flex items-center justify-between gap-2">
                <span className="truncate text-xs text-slate-600" title={page.page}>
                  {page.page}
                </span>
                <span className="shrink-0 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                  {page.activeUsers}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Device breakdown */}
      {data.deviceBreakdown.length > 0 && (
        <div className="border-t border-slate-50 px-5 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Devices
          </p>
          <div className="space-y-1.5">
            {data.deviceBreakdown.map((d) => {
              const pct =
                data.activeUsers > 0
                  ? Math.round((d.activeUsers / data.activeUsers) * 100)
                  : 0;
              return (
                <div key={d.device} className="flex items-center gap-2">
                  <DeviceIcon device={d.device} />
                  <span className="flex-1 text-xs text-slate-600 capitalize">{d.device}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full bg-indigo-400"
                      />
                    </div>
                    <span className="w-7 text-right text-[11px] text-slate-500">{d.activeUsers}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top countries */}
      {data.topCountries.length > 0 && (
        <div className="border-t border-slate-50 px-5 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Top Countries
          </p>
          <div className="space-y-1.5">
            {data.topCountries.slice(0, 3).map((c) => (
              <div key={c.country} className="flex items-center gap-2">
                <Globe size={11} className="text-slate-400" />
                <span className="flex-1 truncate text-xs text-slate-600">{c.country}</span>
                <span className="text-[11px] text-slate-500">{c.activeUsers}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mx-3 mb-3 rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-700">
          <Zap size={10} className="inline mr-1" />
          Using demo data — {error.slice(0, 60)}
        </div>
      )}
    </motion.div>
  );
}
