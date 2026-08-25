import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, CheckCircle2, ArrowUpRight, Clock } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { historyItems } from "@/lib/deskflow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeskFlow AI — Your workplace productivity assistant" },
      {
        name: "description",
        content:
          "DeskFlow AI drafts professional emails, summarises meeting notes and plans your day so you can focus on work that matters.",
      },
      { property: "og:title", content: "DeskFlow AI — Workplace productivity assistant" },
      {
        property: "og:description",
        content: "Write emails, summarise meetings and plan tasks in one calm workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const actions = [
  {
    to: "/email",
    icon: Mail,
    title: "Write an Email",
    copy: "Turn a few notes into a polished, on-tone message in seconds.",
  },
  {
    to: "/summariser",
    icon: FileText,
    title: "Summarise Notes",
    copy: "Pull decisions, action items and owners out of messy meeting notes.",
  },
  {
    to: "/planner",
    icon: ListChecks,
    title: "Plan My Tasks",
    copy: "Order your workload by priority and get a realistic day schedule.",
  },
] as const;

const metrics = [
  { label: "Tasks completed", value: "38", delta: "+6 this week", icon: CheckCircle2 },
  { label: "Emails generated", value: "24", delta: "+9 this week", icon: Mail },
  { label: "Notes summarised", value: "12", delta: "+3 this week", icon: FileText },
];

function Dashboard() {
  return (
    <div>
      <header className="mb-9">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Tuesday, 25 August
        </p>
        <h1 className="mt-2 text-3xl leading-tight text-foreground sm:text-[2.6rem]">
          Good morning 👋 What would you like to accomplish today?
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          You have 5 tasks due today and 2 meetings to prepare for. Start with a quick action below.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map(({ to, icon: Icon, title, copy }) => (
          <Link
            key={to}
            to={to}
            className="card-surface group flex flex-col justify-between p-5 transition hover:-translate-y-0.5 hover:border-primary/40"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="mt-5 flex items-center gap-1.5 text-lg font-semibold tracking-tight text-foreground">
              {title}
              <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition group-hover:opacity-100" />
            </span>
            <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{copy}</span>
          </Link>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-lg text-foreground">Productivity overview</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {metrics.map(({ label, value, delta, icon: Icon }) => (
            <div key={label} className="card-surface p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="min-w-0 truncate text-sm text-muted-foreground">{label}</p>
                <Icon className="h-4 w-4 shrink-0 text-primary" />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
              <p className="mt-1 text-xs font-medium text-primary">{delta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h2 className="min-w-0 truncate text-lg text-foreground">Recent activity</h2>
          <Link to="/history" className="shrink-0 text-sm font-semibold text-primary">
            View all
          </Link>
        </div>
        <div className="card-surface mt-4 divide-y divide-border">
          {historyItems.slice(0, 3).map((item) => (
            <div key={item.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {item.type} · {item.meta}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {item.when}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Disclaimer className="mt-8" />
    </div>
  );
}
