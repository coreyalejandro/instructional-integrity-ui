import { ReactNode } from "react";

export function Card({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-3xl border border-border shadow-glow ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="px-6 pt-6">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
    </div>
  );
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`px-6 pb-6 pt-4 ${className}`}>{children}</div>;
}
