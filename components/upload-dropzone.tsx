"use client";

export function UploadDropzone({
  onFile,
  disabled
}: {
  onFile: (file: File) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor="artifact-upload" className="text-sm font-medium text-zinc-200">
        Upload .txt or .md (max 5 MB)
      </label>
      <input
        id="artifact-upload"
        name="artifact-upload"
        type="file"
        accept=".txt,.md,text/plain,text/markdown"
        disabled={disabled}
        className="block w-full text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:px-3 file:py-2 file:text-zinc-100"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />
      <p className="text-xs text-zinc-500">
        Server validates MIME type, extension, size, and UTF-8 encoding (§6.1).
      </p>
    </div>
  );
}
