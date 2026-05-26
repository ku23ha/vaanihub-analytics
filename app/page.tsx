/**
 * Vaani Hub — Summary / Home page
 * Preserves the existing Summary dashboard design from the platform.
 * Data shown here comes from the Vaani backend (mocked for now).
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Summary — Vaani Hub',
  description: 'Summary overview of transcription and audio processing',
};

// ─── Types ────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  sublabel?: string;
  value: string;
}

// ─── UI Primitives ────────────────────────────────────────────

function MetricCard({ label, sublabel, value }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-700">{label}</p>
      {sublabel && <p className="text-[11px] text-slate-400">{sublabel}</p>}
      <p className="mt-3 text-xl font-bold tracking-tight text-slate-900">{value}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-semibold text-indigo-600">{children}</h2>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function SummaryPage() {
  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Welcome back, User</h1>
          <p className="text-sm text-slate-500">Summary Overview</p>
        </div>

        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm">
            <option>All Vendors</option>
          </select>
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm">
            <option>Till Date</option>
          </select>
        </div>
      </div>

      {/* Transcription Overview */}
      <SectionTitle>Transcription Overview</SectionTitle>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="No of Batches" value="2048" />
        <MetricCard label="Total Sent" sublabel="(Speech Hrs)" value="1982.30" />
        <MetricCard label="Total Received" sublabel="(Speech Hrs)" value="3155.39" />
        <MetricCard label="Total Processed" sublabel="(Speech Hrs)" value="3155.39" />
        <MetricCard label="Total Pending" sublabel="(Speech Hrs)" value="0.00" />
        <MetricCard label="Total Accepted" sublabel="(Speech Hrs)" value="1303.78" />
        <MetricCard label="Total Rejected" sublabel="(Speech Hrs)" value="1851.61" />
      </div>

      {/* Audio Overview */}
      <SectionTitle>Audio Overview</SectionTitle>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="No of Batches" value="260" />
        <MetricCard label="Total Received" sublabel="(Audio Hrs)" value="25257.28" />
        <MetricCard label="Total Processed" sublabel="(Audio Hrs)" value="25254.82" />
        <MetricCard label="Total Pending" sublabel="(Audio Hrs)" value="2.46" />
        <MetricCard label="Total Accepted" sublabel="(Speech Hrs)" value="14717.38" />
        <MetricCard label="Total Rejected" sublabel="(Audio Hrs)" value="10421.99" />
        <MetricCard label="Total Rejected" sublabel="(Speech Hrs)" value="3850.35" />
      </div>

      {/* Data Downloads placeholder */}
      <SectionTitle>Data Downloads</SectionTitle>
      <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-slate-400">No downloads available</p>
      </div>

      {/* CTA to Analytics */}
      <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-indigo-900">
              📊 Website Analytics available
            </p>
            <p className="text-xs text-indigo-600">
              Track realtime visitors, page views, traffic sources, and more.
            </p>
          </div>
          <Link
            href="/analytics"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Open Analytics →
          </Link>
        </div>
      </div>
    </div>
  );
}
