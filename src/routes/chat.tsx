import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import { Disclaimer, PageHeader, inputClass, buttonClass } from "@/components/Disclaimer";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — Your AI Productivity Hub" },
      {
        name: "description",
        content:
          "Ask your AI workplace assistant anything: drafting, planning, summarising and quick answers.",
      },
      { property: "og:title", content: "AI Chat — Your AI Productivity Hub" },
      {
        property: "og:description",
        content: "A calm chat workspace for drafting, planning and quick answers.",
      },
    ],
  }),
  component: Chat,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const starters = [
  "Draft a polite deadline extension email",
  "Summarise my standup notes",
  "Plan my week around three deadlines",
];

const seed: Message[] = [
  {
    id: "m1",
    role: "assistant",
    text: "Hi Lelethu 👋 I'm your workplace assistant. Ask me to draft, summarise, plan or research — or pick a starter below.",
  },
];

function reply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("email"))
    return "Here's a starting point:\n\nSubject: Quick request on timing\n\nHi there,\n\nI wanted to check in on the current deadline. Given the outstanding review, an extra two working days would let us submit something complete rather than rushed.\n\nHappy to share progress in the meantime.\n\nBest,\nLelethu\n\nOpen the Email Generator to control tone and audience.";
  if (p.includes("summar"))
    return "Send me the notes and I'll return: a concise summary, key discussion points, decisions made, and action items with owners and deadlines. The Notes Summarizer tool does this in a structured layout.";
  if (p.includes("plan") || p.includes("week") || p.includes("task"))
    return "A simple approach: put your two highest-impact tasks in the 09:00–12:00 focus window, batch admin and replies after lunch, and keep the last hour for review. Add your tasks in the Task Planner and I'll order them by priority and deadline.";
  return `Here's how I'd approach "${prompt.trim()}":\n\n1. Clarify the outcome you need and who it's for.\n2. Gather the two or three facts that actually change the decision.\n3. Draft quickly, then review for accuracy before sharing.\n\nWant me to turn this into an email, a summary or a plan?`;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>(seed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    const content = text.trim();
    if (!content || thinking) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: content }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", text: reply(content) },
      ]);
      setThinking(false);
    }, 900);
  };

  return (
    <div>
      <PageHeader
        eyebrow="AI Chat"
        title="Your AI chat workspace"
        description="Ask anything about your work — drafting, summarising, planning or research."
      />

      <div className="card-surface flex min-h-[60vh] flex-col p-5 sm:p-6">
        <div className="flex-1 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-primary">
                  <Sparkles className="h-4 w-4" />
                </span>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">{m.text}</pre>
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking…
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {starters.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            className={inputClass}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message your assistant…"
          />
          <button type="submit" disabled={thinking} className={`${buttonClass} shrink-0`}>
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>

      <Disclaimer className="mt-6" />
    </div>
  );
}
