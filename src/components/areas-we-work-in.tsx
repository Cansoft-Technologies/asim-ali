"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus } from "lucide-react"
import Link from "next/link"

// Define the data structure for each zone
interface ZoneData {
  name: string
  locations: string[]
}

// Sample data for each zone
const zonesData: Record<string, ZoneData> = {
  "North Zone": {
    name: "North Zone",
    locations: ["Argyle Park/Englewood", "Coronation Park", "Northeast", "Uplands"],
  },
  "East Zone": {
    name: "East Zone",
    locations: ["Arcola East", "Greens on Gardiner", "Wood Meadows", "Creekside"],
  },
  "Central Zone": {
    name: "Central Zone",
    locations: ["Downtown", "Cathedral", "Heritage", "Centre Square"],
  },
  "South Zone": {
    name: "South Zone",
    locations: ["Albert Park", "Harbour Landing", "Lakeview", "Whitmore Park"],
  },
  "West Zone": {
    name: "West Zone",
    locations: ["Normanview", "Westhill", "Rosemont", "Dieppe"],
  },
}

export default function AreasWeWorkIn() {
  const [activeZone, setActiveZone] = useState<string>("North Zone")

  const handleZoneClick = (zone: string) => {
    setActiveZone(zone)
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <p className="text-3xl md:text-5xl font-bold mb-8 font-oswald">Areas we work in</p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 my-10 ">
        {Object.keys(zonesData).map((zone) => (
          <button
            key={zone}
            onClick={() => handleZoneClick(zone)}
            className={`relative py-3 px-6 flex items-center justify-between min-w-[150px] text-left ${
              activeZone === zone ? "bg-[#1a1a3a] text-white" : "bg-white text-black hover:bg-gray-50"
            }`}
          >
            {zone}
            {activeZone === zone ? <Minus className="h-4 w-4 ml-2" /> : <Plus className="h-4 w-4 ml-2" />}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Locations */}
        <div className="w-full md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ul className="space-y-4">
                {zonesData[activeZone].locations.map((location) => (
                  <li key={location} className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    {location}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right side - Image */}
        <div className="w-full md:w-1/2">
          <div className="relative h-[300px] w-full">
            <Image
              src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Rectangle-1206.png"
              alt="Our team members"
              fill
              className="object-cover rounded-sm"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <Link
          href="/apply-now"
          style={{ textDecoration: "none" }}
          className="px-8 py-3 bg-[#f0b95e] text-white font-medium text-center hover:bg-[#e5ae50] transition-colors"
        >
          Apply Now
        </Link>
        <Link
        style={{ textDecoration: "none" }}
          href="#team"
          className="px-8 py-3 border border-gray-300 text-black font-medium text-center hover:bg-gray-50 transition-colors"
        >
          Our Team
        </Link>
      </div>
    </div>
  )
}
