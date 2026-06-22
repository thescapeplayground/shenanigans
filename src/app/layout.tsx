import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../index.css";

export const metadata: Metadata = {
  title: "Leonardo's Terrace",
  description: "A clean, minimalist personal homepage and projects grid inspired by @lappland's realm, styled with shadcn/ui and powered by Framer Motion.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
