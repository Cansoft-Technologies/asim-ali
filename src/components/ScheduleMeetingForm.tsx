"use client"

import type React from "react"

import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Textarea } from "components/ui/textarea"
import { Facebook, Instagram, Linkedin, Music } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import ScheduleApplyForm from "./ScheduleApplyForm"

export default function ScheduleMeetingForm({heroSection}: {heroSection?:any}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    province: "Alberta",
    city: "",
    reference: "",
    homeowner: "",
    hasMortgage: "",
    propertyValue: "",
    mortgageBalance: "",
    loanAmount: "",
    contactMethod: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center bg-[#f8f5f0]">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image src={heroSection?.bannerImage?.sourceUrl || "https://asimaliprod.wpengine.com/wp-content/uploads/2024/09/Mortgage-Broker-In-Abbotsford-scaled.webp"} alt={heroSection?.bannerImage?.altText || "banner image"} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-[#0a1e3b] opacity-80"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center items-start"> 
                      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-oswald">
                        Schedule Your Meeting with
                        <br />
                        Our Specialist Mortgage
                        <br />
                        Advisor
                      </h2>
          
                      <p className="text-gray-200 mb-8 mt-3" dangerouslySetInnerHTML={{__html: heroSection?.description || `Are you ready to make your dream of owning a home in Surrey come true? Then Asim Ali is your reliable
                        partner in your mortgage journey. Reach out today to set up your meeting with our mortgage consultant to
                        ask any questions you may have.`}}>
                      </p>
          
                      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-3">
            <Link href="/apply-now">
              <Button
              variant="outline"
                className="border border-[#F0B254] border-1 text-white hover:border-[#F0B254] px-10 py-3 text-base rounded-none bg-transparent"
              >
                Get Consultation
              </Button>
            </Link>
          </div>
                    </div>

          {/* Right side - Form */}
          <ScheduleApplyForm/>
        </div>
      </div>
    </section>
  )
}
