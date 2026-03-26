import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function EvaluateCta() {
  return (
    <section>
      <Card>
        <CardHeader
          title="Run an integrity check"
          subtitle="Paste instructional text, get rubric-grounded evidence and next actions. Every run is saved to your workspace history."
        />
        <CardContent>
          <Link
            href="/evaluate"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <ClipboardCheck className="h-4 w-4" />
            Open evaluator
            <ArrowRight className="h-4 w-4 opacity-70" />
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
