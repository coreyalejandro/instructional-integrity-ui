import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const samples = await prisma.sampleArtifact.findMany({
    orderBy: { title: "asc" },
    select: { slug: true, title: true, description: true }
  });
  return NextResponse.json(samples);
}
