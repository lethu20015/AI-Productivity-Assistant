import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  History,
  Settings,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/summariser", label: "Meeting Summariser", icon: FileText },
  { to: "/planner", label: "Task Planner", icon: ListChecks },
  { to: "/history", label: "History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/responsible-ai", label: "Responsible AI", icon: ShieldCheck },
] as const;

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Sparkles className="h-4.5 w-4.5" strokeWidth={2.2} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[15px] font-semibold tracking-tight text-foreground">
          DeskFlow AI
        </span>
        <span className="block truncate text-[11px] text-muted-foreground">
          Workplace assistant
        </span>
      </span>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-accent font-semibold text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={2} />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col justify-between border-r border-border bg-card px-4 py-6 lg:flex">
        <div>
          <Brand />
          <div className="mt-8">
            <NavList />
          </div>
        </div>
        <div className="rounded-2xl bg-secondary p-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Every output is a draft. Review before sending or sharing.
          </p>
          <Link to="/responsible-ai" className="mt-2 inline-block text-xs font-semibold text-primary">
            Our AI principles →
          </Link>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-card/90 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/30"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-card p-5">
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
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 pb-24 sm:px-6 lg:px-10 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
