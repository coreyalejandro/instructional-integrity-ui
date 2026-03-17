import { ShieldCheck, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-border bg-zinc-900 p-2">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Instructional Integrity Studio</p>
            <p className="text-xs text-zinc-400">Product UI for learning, evaluation, and operationalization</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 md:flex">
          <Sparkles className="h-3.5 w-3.5" />
          Deterministic UI flow
        </div>
      </div>
    </header>
  );
}
