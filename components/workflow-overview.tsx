import { workflowCards } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function WorkflowOverview() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Primary flows</p>
        <h2 className="mt-2 text-3xl font-semibold">Three top-level choices are enough.</h2>
        <p className="mt-3 max-w-3xl text-zinc-400">
          The first decision should be stable and obvious. The user should never have to infer hidden workflows.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {workflowCards.map((item) => (
          <Card key={item.title}>
            <CardHeader title={item.title} subtitle={item.subtitle} />
            <CardContent>
              <ul className="space-y-3 text-sm text-zinc-300">
                {item.points.map((point) => (
                  <li key={point} className="rounded-2xl border border-border bg-black/30 px-4 py-3">
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
