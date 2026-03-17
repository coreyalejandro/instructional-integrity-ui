import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { JourneyMap } from "@/components/journey-map";
import { PackageGrid } from "@/components/package-grid";
import { WorkflowOverview } from "@/components/workflow-overview";
import { EvaluatorPanel } from "@/components/evaluator-panel";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="grid-bg min-h-screen">
      <Header />
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-10">
        <Hero />
        <JourneyMap />
        <WorkflowOverview />
        <EvaluatorPanel />
        <PackageGrid />
      </main>
      <Footer />
    </div>
  );
}
