import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Leonardo's Terrace",
  description: "A clean, minimalist personal homepage and projects grid inspired by @lappland's realm, styled with shadcn/ui and powered by Framer Motion.",
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
      </body>
    </html>
  );
}
