import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#080c14",
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
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased min-h-screen bg-[#080c14] text-slate-100 selection:bg-indigo-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
