'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import ChatBot from './ChatBot';

interface AppShellProps {
  children: React.ReactNode;
}

/** Routes that bypass the sidebar layout (auth pages) */
const AUTH_ROUTES = ['/login'];

/**
 * AppShell — fixed sidebar + scrollable main content + floating chatbot.
 * Auth routes (e.g. /login) are rendered full-screen without the sidebar.
 */
export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isAuthRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-y-auto">
        {children}
      </main>
      {/* Floating chatbot — available on every authenticated page */}
      <ChatBot />
    </div>
  );
}
