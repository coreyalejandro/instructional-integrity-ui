import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEMO_USER_EMAIL = "demo@instructional-integrity.local";

async function main() {
  await prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    create: {
      email: DEMO_USER_EMAIL,
      name: "Demo reviewer",
      role: "REVIEWER"
    },
    update: {}
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
