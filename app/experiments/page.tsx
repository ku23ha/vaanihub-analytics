import { FlaskConical, Play, Pause, CheckCircle, AlertCircle } from 'lucide-react';

const EXPERIMENTS = [
  {
    id: 'EXP-001',
    name: 'Noise Augmentation v2',
    desc: 'Testing 15dB SNR augmentation on Kannada speech samples',
    status: 'running',
    progress: 68,
    started: '2024-09-10',
    team: 'ML Research',
  },
  {
    id: 'EXP-002',
    name: 'Dialect Clustering — South India',
    desc: 'Unsupervised clustering of dialect variants across Tamil Nadu, Karnataka, Andhra',
    status: 'completed',
    progress: 100,
    started: '2024-08-22',
    team: 'Linguistics',
  },
  {
    id: 'EXP-003',
    name: 'WER Benchmark — Whisper vs Vaani ASR',
    desc: 'Comparative WER evaluation on 500 hours of held-out Hindi speech',
    status: 'running',
    progress: 41,
    started: '2024-09-18',
    team: 'ASR',
  },
  {
    id: 'EXP-004',
    name: 'Speaker Diarization Quality',
    desc: 'Evaluating pyannote 3.1 on multi-speaker field recordings',
    status: 'paused',
    progress: 25,
    started: '2024-09-05',
    team: 'ML Research',
  },
  {
    id: 'EXP-005',
    name: 'Forced Alignment — Devanagari Corpus',
    desc: 'MFA forced alignment on 2000 hours of verified Hindi transcriptions',
    status: 'failed',
    progress: 12,
    started: '2024-09-14',
    team: 'Linguistics',
  },
];

const statusConfig: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  running: {
    label: 'Running',
    icon: <Play size={12} />,
    cls: 'bg-blue-50 text-blue-600',
  },
  completed: {
    label: 'Completed',
    icon: <CheckCircle size={12} />,
    cls: 'bg-emerald-50 text-emerald-700',
  },
  paused: {
    label: 'Paused',
    icon: <Pause size={12} />,
    cls: 'bg-amber-50 text-amber-700',
  },
  failed: {
    label: 'Failed',
    icon: <AlertCircle size={12} />,
    cls: 'bg-red-50 text-red-600',
  },
};

const progressColor: Record<string, string> = {
  running: 'bg-blue-500',
  completed: 'bg-emerald-500',
  paused: 'bg-amber-400',
  failed: 'bg-red-400',
};

export default function ExperimentsPage() {
  const running = EXPERIMENTS.filter((e) => e.status === 'running').length;
  const completed = EXPERIMENTS.filter((e) => e.status === 'completed').length;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FlaskConical size={20} className="text-slate-500" />
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Experiments</h1>
            <p className="mt-0.5 text-sm text-slate-500">Active ML and linguistics experiments on Vaani data.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            {running} running
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
            {completed} completed
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {EXPERIMENTS.map((exp) => {
          const sc = statusConfig[exp.status];
          return (
            <div key={exp.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-slate-400">{exp.id}</span>
                    <span className="text-xs rounded bg-slate-100 px-1.5 py-0.5 text-slate-500">{exp.team}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{exp.name}</h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{exp.desc}</p>
                  <p className="mt-2 text-xs text-slate-400">Started {exp.started}</p>
                </div>
                <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${sc.cls}`}>
                  {sc.icon}
                  {sc.label}
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                  <span>Progress</span>
                  <span className="font-medium text-slate-600">{exp.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-700 ${progressColor[exp.status]}`}
                    style={{ width: `${exp.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
