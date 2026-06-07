import PortfolioClient from "@/components/PortfolioClient";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amit Maurya",
  jobTitle: "Computer Vision & Industrial Automation Engineer",
  url: "https://portfolio.coderishabhlab.qzz.io/",
  sameAs: [
    "https://github.com/Rishbyte-lgtm",
    "https://www.linkedin.com/in/amit-maurya-84b0922a5/"
  ],
  knowsAbout: [
    "Computer Vision",
    "Machine Vision",
    "Industrial Automation",
    "Python",
    "OpenCV",
    "YOLOv8",
    "Siemens PLC",
    "TIA Portal",
    "Snap7",
    "PyQt"
  ],
  description:
    "Amit Maurya builds AI-powered vision systems for industrial automation, manufacturing inspection, PLC-triggered workflows, and machine vision deployments."
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioClient />
    </>
  );
}
