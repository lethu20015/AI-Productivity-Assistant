import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Sparkles, CalendarDays, Lightbulb, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Disclaimer, PageHeader, Field, inputClass, buttonClass } from "@/components/Disclaimer";
import { planTasks, type Priority, type Task } from "@/lib/deskflow";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Your AI Productivity Hub" },
      {
        name: "description",
        content:
          "Add tasks with deadlines and priorities and get a structured daily and weekly schedule with time management suggestions.",
      },
      { property: "og:title", content: "AI Task Planner — Your AI Productivity Hub" },
      {
        property: "og:description",
        content: "Prioritised daily and weekly scheduling for your real workload.",
      },
    ],
  }),
  component: Planner,
});

const priorities: Priority[] = ["High", "Medium", "Low"];

const seedTasks: Task[] = [
  { id: "1", title: "Finalise Q3 board deck", deadline: "2026-08-26", priority: "High" },
  { id: "2", title: "Review partnership contract", deadline: "2026-08-25", priority: "High" },
  { id: "3", title: "Reply to customer escalation", deadline: "2026-08-25", priority: "Medium" },
  { id: "4", title: "Update onboarding docs", deadline: "2026-08-28", priority: "Low" },
  { id: "5", title: "1:1 prep for the team", deadline: "2026-08-27", priority: "Medium" },
  { id: "6", title: "Plan September hiring loop", deadline: "2026-09-01", priority: "Low" },
  { id: "7", title: "Vendor invoice approvals", deadline: "2026-08-29", priority: "Medium" },
];

const priorityStyle: Record<Priority, string> = {
  High: "bg-primary text-primary-foreground",
  Medium: "bg-accent text-accent-foreground",
  Low: "bg-secondary text-muted-foreground",
};

function Planner() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [plan, setPlan] = useState<ReturnType<typeof planTasks> | null>(() => planTasks(seedTasks));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const generate = () => {
    setSuccess(false);
    if (tasks.length === 0) {
      setError("Add at least one task before generating a plan.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setPlan(planTasks(tasks));
      setLoading(false);
      setSuccess(true);
    }, 900);
  };

  const addTask = () => {
    if (!title.trim()) {
      setError("Give the task a short title.");
      return;
    }
    setError(null);
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: title.trim(), deadline, priority },
    ]);
    setTitle("");
    setDeadline("");
    setPriority("Medium");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Task Planner"
        title="Plan your day around what matters"
        description="Add everything on your plate. The planner orders it by priority and deadline, then builds a realistic schedule."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="card-surface p-5 sm:p-6">
          <h2 className="text-lg text-foreground">Your tasks ({tasks.length})</h2>
          <ul className="mt-4 divide-y divide-border">
            {tasks.map((t) => (
              <li key={t.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t.deadline ? `Due ${t.deadline}` : "No deadline"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyle[t.priority]}`}
                  >
                    {t.priority}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${t.title}`}
                    onClick={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPlan(planTasks(tasks))}
            className={`${buttonClass} mt-5 w-full sm:w-auto`}
          >
            <Sparkles className="h-4 w-4" />
            Organise & schedule
          </button>
        </div>

        <div className="card-surface h-fit space-y-4 p-5 sm:p-6">
          <h2 className="text-lg text-foreground">Add a task</h2>
          <Field label="Task">
            <input
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Send the client proposal"
            />
          </Field>
          <Field label="Deadline">
            <input
              type="date"
              className={inputClass}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </Field>
          <Field label="Priority">
            <div className="grid grid-cols-3 gap-2">
              {priorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`rounded-xl border px-2 py-2 text-sm font-medium transition ${
                    priority === p
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Field>
          <button
            type="button"
            onClick={addTask}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            <Plus className="h-4 w-4" />
            Add task
          </button>
          <button
            type="button"
            onClick={generate}
            disabled={loading}
            className={`${buttonClass} mt-3 w-full`}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Planning…" : "Generate plan"}
          </button>
          {error && (
            <p className="mt-3 flex items-center gap-2 rounded-xl bg-destructive/10 px-3.5 py-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </p>
          )}
          {success && !loading && (
            <p className="mt-3 flex items-center gap-2 rounded-xl bg-accent px-3.5 py-3 text-sm font-medium text-accent-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Schedule updated.
            </p>
          )}
        </div>
      </div>

      {plan && !loading && (
        <div className="mt-8 space-y-5">
          <section className="card-surface p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4.5 w-4.5 shrink-0 text-primary" />
              <h2 className="text-base text-foreground">Today's schedule</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {plan.today.map((t) => (
                <li
                  key={t.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-secondary px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                      {t.block}
                    </p>
                    <p className="mt-1 truncate text-sm font-medium text-foreground">{t.title}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyle[t.priority]}`}
                  >
                    {t.priority}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card-surface p-5 sm:p-6">
            <h2 className="text-base text-foreground">Rest of the week</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {plan.week.map((d) => (
                <div key={d.day} className="rounded-xl border border-border p-4">
                  <p className="text-sm font-semibold text-foreground">{d.day}</p>
                  <ul className="mt-2 space-y-1.5">
                    {d.items.length ? (
                      d.items.map((t) => (
                        <li key={t.id} className="text-xs leading-relaxed text-muted-foreground">
                          • {t.title}
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-muted-foreground">Free for focus work</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="card-surface p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4.5 w-4.5 shrink-0 text-primary" />
              <h2 className="text-base text-foreground">Time management suggestions</h2>
            </div>
            <ul className="mt-3 space-y-2.5">
              {plan.tips.map((tip, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="min-w-0">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          <Disclaimer />
        </div>
      )}
    </div>
  );
}
