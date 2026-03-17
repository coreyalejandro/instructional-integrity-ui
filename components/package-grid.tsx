import { packageCards } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PackageGrid() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Package architecture</p>
        <h2 className="mt-2 text-3xl font-semibold">Every screen should map back to a package.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {packageCards.map((card) => (
          <Card key={card.id} className="h-full">
            <CardHeader title={card.title} subtitle={card.status} />
            <CardContent>
              <p className="text-sm leading-6 text-zinc-300">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
