import { ThemeProvider } from "@/config/theme-provider";
import { env } from "@/env/client";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "Salary Calculator",

  description:
    "Calculate monthly, annual, or hourly salary with currency conversion. Supports real-time exchange rates for accurate results.",

  manifest: "/public/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Salary Calculator",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    images: "/public/web-app-manifest-192x192.png",
    siteName: "Salary Calculator",
    title: "Salary Calculator",
    description:
      "Calculate salaries and convert them into different currencies using real-time exchange rates.",
  },
  twitter: {
    card: "summary_large_image",
    images: "/public/web-app-manifest-512x512.png",
    title: "Salary Calculator",
    description: "Easily calculate and convert salaries with our real-time exchange rate support.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", geistSans.variable, geistMono.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
