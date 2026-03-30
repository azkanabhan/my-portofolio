import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://azkan.dev"),
  title: {
    default: "Muhammad Azka Nabhan Sauqi | Fullstack Developer",
    template: "%s | Muhammad Azka Nabhan Sauqi",
  },
  description:
    "Fullstack Developer focused on Next.js, Laravel, API architecture, and scalable web systems.",
  keywords: [
    "Fullstack Developer",
    "Next.js",
    "Laravel",
    "TypeScript",
    "Portfolio",
    "Scalable Web Systems",
  ],
  openGraph: {
    title: "Muhammad Azka Nabhan Sauqi | Fullstack Developer",
    description:
      "I build impactful digital products by combining high-performance frontend experiences with scalable backend systems.",
    url: "/",
    siteName: "Azka Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Azka Nabhan Sauqi | Fullstack Developer",
    description:
      "Premium portfolio showcasing impactful fullstack work, scalable architecture, and product outcomes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
