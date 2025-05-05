"use client"

import { Card } from "components/ui/card"
import { ChevronRight, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button, Container } from "react-bootstrap"
import ContactSection from "./ContactSection"

type MyProps = {
  locationHead: string
  locationDescription: string
  contactTitle: string
  contactDescription: string
}

export default function BCLocationsMockMap(props: MyProps) {
  const { locationHead, locationDescription, contactTitle, contactDescription } = props
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
    { name: "Prince George", top: 15, left: 55, url: "/mortgage-brokers-in-prince-george" },
    {
      name: "Vancouver",
      top: 65,
      left: 15,
      url: "/mortgage-broker-in-vancouver",
      sublocations: [
        { name: "Fairview", url: "/mortgage-broker-in-fairview" },
        { name: "Gastown", url: "/mortgage-broker-in-gastown" },
        { name: "Kerrisdale", url: "/mortgage-broker-in-kerrisdale" },
        { name: "Kitsilano", url: "/mortgage-broker-in-kitsilano" },
        { name: "Mount Pleasant", url: "/mortgage-broker-in-mount-pleasant" },
        { name: "Oakridge", url: "/mortgage-broker-in-oakridge" },
        { name: "Shaughnessy", url: "/mortgage-broker-in-shaughnessy" },
        { name: "Yaletown", url: "/mortgage-broker-in-yaletown" },
      ],
    },
    { name: "White Rock", top: 80, left: 20, url: "/mortgage-broker-in-white-rock" },
    {
      name: "Surrey",
      top: 78,
      left: 25,
      url: "/",
      sublocations: [
        { name: "Cloverdale", url: "/mortgage-broker-in-cloverdale" },
        { name: "Guildford", url: "/mortgage-broker-in-guildford" },
        { name: "Port Kells", url: "/mortgage-broker-in-port-kells" },
        { name: "Whalley", url: "/mortgage-broker-in-whalley" },
      ],
    },
  ]

  const handleLocationClick = (locationName: string) => {
    setSelectedLocation(locationName === selectedLocation ? null : locationName)
  }

  // Sort to render selected last
  const sortedLocations = [...locations].sort((a, b) => {
    if (a.name === selectedLocation) return 1
    if (b.name === selectedLocation) return -1
    return 0
  })

  // Find currently selected location
  const current = locations.find((loc) => loc.name === selectedLocation)

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="bg-white shadow-lg overflow-hidden mb-6 flex-1 relative">
        <div className="w-full h-[400px] md:h-[500px] relative">
          <div className="absolute inset-0 bg-[#e8ecef] overflow-hidden">
            <Image
              src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/05/bc-map-image-2.png?height=800&width=1200"
              alt="Map background"
              fill
              className="object-cover"
              style={{ filter: "grayscale(30%)" }}
            />
          </div>

          {sortedLocations.map((location) => (
            <button
              key={location.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-200 focus:outline-none"
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
                <span>{location.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#12143A] mb-6">{locationHead}</h1>
        <div
            dangerouslySetInnerHTML={{
              __html: locationDescription,
            }}
            className="text-lg text-center"
          ></div>
        <h2 className="text-3xl md:text-5xl text-center font-bold text-[#12143A] my-5">Location We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((location) => (
            location.name !== "Surrey" ? (
              
              <Card
              key={location.name}
              onClick={() => handleLocationClick(location.name)}
                className={`flex items-center justify-between p-4 hover:bg-[#F0b245] hover:text-[#12143A] transition-colors ${
                  selectedLocation === location.name ? "bg-[#F0b245] text-[#12143A] border-[#12143A]" : "bg-[#12143A] text-[#F0b245]"
                }`}
              >
                <div className="flex items-center">
                  <span className="font-medium">{location.name}</span>
                </div>
                <Link
              href={location.url}
              style={{ textDecoration: "none" }}
            ></Link>
                <ChevronRight className="h-5 w-5" />
              </Card>
          ): (
            <div
              key={location.name}
              onClick={() => handleLocationClick(location.name)}
              style={{ textDecoration: "none" }}
            >
              <Card
                className={`flex items-center justify-between p-4 hover:bg-[#F0b245] hover:text-[#12143A] transition-colors ${
                  selectedLocation === location.name ? "bg-[#F0b245] text-[#12143A] border-[#12143A]" : "bg-[#12143A] text-[#F0b245]"
                }`}
              >
                <div className="flex items-center">
                  <span className="font-medium">{location.name}</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </Card>
            </div>
          )))}

          {/* Sublocations Display */}
          {current?.sublocations && (
            <>
              {current.sublocations.map((sub) => (
                <Link
                  href={sub.url}
                  key={sub.name}
                  onClick={() => handleLocationClick(current.name)}
                  style={{ textDecoration: "none" }}
                >
                  <Card className="flex items-center justify-between p-4 bg-gray-100 text-gray-800 hover:bg-[#F0b245] hover:text-[#12143A] transition-colors">
                    <div className="flex items-center">
                      <span className="font-medium">{sub.name}</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Card>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
      <Container className="my-5">
          <h2 className="text-center service-title">{contactTitle}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: contactDescription,
            }}
            className="text-lg text-center my-2"
          ></div>
          <div className="my-5">
          <ContactSection/>
          </div>
        </Container>
    </div>
  )
}
