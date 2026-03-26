import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const samplesDir = path.join(__dirname, "..", "data", "samples");

const samples = [
  { slug: "sample-good-explanation", file: "sample-good-explanation.md", title: "Good scaffolding (reference)", description: "Shows prerequisites, steps, and bridging language." },
  { slug: "sample-premature-conclusion", file: "sample-premature-conclusion.md", title: "Premature conclusion", description: "Conclusion language appears before support." },
  { slug: "sample-terminology-jump", file: "sample-terminology-jump.md", title: "Terminology jump", description: "Introduces an undefined specialized term." },
  { slug: "sample-compression-overload", file: "sample-compression-overload.md", title: "Compression overload", description: "Single dense paragraph with many concepts." },
  { slug: "sample-polished-but-unsafe", file: "sample-polished-but-unsafe.md", title: "Polished but unsafe", description: "Fluent text with certainty language and weak grounding." }
];

async function main() {
  for (const s of samples) {
    const content = readFileSync(path.join(samplesDir, s.file), "utf8");
    await prisma.sampleArtifact.upsert({
      where: { slug: s.slug },
      create: {
        slug: s.slug,
        title: s.title,
        content,
        description: s.description
      },
      update: {
        title: s.title,
        content,
        description: s.description
      }
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
