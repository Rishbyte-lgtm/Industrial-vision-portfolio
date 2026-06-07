import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://amit-maurya-portfolio.local";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amit Maurya | Computer Vision & Industrial Automation Engineer",
    template: "%s | Amit Maurya"
  },
  description:
    "Premium engineering portfolio for Amit Maurya, specializing in AI-powered machine vision, Siemens PLC integration, Snap7 automation, OpenCV, YOLOv8, and industrial inspection systems.",
  keywords: [
    "Amit Maurya",
    "Computer Vision Engineer",
    "Industrial Automation Engineer",
    "Machine Vision",
    "YOLOv8",
    "OpenCV",
    "Siemens PLC",
    "TIA Portal",
    "Snap7",
    "PyQt",
    "AI inspection systems"
  ],
  authors: [{ name: "Amit Maurya" }],
  creator: "Amit Maurya",
  openGraph: {
    title: "Amit Maurya | Industrial AI Vision Systems",
    description:
      "Building AI-powered vision systems for industrial automation, inspection, and PLC-integrated manufacturing workflows.",
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
    title: "Amit Maurya | Computer Vision & Industrial Automation Engineer",
    description: "AI-powered machine vision systems for industrial automation.",
    images: ["/images/camshaft-vision.png"]
  },
  alternates: {
    canonical: siteUrl
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080b"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
