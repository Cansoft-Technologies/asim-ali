"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "components/ui/button"
import dynamic from "next/dynamic"
const TestimonialSlider = dynamic(() => import("./testimonial-slider"), {
  ssr: false,
  loading: () => <div>Loading testimonials...</div>,
})
import Header from "./header"

export default function HeroSection({ menuItems, settings }: { menuItems: any[], settings: any }) {
  return (
    <section className="relative w-full bg-black text-white">
      {/* Static background image with better layout control */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image
          src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/c151ca5610382ee34521b0a0e95cca2a-scaled-1.webp"
          alt="Mortgage Background"
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#12143AB2]" aria-hidden="true" />
      </div>

      <Header settings={settings} menuData={menuItems} />

      {/* Hero content */}
      <div className="container mx-auto px-6 md:px-12 min-h-[80vh] flex flex-col justify-center items-center text-center relative z-10">
        <p className="text-sm bg-white md:text-md xl:text-xl py-2 text-[#12143AB2] mb-4">
          Lowest Mortgage Rate in Canada. <span className="text-[#F0B254]">Starting from 2.99%</span>
        </p>

        <h1 className="text-4xl font-oswald md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
          Mortgage Broker in <span className="text-[#F0B254]">Surrey</span> For
          <br />
          Expert Home Loan Solutions
        </h1>

        <p className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl">
          Looking for a <span className="font-medium">reliable</span> mortgage broker in Surrey? Asim Ali offers
          mortgage solutions, competitive rates, and expert guidance. Book us to experience the best services.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/apply-now">
            <Button variant="outline" className="bg-[#F0B254] hover:bg-[#12143AB2]/90 text-white font-medium px-10 py-3 rounded-none">
              Apply Now
            </Button>
          </Link>
          <Link href="/contact-us">
            <Button
              variant="outline"
              className="border border-white text-white hover:border-[#F0B254] px-10 py-3 text-base rounded-none bg-transparent"
            >
              Get Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* Below-the-fold content */}
      <div className="relative mt-16">
        <TestimonialSlider />
      </div>
    </section>
  )
}
