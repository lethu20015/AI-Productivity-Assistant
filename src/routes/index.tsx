import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Search,
  ArrowRight,
  Clock,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your AI Productivity Hub — AI workplace assistant" },
      {
        name: "description",
        content:
          "Automate emails, summarize meetings, plan your week and research smarter — all from one beautiful AI workspace.",
      },
      { property: "og:title", content: "Your AI Productivity Hub" },
      {
        property: "og:description",
        content: "One workspace for AI email drafting, meeting summaries, planning and research.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { icon: Clock, label: "Time Saved", value: "8.5h", caption: "Hours saved per week" },
  { icon: Zap, label: "Faster Responses", value: "12×", caption: "Faster response time" },
  { icon: TrendingUp, label: "Productivity", value: "100%", caption: "Editable and private" },
];

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    copy: "Draft polished, professional emails in seconds with full tone and audience control.",
  },
  {
    to: "/summariser",
    icon: FileText,
    title: "Meeting Notes Summarizer",
    copy: "Turn long meeting notes into clear summaries, key decisions and action items.",
  },
  {
    to: "/planner",
    icon: ListChecks,
    title: "AI Task Planner",
    copy: "Organise your day, prioritise important tasks and create a smarter schedule.",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    copy: "Research topics, summarise information and get clear AI-powered insights.",
  },
] as const;

function Dashboard() {
  return (
    <div>
      <section className="hero-gradient rounded-3xl border border-border px-6 py-10 sm:px-10 sm:py-14">
        <span className="inline-flex items-center rounded-full bg-card/80 px-3 py-1.5 text-xs font-semibold text-primary">
          ✨ Powered by AI
        </span>
        <h1 className="mt-5 max-w-3xl text-3xl leading-tight text-foreground sm:text-5xl">
          Your <span className="text-primary">AI</span> workplace{" "}
          <span className="text-primary">assistant</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Automate emails, summarize meetings, plan your week, and research smarter — all from one
          beautiful workspace.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/email"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Start with AI →
          </Link>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
          >
            Open AI Chat
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value, caption }) => (
          <div key={label} className="card-surface p-5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-primary">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <p className="mt-4 text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{caption}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl text-foreground">Productivity tools</h2>
        <p className="mt-1 text-sm text-muted-foreground">Pick a tool to get started</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ to, icon: Icon, title, copy }) => (
            <div
              key={to}
              className="card-surface flex flex-col p-5 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-primary">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-lg text-foreground">{title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              <Link
                to={to}
                className="mt-5 inline-flex items-center gap-1.5 self-start rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Open tool <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Disclaimer className="mt-10" />
    </div>
  );
}
