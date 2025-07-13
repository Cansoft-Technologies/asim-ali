"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "components/ui/button";
import Header from "./homepage/header";

export default function CurrentRatesHero({
  menuItems,
  settings,
  heroSection,
}: {
  menuItems: any[];
  settings: any;
  heroSection?: any;
}) {
  return (
    <section className="relative w-full md:min-h-[70dvh] min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-between text-white">
      {/* Background image with overlay */}
      <Image
        src={`${
          heroSection?.bannerImage?.sourceUrl ||
          "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/c151ca5610382ee34521b0a0e95cca2a-scaled.jpeg"
        }?height=1080&width=1920`}
        alt="Background"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      {/* Overlay div to handle the blend mode */}
      <div className="absolute inset-0 bg-[#282A55B2]/80" aria-hidden="true" />

      <Header settings={settings} menuData={menuItems} />
      {/* Content section */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
          <h1 className="!text-4xl font-oswald md:!text-5xl lg:!text-6xl xl:!text-7xl font-bold mb-6 leading-tight">
            {heroSection?.title || "Current Mortgage Rates"}
          </h1>

          <p
            className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl"
            dangerouslySetInnerHTML={{
              __html:
                heroSection?.description ||
                "Before investing in a home, it’s important to find out the specifics. Here is an overview of our current mortgage rates that you will receive:",
            }}
          ></p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply-now">
              <Button
                variant="outline"
                className="bg-[#F0B254] hover:bg-[#F0B254]/90 text-black font-medium px-10 py-3 text-white rounded-none"
              >
                Apply Now
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button
                variant="outline"
                className="border border-white border-1 text-white hover:border-[#F0B254] px-10 py-3 text-base rounded-none bg-transparent"
              >
                Get Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
