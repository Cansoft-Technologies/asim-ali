"use client"

import { Card } from "components/ui/card"
import { ChevronRight, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function BCLocationsMockMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const locations = [
    { name: "Abbotsford", top: 75, left: 25, url: "/mortgage-broker-in-abbotsford" },
    { name: "Aberdeen", top: 40, left: 30, url: "/mortgage-broker-in-aberdeen" },
    { name: "Aldergrove East", top: 78, left: 28, url: "/aldergrove-east-mortgage-broker" },
    { name: "Burnaby", top: 65, left: 20, url: "/mortgage-broker-in-burnaby" },
    { name: "Campbell River", top: 30, left: 15, url: "/mortgage-broker-in-campbell-river" },
    { name: "Chilliwack", top: 72, left: 35, url: "/trusted-mortgage-broker-in-chilliwack" },
    { name: "Coquitlam", top: 62, left: 22, url: "/mortgage-broker-in-coquitlam" },
    { name: "Delta", top: 70, left: 18, url: "/mortgage-brokers-in-delta" },
    { name: "Hope", top: 68, left: 45, url: "/hope-mortgage-broker" },
    { name: "Kamloops", top: 45, left: 50, url: "/mortgage-brokers-in-kamloops" },
    { name: "Kelowna", top: 55, left: 60, url: "/mortgage-brokers-in-kelowna" },
    { name: "Langley", top: 75, left: 22, url: "/langley-mortgage-broker" },
    { name: "Nanaimo", top: 45, left: 10, url: "/mortgage-broker-in-nanaimo" },
    { name: "Prince George", top: 15, left: 55, url: "/mortgage-brokers-in-prince-george" }, // Closest match
    { name: "Vancouver", top: 65, left: 15, url: "/mortgage-broker-in-vancouver" },
    { name: "White Rock", top: 80, left: 20, url: "/mortgage-broker-in-white-rock" },
  ]

  const handleLocationClick = (locationName: string) => {
    setSelectedLocation(locationName === selectedLocation ? null : locationName)
  }

  // Sort locations to ensure selected location renders last
  const sortedLocations = [...locations].sort((a, b) => {
    if (a.name === selectedLocation) return 1
    if (b.name === selectedLocation) return -1
    return 0
  })

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0 overflow-hidden h-full">
        <Image
          src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/bc-map-image.png?height=1080&width=1920"
          alt="British Columbia landscape"
          fill
          priority
          className="object-cover object-center backdrop-blur-sm"
          // style={{ filter: "brightness(0.3)" }}
        />
      </div> */}
      {/* Mock Map Container */}
      <div className="bg-white shadow-lg overflow-hidden mb-6 flex-1 relative">
          <div className="w-full h-[400px] md:h-[500px] relative">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[#e8ecef] overflow-hidden">
              <Image
                src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/bc-map-image-street.png?height=800&width=1200"
                alt="Map background"
                fill
                className="object-cover"
                style={{ filter: "grayscale(30%)" }}
              />
            </div>

            {/* Location Markers */}
            {sortedLocations.map((location) => (
              <button
                key={location.name}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-200 focus:outline-none`}
                style={{ top: `${location.top}%`, left: `${location.left}%` }}
                onClick={() => handleLocationClick(location.name)}
              >
                <div
                  className={`location-marker flex items-center justify-between gap-2 px-3 py-1 rounded-md text-sm font-medium shadow-md transition-all duration-200 ${
                    selectedLocation === location.name
                      ? "bg-[#F0b245] text-black scale-110 shadow-lg"
                      : "bg-[#12143A] text-white"
                  }`}
                >
                  <MapPin className="h-3 w-3 text-white" />
                  <span className="">{location.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      <div className="relative z-10 flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-[#12143A] mb-6">Our Locations</h1>
        <p className="text-sm md:text-md text-[#12143A] mb-6">Asim Ali offers expert mortgage brokerage services across BC and Alberta. With a deep understanding of each community, we serve everyone based on their needs. Whether buying your first home, refinancing, or investing in property, our team makes the mortgage process smooth and stress-free.</p>
        
        

        {/* Locations List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((location) => (
            <Link
              href={location.url}
              key={location.name}
              onClick={(e) => {
                // Optional: Add smooth scroll or other click handlers
                handleLocationClick(location.name)
              }}
              style={{ textDecoration: "none" }}
            >
              <Card
                className={`flex items-center justify-between p-4 hover:bg-[#F0b245] hover:text-[#12143A] transition-colors ${
                  selectedLocation === location.name ? "bg-[#F0b245] text-[#12143A] border-[#12143A]" : "bg-[#12143A] text-[#F0b245]"
                }`}
              >
                <div className="flex items-center">
                  <div className="ml-2">
                    <span className="font-medium">{location.name}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}