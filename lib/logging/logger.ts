import pino, { type Logger } from "pino";

let root: Logger | null = null;

export function getLogger(): Logger {
  if (!root) {
    root = pino({
      level: process.env.LOG_LEVEL ?? "info",
      base: { service: "instructional-integrity-studio" }
    });
  }
  return root;
}
