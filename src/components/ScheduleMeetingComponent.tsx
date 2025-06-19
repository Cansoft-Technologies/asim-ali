"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Input } from "components/ui/input"
import { Textarea } from "components/ui/textarea"
import { Button } from "components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Facebook, Instagram, Linkedin, Music } from "lucide-react"
import TestimonialSliderRow from "./TestimonialSliderRow"
import ScheduleApplyForm from "./ScheduleApplyForm"

export default function ScheduleMeetingComponent({ heroSection }: { heroSection?: any }) {
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
        <Image src={`${heroSection?.bannerImage?.sourceUrl || 'https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/Mortgage-Broker-Surrey.webp'}`} alt={heroSection?.bannerImage?.altText || "bannerImage"} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-[#0a1e3b] opacity-80"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center items-start"> 
                      <h2 className="!text-2xl md:!text-5xl !font-semibold mb-6 text-white font-oswald">
                      Start Your Application 
                        <br />
                        and Get Approved Quickly!
                        <br />
                      </h2>

                      <p className="text-gray-200 mb-8 mt-3" dangerouslySetInnerHTML={{ __html: heroSection?.description || `Are you a resident of British Columbia looking for a loan? Our hassle-free and obligation-free application process takes less than a minute to complete. Rest assured, we provide full transparency on the terms and conditions, sharing the rate you qualify for. Moreover, we offer a 24/7 application review process to ensure a quick response. Apply now!` }}>
                      </p>
          
                      <div className="space-y-4 mb-8 mt-3">
                        <a href="tel:+1 (604) 591-3950" className="!no-underline text-white !hover:text-[#F0B254]">
                          <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          <span className="text-sm text-white">+1 (604) 591-3950</span>
                        </div>
                        </a>
          
                        <a href="mailto:clientcare@asmail.ca" className="!no-underline text-white !hover:text-[#F0B254]">
                          <div className="flex items-center gap-2 mt-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </svg>
                          <span className="text-sm text-white">clientcare@asmail.ca</span>
                        </div>
                        </a>
          
                        <a href="https://maps.app.goo.gl/cG5KTbHiutikqXjeA" className="!no-underline text-white !hover:text-[#F0B254]">
                          <div className="flex items-center gap-2 mt-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span className="text-sm text-white">7327 137 St Suite #311, Surrey, BC V3W 1A4, Canada</span>
                        </div>
                        </a>
                      </div>
          
                      <div className="flex gap-4 mb-8">
                        <a href="#" className="text-white hover:opacity-80">
                          <Facebook size={24} className="text-white"/>
                        </a>
                        <a href="#" className="text-white hover:opacity-80">
                          <Instagram size={24} className="text-white"/>
                        </a>
                        <a href="#" className="text-white hover:opacity-80">
                          <Linkedin size={24} className="text-white"/>
                        </a>
                        <a href="#" className="text-white hover:opacity-80">
                          <Music size={24} className="text-white"/>
                        </a>
                      </div>
                    </div>

          {/* Right side - Form */}
          <ScheduleApplyForm/>
        </div>
      </div>
      <div className="relative bg-[#f8f5f0] w-full">
      <TestimonialSliderRow />
      </div>
    </section>
  )
}
