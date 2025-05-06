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

export default function ScheduleMeetingForm() {
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
        <Image src="https://asimaliprod.wpengine.com/wp-content/uploads/2024/09/Mortgage-Broker-In-Abbotsford-scaled.webp" alt="" fill className="object-cover" priority sizes="100vw" />
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
          
                      <p className="text-gray-200 mb-8 mt-3">
                        Are you ready to make your dream of owning a home in Surrey come true? Then Asim Ali is your reliable
                        partner in your mortgage journey. Reach out today to set up your meeting with our mortgage consultant to
                        ask any questions you may have.
                      </p>
          
                      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-3">
            <Link href="/consultation">
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
          <div>
                      <div className="bg-white p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                              </label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Enter Your Name..."
                                required
                              />
                            </div>
          
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                              </label>
                              <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="+1"
                                required
                              />
                            </div>
                          </div>
          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                              </label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Enter Your Mail..."
                                required
                              />
                            </div>
          
                            <div>
                              <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                                Province
                              </label>
                              <Select onValueChange={(value) => handleSelectChange("province", value)}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Alberta" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="alberta">Alberta</SelectItem>
                                  <SelectItem value="bc">British Columbia</SelectItem>
                                  <SelectItem value="ontario">Ontario</SelectItem>
                                  <SelectItem value="quebec">Quebec</SelectItem>
                                  <SelectItem value="manitoba">Manitoba</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-1">
                                How Should We Contact You?
                              </label>
                              <Select onValueChange={(value) => handleSelectChange("contactMethod", value)}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Please Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="phone">Phone</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="text">Text Message</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
          
                            <div>
                              <label htmlFor="contactAbout" className="block text-sm font-medium text-gray-700 mb-1">
                                Please Contact Me About
                              </label>
                              <Select onValueChange={(value) => handleSelectChange("contactAbout", value)}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Please Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="new-mortgage">New Mortgage</SelectItem>
                                  <SelectItem value="refinance">Refinance</SelectItem>
                                  <SelectItem value="renewal">Mortgage Renewal</SelectItem>
                                  <SelectItem value="consultation">General Consultation</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
          
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                              Subject
                            </label>
                            <Select onValueChange={(value) => handleSelectChange("subject", value)}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Please Select" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="purchase">Home Purchase</SelectItem>
                                <SelectItem value="refinance">Refinancing</SelectItem>
                                <SelectItem value="renewal">Mortgage Renewal</SelectItem>
                                <SelectItem value="consultation">Consultation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                              Message
                            </label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full min-h-[100px]"
                              placeholder="Type your Message..."
                            />
                          </div>
          
                          <Button type="submit" className="w-full bg-[#0a1e3b] hover:bg-[#0a1e3b]/90 text-white py-6">
                            Send
                          </Button>
          
                          <p className="text-xs text-center text-gray-500 mt-2">
                            *After submit this form, we will contact within 24 hours.
                          </p>
                        </form>
                      </div>
                    </div>
        </div>
      </div>
    </section>
  )
}
