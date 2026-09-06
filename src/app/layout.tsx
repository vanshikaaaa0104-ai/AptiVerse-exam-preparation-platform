import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@/components/theme/ThemeProvider";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060a13" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export const metadata: Metadata = {
  title: "AptiVerse | Intelligent Competitive Exam Preparation Platform",
  description:
    "AptiVerse is the premier preparation operating system for CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH MBA CET, and GMAT. Learn concepts, practice adaptive questions, simulate official mocks, and analyze performance with precision.",
  keywords: [
    "CAT 2026",
    "GMAT 2026",
    "XAT Preparation",
    "SNAP Exam",
    "NMAT GMAC",
    "CMAT",
    "MAT",
    "MAH MBA CET",
    "Quantitative Aptitude",
    "DILR",
    "VARC",
    "Data Insights",
    "Mock Tests",
    "Decision Making",
  ],
  authors: [{ name: "AptiVerse Academic Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${outfit.variable} ${plusJakarta.variable} ${jetBrainsMono.variable} font-sans antialiased min-h-screen bg-background text-foreground selection:bg-indigo-500 selection:text-white transition-colors duration-200`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
