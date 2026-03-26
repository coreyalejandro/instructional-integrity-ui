import { AppShell } from "@/components/app-shell";
import { EvaluateCta } from "@/components/evaluate-cta";
import { Hero } from "@/components/hero";
import { JourneyMap } from "@/components/journey-map";
import { PackageGrid } from "@/components/package-grid";
import { WorkflowOverview } from "@/components/workflow-overview";

export default function Page() {
  return (
    <AppShell>
      <Hero />
      <JourneyMap />
      <WorkflowOverview />
      <EvaluateCta />
      <PackageGrid />
    </AppShell>
  );
}
