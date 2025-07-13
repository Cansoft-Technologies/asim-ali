import Image from "next/image";
import { useState } from "react";
import PartnerLogos from "./partner-logos";

export default function AboutSection({aboutSection, partnerLogo}: {aboutSection?: any, partnerLogo?: any}) {
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-16">
          <div className="container mx-auto max-w-2xl">
            <h2 className="!text-5xl md:text-2xl xl:text-4xl space-y-5 font-bold font-oswald">
              Asim Ali, Your{" "}
              <span className="text-[#F0B254] font-normal">Mortgage</span>{" "}
              <br />
              <span className="text-[#F0B254] font-normal">Broker</span> in
              Surrey
            </h2>
          </div>

          <div className="max-w-xl">
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  aboutSection?.description ||
                  `If you're looking to buy a home or refinance your current mortgage, you're in the right place. Asim Ali is your go-to mortgage broker in Surrey to guide you through the mortgage journey.`,
              }}
            ></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <h3
            onClick={() => setActiveTab("left")}
            className={`text-xl font-medium pb-2 px-4 font-oswald cursor-pointer hover:text-[#F0B254] hover:border-[#F0B254] ${
              activeTab === "left"
                ? "border-b-2 border-[#F0B254] text-[#F0B254]"
                : "text-gray-500 border-b-2 border-[#0000001A]"
            }`}
            style={{ cursor: "pointer" }}
          >
            {aboutSection?.leftTitle || "Who We Are"}
          </h3>
          <h3
            onClick={() => setActiveTab("right")}
            className={`text-xl font-medium pb-2 px-4 font-oswald cursor-pointer hover:text-[#F0B254] hover:border-[#F0B254] ${
              activeTab === "right"
                ? "border-b-2 border-[#F0B254] text-[#F0B254]"
                : "text-gray-500 border-b-2 border-[#0000001A]"
            }`}
            style={{ cursor: "pointer" }}
          >
            {aboutSection?.rightTitle || "What Sets Us Apart"}
          </h3>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Text Content */}
          <div className={activeTab === "left" ? "order-1" : "order-2"}>
            {activeTab === "left" ? (
              <div className="space-y-4 text-gray-700">
                <p
                  className="space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: aboutSection?.leftDescription,
                  }}
                ></p>
              </div>
            ) : (
              <div className="space-y-4 text-gray-700">
                <p
                  className="space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: aboutSection?.rightDescription,
                  }}
                ></p>
              </div>
            )}
          </div>

          {/* Image Content */}
          <div className={activeTab === "left" ? "order-2" : "order-1"}>
            {activeTab === "left" ? (
              <div className="relative h-80 w-full rounded-sm overflow-hidden">
                <Image
                  src={
                    aboutSection?.leftImage?.sourceUrl ||
                    "https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/Mortgage-Broker-Surrey.webp"
                  }
                  alt={aboutSection?.leftImage?.altText || "Asim Ali and Team"}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="relative h-80 w-full rounded-sm overflow-hidden">
                <Image
                  src={
                    aboutSection?.rightImage?.sourceUrl ||
                    "https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/Best-Mortgage-Broker-in-surrey.webp"
                  }
                  alt={aboutSection?.rightImage?.altText || "Asim Ali and Team"}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-12">
          <PartnerLogos partnerLogoSection={partnerLogo} />
        </div>
      </div>
    </section>
  );
}