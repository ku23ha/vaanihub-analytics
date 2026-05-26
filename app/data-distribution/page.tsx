import { PieChart, MapPin, Globe, Users } from 'lucide-react';

const LANGUAGE_DATA = [
  { lang: 'Hindi', hours: 4820, pct: 19, color: '#3B82F6' },
  { lang: 'Bengali', hours: 2310, pct: 9, color: '#8B5CF6' },
  { lang: 'Tamil', hours: 2100, pct: 8, color: '#10B981' },
  { lang: 'Telugu', hours: 1980, pct: 8, color: '#F59E0B' },
  { lang: 'Kannada', hours: 1750, pct: 7, color: '#EF4444' },
  { lang: 'Marathi', hours: 1620, pct: 6, color: '#EC4899' },
  { lang: 'Gujarati', hours: 1440, pct: 6, color: '#14B8A6' },
  { lang: 'Others (22+)', hours: 9980, pct: 37, color: '#94A3B8' },
];

export default function DataDistributionPage() {
  const total = LANGUAGE_DATA.reduce((s, d) => s + d.hours, 0);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Data Distribution</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Audio hours distributed across languages, states, and districts.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Languages Covered', value: '28+', icon: Globe, color: 'text-blue-600 bg-blue-50' },
          { label: 'Districts Covered', value: '700+', icon: MapPin, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Contributors', value: '1.1M+', icon: Users, color: 'text-purple-600 bg-purple-50' },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className={`flex size-10 items-center justify-center rounded-xl ${c.color}`}>
              <c.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{c.value}</p>
              <p className="text-xs text-slate-500">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Language breakdown */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <PieChart size={15} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-800">Hours by Language</h2>
          <span className="ml-auto text-xs text-slate-400">{total.toLocaleString()} total hrs</span>
        </div>
        <div className="flex flex-col gap-3">
          {LANGUAGE_DATA.map((d) => (
            <div key={d.lang} className="flex items-center gap-3">
              <span className="w-24 text-xs text-slate-600 font-medium">{d.lang}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-700"
                  style={{ width: `${d.pct}%`, backgroundColor: d.color }}
                />
              </div>
              <span className="w-16 text-right text-xs text-slate-500">{d.hours.toLocaleString()} hrs</span>
              <span className="w-8 text-right text-xs font-medium text-slate-700">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
