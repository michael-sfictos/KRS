import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://krs-zeta.vercel.app";
const siteTitle = "KRS AI | Accounting, Tax Advisory & Agentic Operations";
const siteDescription =
  "Premium accounting, payroll, tax advisory, and agentic compliance operations for modern Greek businesses.";
const ogImage = {
  url: "/images/ogimage-krs.png",
  width: 1200,
  height: 630,
  alt: "KRS logo and the line, Building the financial platform for the businesses of tomorrow",
};

const fraunces = Fraunces({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

const ibmPlexSans = IBM_Plex_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "KRS AI",
    images: [ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "apple-mobile-web-app-title": "KRS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
