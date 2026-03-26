import Link from "next/link";

export function Breadcrumb({
  items
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-zinc-400">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {i < items.length - 1 ? (
              <Link href={item.href} className="text-zinc-400 transition hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-200">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
