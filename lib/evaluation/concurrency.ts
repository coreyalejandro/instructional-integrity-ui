/**
 * In-process limiter for concurrent evaluations (contract §19.1).
 * Note: serverless instances each have their own counter; document for operators.
 */
export class EvaluationConcurrencyLimiter {
  private active = 0;

  constructor(private readonly max: number) {}

  get activeCount(): number {
    return this.active;
  }

  /** Returns false when at capacity. */
  tryEnter(): boolean {
    if (this.active >= this.max) return false;
    this.active += 1;
    return true;
  }

  leave(): void {
    this.active = Math.max(0, this.active - 1);
  }
}

export function getMaxConcurrentEvaluations(): number {
  const raw = process.env.MAX_CONCURRENT_EVALUATIONS;
  const n = raw !== undefined ? Number.parseInt(raw, 10) : 5;
  return Number.isFinite(n) && n >= 1 ? Math.min(n, 100) : 5;
}
