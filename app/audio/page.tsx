import { Headphones, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const STATS = [
  { label: 'Total Audio Collected', value: '25,000+', unit: 'hours', icon: Headphones, color: 'blue' },
  { label: 'Audio Pending', value: '2.46', unit: 'hours', icon: Clock, color: 'amber' },
  { label: 'Audio Accepted', value: '14,717', unit: 'hours', icon: CheckCircle, color: 'emerald' },
  { label: 'Audio Rejected', value: '10,421', unit: 'hours', icon: XCircle, color: 'red' },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  red: 'bg-red-50 text-red-600 border-red-100',
};

export default function AudioPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Audio</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Overview of audio recordings collected across India.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          <TrendingUp size={12} />
          Live data
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`flex flex-col gap-3 rounded-2xl border bg-white p-5 shadow-sm`}
            >
              <div className={`inline-flex size-10 items-center justify-center rounded-xl border ${colorMap[stat.color]}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {stat.value}
                  <span className="ml-1 text-sm font-normal text-slate-400">{stat.unit}</span>
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Audio batches */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">Audio Batches</h2>
          <span className="text-xs text-slate-400">260 batches submitted</span>
        </div>
        <div className="flex h-48 items-center justify-center rounded-xl bg-slate-50">
          <p className="text-sm text-slate-400">Audio batch chart — coming soon</p>
        </div>
      </div>
    </div>
  );
}
