import type { Metadata, Viewport } from "next";
import { Doto, Geist, Geist_Mono, Roboto } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/navbar";
import Providers from "@/lib/provider/react-query";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import "./globals.css";
import { Footer } from "@/components/footer";
import { FAB } from "@/components/fab";
import { BackgroundBeamsConditional } from "@/components/BackgroundBeamsConditional";

import OgImage from "./opengraph-image.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "shenanigans.",
    template: "%s | shenanigans.",
  },
  description: "Stuffs I put.",
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://isaiahthings.eu.org"
      : "http://localhost:3000",
  ),
  openGraph: {
    title: {
      default: "shenanigans.",
      template: "%s | shenanigans.",
    },
    images: [
      {
        url: OgImage.src,
        width: OgImage.width,
        height: OgImage.height,
      },
    ],
    description: "Stuffs I put.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@isaiahscape",
    creator: "@isaiahscape",
    images: [
      {
        url: OgImage.src,
        width: OgImage.width,
        height: OgImage.height,
      },
    ],
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Set initial theme based on system preference before hydration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    document.documentElement.classList.remove('light', 'dark');
                    document.documentElement.classList.add(theme);
                  } catch(e) {}
                })();
              `,
            }}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} ${roboto.variable} antialiased scroll-smooth`}
        >
          {/* Use client component for conditional beams */}
          <BackgroundBeamsConditional />
          {/* Main content above beams */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Providers>
              <FAB />
              <Navbar />
              {children}
              <Footer />
              <Analytics />
              <SpeedInsights />
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
