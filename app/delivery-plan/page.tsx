import { Truck, Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';

const MILESTONES = [
  { phase: 'Phase 1', label: 'Pilot — 5,000 hrs', target: 'Mar 2023', status: 'done' },
  { phase: 'Phase 2', label: 'Scale — 50,000 hrs', target: 'Dec 2023', status: 'done' },
  { phase: 'Phase 3', label: 'Expansion — 100,000 hrs', target: 'Sep 2024', status: 'active' },
  { phase: 'Phase 4', label: 'Final — 150,000 hrs', target: 'Mar 2025', status: 'pending' },
];

const statusIcon: Record<string, React.ReactNode> = {
  done: <CheckCircle2 size={18} className="text-emerald-500" />,
  active: <Clock size={18} className="text-blue-500 animate-pulse" />,
  pending: <Circle size={18} className="text-slate-300" />,
};

const UPCOMING = [
  { id: 'DLV-2024-Q4-01', vendor: 'Vendor A', lang: 'Hindi', qty: '500 hrs', dueDate: '2024-10-15', priority: 'High' },
  { id: 'DLV-2024-Q4-02', vendor: 'Vendor B', lang: 'Tamil', qty: '300 hrs', dueDate: '2024-10-22', priority: 'Medium' },
  { id: 'DLV-2024-Q4-03', vendor: 'Vendor C', lang: 'Kannada', qty: '200 hrs', dueDate: '2024-11-01', priority: 'Medium' },
  { id: 'DLV-2024-Q4-04', vendor: 'Vendor D', lang: 'Bengali', qty: '400 hrs', dueDate: '2024-11-10', priority: 'Low' },
];

const priorityColor: Record<string, string> = {
  High: 'bg-red-50 text-red-600',
  Medium: 'bg-amber-50 text-amber-700',
  Low: 'bg-slate-100 text-slate-600',
};

export default function DeliveryPlanPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <Truck size={20} className="text-slate-500" />
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Delivery Plan</h1>
          <p className="mt-0.5 text-sm text-slate-500">Track data collection milestones and vendor delivery schedules.</p>
        </div>
      </div>

      {/* Milestone timeline */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold text-slate-800">Collection Milestones</h2>
        <div className="relative flex flex-col gap-6 pl-6">
          {/* Vertical line */}
          <div className="absolute left-2.5 top-2 h-[calc(100%-16px)] w-px bg-slate-100" />
          {MILESTONES.map((m) => (
            <div key={m.phase} className="relative flex items-start gap-4">
              <div className="absolute -left-3.5 top-0 rounded-full bg-white p-0.5">
                {statusIcon[m.status]}
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{m.phase}</span>
                  {m.status === 'active' && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm font-medium text-slate-800">{m.label}</p>
                <p className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar size={11} /> Target: {m.target}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming deliveries */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-50 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-800">Upcoming Deliveries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-500">
                <th className="px-6 py-3 font-medium">Delivery ID</th>
                <th className="px-6 py-3 font-medium">Vendor</th>
                <th className="px-6 py-3 font-medium">Language</th>
                <th className="px-6 py-3 font-medium">Quantity</th>
                <th className="px-6 py-3 font-medium">Due Date</th>
                <th className="px-6 py-3 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody>
              {UPCOMING.map((d) => (
                <tr key={d.id} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-3 font-mono text-xs text-slate-600">{d.id}</td>
                  <td className="px-6 py-3 text-slate-700">{d.vendor}</td>
                  <td className="px-6 py-3 text-slate-600">{d.lang}</td>
                  <td className="px-6 py-3 font-medium text-slate-800">{d.qty}</td>
                  <td className="px-6 py-3 text-slate-500">{d.dueDate}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColor[d.priority]}`}>
                      {d.priority}
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
