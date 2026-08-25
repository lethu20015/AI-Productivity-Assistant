import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Field, inputClass } from "@/components/Disclaimer";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Your AI Productivity Hub" },
      {
        name: "description",
        content: "Manage your profile, default writing tone, working hours and review preferences.",
      },
      { property: "og:title", content: "Settings — Your AI Productivity Hub" },
      {
        property: "og:description",
        content: "Tune Your AI Productivity Hub to your working style and review preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

function Toggle({
  label,
  description,
  defaultOn,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn(!on)}
        className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition ${on ? "bg-primary" : "bg-border"}`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-card transition ${on ? "translate-x-5" : ""}`}
        />
      </button>
    </div>
  );
}

function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Preferences"
        description="Set the defaults the hub uses when it drafts, summarises and schedules for you."
      />

      <div className="space-y-6">
        <section className="card-surface space-y-5 p-5 sm:p-6">
          <h2 className="text-lg text-foreground">Profile</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name">
              <input className={inputClass} defaultValue="Lelethu Ndlovu" />
            </Field>
            <Field label="Work email">
              <input className={inputClass} defaultValue="lelethu@deskflow.app" />
            </Field>
            <Field label="Role">
              <input className={inputClass} defaultValue="Operations Lead" />
            </Field>
            <Field label="Time zone">
              <select className={inputClass} defaultValue="SAST">
                <option value="SAST">SAST (UTC+2)</option>
                <option value="GMT">GMT (UTC+0)</option>
                <option value="EST">EST (UTC-5)</option>
              </select>
            </Field>
          </div>
        </section>

        <section className="card-surface space-y-5 p-5 sm:p-6">
          <h2 className="text-lg text-foreground">Working style</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Default email tone">
              <select className={inputClass} defaultValue="Friendly">
                <option>Formal</option>
                <option>Friendly</option>
                <option>Persuasive</option>
              </select>
            </Field>
            <Field label="Deep work hours">
              <select className={inputClass} defaultValue="09:00 – 12:00">
                <option>07:00 – 10:00</option>
                <option>09:00 – 12:00</option>
                <option>13:00 – 16:00</option>
              </select>
            </Field>
          </div>
        </section>

        <section className="card-surface p-5 sm:p-6">
          <h2 className="text-lg text-foreground">Review & safety</h2>
          <div className="mt-2 divide-y divide-border">
            <Toggle
              label="Always show the AI review notice"
              description="Keep the review-before-sending reminder visible on every output."
              defaultOn
            />
            <Toggle
              label="Flag sensitive details"
              description="Highlight names, figures and dates in drafts so they're easy to verify."
              defaultOn
            />
            <Toggle
              label="Save outputs to History"
              description="Keep a record of generated emails, summaries and plans."
              defaultOn
            />
          </div>
        </section>
      </div>
    </div>
  );
}
