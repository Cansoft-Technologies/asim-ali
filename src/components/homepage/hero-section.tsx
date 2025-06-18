"use client"
import Image from "next/image"
import TestimonialSlider from "./testimonial-slider"
import Link from "next/link"
import { Button } from "components/ui/button"
import Header from "./header"

export default function HeroSection({
  menuItems,
  settings,
  heroSection
}: {
  menuItems: any[]
  settings: any
  heroSection?: any
}) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image
          src={heroSection?.bannerImage?.sourceUrl || "https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/hero-bg.webp?height=1080&width=1920"}
          alt={heroSection?.bannerImage?.altText || "Mortgage Background"}
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#12143A] opacity-80" aria-hidden="true" />
      </div>

      <Header settings={settings} menuData={menuItems} />
        <div className="w-full text-center md:px-4 px-0 relative z-10 justify-center">
          <p className="text-xs bg-white md:text-sm py-1 text-[#12143A]">Lowest Mortgage Rate in Canada. <span className="text-[#F0B254]">Starting from {heroSection?.mortgageRatesLabel || 3.99}%</span></p>
        </div>

      {/* Notification Strip */}
      <div className="w-full text-center px-4 sm:px-6 relative z-10 flex justify-center">
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 flex flex-col justify-around items-center text-center min-h-[80vh] relative z-10">
        <div className="mt-12 sm:mt-16">
          <h1 className="lg:text-5xl xl:text-6xl font-oswald font-bold mb-4 sm:mb-6 leading-tight text-white">
            Mortgage Broker in <span className="text-[#F0B254]">Surrey</span> For
            <br className="hidden sm:block" />
            Expert Home Loan Solutions
          </h1>

          <p className="text-base md:text-xl mb-8 sm:mb-10 max-w-2xl text-white/80" dangerouslySetInnerHTML={{ __html: heroSection?.description || `Looking for a reliable mortgage broker in Surrey? Asim Ali offers mortgage solutions, competitive rates, and expert guidance. Book us to experience the best services.` }}></p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/apply-now">
              <Button className="bg-[#F0B254] hover:bg-[#e3a94d] text-white font-medium px-6 py-3 rounded-none w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button className="border border-white text-white hover:border-[#F0B254] px-6 py-3 text-base rounded-none bg-transparent w-full sm:w-auto">
                Get Consultation
              </Button>
            </Link>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 relative w-screen">
          <TestimonialSlider />
        </div>
      </div>
    </section>
  )
}
