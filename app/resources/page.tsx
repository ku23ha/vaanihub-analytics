import { Folder, FileText, Download, ExternalLink, Book, Video } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Documentation',
    icon: Book,
    color: 'blue',
    items: [
      { name: 'Vaani Data Collection Guidelines v2.1', type: 'PDF', size: '2.4 MB', date: '2024-08-15' },
      { name: 'Transcription Quality Standards', type: 'PDF', size: '1.8 MB', date: '2024-07-30' },
      { name: 'Vendor Onboarding Handbook', type: 'PDF', size: '3.1 MB', date: '2024-06-20' },
      { name: 'Audio Recording Best Practices', type: 'PDF', size: '1.2 MB', date: '2024-09-01' },
    ],
  },
  {
    title: 'Training Materials',
    icon: Video,
    color: 'purple',
    items: [
      { name: 'Field Collector Training — Module 1', type: 'MP4', size: '148 MB', date: '2024-07-10' },
      { name: 'Transcription Tool Walkthrough', type: 'MP4', size: '92 MB', date: '2024-08-05' },
      { name: 'Quality Review Process Overview', type: 'MP4', size: '64 MB', date: '2024-08-22' },
    ],
  },
  {
    title: 'Templates & Forms',
    icon: FileText,
    color: 'emerald',
    items: [
      { name: 'Batch Submission Template', type: 'XLSX', size: '48 KB', date: '2024-09-12' },
      { name: 'Consent Form — Contributor', type: 'DOCX', size: '82 KB', date: '2024-08-01' },
      { name: 'QC Checklist — Audio', type: 'PDF', size: '120 KB', date: '2024-09-05' },
    ],
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  emerald: 'bg-emerald-50 text-emerald-600',
};

const typeColor: Record<string, string> = {
  PDF: 'bg-red-50 text-red-600',
  MP4: 'bg-purple-50 text-purple-600',
  XLSX: 'bg-emerald-50 text-emerald-700',
  DOCX: 'bg-blue-50 text-blue-600',
};

const USEFUL_LINKS = [
  { label: 'Vaani Official Website', url: 'https://vaani.iisc.ac.in/', desc: 'Main Vaani project page' },
  { label: 'ArtPark Platform', url: 'https://artpark.in/', desc: 'Technology partner portal' },
  { label: 'Bhashini Portal', url: 'https://bhashini.gov.in/', desc: 'MeitY language AI mission' },
  { label: 'IISc CiSTUP', url: 'https://cistup.iisc.ac.in/', desc: 'Research centre at IISc' },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <Folder size={20} className="text-slate-500" />
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Resources</h1>
          <p className="mt-0.5 text-sm text-slate-500">Documentation, training materials, and useful links.</p>
        </div>
      </div>

      {/* Document categories */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.title} className="rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="border-b border-slate-50 px-5 py-4 flex items-center gap-2.5">
                <div className={`flex size-8 items-center justify-center rounded-lg ${colorMap[cat.color]}`}>
                  <Icon size={15} />
                </div>
                <h2 className="text-sm font-semibold text-slate-800">{cat.title}</h2>
              </div>
              <ul className="divide-y divide-slate-50">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${typeColor[item.type] ?? 'bg-slate-100 text-slate-500'}`}>
                      {item.type}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate group-hover:text-blue-700 transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400">{item.size} · {item.date}</p>
                    </div>
                    <Download size={13} className="shrink-0 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Useful links */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-800">Useful Links</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {USEFUL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 transition-all hover:border-blue-200 hover:bg-blue-50 group"
            >
              <ExternalLink size={14} className="shrink-0 text-slate-400 group-hover:text-blue-500" />
              <div>
                <p className="text-sm font-medium text-slate-800 group-hover:text-blue-700">{link.label}</p>
                <p className="text-xs text-slate-400">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
