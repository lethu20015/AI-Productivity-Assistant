import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, CheckCircle2, Gavel, CalendarClock, Loader2, AlertCircle } from "lucide-react";
import { Disclaimer, PageHeader, Field, inputClass, buttonClass } from "@/components/Disclaimer";
import { summariseNotes, demoSummary, type MeetingSummary } from "@/lib/deskflow";

export const Route = createFileRoute("/summariser")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Your AI Productivity Hub" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into a summary with key points, decisions, action items, owners and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Your AI Productivity Hub" },
      {
        property: "og:description",
        content: "Decisions, owners and deadlines pulled out of messy meeting notes.",
      },
    ],
  }),
  component: Summariser,
});

const sampleNotes = `Reviewed Q3 delivery progress across all squads
Onboarding flow is complete and now in internal testing
Two partner integrations are blocked on API access
Support volume rose 12% after the pricing change
We agreed to confirm the launch date for 15 September
Decided to move the reporting module to a post-launch release
Marcus will chase partner API credentials this week
Thandi must draft the customer launch comms
Priya will prepare the regression test suite before the freeze`;

function Summariser() {
  const [notes, setNotes] = useState(sampleNotes);
  const [result, setResult] = useState<MeetingSummary | null>(demoSummary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const run = () => {
    setSuccess(false);
    if (notes.trim().length < 20) {
      setError("Paste at least a few lines of notes so the summary has something to work with.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(summariseNotes(notes));
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Notes Summarizer"
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript. The assistant separates what was discussed from what was decided and who owes what."
      />

      <div className="card-surface p-5 sm:p-6">
        <Field label="Meeting notes" hint="Paste anything — bullet points, transcript or rough notes.">
          <textarea
            rows={10}
            className={`${inputClass} resize-y`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Field>
        <button
          type="button"
          onClick={run}
          disabled={loading}
          className={`${buttonClass} mt-4 w-full sm:w-auto`}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          {loading ? "Summarising…" : "Summarise notes"}
        </button>
        {error && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 px-3.5 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </p>
        )}
        {success && !loading && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-accent px-3.5 py-3 text-sm font-medium text-accent-foreground">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Summary ready.
          </p>
        )}
      </div>

      {loading && (
        <div className="card-surface mt-6 space-y-3 p-6">
          <div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
          <div className="h-3 w-full animate-pulse rounded bg-secondary" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-secondary" />
        </div>
      )}

      {result && !loading && (
        <div className="mt-6 space-y-5">
          <section className="card-surface p-5 sm:p-6">
            <h2 className="text-lg text-foreground">Concise summary</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{result.summary}</p>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <section className="card-surface p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-primary" />
                <h2 className="text-base text-foreground">Key discussion points</h2>
              </div>
              <ul className="mt-3 space-y-2.5">
                {result.points.map((p, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="min-w-0">{p}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-surface p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Gavel className="h-4.5 w-4.5 shrink-0 text-primary" />
                <h2 className="text-base text-foreground">Decisions made</h2>
              </div>
              <ul className="mt-3 space-y-2.5">
                {result.decisions.map((d, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="min-w-0">{d}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="card-surface p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4.5 w-4.5 shrink-0 text-primary" />
              <h2 className="text-base text-foreground">Action items, owners and deadlines</h2>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    <th className="pb-2 font-medium">Action item</th>
                    <th className="pb-2 font-medium">Responsible</th>
                    <th className="pb-2 font-medium">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {result.actions.map((a, i) => (
                    <tr key={i}>
                      <td className="py-3 pr-4 text-foreground">{a.task}</td>
                      <td className="py-3 pr-4">
                        <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                          {a.owner}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{a.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Disclaimer />
        </div>
      )}
    </div>
  );
}
