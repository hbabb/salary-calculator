import { ThemeProvider } from "@/config/theme-provider";
import { env } from "@/env/client";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
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
    "A salary calculator that allows users to input a monthly salary, annual salary, or hourly rate and automatically calculates the other two formats. It also includes a feature to convert salaries into different currencies using real-time exchange rates.",

  // manifest: "/manifest.json",
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: "default",
  //   title: "Salary Calculator",
  // },
  // formatDetection: {
  //   telephone: false,
  // },
  // openGraph: {
  //   type: "website",
  //   images: "/images/png/portfolio-preview.png",
  //   siteName: "Salary Calculator",
  //   title: "Salary Calculator",
  //   description:
  //     "A salary calculator that allows users to input a monthly salary, annual salary, or hourly rate and automatically calculates the other two formats. It also includes a feature to convert salaries into different currencies using real-time exchange rates.",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   images: "/images/png/portfolio-preview.png",
  //   title: "Salary Calculator",
  //   description:
  //     "A salary calculator that allows users to input a monthly salary, annual salary, or hourly rate and automatically calculates the other two formats. It also includes a feature to convert salaries into different currencies using real-time exchange rates.",
  // },
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
        </ThemeProvider>
      </body>
    </html>
  );
}
