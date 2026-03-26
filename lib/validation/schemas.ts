import { z } from "zod";

const limits = {
  title: 200,
  paste: Number(process.env.MAX_PASTE_LENGTH ?? 100_000)
};

export const postEvaluationBodySchema = z.object({
  artifact: z.object({
    source: z.enum(["paste", "upload", "sample"]),
    title: z.string().max(limits.title),
    content: z.string().max(limits.paste).optional(),
    uploadId: z.string().optional(),
    sampleId: z.string().optional()
  })
});

export type PostEvaluationBody = z.infer<typeof postEvaluationBodySchema>;

export const exportQuerySchema = z.object({
  format: z.enum(["json", "markdown"])
});
