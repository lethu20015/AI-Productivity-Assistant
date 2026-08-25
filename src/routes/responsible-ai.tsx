import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Eye, Lock, UserCheck } from "lucide-react";
import { Disclaimer, PageHeader } from "@/components/Disclaimer";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — Your AI Productivity Hub" },
      {
        name: "description",
        content:
          "How Your AI Productivity Hub handles accuracy, privacy, human oversight and transparency in every generated output.",
      },
      { property: "og:title", content: "Responsible AI — Your AI Productivity Hub" },
      {
        property: "og:description",
        content: "Our principles for accuracy, privacy, oversight and transparency.",
      },
    ],
  }),
  component: ResponsibleAI,
});

const principles = [
  {
    icon: UserCheck,
    title: "Human in the loop",
    copy: "The assistant drafts, you decide. Nothing is sent, shared or committed on your behalf without an explicit review step.",
  },
  {
    icon: Eye,
    title: "Transparent by default",
    copy: "Every output is labelled as AI-generated and carries a review notice, so recipients and colleagues are never misled.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    copy: "Meeting notes and email content stay inside your workspace and are never used to train third-party models.",
  },
  {
    icon: ShieldCheck,
    title: "Honest about limits",
    copy: "Summaries can miss nuance and drafts can state things confidently but incorrectly. Treat outputs as a strong first draft, not a source of truth.",
  },
];

function ResponsibleAI() {
  return (
    <div>
      <PageHeader
        eyebrow="Responsible AI"
        title="How we use AI at work, carefully"
        description="This hub is built to speed up your writing and planning without quietly taking over your judgement."
      />

      <Disclaimer />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {principles.map(({ icon: Icon, title, copy }) => (
          <section key={title} className="card-surface p-5 sm:p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base text-foreground">{title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{copy}</p>
          </section>
        ))}
      </div>

      <section className="card-surface mt-6 p-5 sm:p-6">
        <h2 className="text-lg text-foreground">Before you send anything</h2>
        <ul className="mt-3 space-y-2.5">
          {[
            "Check names, dates, figures and commitments against your source material.",
            "Remove confidential details that shouldn't leave your team.",
            "Rewrite anything that doesn't sound like you — tone matters more than speed.",
            "For legal, financial, HR or medical matters, get a qualified human review.",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
