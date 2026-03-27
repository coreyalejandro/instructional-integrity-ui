import { describe, it, expect } from "vitest";
import { sanitizeInstructionalText } from "@/lib/artifacts/sanitizeInput";
import { normalizeArtifact } from "@/lib/artifacts/normalizeArtifact";
import {
  allowedExtension,
  validatePasteLength,
  validateUploadBuffer,
  ALLOWED_UPLOAD_MIME,
} from "@/lib/artifacts/validateInput";
import { ERROR_CODES } from "@/lib/domain/errorTypes";

const LIMITS = { maxPasteLength: 100, maxUploadBytes: 200 };

// ─── sanitizeInstructionalText ─────────────────────────────────────────────

describe("sanitizeInstructionalText", () => {
  it("removes null bytes", () => {
    expect(sanitizeInstructionalText("ab\u0000cd")).toBe("abcd");
  });

  it("strips script tags and their content", () => {
    const result = sanitizeInstructionalText("<script>alert(1)</script>safe");
    expect(result).not.toContain("script");
    expect(result).toContain("safe");
  });

  it("strips style tags and their content", () => {
    const result = sanitizeInstructionalText("<style>body{}</style>text");
    expect(result).not.toContain("style");
    expect(result).toContain("text");
  });

  it("strips generic HTML tags", () => {
    expect(sanitizeInstructionalText("<b>bold</b>")).toBe("bold");
  });

  it("removes residual angle brackets after tag stripping", () => {
    const result = sanitizeInstructionalText("a < b > c");
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
  });

  it("collapses multiple spaces to single space", () => {
    expect(sanitizeInstructionalText("a   b")).toBe("a b");
  });

  it("normalizes CRLF to LF", () => {
    expect(sanitizeInstructionalText("a\r\nb")).toBe("a\nb");
  });

  it("normalizes CR to LF", () => {
    expect(sanitizeInstructionalText("a\rb")).toBe("a\nb");
  });

  it("removes C0 control characters (except newline/tab)", () => {
    // \u0001 is a C0 control; should be removed
    expect(sanitizeInstructionalText("a\u0001b")).toBe("ab");
  });

  it("trims leading and trailing whitespace", () => {
    expect(sanitizeInstructionalText("  hello  ")).toBe("hello");
  });

  it("passes plain text through unchanged", () => {
    expect(sanitizeInstructionalText("Hello world")).toBe("Hello world");
  });

  it("handles empty string", () => {
    expect(sanitizeInstructionalText("")).toBe("");
  });
});

// ─── normalizeArtifact ─────────────────────────────────────────────────────

describe("normalizeArtifact", () => {
  it("returns plain text without HTML tags", () => {
    const result = normalizeArtifact({ title: "t", raw: "<b>hello</b>" });
    expect(result.plainText).toBe("hello");
  });

  it("uses title when provided", () => {
    const result = normalizeArtifact({ title: "My Artifact", raw: "content here" });
    expect(result.title).toBe("My Artifact");
  });

  it("falls back to 'Untitled artifact' for empty title", () => {
    const result = normalizeArtifact({ title: "   ", raw: "content here" });
    expect(result.title).toBe("Untitled artifact");
  });

  it("includes wordCount", () => {
    const result = normalizeArtifact({ title: "t", raw: "one two three" });
    expect(result.wordCount).toBe(3);
  });

  it("includes charCount", () => {
    const result = normalizeArtifact({ title: "t", raw: "hello" });
    expect(result.charCount).toBe(5);
  });

  it("splits paragraphs on blank lines", () => {
    const result = normalizeArtifact({ title: "t", raw: "para one\n\npara two" });
    expect(result.paragraphs).toHaveLength(2);
  });

  it("includes lines array", () => {
    const result = normalizeArtifact({ title: "t", raw: "line1\nline2" });
    expect(result.lines).toContain("line1");
    expect(result.lines).toContain("line2");
  });

  it("throws NORMALIZATION_FAILED when content too short after sanitization", () => {
    expect(() => normalizeArtifact({ title: "t", raw: "<b></b>" })).toThrow();
    try {
      normalizeArtifact({ title: "t", raw: "<b></b>" });
    } catch (err) {
      expect((err as Error & { code: string }).code).toBe(
        ERROR_CODES.NORMALIZATION_FAILED
      );
    }
  });

  it("handles single-paragraph text (no blank lines)", () => {
    const result = normalizeArtifact({ title: "t", raw: "just one paragraph here" });
    expect(result.paragraphs).toHaveLength(1);
  });
});

// ─── allowedExtension ─────────────────────────────────────────────────────

describe("allowedExtension", () => {
  it("allows .txt", () => expect(allowedExtension("file.txt")).toBe(true));
  it("allows .md", () => expect(allowedExtension("file.md")).toBe(true));
  it("allows .TXT (case-insensitive)", () => expect(allowedExtension("file.TXT")).toBe(true));
  it("allows .MD (case-insensitive)", () => expect(allowedExtension("file.MD")).toBe(true));
  it("rejects .pdf", () => expect(allowedExtension("file.pdf")).toBe(false));
  it("rejects .docx", () => expect(allowedExtension("file.docx")).toBe(false));
  it("rejects empty string", () => expect(allowedExtension("")).toBe(false));
});

// ─── ALLOWED_UPLOAD_MIME ───────────────────────────────────────────────────

describe("ALLOWED_UPLOAD_MIME", () => {
  it("contains text/plain", () => expect(ALLOWED_UPLOAD_MIME.has("text/plain")).toBe(true));
  it("contains text/markdown", () => expect(ALLOWED_UPLOAD_MIME.has("text/markdown")).toBe(true));
  it("contains text/x-markdown", () => expect(ALLOWED_UPLOAD_MIME.has("text/x-markdown")).toBe(true));
  it("does not contain text/html", () => expect(ALLOWED_UPLOAD_MIME.has("text/html")).toBe(false));
});

// ─── validatePasteLength ──────────────────────────────────────────────────

describe("validatePasteLength", () => {
  it("passes for text within limit", () => {
    expect(() => validatePasteLength("hello", LIMITS)).not.toThrow();
  });

  it("throws EMPTY_INPUT for empty string", () => {
    try {
      validatePasteLength("", LIMITS);
      expect.fail("should have thrown");
    } catch (err) {
      expect((err as Error & { code: string }).code).toBe(ERROR_CODES.EMPTY_INPUT);
    }
  });

  it("throws INPUT_TOO_LARGE when text exceeds limit", () => {
    try {
      validatePasteLength("x".repeat(101), LIMITS);
      expect.fail("should have thrown");
    } catch (err) {
      expect((err as Error & { code: string }).code).toBe(ERROR_CODES.INPUT_TOO_LARGE);
    }
  });

  it("passes for text exactly at limit", () => {
    expect(() => validatePasteLength("x".repeat(100), LIMITS)).not.toThrow();
  });
});

// ─── validateUploadBuffer ─────────────────────────────────────────────────

describe("validateUploadBuffer", () => {
  it("passes for valid .txt file", () => {
    const buf = Buffer.from("hello world");
    expect(() =>
      validateUploadBuffer(buf, "text/plain", "file.txt", LIMITS)
    ).not.toThrow();
  });

  it("passes for valid .md file", () => {
    const buf = Buffer.from("# heading");
    expect(() =>
      validateUploadBuffer(buf, "text/markdown", "file.md", LIMITS)
    ).not.toThrow();
  });

  it("throws EMPTY_INPUT for zero-length buffer", () => {
    try {
      validateUploadBuffer(Buffer.alloc(0), "text/plain", "file.txt", LIMITS);
      expect.fail("should have thrown");
    } catch (err) {
      expect((err as Error & { code: string }).code).toBe(ERROR_CODES.EMPTY_INPUT);
    }
  });

  it("throws INPUT_TOO_LARGE when buffer exceeds limit", () => {
    try {
      validateUploadBuffer(
        Buffer.alloc(201),
        "text/plain",
        "file.txt",
        LIMITS
      );
      expect.fail("should have thrown");
    } catch (err) {
      expect((err as Error & { code: string }).code).toBe(ERROR_CODES.INPUT_TOO_LARGE);
    }
  });

  it("throws UNSUPPORTED_MEDIA_TYPE for disallowed mime", () => {
    try {
      validateUploadBuffer(
        Buffer.from("data"),
        "application/pdf",
        "file.txt",
        LIMITS
      );
      expect.fail("should have thrown");
    } catch (err) {
      expect((err as Error & { code: string }).code).toBe(
        ERROR_CODES.UNSUPPORTED_MEDIA_TYPE
      );
    }
  });

  it("throws INVALID_EXTENSION for disallowed extension", () => {
    try {
      validateUploadBuffer(
        Buffer.from("data"),
        "text/plain",
        "file.pdf",
        LIMITS
      );
      expect.fail("should have thrown");
    } catch (err) {
      expect((err as Error & { code: string }).code).toBe(
        ERROR_CODES.INVALID_EXTENSION
      );
    }
  });

  it("throws MISMATCHED_TYPE when .md file has text/plain mime", () => {
    try {
      validateUploadBuffer(
        Buffer.from("# heading"),
        "text/plain",
        "file.md",
        LIMITS
      );
      expect.fail("should have thrown");
    } catch (err) {
      expect((err as Error & { code: string }).code).toBe(
        ERROR_CODES.MISMATCHED_TYPE
      );
    }
  });

  it("throws MISMATCHED_TYPE when .txt file has text/markdown mime", () => {
    try {
      validateUploadBuffer(
        Buffer.from("hello"),
        "text/markdown",
        "file.txt",
        LIMITS
      );
      expect.fail("should have thrown");
    } catch (err) {
      expect((err as Error & { code: string }).code).toBe(
        ERROR_CODES.MISMATCHED_TYPE
      );
    }
  });

  it("strips charset suffix from mime before validation", () => {
    const buf = Buffer.from("hello");
    expect(() =>
      validateUploadBuffer(buf, "text/plain; charset=utf-8", "file.txt", LIMITS)
    ).not.toThrow();
  });

  it("accepts text/x-markdown for .md files", () => {
    const buf = Buffer.from("# heading");
    expect(() =>
      validateUploadBuffer(buf, "text/x-markdown", "file.md", LIMITS)
    ).not.toThrow();
  });
});
