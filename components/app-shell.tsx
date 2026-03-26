import { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function AppShell({
  children,
  mainClassName = "mx-auto flex max-w-7xl flex-col gap-12 px-6 py-10"
}: {
  children: ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className="grid-bg min-h-screen">
      <Header />
      <main className={mainClassName}>{children}</main>
      <Footer />
    </div>
  );
}
