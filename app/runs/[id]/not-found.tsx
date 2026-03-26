import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RunNotFound() {
  return (
    <AppShell>
      <Card>
        <CardHeader title="Run not found" subtitle="This evaluation may have been removed or the link is invalid." />
        <CardContent>
          <Link href="/runs" className="text-sm text-white underline-offset-4 hover:underline">
            Back to history
          </Link>
        </CardContent>
      </Card>
    </AppShell>
  );
}
