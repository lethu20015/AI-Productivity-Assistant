import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check, Wand2, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Disclaimer, PageHeader, Field, inputClass, buttonClass } from "@/components/Disclaimer";
import { generateEmail, type Tone } from "@/lib/deskflow";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Your AI Productivity Hub" },
      {
        name: "description",
        content:
          "Draft polished, professional emails in seconds with full tone and audience control.",
      },
      { property: "og:title", content: "Smart Email Generator — Your AI Productivity Hub" },
      {
        property: "og:description",
        content: "Turn a few bullet points into a polished, on-tone work email.",
      },
    ],
  }),
  component: EmailGenerator,
});

const tones: Tone[] = ["Formal", "Friendly", "Persuasive"];

function EmailGenerator() {
  const [recipient, setRecipient] = useState("Thandi Mokoena, Head of Operations");
  const [purpose, setPurpose] = useState("a follow-up on the Q3 partnership proposal");
  const [details, setDetails] = useState(
    "Proposal was shared on 18 August\nWe can start onboarding from 8 September\nNeed a decision by Friday to hold the timeline",
  );
  const [tone, setTone] = useState<Tone>("Persuasive");
  const [output, setOutput] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = () => {
    setSuccess(false);
    if (!recipient.trim() || !purpose.trim()) {
      setError("Add a recipient and a purpose so the draft has enough context.");
      return;
    }
    setError(null);
    setCopied(false);
    setLoading(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(generateEmail({ recipient, purpose, details, tone }));
      setLoading(false);
      setSuccess(true);
    }, 900);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(`Subject: ${output.subject}\n\n${output.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Email Generator"
        title="Write a professional email"
        description="Give the assistant the essentials and pick a tone. You'll get a complete draft you can review, edit and send."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="card-surface space-y-5 p-5 sm:p-6">
          <Field label="Recipient / audience">
            <input
              className={inputClass}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Marcus, Finance Manager"
            />
          </Field>
          <Field label="Purpose of the email">
            <input
              className={inputClass}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. requesting an extension on the report"
            />
          </Field>
          <Field label="Important details" hint="One point per line — dates, numbers, next steps.">
            <textarea
              rows={5}
              className={`${inputClass} resize-y`}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Field>
          <Field label="Tone">
            <div className="grid grid-cols-3 gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`rounded-xl border px-2 py-2.5 text-sm font-medium transition ${
                    tone === t
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className={`${buttonClass} w-full`}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {loading ? "Generating…" : "Generate email"}
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
              Draft ready — review before sending.
            </p>
          )}
        </div>

        <div className="card-surface flex flex-col p-5 sm:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <h2 className="min-w-0 truncate text-lg text-foreground">Generated email</h2>
            {output && (
              <button
                type="button"
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/50 hover:text-primary"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>

          {loading ? (
            <div className="mt-4 flex-1 space-y-3">
              <div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-full animate-pulse rounded bg-secondary" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-secondary" />
            </div>
          ) : output ? (

            <div className="mt-4 flex-1">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Subject</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{output.subject}</p>
              <div className="mt-4 rounded-xl bg-secondary p-4">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                  {output.body}
                </pre>
              </div>
            </div>
          ) : (
            <p className="mt-4 flex-1 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
              Your draft will appear here. Fill in the form and select a tone to generate a complete
              email you can copy straight into your inbox.
            </p>
          )}

          <Disclaimer className="mt-5" />
        </div>
      </div>
    </div>
  );
}
