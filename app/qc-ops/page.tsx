import { CheckCircle, AlertTriangle, Clock, Users, Search } from 'lucide-react';

const QC_STATS = [
  { label: 'QC Queue', value: '347', sub: 'items pending', icon: Clock, color: 'amber' },
  { label: 'Reviewed Today', value: '128', sub: 'by 8 reviewers', icon: CheckCircle, color: 'emerald' },
  { label: 'Flagged Issues', value: '23', sub: 'require rework', icon: AlertTriangle, color: 'red' },
  { label: 'Active Reviewers', value: '14', sub: 'online now', icon: Users, color: 'blue' },
];

const colorMap: Record<string, string> = {
  amber: 'bg-amber-50 text-amber-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
  blue: 'bg-blue-50 text-blue-600',
};

const QC_ITEMS = [
  { id: 'QC-9182', type: 'Audio', lang: 'Hindi', issue: 'Background noise > threshold', reviewer: 'Priya S.', severity: 'High', status: 'Open' },
  { id: 'QC-9181', type: 'Transcription', lang: 'Tamil', issue: 'Misaligned timestamps', reviewer: 'Arjun K.', severity: 'Medium', status: 'In Review' },
  { id: 'QC-9180', type: 'Audio', lang: 'Kannada', issue: 'Speaker overlap detected', reviewer: 'Meena R.', severity: 'Medium', status: 'Open' },
  { id: 'QC-9179', type: 'Transcription', lang: 'Bengali', issue: 'Missing punctuation marks', reviewer: 'Rahul D.', severity: 'Low', status: 'Resolved' },
  { id: 'QC-9178', type: 'Audio', lang: 'Telugu', issue: 'Clipping in 3 segments', reviewer: 'Suma B.', severity: 'High', status: 'Resolved' },
];

const severityColor: Record<string, string> = {
  High: 'bg-red-50 text-red-600',
  Medium: 'bg-amber-50 text-amber-700',
  Low: 'bg-slate-100 text-slate-600',
};

const statusColor: Record<string, string> = {
  Open: 'bg-red-50 text-red-600',
  'In Review': 'bg-blue-50 text-blue-600',
  Resolved: 'bg-emerald-50 text-emerald-700',
};

export default function QCOpsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">QC Ops</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Quality control queue, issue tracking, and reviewer assignments.
          </p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search issues…"
            className="rounded-xl border border-slate-200 bg-white pl-8 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {QC_STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className={`flex size-10 items-center justify-center rounded-xl ${colorMap[s.color]}`}>
                <Icon size={17} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Issue table */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-50 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-800">Open & In-Review Issues</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-500">
                <th className="px-6 py-3 font-medium">Issue ID</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Language</th>
                <th className="px-6 py-3 font-medium">Issue</th>
                <th className="px-6 py-3 font-medium">Reviewer</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {QC_ITEMS.map((item) => (
                <tr key={item.id} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-3 font-mono text-xs text-slate-600">{item.id}</td>
                  <td className="px-6 py-3">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">{item.type}</span>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{item.lang}</td>
                  <td className="px-6 py-3 text-slate-700 max-w-[200px] truncate">{item.issue}</td>
                  <td className="px-6 py-3 text-slate-600">{item.reviewer}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${severityColor[item.severity]}`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[item.status]}`}>
                      {item.status}
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
