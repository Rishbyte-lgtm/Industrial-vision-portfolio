import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

<<<<<<< HEAD
// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-sans"
});

const siteUrl = "https://amit-maurya-portfolio.local";
=======
const siteUrl = "https://portfolio.coderishabhlab.qzz.io";
>>>>>>> 8f8ef18 (Reposition portfolio for inspection leads)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amit Maurya | Machine Vision Inspection Engineer India",
    template: "%s | Amit Maurya"
  },
  description:
    "Machine vision inspection and industrial camera systems for manufacturing quality inspection, defect detection automation, part verification, and PLC-connected inspection workflows.",
  keywords: [
    "Amit Maurya",
    "machine vision inspection",
    "industrial vision systems",
    "defect detection automation",
    "manufacturing quality inspection",
    "PLC camera inspection",
    "machine vision engineer India",
    "automated quality inspection",
    "camera based inspection",
    "part verification system",
    "sealant inspection system",
    "industrial automation India"
  ],
  authors: [{ name: "Amit Maurya" }],
  creator: "Amit Maurya",
  openGraph: {
    title: "Amit Maurya | Machine Vision Inspection Systems",
    description:
      "Camera-based inspection systems for manufacturers who need defect detection, part verification, PASS/FAIL automation, and PLC-connected quality workflows.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/images/camshaft-vision.png",
        width: 1200,
        height: 630,
        alt: "Industrial machine vision inspection system"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Maurya | Machine Vision Inspection Engineer India",
    description: "Automated vision inspection systems for manufacturing quality checks.",
    images: ["/images/camshaft-vision.png"]
  },
  alternates: {
    canonical: siteUrl
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080b",
  // Prevent layout shift on mobile
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}