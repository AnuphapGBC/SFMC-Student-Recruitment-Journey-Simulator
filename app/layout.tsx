import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SFMC Student Recruitment Journey Simulator",
  description: "Pek Chansatit's personal portfolio project simulating SFMC recruitment segmentation, orchestration, personalization, and measurement logic.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
