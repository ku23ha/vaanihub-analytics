import { MessageSquare, Star, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

const SUMMARY_CARDS = [
  { label: 'Total Responses', value: '12,480', sub: '+843 this month', icon: MessageSquare, color: 'blue' },
  { label: 'Avg Rating', value: '4.3/5', sub: '★★★★☆', icon: Star, color: 'amber' },
  { label: 'Positive', value: '78%', sub: '9,734 responses', icon: ThumbsUp, color: 'emerald' },
  { label: 'Needs Improvement', value: '14%', sub: '1,747 responses', icon: ThumbsDown, color: 'red' },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
};

const FEEDBACK_ITEMS = [
  {
    id: 'FB-1948',
    text: 'Audio quality is excellent, very clear recordings.',
    sentiment: 'positive',
    lang: 'Hindi',
    date: '2024-09-20',
    vendor: 'Vendor A',
  },
  {
    id: 'FB-1947',
    text: 'Some background noise in rural recordings. Needs filtering.',
    sentiment: 'neutral',
    lang: 'Tamil',
    date: '2024-09-19',
    vendor: 'Vendor C',
  },
  {
    id: 'FB-1946',
    text: 'Transcription accuracy is improving significantly.',
    sentiment: 'positive',
    lang: 'Bengali',
    date: '2024-09-19',
    vendor: 'Vendor B',
  },
  {
    id: 'FB-1945',
    text: 'Dialect labels are inconsistent for Rajasthani variants.',
    sentiment: 'negative',
    lang: 'Rajasthani',
    date: '2024-09-18',
    vendor: 'Vendor D',
  },
  {
    id: 'FB-1944',
    text: 'Platform upload speed has improved. Great work!',
    sentiment: 'positive',
    lang: 'Kannada',
    date: '2024-09-17',
    vendor: 'Vendor A',
  },
];

const sentimentConfig: Record<string, { icon: React.ReactNode; cls: string }> = {
  positive: { icon: <ThumbsUp size={12} />, cls: 'bg-emerald-50 text-emerald-600' },
  neutral: { icon: <Minus size={12} />, cls: 'bg-slate-100 text-slate-500' },
  negative: { icon: <ThumbsDown size={12} />, cls: 'bg-red-50 text-red-600' },
};

export default function FeedbackPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Feedback Summary</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Aggregated vendor and contributor feedback for quality improvement.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {SUMMARY_CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className={`inline-flex size-9 items-center justify-center rounded-xl ${colorMap[c.color]}`}>
                <Icon size={16} />
              </div>
              <p className="mt-3 text-xl font-bold text-slate-900">{c.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{c.label}</p>
              <p className="text-xs text-slate-400 mt-1">{c.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Feedback items */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">Recent Feedback</h2>
          <span className="text-xs text-slate-400">12,480 total</span>
        </div>
        <div className="divide-y divide-slate-50">
          {FEEDBACK_ITEMS.map((fb) => {
            const sc = sentimentConfig[fb.sentiment];
            return (
              <div key={fb.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                <span className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0 ${sc.cls}`}>
                  {sc.icon}
                  {fb.sentiment}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 leading-relaxed">"{fb.text}"</p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-mono">{fb.id}</span>
                    <span>·</span>
                    <span>{fb.lang}</span>
                    <span>·</span>
                    <span>{fb.vendor}</span>
                    <span>·</span>
                    <span>{fb.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
