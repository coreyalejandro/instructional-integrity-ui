import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/evaluate", label: "Evaluate" },
  { href: "/runs", label: "History" }
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3 rounded-2xl outline-none ring-offset-2 ring-offset-zinc-950 focus-visible:ring-2 focus-visible:ring-white/40">
          <div className="rounded-2xl border border-border bg-zinc-900 p-2">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Instructional Integrity Studio</p>
            <p className="text-xs text-zinc-400">Cognitive safety for instruction systems</p>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 lg:flex">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          Evidence-first evaluations
        </div>
      </div>
    </header>
  );
}
