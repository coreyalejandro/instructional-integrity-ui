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
    include: ["**/*.test.{ts,tsx}"],
    coverage: {
      enabled: false
    }
  }
});

