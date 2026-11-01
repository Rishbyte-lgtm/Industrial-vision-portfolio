import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"]
});

const siteUrl = "https://portfolio.coderishabhlab.qzz.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amit Maurya — Machine Vision & Industrial Automation",
    template: "%s | Amit Maurya"
  },
  description:
    "Engineering camera-based inspection systems, automated quality control, and PLC-connected computer vision pipelines for modern manufacturing.",
  keywords: [
    "Amit Maurya",
    "machine vision inspection",
    "industrial vision systems",
    "manufacturing quality inspection",
    "automated defect detection",
    "PLC camera inspection",
    "Siemens S7 Snap7",
    "OpenCV Python engineer"
  ],
  authors: [{ name: "Amit Maurya" }],
  creator: "Amit Maurya",
  openGraph: {
    title: "Amit Maurya — Machine Vision & Industrial Automation",
    description:
      "Engineering camera-based inspection systems, automated quality control, and PLC-connected computer vision pipelines for modern manufacturing.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/images/camshaft-vision.png",
        width: 1200,
        height: 630,
        alt: "Machine Vision Inspection Engineering"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Maurya — Machine Vision & Industrial Automation",
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
  themeColor: "#F5F6F3",
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} scroll-smooth`}>
      <body className="font-sans bg-[#F5F6F3] text-[#172B2A] antialiased selection:bg-[#DCE8E2] selection:text-[#172B2A]">
        {children}
      </body>
    </html>
  );
}
