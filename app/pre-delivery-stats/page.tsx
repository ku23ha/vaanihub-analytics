import { BarChart2, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const VENDOR_STATS = [
  { vendor: 'Vendor A', submitted: 420, accepted: 380, rejected: 28, pending: 12, rate: 90 },
  { vendor: 'Vendor B', submitted: 310, accepted: 265, rejected: 35, pending: 10, rate: 85 },
  { vendor: 'Vendor C', submitted: 280, accepted: 251, rejected: 22, pending: 7, rate: 90 },
  { vendor: 'Vendor D', submitted: 195, accepted: 162, rejected: 25, pending: 8, rate: 83 },
  { vendor: 'Vendor E', submitted: 150, accepted: 138, rejected: 9, pending: 3, rate: 92 },
];

const QUALITY_METRICS = [
  { metric: 'Avg SNR', value: '28.4 dB', trend: 'up', delta: '+1.2 dB' },
  { metric: 'Clipping Rate', value: '1.8%', trend: 'down', delta: '-0.3%' },
  { metric: 'Silence Ratio', value: '12.1%', trend: 'neutral', delta: '±0%' },
  { metric: 'WER (avg)', value: '6.4%', trend: 'down', delta: '-0.8%' },
];

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') return <TrendingUp size={14} className="text-emerald-500" />;
  if (trend === 'down') return <TrendingDown size={14} className="text-blue-500" />;
  return <Minus size={14} className="text-slate-400" />;
}

export default function PreDeliveryStatsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <BarChart2 size={20} className="text-slate-500" />
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Pre Delivery Stats</h1>
          <p className="mt-0.5 text-sm text-slate-500">Quality metrics and vendor performance before final delivery.</p>
        </div>
      </div>

      {/* Quality metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {QUALITY_METRICS.map((m) => (
          <div key={m.metric} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{m.metric}</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{m.value}</p>
            <div className="mt-1.5 flex items-center gap-1">
              <TrendIcon trend={m.trend} />
              <span className={`text-xs font-medium ${
                m.trend === 'up' ? 'text-emerald-600' :
                m.trend === 'down' ? 'text-blue-600' : 'text-slate-400'
              }`}>
                {m.delta} vs last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Vendor performance table */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-50 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-800">Vendor Acceptance Rates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-500">
                <th className="px-6 py-3 font-medium">Vendor</th>
                <th className="px-6 py-3 font-medium text-right">Submitted</th>
                <th className="px-6 py-3 font-medium text-right">Accepted</th>
                <th className="px-6 py-3 font-medium text-right">Rejected</th>
                <th className="px-6 py-3 font-medium text-right">Pending</th>
                <th className="px-6 py-3 font-medium">Acceptance Rate</th>
              </tr>
            </thead>
            <tbody>
              {VENDOR_STATS.map((v) => (
                <tr key={v.vendor} className="border-t border-slate-50 hover:bg-slate-50/60">
                  <td className="px-6 py-3 font-medium text-slate-800">{v.vendor}</td>
                  <td className="px-6 py-3 text-right text-slate-600">{v.submitted}</td>
                  <td className="px-6 py-3 text-right text-emerald-600 font-medium">{v.accepted}</td>
                  <td className="px-6 py-3 text-right text-red-500">{v.rejected}</td>
                  <td className="px-6 py-3 text-right text-amber-600">{v.pending}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-emerald-500"
                          style={{ width: `${v.rate}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-10 text-right">{v.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
