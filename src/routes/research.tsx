import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Loader2, CheckCircle2, AlertCircle, BookOpen, Lightbulb } from "lucide-react";
import { Disclaimer, PageHeader, Field, inputClass, buttonClass } from "@/components/Disclaimer";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Your AI Productivity Hub" },
      {
        name: "description",
        content:
          "Research topics, summarise information and get clear AI-powered insights in one workspace.",
      },
      { property: "og:title", content: "AI Research Assistant — Your AI Productivity Hub" },
      {
        property: "og:description",
        content: "Fast, structured research briefs with key findings and suggested next steps.",
      },
    ],
  }),
  component: Research,
});

const depths = ["Quick scan", "Balanced", "Deep dive"] as const;
type Depth = (typeof depths)[number];

interface Brief {
  topic: string;
  overview: string;
  findings: string[];
  insights: string[];
  sources: { title: string; note: string }[];
}

function buildBrief(topic: string, depth: Depth): Brief {
  const t = topic.trim();
  const count = depth === "Quick scan" ? 3 : depth === "Balanced" ? 4 : 5;
  const findings = [
    `Most organisations approach ${t} in stages rather than all at once, starting with a single low-risk workflow.`,
    `Measurable results for ${t} usually appear within one to two quarters, provided success metrics are agreed upfront.`,
    `The biggest reported blocker is unclear ownership — naming a single accountable lead consistently improves outcomes.`,
    `Budget is rarely the constraint; internal enablement and change management absorb most of the effort.`,
    `Teams that document decisions as they go report noticeably fewer repeated debates later in the project.`,
  ].slice(0, count);

  return {
    topic: t,
    overview: `${t.charAt(0).toUpperCase()}${t.slice(1)} is best understood as a practical operating change rather than a one-off project. This ${depth.toLowerCase()} brief pulls together the recurring themes, the trade-offs teams face, and where the evidence is strongest.`,
    findings,
    insights: [
      "Start with one workflow, prove the value, then widen scope.",
      "Agree on two or three metrics before you begin, not afterwards.",
      "Keep a human review step on anything customer-facing.",
    ],
    sources: [
      { title: "Industry practice overview", note: "Synthesised from common published guidance" },
      { title: "Comparative case notes", note: "Patterns across similar team sizes" },
      { title: "Implementation checklists", note: "Operational steps and pitfalls" },
    ],
  };
}

function Research() {
  const [topic, setTopic] = useState("rolling out AI assistants across an operations team");
  const [depth, setDepth] = useState<Depth>("Balanced");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [brief, setBrief] = useState<Brief | null>(null);

  const run = () => {
    setSuccess(false);
    if (topic.trim().length < 4) {
      setError("Please enter a research topic of at least 4 characters.");
      setBrief(null);
      return;
    }
    setError(null);
    setLoading(true);
    setBrief(null);
    setTimeout(() => {
      setBrief(buildBrief(topic, depth));
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Research"
        title="AI Research Assistant"
        description="Research topics, summarise information and get clear AI-powered insights."
      />

      <div className="card-surface space-y-5 p-5 sm:p-6">
        <Field label="Research topic" hint="Be specific — a clear question gives a sharper brief.">
          <input
            className={inputClass}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. how mid-sized teams adopt AI note-taking"
          />
        </Field>

        <Field label="Depth">
          <div className="grid grid-cols-3 gap-2">
            {depths.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDepth(d)}
                className={`rounded-xl border px-2 py-2.5 text-sm font-medium transition ${
                  depth === d
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </Field>

        <button
          type="button"
          onClick={run}
          disabled={loading}
          className={`${buttonClass} w-full sm:w-auto`}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? "Researching…" : "Run research"}
        </button>

        {error && (
          <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3.5 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </p>
        )}
        {success && !loading && (
          <p className="flex items-center gap-2 rounded-xl bg-accent px-3.5 py-3 text-sm font-medium text-accent-foreground">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Research brief ready.
          </p>
        )}
      </div>

      {loading && (
        <div className="card-surface mt-6 space-y-3 p-6">
          <div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
          <div className="h-3 w-full animate-pulse rounded bg-secondary" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-secondary" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-secondary" />
        </div>
      )}

      {brief && !loading && (
        <div className="mt-6 space-y-5">
          <section className="card-surface p-5 sm:p-6">
            <h2 className="text-lg text-foreground">Overview</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{brief.overview}</p>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <section className="card-surface p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 shrink-0 text-primary" />
                <h2 className="text-base text-foreground">Key findings</h2>
              </div>
              <ul className="mt-3 space-y-2.5">
                {brief.findings.map((f, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="min-w-0">{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-surface p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4.5 w-4.5 shrink-0 text-primary" />
                <h2 className="text-base text-foreground">Insights and next steps</h2>
              </div>
              <ul className="mt-3 space-y-2.5">
                {brief.insights.map((f, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="min-w-0">{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="card-surface p-5 sm:p-6">
            <h2 className="text-base text-foreground">Suggested sources to verify</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {brief.sources.map((s) => (
                <div key={s.title} className="rounded-xl bg-secondary p-4">
                  <p className="text-sm font-medium text-foreground">{s.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
                </div>
              ))}
            </div>
          </section>

          <Disclaimer />
        </div>
      )}
    </div>
  );
}
