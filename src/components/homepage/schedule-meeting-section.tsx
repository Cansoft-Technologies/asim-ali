"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Textarea } from "components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Facebook, Instagram, Linkedin, Music } from "lucide-react"

export default function ScheduleMeetingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    contactMethod: "",
    contactAbout: "",
    subject: "",
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

  const locations = [
    "Abbotsford",
    "Aberdeen",
    "Coquitlam",
    "Vancouver",
    "Maple Ridge",
    "Kamloops",
    "Delta",
    "Langley",
    "Kelowna",
    "Prince George",
  ]

  return (
    <section className="w-full bg-[#f8f5f0] py-16 md:py-24 relative">
      {/* Vertical divider line */}
      {/* <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-200 hidden md:block"></div> */}

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center items-start"> 
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black font-oswald">
              Schedule Your Meeting with
              <br />
              Our Specialist Mortgage
              <br />
              Advisor
            </h2>

            <p className="text-gray-600 mb-8 mt-3">
              Are you ready to make your dream of owning a home in Surrey come true? Then Asim Ali is your reliable
              partner in your mortgage journey. Reach out today to set up your meeting with our mortgage consultant to
              ask any questions you may have.
            </p>

            <div className="space-y-4 mb-8 mt-3">
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
                  className="text-[#0a1e3b]"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-sm">+1 (604) 513-2190</span>
              </div>

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
                  className="text-[#0a1e3b]"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span className="text-sm">info@asimali.ca</span>
              </div>

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
                  className="text-[#0a1e3b]"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm">7327 137 St Suite #311, Surrey, BC V3W 1A4, Canada</span>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <a href="#" className="text-[#F0B254] hover:opacity-80">
                <Facebook size={24} className="text-[#F0B254]"/>
              </a>
              <a href="#" className="text-[#F0B254] hover:opacity-80">
                <Instagram size={24} className="text-[#F0B254]"/>
              </a>
              <a href="#" className="text-[#F0B254] hover:opacity-80">
                <Linkedin size={24} className="text-[#F0B254]"/>
              </a>
              <a href="#" className="text-[#F0B254] hover:opacity-80">
                <Music size={24} className="text-[#F0B254]"/>
              </a>
            </div>
          </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center items-start border-1 border-black mt-12"> 
          <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.999123195198!2d-122.8460286843705!3d49.13409867924468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d6a7b8c8e9b7%3A0x7a5c6e9b8c8e9b7!2s7327%20137%20St%20%23311%2C%20Surrey%2C%20BC%20V3W%201A4%2C%20Canada!5e0!3m2!1sen!2sus!4v1691234567890"
                title="Asim Ali"
                width="100%"
                height="450"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
            ></iframe>
            </div>
          <div className="flex flex-col justify-center items-start mt-12">
          <div className="mt-12">
              <h3 className="text-2xl md:text-5xl font-bold mb-4 font-oswald">Visit our Head office in Surrey</h3>
              <p className="text-gray-600 mb-6">
                Connect with the best mortgage broker in Surrey. Get expert advice, competitive rates, and customized
                solutions. Contact us now.
              </p>

              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Button key={location} variant="outline" className="border-gray-300 hover:bg-[#0a1e3b] hover:text-white text-[#0a1e3b] py-2 px-4 rounded-none">
                    {location}
                  </Button>
                ))}
              </div>
            </div>
            </div>
          </div>
      </div>
    </section>
  )
}
