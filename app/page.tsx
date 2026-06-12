import PortfolioClient from "@/components/PortfolioClient";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Amit Maurya",
  image: "https://portfolio.coderishabhlab.qzz.io/images/camshaft-vision.png",
  url: "https://portfolio.coderishabhlab.qzz.io/",
  founder: {
    "@type": "Person",
    name: "Amit Maurya",
    jobTitle: "Machine Vision Inspection Engineer"
  },
  sameAs: [
    "https://github.com/Rishbyte-lgtm",
    "https://www.linkedin.com/in/amit-maurya-84b0922a5/"
  ],
  areaServed: "India",
  serviceType: [
    "Machine vision inspection",
    "Manufacturing quality inspection",
    "Defect detection automation",
    "PLC camera inspection",
    "Camera-based part verification"
  ],
  description:
    "Amit Maurya builds camera-based inspection systems for manufacturers who need automated quality checks, part verification, defect detection, and PLC-connected inspection workflows."
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
