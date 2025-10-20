"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
const TestimonialSlider = dynamic(() => import("./testimonial-slider"));
import Link from "next/link";
import { Button } from "components/ui/button";
import Header from "./header";
import { memo } from "react";

interface HeroSectionProps {
  menuItems: any[];
  settings: any;
  heroSection?: {
    bannerImage?: { sourceUrl?: string; altText?: string };
    mortgageRatesLabel?: string;
    description?: string;
  };
}

const HeroSection = ({
  menuItems,
  settings,
  heroSection,
}: HeroSectionProps) => {
  const backgroundImage =
    heroSection?.bannerImage?.sourceUrl ||
    "https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/hero-bg.webp?height=1080&width=1920";

  const altText = heroSection?.bannerImage?.altText || "Mortgage Background";
  const rate = heroSection?.mortgageRatesLabel || "4.70";
  const description =
    heroSection?.description ||
    `Looking for a reliable mortgage broker in Surrey? Asim Ali offers mortgage solutions, competitive rates, and expert guidance. Book us to experience the best services.`;

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt={altText}
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-[#12143A] opacity-80"
          aria-hidden="true"
        />
      </div>

      <Header settings={settings} menuData={menuItems} />

      {/* Mortgage Rate Strip */}
      <div className="text-center z-10 relative">
        <p className="text-sm md:text-sm py-1 bg-white text-[#12143A]">
          Expert Mortgage Advice, Every Step.
          <span className="text-[#F0B254]"> Starting from {rate}%</span>
        </p>
      </div>

      {/* Hero Content */}
      <div className="min-h-[80vh] z-10 relative flex flex-col justify-center items-center">
        <div className="mt-12 sm:mt-16 container mx-auto px-4 sm:px-6 flex flex-col justify-center items-center text-center">
          <h1 className="text-white font-oswald font-bold leading-tight mb-4 sm:mb-6 text-4xl lg:text-5xl xl:text-6xl">
            Mortgage Broker in <span className="text-[#F0B254]">Surrey</span>{" "}
            For
            <br className="hidden sm:inline" />
            For Home Loans
          </h1>

          <p
            className="text-base md:text-xl mb-8 sm:mb-10 max-w-2xl text-white/80 text-center"
            dangerouslySetInnerHTML={{
              __html: description
                ? description
                : `Looking for a reliable mortgage broker in Surrey? Asim Ali offers mortgage solutions, competitive rates, and expert guidance. Book us to experience the best services.`,
            }}
          ></p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/apply-now" passHref>
              <Button className="bg-[#F0B254] hover:bg-[#e3a94d] text-white font-medium px-6 py-3 rounded-none w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact-us" passHref>
              <Button className="border border-white text-white hover:border-[#F0B254] px-6 py-3 text-base rounded-none bg-transparent w-full sm:w-auto">
                Get Consultation
              </Button>
            </Link>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 w-full">
          <TestimonialSlider />
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
