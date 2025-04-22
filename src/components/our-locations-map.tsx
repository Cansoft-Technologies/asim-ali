"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Card } from "components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import "leaflet/dist/leaflet.css"
import Image from "next/image"

type MyProps = {
  bgImage?: string
}
export default function OurLocationsMap(props: MyProps) {
  const { bgImage } = props
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInitialized, setMapInitialized] = useState(false)

  const locations = useMemo(() => [
    { name: "Abbotsford", lat: 49.0504, lng: -122.3045 },
    { name: "Aberdeen", lat: 49.2452, lng: -122.962 },
    { name: "Aldergrove East", lat: 49.0569, lng: -122.4703 },
    { name: "Burnaby", lat: 49.2488, lng: -122.9805 },
    { name: "Campbell River", lat: 50.0244, lng: -125.2475 },
    { name: "Campbellton", lat: 50.0522, lng: -125.2733 },
    { name: "Chilliwack", lat: 49.1579, lng: -121.9514 },
    { name: "Coquitlam", lat: 49.2838, lng: -122.7932 },
    { name: "Delta", lat: 49.0847, lng: -123.0587 },
    { name: "Hope", lat: 49.3858, lng: -121.4417 },
    { name: "Huntingdon", lat: 49.002, lng: -122.2651 },
    { name: "Kamloops", lat: 50.6745, lng: -120.3273 },
    { name: "Kelowna", lat: 49.888, lng: -119.496 },
    { name: "Langley", lat: 49.1041, lng: -122.6603 },
    { name: "Lochdale", lat: 49.2667, lng: -122.9833 },
    { name: "Maple Ridge", lat: 49.2193, lng: -122.5984 },
    { name: "Marlborough", lat: 49.2488, lng: -122.9805 }, // Using Burnaby coords as approximation
    { name: "Metrotown", lat: 49.2276, lng: -123.0076 },
    { name: "Nanaimo", lat: 49.1659, lng: -123.9401 },
    { name: "Ocean Grove", lat: 49.3199, lng: -123.0724 }, // Approximation
    { name: "Prince George", lat: 53.9171, lng: -122.7497 },
    { name: "Surrey", lat: 49.1913, lng: -122.849 },
    { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
    { name: "Walnut Grove", lat: 49.1631, lng: -122.6457 },
    { name: "White Rock", lat: 49.0254, lng: -122.8029 },
    { name: "Willoughby", lat: 49.1296, lng: -122.6551 },
  ], [])

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInitialized) {
      import("leaflet").then((L) => {

        // Create map if it doesn't exist yet
        const map = L.map(mapRef.current).setView([49.2827, -122.7497], 7)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Store markers in a ref to access them later for highlighting
        const markersRef: { [key: string]: any } = {}

        // Add markers for each location
        locations.forEach((location) => {
          // Create custom icon for the marker label
          const labelIcon = L.divIcon({
            className: "location-label-container",
            html: `<div class="location-label">${location.name}</div>`,
            iconSize: [100, 30],
            iconAnchor: [50, 15],
          })

          const marker = L.marker([location.lat, location.lng], { icon: labelIcon }).addTo(map)

          // Store marker reference by location name
          markersRef[location.name] = marker

          marker.on("click", () => {
            // Reset all markers to default style
            Object.keys(markersRef).forEach((locName) => {
              const markerElement = markersRef[locName].getElement()
              if (markerElement) {
                const labelDiv = markerElement.querySelector(".location-label")
                if (labelDiv) {
                  labelDiv.classList.remove("location-label-selected")
                }
              }
            })

            // Highlight the clicked marker
            const clickedMarkerElement = marker.getElement()
            if (clickedMarkerElement) {
              const labelDiv = clickedMarkerElement.querySelector(".location-label")
              if (labelDiv) {
                labelDiv.classList.add("location-label-selected")
              }
            }

            setSelectedLocation(location.name)
          })
        })

        // Update marker when selectedLocation changes
        const updateSelectedMarker = () => {
          // Reset all markers to default style
          Object.keys(markersRef).forEach((locName) => {
            const markerElement = markersRef[locName].getElement()
            if (markerElement) {
              const labelDiv = markerElement.querySelector(".location-label")
              if (labelDiv) {
                labelDiv.classList.remove("location-label-selected")
              }
            }
          })

          // Highlight the selected marker if any
          if (selectedLocation && markersRef[selectedLocation]) {
            const markerElement = markersRef[selectedLocation].getElement()
            if (markerElement) {
              const labelDiv = markerElement.querySelector(".location-label")
              if (labelDiv) {
                labelDiv.classList.add("location-label-selected")
              }
            }
          }
        }

        // Set up a watcher for selectedLocation changes
        const watchSelectedLocation = () => {
          updateSelectedMarker()
          return map.on("layeradd", updateSelectedMarker)
        }

        const watcher = watchSelectedLocation()

        setMapInitialized(true)

        return () => {
          map.off("layeradd", updateSelectedMarker)
          map.remove()
        }
      })
    } else if (mapInitialized && selectedLocation) {
      // This handles updates to selectedLocation after the map is initialized
      const markerElements = document.querySelectorAll(".location-label")
      markerElements.forEach((el) => {
        if (el.textContent === selectedLocation) {
          el.classList.add("location-label-selected")
        } else {
          el.classList.remove("location-label-selected")
        }
      })
    }
  }, [mapInitialized, locations, selectedLocation])

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={`${bgImage}?height=1080&width=1920`}
          alt="British Columbia landscape"
          fill
          priority
          className="object-cover object-center"
          style={{ filter: "brightness(0.7)" }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-6">British Columbia Locations</h1>

        {/* Map Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 flex-1">
          <div ref={mapRef} className="w-full h-[400px] md:h-[500px]" />
        </div>

        {/* Locations List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((location) => (
            <Link href="#" key={location.name} onClick={() => setSelectedLocation(location.name)}>
              <Card
                className={`flex items-center justify-between p-4 hover:bg-gray-100 transition-colors ${
                  selectedLocation === location.name ? "bg-gray-100 border-[#F0b245]" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="ml-2">
                    <span className="font-medium">{location.name}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
