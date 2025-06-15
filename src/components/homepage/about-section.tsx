import { useState } from "react";
import Image from "next/image";
import PartnerLogos from "./partner-logos";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");
  const leftContent = `<span style="font-weight: 400;">If you are wondering who we are, then get your answers here:</span>

  <br/>
&nbsp;
<ul>
 	<li style="font-weight: 400; margin-top: 10px;" aria-level="1"><b>Your trusted mortgage broker:</b><span style="font-weight: 400;"> We are a team of mortgage experts led by Asim Ali, one of Canada's top brokers. We help people get the right mortgage for their homes.</span></li>
 	<li style="font-weight: 400; margin-top: 10px;" aria-level="1"><b>Award-winning expertise: </b><span style="font-weight: 400;">Asim Ali won the </span><b>Best Newcomer Broker of the Year</b><span style="font-weight: 400;"> award in 2017. And our team has been nominated as one of the </span><b>Top 75 Mortgage Brokers</b><span style="font-weight: 400;"> in the country every year since 2019.</span></li>
 	<li style="font-weight: 400; margin-top: 10px;" aria-level="1"><b>End-to-end support: </b><span style="font-weight: 400;">We'll be there from your first consultation to closing the deal. Our team will answer all of your questions and help you get the deal that you wanted.</span></li>
 	<li style="font-weight: 400; margin-top: 10px;" aria-level="1"><b>Relationship builders:</b> All of our clients have been working with us for many years. Our main goal is to give you the solution you need and gain your trust for the long term.</li>
</ul>`
  const rightContent = `<span style="font-weight: 400;">We are one of the best mortgage brokers in Surrey, BC. Here's what sets us apart:</span>
  <br />
  &nbsp;
<ul>
 	<li style="font-weight: 400; margin-top: 10px;" aria-level="1"><b>Access to over 300 lenders:</b><span style="font-weight: 400;"> Our team has access to </span><b>over 300 lenders</b><span style="font-weight: 400;">, so we can offer you more options.</span></li>
 	<li style="font-weight: 400; margin-top: 10px;" aria-level="1"><b>Fast approval with a smooth process:</b><span style="font-weight: 400;"> We will help you with your application process. Our team will make sure that you get approved fast.</span></li>
 	<li style="font-weight: 400; margin-top: 10px;" aria-level="1"><b>Down payment assistance: </b><span style="font-weight: 400;">We are here to help you with your down payment. You will have lucrative borrowing options from us that can fulfill your dream of owning a house.</span></li>
 	<li style="font-weight: 400; margin-top: 10px;" aria-level="1"><b>Expertise with challenging and unique cases: </b><span>You can trust us with any cases. We have the experience to handle any challenging situation and give you the best results.</span></li>
</ul>`

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 font-oswald">
              Asim Ali, Your <span className="text-[#F0B254] font-normal">Mortgage</span> <br />
              <span className="text-[#F0B254] font-normal">Broker</span> in Surrey
            </h2>
          </div>
          
          <div className="max-w-xl">
            <p className="text-gray-700">
              If you&apos;re looking to buy a home or refinance your current mortgage, you&apos;re in the right place. Asim Ali is your go-to mortgage broker in Surrey to guide you through the mortgage journey.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <h3
            onClick={() => setActiveTab("left")}
            className={`text-xl font-medium pb-2 px-4 font-oswald ${
              activeTab === "left"
                ? "border-b-2 border-[#F0B254] text-[#F0B254]"
                : "text-gray-500"
            }`}
          >
            Who We Are
          </h3>
          <h3
            onClick={() => setActiveTab("right")}
            className={`text-xl font-medium pb-2 px-4 font-oswald ${
              activeTab === "right"
                ? "border-b-2 border-[#F0B254] text-[#F0B254]"
                : "text-gray-500"
            }`}
          >
            What Sets Us Apart
          </h3>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Text Content */}
          <div className={activeTab === "left" ? "order-1" : "order-2"}>
            {activeTab === "left" ? (
              <div className="space-y-4 text-gray-700">
                <div className="space-y-4" dangerouslySetInnerHTML={{ __html: leftContent }}></div>
            </div>
            ) : (
              <div className="space-y-4 text-gray-700">
                <div className="space-y-4" dangerouslySetInnerHTML={{ __html: rightContent }}></div>
            </div>
            )}
          </div>

          {/* Image Content */}
          <div className={activeTab === "left" ? "order-2" : "order-1"}>
            {activeTab === "left" ? (
              <div className="relative h-80 w-full rounded-sm overflow-hidden">
              <Image
                src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/Mortgage-Broker-Surrey.webp"
                alt="Asim Ali and Team"
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>)
            : (<div className="relative h-80 w-full rounded-sm overflow-hidden">
              <Image
                src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/Best-Mortgage-Broker-in-surrey.webp"
                alt="Asim Ali and Team"
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>)}
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-12">
          <PartnerLogos />
        </div>
      </div>
    </section>
  );
}