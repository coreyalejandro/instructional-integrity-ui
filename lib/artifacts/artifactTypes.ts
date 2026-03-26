export type ArtifactSource = "paste" | "upload" | "sample";

export interface NormalizedArtifact {
  title: string;
  plainText: string;
  paragraphs: string[];
  lines: string[];
  wordCount: number;
  charCount: number;
}
