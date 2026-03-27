import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructional Integrity Studio",
  description:
    "Cognitive Safety evaluation for instructional artifacts: rubric-backed evidence, failure classes, and remediation—surfacing scaffolding risks that correct content alone can hide."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
