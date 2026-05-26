'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { TopPage } from '@/lib/analytics/types';
import { formatNumber, formatDuration } from '@/lib/analytics/utils';

// ─── Table Row ────────────────────────────────────────────────

function PageRow({ page, index }: { page: TopPage; index: number }) {
  const bounceColor =
    page.bounceRate < 30
      ? 'text-emerald-600 bg-emerald-50'
      : page.bounceRate < 50
      ? 'text-amber-600 bg-amber-50'
      : 'text-red-500 bg-red-50';

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 + index * 0.04 }}
      className="group border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
    >
      {/* Rank */}
      <td className="py-3 pl-5 pr-3">
        <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
          {index + 1}
        </span>
      </td>

      {/* Path */}
      <td className="max-w-[200px] py-3 pr-4">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-xs font-medium text-slate-800" title={page.path}>
            {page.path}
          </span>
          <ExternalLink
            size={10}
            className="shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
        <span className="block truncate text-[11px] text-slate-400" title={page.title}>
          {page.title}
        </span>
      </td>

      {/* Page views */}
      <td className="py-3 pr-4 text-right">
        <span className="text-xs font-semibold text-slate-800">
          {formatNumber(page.pageviews)}
        </span>
        <span className="block text-[11px] text-slate-400">views</span>
      </td>

      {/* Sessions */}
      <td className="py-3 pr-4 text-right">
        <span className="text-xs font-semibold text-slate-800">
          {formatNumber(page.sessions)}
        </span>
        <span className="block text-[11px] text-slate-400">sessions</span>
      </td>

      {/* Bounce Rate */}
      <td className="py-3 pr-4 text-right">
        <span
          className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${bounceColor}`}
        >
          {page.bounceRate.toFixed(1)}%
        </span>
      </td>

      {/* Avg Time */}
      <td className="py-3 pr-5 text-right">
        <span className="text-xs font-medium text-slate-700">
          {formatDuration(page.avgTime)}
        </span>
      </td>
    </motion.tr>
  );
}

// ─── Component ───────────────────────────────────────────────

interface TopPagesProps {
  data: TopPage[];
}

export default function TopPages({ data }: TopPagesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.4 }}
      className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Top Pages</h3>
          <p className="text-xs text-slate-400">Most visited pages — last 30 days</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600">
          {data.length} pages
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="py-2.5 pl-5 pr-3 text-left">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">#</span>
              </th>
              <th className="py-2.5 pr-4 text-left">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Page</span>
              </th>
              <th className="py-2.5 pr-4 text-right">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Views</span>
              </th>
              <th className="py-2.5 pr-4 text-right">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Sessions</span>
              </th>
              <th className="py-2.5 pr-4 text-right">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Bounce</span>
              </th>
              <th className="py-2.5 pr-5 text-right">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Avg Time</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((page, i) => (
              <PageRow key={page.path} page={page} index={i} />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
