export const AI_DISCLAIMER =
  "AI-generated content may contain errors. Users should review and verify all important information before using or sharing it.";

export type Tone = "Formal" | "Friendly" | "Persuasive";

export interface EmailInput {
  recipient: string;
  purpose: string;
  details: string;
  tone: Tone;
}

const openings: Record<Tone, (r: string) => string> = {
  Formal: (r) => `Dear ${r},\n\nI hope this message finds you well.`,
  Friendly: (r) => `Hi ${r},\n\nHope your week is going well!`,
  Persuasive: (r) => `Hi ${r},\n\nI'll keep this brief because I think it's worth your time.`,
};

const closings: Record<Tone, string> = {
  Formal: "Thank you for your time and consideration.\n\nKind regards,\nLelethu\nDeskFlow AI",
  Friendly: "Thanks so much — let me know what works for you!\n\nBest,\nLelethu",
  Persuasive:
    "If this sounds right, I can have everything ready on your side by Friday. Shall I go ahead?\n\nBest regards,\nLelethu",
};

export function generateEmail({ recipient, purpose, details, tone }: EmailInput) {
  const who = recipient.trim() || "there";
  const why = purpose.trim() || "a quick update on our current work";
  const bullets = details
    .split(/\n|•|;/)
    .map((d) => d.trim())
    .filter(Boolean);

  const body =
    tone === "Persuasive"
      ? `I'm reaching out regarding ${why}. Based on where things stand today, moving on this now gives us the clearest path to a strong result.`
      : tone === "Friendly"
        ? `I wanted to reach out about ${why}. Nothing urgent — just want to make sure we're on the same page.`
        : `I am writing with regard to ${why}. Please find the relevant details summarised below for your review.`;

  const detailBlock = bullets.length
    ? `\n\n${bullets.map((b) => `• ${b}`).join("\n")}`
    : "\n\n• All supporting material has been prepared and is ready to share on request.";

  return {
    subject: `${why.charAt(0).toUpperCase()}${why.slice(1)}`.slice(0, 68),
    body: `${openings[tone](who)}\n\n${body}${detailBlock}\n\n${closings[tone]}`,
  };
}

export interface MeetingSummary {
  summary: string;
  points: string[];
  decisions: string[];
  actions: { task: string; owner: string; deadline: string }[];
}

export function summariseNotes(notes: string): MeetingSummary {
  const lines = notes
    .split(/\n|\. /)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ""))
    .filter((l) => l.length > 3);

  if (lines.length === 0) return demoSummary;

  const owners = ["Thandi", "Marcus", "Priya", "Sipho", "Team"];
  const decisionWords = /(decide|approve|agree|sign|confirm|go ahead|budget)/i;
  const actionWords = /(will|must|need|send|prepare|follow up|draft|review|ship|schedule)/i;

  const decisions = lines.filter((l) => decisionWords.test(l)).slice(0, 4);
  const actionLines = lines.filter((l) => actionWords.test(l)).slice(0, 5);
  const points = lines.filter((l) => !decisions.includes(l)).slice(0, 6);

  const actions = (actionLines.length ? actionLines : points.slice(0, 3)).map((l, i) => ({
    task: l.charAt(0).toUpperCase() + l.slice(1),
    owner: owners[i % owners.length],
    deadline: ["Tomorrow, 17:00", "Fri 28 Aug", "Mon 31 Aug", "Wed 2 Sep", "Fri 4 Sep"][i % 5],
  }));

  return {
    summary: `The team covered ${points.length} main topics, reaching ${decisions.length || "no formal"} decision${decisions.length === 1 ? "" : "s"} and agreeing on ${actions.length} follow-up action${actions.length === 1 ? "" : "s"}. Key focus was ${points[0]?.toLowerCase() ?? "project progress"}.`,
    points,
    decisions: decisions.length ? decisions : ["No formal decisions were recorded in these notes."],
    actions,
  };
}

export const demoSummary: MeetingSummary = {
  summary:
    "The team reviewed Q3 delivery progress, confirmed the launch date, and agreed on a reduced scope for the first release so testing can begin a week earlier.",
  points: [
    "Onboarding flow is complete and in internal testing",
    "Two integrations are still blocked on partner API access",
    "Support volume rose 12% after the pricing change",
  ],
  decisions: [
    "Launch date confirmed for 15 September",
    "Reporting module moved to the post-launch release",
  ],
  actions: [
    { task: "Chase partner API credentials", owner: "Marcus", deadline: "Wed 26 Aug" },
    { task: "Draft launch comms for customers", owner: "Thandi", deadline: "Fri 28 Aug" },
    { task: "Set up regression test suite", owner: "Priya", deadline: "Mon 31 Aug" },
  ],
};

export type Priority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  title: string;
  deadline: string;
  priority: Priority;
}

const priorityRank: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };

export function planTasks(tasks: Task[]) {
  const sorted = [...tasks].sort((a, b) => {
    const p = priorityRank[a.priority] - priorityRank[b.priority];
    if (p !== 0) return p;
    return (a.deadline || "9999").localeCompare(b.deadline || "9999");
  });

  const blocks = [
    "09:00 – 10:30 · Deep focus",
    "10:45 – 12:00 · Deep focus",
    "13:30 – 14:30 · Admin & comms",
    "14:45 – 16:00 · Collaboration",
    "16:00 – 17:00 · Wrap-up & review",
  ];

  const today = sorted.slice(0, 5).map((t, i) => ({ ...t, block: blocks[i % blocks.length] }));
  const week = ["Tuesday", "Wednesday", "Thursday", "Friday"].map((day, i) => ({
    day,
    items: sorted.slice(5).filter((_, idx) => idx % 4 === i),
  }));

  const highCount = sorted.filter((t) => t.priority === "High").length;
  const tips = [
    highCount > 2
      ? `You have ${highCount} high-priority tasks. Protect your 09:00–12:00 window and tackle the two most consequential ones first.`
      : "Your load is balanced — start with the highest-priority item while your focus is freshest.",
    "Batch admin and email into the 13:30 slot rather than letting them interrupt deep work.",
    "Leave the last hour of the day free for overflow; unplanned work lands there instead of derailing tomorrow.",
  ];

  return { today, week, tips };
}

export const historyItems = [
  {
    id: "h1",
    type: "Email",
    title: "Follow-up on Q3 partnership proposal",
    meta: "Persuasive · 168 words",
    when: "Today, 09:42",
  },
  {
    id: "h2",
    type: "Summary",
    title: "Product sync — launch readiness",
    meta: "3 decisions · 4 action items",
    when: "Today, 08:15",
  },
  {
    id: "h3",
    type: "Plan",
    title: "Weekly plan — 25 to 29 August",
    meta: "11 tasks scheduled",
    when: "Yesterday, 17:20",
  },
  {
    id: "h4",
    type: "Email",
    title: "Leave request for 3–5 September",
    meta: "Formal · 92 words",
    when: "Yesterday, 11:05",
  },
  {
    id: "h5",
    type: "Summary",
    title: "Client onboarding call — Nedbank",
    meta: "5 key points · 2 decisions",
    when: "Mon, 15:30",
  },
];
