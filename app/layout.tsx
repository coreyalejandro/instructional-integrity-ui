import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructional Integrity Studio",
  description: "UI built around the ideal app flow for instructional integrity products."
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
