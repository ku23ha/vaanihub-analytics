'use client';

import Sidebar from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell — fixed sidebar + scrollable main content.
 * Wraps every page. The Sidebar is client-side (usePathname).
 */
export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
