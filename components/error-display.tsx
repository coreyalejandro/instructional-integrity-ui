export function ErrorDisplay({
  title = "Something went wrong",
  message,
  recovery
}: {
  title?: string;
  message: string;
  recovery?: string;
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100"
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-red-200/90">{message}</p>
      {recovery ? <p className="mt-2 text-red-200/80">{recovery}</p> : null}
    </div>
  );
}
