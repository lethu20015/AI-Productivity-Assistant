import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Settings,
  Menu,
  X,
  AlertTriangle,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/summariser", label: "Notes Summarizer", icon: FileText },
  { to: "/planner", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research", icon: Search },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill="var(--brand)" />
      <path
        d="M11 22 15 10h2l4 12"
        stroke="white"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12.6 18.4h6.8" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="24.5" cy="8.5" r="2" fill="white" />
    </svg>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <Logo className="h-9 w-9 shrink-0" />
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-bold uppercase leading-tight tracking-[0.08em] text-foreground">
          Your AI
        </span>
        <span className="block truncate text-[13px] font-bold uppercase leading-tight tracking-[0.08em] text-primary">
          Productivity Hub
        </span>
      </span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Workspace
      </p>
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
              active
                ? "bg-accent font-semibold text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
            )}
            <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={2} />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <p className="px-3 text-xs text-muted-foreground">
      Powered by <span className="font-semibold text-primary">AI</span>
    </p>
  );
}

function WarningPill() {
  return (
    <span className="flex min-w-0 items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-[12px] font-medium text-accent-foreground">
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">AI-generated content may require human review.</span>
    </span>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between border-r border-border bg-card px-4 py-6 lg:flex">
        <div>
          <Brand />
          <div className="mt-8">
            <NavList />
          </div>
        </div>
        <SidebarFooter />
      </aside>

      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur lg:ml-64 lg:px-8">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="lg:hidden">
          <Logo className="h-8 w-8" />
        </div>
        <div className="hidden min-w-0 flex-1 sm:flex">
          <WarningPill />
        </div>
        <div className="flex-1 sm:hidden" />
        <Link
          to="/settings"
          aria-label="Settings"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Settings className="h-4.5 w-4.5" />
        </Link>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/30"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col justify-between bg-card p-5">
            <div>
              <div className="flex items-center justify-between gap-3">
                <Brand />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-6">
                <NavList onNavigate={() => setOpen(false)} />
              </div>
            </div>
            <SidebarFooter />
          </div>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 pb-24 sm:px-6 lg:px-10 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
