"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "components/ui/button"
import Header from "./homepage/header"


export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between bg-[#0a1e3b] text-white">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://asimaliprod.wpengine.com/wp-content/uploads/2024/09/Expert-Mortgage-Broker-in-Vancouver-scaled.webp?height=1080&width=1920')",
          backgroundBlendMode: "overlay",
        }}
      />
      
        <Header />
      {/* Content section */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
          <h1 className="text-4xl font-oswald md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
          Current Mortgage Rates
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl">
            Looking for a <span className="font-medium">reliable</span> mortgage broker in Surrey? Asim Ali offers
            mortgage solutions, competitive rates, and expert guidance. Book us to experience the best services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about-us">
              <Button className="bg-[#F0B254] hover:bg-[#F0B254]/90 text-black font-medium px-10 py-3 text-base rounded-none">
              Learn More About Our Team
              </Button>
            </Link>
            <Link href="/apply-now">
              <Button
                variant="outline"
                className="border border-[#F0B254] border-1 text-white hover:bg-[#F0B254]/10 px-10 py-3 text-base rounded-none"
              >
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

