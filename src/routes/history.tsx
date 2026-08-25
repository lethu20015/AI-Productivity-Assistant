import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, FileText, ListChecks, Clock } from "lucide-react";
import { Disclaimer, PageHeader } from "@/components/Disclaimer";
import { historyItems } from "@/lib/deskflow";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — DeskFlow AI" },
      {
        name: "description",
        content: "Every email, summary and plan DeskFlow AI has generated for you, in one place.",
      },
      { property: "og:title", content: "History — DeskFlow AI" },
      {
        property: "og:description",
        content: "Revisit your generated emails, meeting summaries and task plans.",
      },
    ],
  }),
  component: HistoryPage,
});

const filters = ["All", "Email", "Summary", "Plan"] as const;
const icons = { Email: Mail, Summary: FileText, Plan: ListChecks };

function HistoryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = historyItems.filter((i) => filter === "All" || i.type === filter);

  return (
    <div>
      <PageHeader
        eyebrow="History"
        title="Everything you've generated"
        description="Your recent DeskFlow outputs, ready to reopen, reuse or refine."
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              filter === f
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card-surface mt-5 divide-y divide-border">
        {items.map((item) => {
          const Icon = icons[item.type as keyof typeof icons];
          return (
            <div
              key={item.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.meta}</p>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {item.when}
              </span>
            </div>
          );
        })}
      </div>

      <Disclaimer className="mt-6" />
    </div>
  );
}
