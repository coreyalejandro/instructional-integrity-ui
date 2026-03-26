import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(root, "."),
      "@/components": path.resolve(root, "components"),
      "@/lib": path.resolve(root, "lib")
    }
  },
  test: {
    environment: "node",
    include: ["lib/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],
    coverage: {
      enabled: true,
      provider: "v8",
      include: ["lib/**/*.ts"],
      thresholds: {
        lines: 40
      }
    }
  }
});

