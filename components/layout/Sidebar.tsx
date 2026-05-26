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
  TrendingUp,
  LogOut,
  ChevronRight,
  Activity,
} from 'lucide-react';

// ─── Nav Item Definition ──────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  isAnalytics?: boolean;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Summary', href: '/', icon: LayoutDashboard },
  { label: 'Audio', href: '/audio', icon: Headphones },
  { label: 'Transcription', href: '/transcription', icon: FileText },
  { label: 'Data Distribution', href: '/data-distribution', icon: PieChart },
  { label: 'Delivery Plan', href: '/delivery-plan', icon: Truck },
  { label: 'Pre Delivery Stats', href: '/pre-delivery-stats', icon: BarChart2 },
  { label: 'Experiments', href: '/experiments', icon: FlaskConical },
  { label: 'FeedBackSummary', href: '/feedback', icon: MessageSquare },
  { label: 'QC Ops', href: '/qc-ops', icon: CheckCircle },
  { label: 'Resources', href: '/resources', icon: Folder },
  { label: 'To-Do List', href: '/todo', icon: CheckSquare },
];

const ANALYTICS_ITEM: NavItem = {
  label: 'Analytics',
  href: '/analytics',
  icon: TrendingUp,
  isAnalytics: true,
  badge: 'Live',
};

// ─── Sub-components ───────────────────────────────────────────

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  if (item.isAnalytics) {
    return (
      <Link href={item.href}>
        <motion.div
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
            transition-all duration-150 group
            ${
              active
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
            }
          `}
        >
          {/* Animated "live" dot */}
          <span className="relative flex size-4 shrink-0 items-center justify-center">
            <Icon size={16} className="relative z-10" />
            {!active && (
              <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-emerald-500" />
            )}
          </span>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span
              className={`
                rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none
                ${active ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}
              `}
            >
              {item.badge}
            </span>
          )}
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={item.href}>
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
          transition-all duration-150
          ${
            active
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }
        `}
      >
        <Icon size={15} className="shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>
        {active && <ChevronRight size={12} className="shrink-0 text-indigo-400" />}
      </motion.div>
    </Link>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[230px] shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo / Brand */}
      <div className="flex h-14 items-center gap-2.5 border-b border-slate-100 px-4">
        <div className="flex size-7 items-center justify-center rounded-md bg-indigo-600 text-white shadow-sm">
          <Activity size={14} strokeWidth={2.5} />
        </div>
        <div className="leading-none">
          <p className="text-sm font-bold tracking-tight text-slate-900">Vaani</p>
          <p className="text-[10px] text-slate-400">Hub Analytics</p>
        </div>
      </div>

      {/* Scrollable nav */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-3">
        {/* Analytics item — pinned at top, visually distinct */}
        <div className="mb-2">
          <NavLink item={ANALYTICS_ITEM} active={pathname === ANALYTICS_ITEM.href} />
        </div>

        {/* Divider */}
        <div className="mb-2 px-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Platform
          </span>
        </div>

        {/* Standard nav items */}
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
          />
        ))}
      </nav>

      {/* Footer — user + logout */}
      <div className="border-t border-slate-100 px-3 py-3">
        {/* User chip */}
        <div className="mb-2 flex items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2">
          <div className="flex size-6 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
            U
          </div>
          <div className="min-w-0 flex-1 leading-none">
            <p className="truncate text-xs font-medium text-slate-800">User</p>
            <p className="truncate text-[10px] text-slate-400">Artpark</p>
          </div>
        </div>

        <Link href="/logout">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600">
            <LogOut size={14} />
            <span>Log Out</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
