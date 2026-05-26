'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Headphones,
  FileText,
  PieChart,
  Truck,
  BarChart2,
  FlaskConical,
  MessageSquare,
  CheckCircle,
  Folder,
  CheckSquare,
  Globe,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { VaaniIcon } from '@/components/ui/VaaniLogo';

// ─── Nav item types ───────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  isWebAnalytics?: boolean;
}

// ─── Nav structure
// "Website Analytics" sits directly below "Summary", then the rest
const NAV_ITEMS: NavItem[] = [
  { label: 'Summary',           href: '/',                   icon: LayoutDashboard },
  { label: 'Website Analytics', href: '/analytics',          icon: Globe,     isWebAnalytics: true },
  { label: 'Audio',             href: '/audio',              icon: Headphones },
  { label: 'Transcription',     href: '/transcription',      icon: FileText },
  { label: 'Data Distribution', href: '/data-distribution',  icon: PieChart },
  { label: 'Delivery Plan',     href: '/delivery-plan',      icon: Truck },
  { label: 'Pre Delivery Stats',href: '/pre-delivery-stats', icon: BarChart2 },
  { label: 'Experiments',       href: '/experiments',        icon: FlaskConical },
  { label: 'FeedBackSummary',   href: '/feedback',           icon: MessageSquare },
  { label: 'QC Ops',            href: '/qc-ops',             icon: CheckCircle },
  { label: 'Resources',         href: '/resources',          icon: Folder },
  { label: 'To-Do List',        href: '/todo',               icon: CheckSquare },
];

// ─── Single nav link ──────────────────────────────────────────

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  /* ── Website Analytics — slightly accented but not loud ── */
  if (item.isWebAnalytics) {
    return (
      <Link href={item.href}>
        <motion.div
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
            transition-all duration-150
            ${active
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-800'
            }
          `}
        >
          <span className="relative shrink-0">
            <Icon size={15} />
            {/* Subtle live pulse dot */}
            <span
              className={`absolute -top-0.5 -right-0.5 size-1.5 rounded-full ${
                active ? 'bg-white' : 'bg-emerald-500'
              }`}
            />
          </span>
          <span className="flex-1 truncate">{item.label}</span>
          {active && <ChevronRight size={12} className="shrink-0 opacity-70" />}
        </motion.div>
      </Link>
    );
  }

  /* ── Standard nav item ── */
  return (
    <Link href={item.href}>
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
          transition-all duration-150
          ${active
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
          }
        `}
      >
        <Icon size={15} className="shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>
        {active && <ChevronRight size={11} className="shrink-0 text-slate-400" />}
      </motion.div>
    </Link>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[232px] shrink-0 flex-col border-r border-slate-200 bg-white">

      {/* ── Brand / Logo ─────────────────────────────────── */}
      {/* Clicking redirects to the official Vaani website */}
      <a
        href="https://vaani.iisc.ac.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 items-center gap-2.5 border-b border-slate-100 px-4 transition-opacity hover:opacity-80"
      >
        <VaaniIcon size={30} />
        <div className="leading-none">
          <p className="text-sm font-bold tracking-tight text-[#1E40AF]">Vaani</p>
          <p className="text-[10px] text-slate-400">Hub Platform</p>
        </div>
      </a>

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))
            }
          />
        ))}
      </nav>

      {/* ── Footer — user + logout ────────────────────────── */}
      <div className="border-t border-slate-100 px-3 py-3">
        <div className="mb-2 flex items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
            U
          </div>
          <div className="min-w-0 flex-1 leading-none">
            <p className="truncate text-xs font-medium text-slate-800">User</p>
            <p className="truncate text-[10px] text-slate-400">Artpark</p>
          </div>
        </div>

        <Link href="/login">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600">
            <LogOut size={14} />
            <span>Log Out</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
