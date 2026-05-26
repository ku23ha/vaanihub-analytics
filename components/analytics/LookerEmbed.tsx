'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ExternalLink, BarChart2, AlertCircle } from 'lucide-react';

const LOOKER_URL =
  'https://lookerstudio.google.com/embed/reporting/11725ac7-9f2d-41c1-8a15-3d37e8d6f2bb/page/p_6xn27iuprd';

const LOOKER_PUBLIC_URL =
  'https://lookerstudio.google.com/reporting/11725ac7-9f2d-41c1-8a15-3d37e8d6f2bb';

/** Auto-refresh interval: 15 minutes */
const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

export default function LookerEmbed() {
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL_MS / 1000);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-refresh countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Trigger refresh
          setKey((k) => k + 1);
          setIsLoading(true);
          setHasError(false);
          return REFRESH_INTERVAL_MS / 1000;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleManualRefresh() {
    setKey((k) => k + 1);
    setIsLoading(true);
    setHasError(false);
    setCountdown(REFRESH_INTERVAL_MS / 1000);
  }

  function formatCountdown(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  // Progress ring: countdown fraction
  const progress = countdown / (REFRESH_INTERVAL_MS / 1000);
  const circumference = 2 * Math.PI * 8; // r=8
  const dash = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.45 }}
      className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50">
            <BarChart2 size={15} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Looker Studio Report</h3>
            <p className="text-xs text-slate-400">Full embedded business intelligence report</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Countdown ring */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <svg width="20" height="20" className="-rotate-90">
              <circle cx="10" cy="10" r="8" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <circle
                cx="10" cy="10" r="8"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={dash}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <span>Refreshes in {formatCountdown(countdown)}</span>
          </div>

          {/* Manual refresh */}
          <button
            onClick={handleManualRefresh}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>

          {/* Open in new tab */}
          <a
            href={LOOKER_PUBLIC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ExternalLink size={12} />
            Open
          </a>
        </div>
      </div>

      {/* iframe container */}
      <div className="relative" style={{ height: 600 }}>
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-50">
            <div className="size-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
            <p className="text-xs text-slate-500">Loading Looker Studio report…</p>
          </div>
        )}

        {/* Error state */}
        {hasError && !isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-50">
            <AlertCircle size={32} className="text-slate-300" />
            <p className="text-sm font-medium text-slate-600">Unable to load report</p>
            <p className="max-w-sm text-center text-xs text-slate-400">
              The Looker Studio report may not be publicly accessible or requires authentication.
            </p>
            <a
              href={LOOKER_PUBLIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              <ExternalLink size={12} />
              Open in Looker Studio
            </a>
          </div>
        )}

        {/* The actual iframe */}
        <iframe
          key={key}
          ref={iframeRef}
          src={LOOKER_URL}
          className="h-full w-full border-0"
          style={{ display: hasError ? 'none' : 'block' }}
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          title="Vaani Hub Looker Studio Report"
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </motion.div>
  );
}
