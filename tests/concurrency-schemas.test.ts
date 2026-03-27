import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  EvaluationConcurrencyLimiter,
  getMaxConcurrentEvaluations,
} from "@/lib/evaluation/concurrency";
import {
  postEvaluationBodySchema,
  exportQuerySchema,
} from "@/lib/validation/schemas";

// ─── EvaluationConcurrencyLimiter ─────────────────────────────────────────

describe("EvaluationConcurrencyLimiter", () => {
  it("starts with activeCount 0", () => {
    const lim = new EvaluationConcurrencyLimiter(3);
    expect(lim.activeCount).toBe(0);
  });

  it("tryEnter increments activeCount", () => {
    const lim = new EvaluationConcurrencyLimiter(3);
    lim.tryEnter();
    expect(lim.activeCount).toBe(1);
  });

  it("tryEnter returns true when below limit", () => {
    const lim = new EvaluationConcurrencyLimiter(3);
    expect(lim.tryEnter()).toBe(true);
  });

  it("tryEnter returns false at capacity", () => {
    const lim = new EvaluationConcurrencyLimiter(1);
    lim.tryEnter();
    expect(lim.tryEnter()).toBe(false);
  });

  it("tryEnter does not increment when at capacity", () => {
    const lim = new EvaluationConcurrencyLimiter(1);
    lim.tryEnter();
    lim.tryEnter(); // rejected
    expect(lim.activeCount).toBe(1);
  });

  it("leave decrements activeCount", () => {
    const lim = new EvaluationConcurrencyLimiter(3);
    lim.tryEnter();
    lim.leave();
    expect(lim.activeCount).toBe(0);
  });

  it("leave does not go below 0", () => {
    const lim = new EvaluationConcurrencyLimiter(3);
    lim.leave(); // called without enter
    expect(lim.activeCount).toBe(0);
  });

  it("allows re-entry after leave", () => {
    const lim = new EvaluationConcurrencyLimiter(1);
    lim.tryEnter();
    lim.leave();
    expect(lim.tryEnter()).toBe(true);
  });

  it("tracks multiple concurrent entries", () => {
    const lim = new EvaluationConcurrencyLimiter(5);
    lim.tryEnter();
    lim.tryEnter();
    lim.tryEnter();
    expect(lim.activeCount).toBe(3);
  });

  it("exactly at capacity returns false on next tryEnter", () => {
    const lim = new EvaluationConcurrencyLimiter(2);
    lim.tryEnter();
    lim.tryEnter();
    expect(lim.tryEnter()).toBe(false);
    expect(lim.activeCount).toBe(2);
  });
});

// ─── getMaxConcurrentEvaluations ──────────────────────────────────────────

describe("getMaxConcurrentEvaluations", () => {
  let original: string | undefined;

  beforeEach(() => {
    original = process.env.MAX_CONCURRENT_EVALUATIONS;
  });

  afterEach(() => {
    if (original === undefined) {
      delete process.env.MAX_CONCURRENT_EVALUATIONS;
    } else {
      process.env.MAX_CONCURRENT_EVALUATIONS = original;
    }
  });

  it("returns 5 when env var not set", () => {
    delete process.env.MAX_CONCURRENT_EVALUATIONS;
    expect(getMaxConcurrentEvaluations()).toBe(5);
  });

  it("returns parsed value when env var is valid integer", () => {
    process.env.MAX_CONCURRENT_EVALUATIONS = "10";
    expect(getMaxConcurrentEvaluations()).toBe(10);
  });

  it("caps at 100", () => {
    process.env.MAX_CONCURRENT_EVALUATIONS = "200";
    expect(getMaxConcurrentEvaluations()).toBe(100);
  });

  it("falls back to 5 for non-numeric env var", () => {
    process.env.MAX_CONCURRENT_EVALUATIONS = "banana";
    expect(getMaxConcurrentEvaluations()).toBe(5);
  });

  it("falls back to 5 for 0 (below min of 1)", () => {
    process.env.MAX_CONCURRENT_EVALUATIONS = "0";
    expect(getMaxConcurrentEvaluations()).toBe(5);
  });

  it("accepts minimum value of 1", () => {
    process.env.MAX_CONCURRENT_EVALUATIONS = "1";
    expect(getMaxConcurrentEvaluations()).toBe(1);
  });
});

// ─── postEvaluationBodySchema ─────────────────────────────────────────────

describe("postEvaluationBodySchema", () => {
  it("accepts paste source with content", () => {
    const result = postEvaluationBodySchema.safeParse({
      artifact: { source: "paste", title: "My artifact", content: "Hello world" },
    });
    expect(result.success).toBe(true);
  });

  it("accepts upload source with uploadId", () => {
    const result = postEvaluationBodySchema.safeParse({
      artifact: { source: "upload", title: "file", uploadId: "upload-123" },
    });
    expect(result.success).toBe(true);
  });

  it("accepts sample source with sampleId", () => {
    const result = postEvaluationBodySchema.safeParse({
      artifact: { source: "sample", title: "example", sampleId: "sample-1" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects unknown source value", () => {
    const result = postEvaluationBodySchema.safeParse({
      artifact: { source: "ftp", title: "t" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects title exceeding 200 chars", () => {
    const result = postEvaluationBodySchema.safeParse({
      artifact: { source: "paste", title: "x".repeat(201), content: "text" },
    });
    expect(result.success).toBe(false);
  });

  it("requires artifact field", () => {
    expect(postEvaluationBodySchema.safeParse({}).success).toBe(false);
  });

  it("requires source field", () => {
    const result = postEvaluationBodySchema.safeParse({
      artifact: { title: "t", content: "text" },
    });
    expect(result.success).toBe(false);
  });
});

// ─── exportQuerySchema ────────────────────────────────────────────────────

describe("exportQuerySchema", () => {
  it("accepts json format", () => {
    expect(exportQuerySchema.safeParse({ format: "json" }).success).toBe(true);
  });

  it("accepts markdown format", () => {
    expect(exportQuerySchema.safeParse({ format: "markdown" }).success).toBe(true);
  });

  it("rejects unknown format", () => {
    expect(exportQuerySchema.safeParse({ format: "xml" }).success).toBe(false);
  });

  it("rejects missing format", () => {
    expect(exportQuerySchema.safeParse({}).success).toBe(false);
  });
});
