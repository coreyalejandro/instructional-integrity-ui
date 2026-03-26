import { prisma } from "./db";

export const DEMO_USER_EMAIL = "demo@instructional-integrity.local";
export const DEMO_USER_NAME = "Demo reviewer";

/**
 * Ensures the local workspace user exists (no auth yet — single shared demo identity).
 */
export async function ensureDemoUser(): Promise<{ id: string }> {
  const user = await prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    create: {
      email: DEMO_USER_EMAIL,
      name: DEMO_USER_NAME,
      role: "REVIEWER"
    },
    update: {}
  });

  return { id: user.id };
}
