import { FileText, CheckCircle, Clock, Layers } from 'lucide-react';

const STATS = [
  { label: 'Total Transcribed', value: '3,155+', unit: 'hours', icon: FileText, color: 'indigo' },
  { label: 'Accepted & Verified', value: '1,303', unit: 'hours', icon: CheckCircle, color: 'emerald' },
  { label: 'Batches Submitted', value: '2,048', unit: 'batches', icon: Layers, color: 'blue' },
  { label: 'In Progress', value: '745', unit: 'hours', icon: Clock, color: 'amber' },
];

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
};

const RECENT_BATCHES = [
  { id: 'TXN-2048', vendor: 'Vendor A', hours: 12.4, status: 'Accepted', lang: 'Hindi' },
  { id: 'TXN-2047', vendor: 'Vendor B', hours: 8.1, status: 'Pending', lang: 'Kannada' },
  { id: 'TXN-2046', vendor: 'Vendor C', hours: 15.6, status: 'Accepted', lang: 'Tamil' },
  { id: 'TXN-2045', vendor: 'Vendor A', hours: 6.3, status: 'Rejected', lang: 'Telugu' },
  { id: 'TXN-2044', vendor: 'Vendor D', hours: 9.9, status: 'Accepted', lang: 'Bengali' },
];

const statusColor: Record<string, string> = {
  Accepted: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Rejected: 'bg-red-50 text-red-600',
};

export default function TranscriptionPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Transcription</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Quality-verified speech-to-text data across Indian languages.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
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

      {/* Recent batches table */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-50 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-800">Recent Batches</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-500">
                <th className="px-6 py-3 font-medium">Batch ID</th>
                <th className="px-6 py-3 font-medium">Vendor</th>
                <th className="px-6 py-3 font-medium">Language</th>
                <th className="px-6 py-3 font-medium">Hours</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_BATCHES.map((b) => (
                <tr key={b.id} className="border-t border-slate-50 text-sm hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-3 font-mono text-xs text-slate-600">{b.id}</td>
                  <td className="px-6 py-3 text-slate-700">{b.vendor}</td>
                  <td className="px-6 py-3 text-slate-600">{b.lang}</td>
                  <td className="px-6 py-3 text-slate-700">{b.hours}h</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[b.status]}`}>
                      {b.status}
                    </span>
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
