'use client';

import { motion } from 'framer-motion';
import { Users, Eye, MousePointerClick, Clock, UserPlus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatNumber, formatDuration, formatChange, getChangeBgColor } from '@/lib/analytics/utils';
import type { OverviewMetrics } from '@/lib/analytics/types';

// ─── Types ────────────────────────────────────────────────────

interface CardConfig {
  key: keyof OverviewMetrics;
  changeKey: keyof OverviewMetrics;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  format: (v: number) => string;
  changeMetric: 'positive' | 'negative';
  description: string;
}

// ─── Card configs ─────────────────────────────────────────────

const CARDS: CardConfig[] = [
  {
    key: 'sessions',
    changeKey: 'sessionsChange',
    label: 'Sessions',
    icon: MousePointerClick,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    format: formatNumber,
    changeMetric: 'positive',
    description: 'Last 30 days',
  },
  {
    key: 'pageviews',
    changeKey: 'pageviewsChange',
    label: 'Page Views',
    icon: Eye,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    format: formatNumber,
    changeMetric: 'positive',
    description: 'Last 30 days',
  },
  {
    key: 'users',
    changeKey: 'usersChange',
    label: 'Total Users',
    icon: Users,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    format: formatNumber,
    changeMetric: 'positive',
    description: 'Last 30 days',
  },
  {
    key: 'newUsers',
    changeKey: 'usersChange',
    label: 'New Users',
    icon: UserPlus,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    format: formatNumber,
    changeMetric: 'positive',
    description: 'First-time visitors',
  },
  {
    key: 'bounceRate',
    changeKey: 'bounceRateChange',
    label: 'Bounce Rate',
    icon: ArrowUpRight,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    format: (v) => `${v.toFixed(1)}%`,
    changeMetric: 'negative', // lower bounce rate is better
    description: 'Non-engaged sessions',
  },
  {
    key: 'avgEngagementTime',
    changeKey: 'engagementTimeChange',
    label: 'Avg. Engagement',
    icon: Clock,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    format: formatDuration,
    changeMetric: 'positive',
    description: 'Time per session',
  },
];

// ─── Single Metric Card ───────────────────────────────────────

interface MetricCardProps {
  config: CardConfig;
  overview: OverviewMetrics;
  index: number;
}

function MetricCard({ config, overview, index }: MetricCardProps) {
  const Icon = config.icon;
  const value = overview[config.key] as number;
  const change = overview[config.changeKey] as number;
  const isPositive =
    config.changeMetric === 'positive' ? change >= 0 : change <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Subtle top accent line */}
      <div
        className={`absolute inset-x-0 top-0 h-0.5 ${config.bgColor.replace('bg-', 'bg-').replace('-50', '-300')} opacity-0 transition-opacity group-hover:opacity-100`}
      />

      {/* Header row */}
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-slate-500">{config.label}</p>
        <div className={`flex size-8 items-center justify-center rounded-lg ${config.bgColor}`}>
          <Icon size={14} className={config.color} />
        </div>
      </div>

      {/* Value */}
      <div className="mt-3">
        <p className="text-2xl font-bold tracking-tight text-slate-900">
          {config.format(value)}
        </p>
      </div>

      {/* Change indicator */}
      <div className="mt-2 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${getChangeBgColor(change, config.changeMetric)}`}
        >
          {isPositive ? (
            <ArrowUpRight size={10} />
          ) : (
            <ArrowDownRight size={10} />
          )}
          {formatChange(Math.abs(change))}
        </span>
        <span className="text-[11px] text-slate-400">vs last period</span>
      </div>

      {/* Description */}
      <p className="mt-1 text-[11px] text-slate-400">{config.description}</p>
    </motion.div>
  );
}

// ─── Metric Cards Grid ────────────────────────────────────────

interface MetricCardsProps {
  overview: OverviewMetrics;
}

export default function MetricCards({ overview }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {CARDS.map((config, i) => (
        <MetricCard key={config.key} config={config} overview={overview} index={i} />
      ))}
    </div>
  );
}
