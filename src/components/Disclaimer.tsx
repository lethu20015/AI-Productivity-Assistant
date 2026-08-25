import { Info } from "lucide-react";
import { AI_DISCLAIMER } from "@/lib/deskflow";

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl bg-accent px-3.5 py-3 text-[13px] leading-relaxed text-accent-foreground ${className}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="min-w-0">{AI_DISCLAIMER}</p>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
      <h1 className="mt-2 text-3xl text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
    </header>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground";

export const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50";
