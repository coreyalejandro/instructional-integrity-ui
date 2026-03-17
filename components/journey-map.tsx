import { journeySteps } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function JourneyMap() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Ideal user journey</p>
        <h2 className="mt-2 text-3xl font-semibold">The app should eliminate branching confusion.</h2>
        <p className="mt-3 max-w-3xl text-zinc-400">
          The platform works best when the user always knows what happens next, why it happens next,
          and how each package supports the current task.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        {journeySteps.map((item) => (
          <Card key={item.step} className="h-full">
            <CardHeader title={`${item.step}. ${item.title}`} />
            <CardContent>
              <p className="text-sm leading-6 text-zinc-300">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
