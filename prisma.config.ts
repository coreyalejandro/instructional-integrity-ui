import { defineConfig } from "@prisma/client/runtime/library";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL
  }
});

