"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Input } from "components/ui/input";
import { Textarea } from "components/ui/textarea";
import { Button } from "components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Facebook, Instagram, Linkedin, Music } from "lucide-react";

export default function ScheduleMeeting({
  scheduleSection,
}: {
  scheduleSection?: any;
}) {
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <section className="relative w-full min-h-screen flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/Mortgage-Broker-Surrey.webp"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
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

            <p
              className="text-gray-300 mb-8 mt-3"
              dangerouslySetInnerHTML={{
                __html:
                  scheduleSection?.description ||
                  `Are you ready to make your dream of owning a home in Surrey come true? Then Asim Ali is your reliable
                        partner in your mortgage journey. Reach out today to set up your meeting with our mortgage consultant to
                        ask any questions you may have.`,
              }}
            ></p>

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
                  className="text-white"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-md text-white">+1 (604) 591-3590</span>
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
                  className="text-white"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span className="text-sm text-white">clientcare@asmail.ca</span>
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
                  className="text-white"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm text-white">
                  7327 137 St Suite #311, Surrey, BC V3W 1A4, Canada
                </span>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <a href="#" className="text-[#F0B254] hover:opacity-80">
                <Facebook size={24} className="text-[#F0B254]" />
              </a>
              <a href="#" className="text-[#F0B254] hover:opacity-80">
                <Instagram size={24} className="text-[#F0B254]" />
              </a>
              <a href="#" className="text-[#F0B254] hover:opacity-80">
                <Linkedin size={24} className="text-[#F0B254]" />
              </a>
              <a href="#" className="text-[#F0B254] hover:opacity-80">
                <Music size={24} className="text-[#F0B254]" />
              </a>
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <div className="bg-white p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter Your Name..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="+1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
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
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Province
                    </label>
                    <Select
                      defaultValue="Alberta"
                      onValueChange={(value) =>
                        handleSelectChange("province", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Alberta" />
                      </SelectTrigger>
                      <SelectContent>
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
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter Your City..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reference"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Reference
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("reference", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="homeowner"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Homeowner
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("homeowner", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="hasMortgage"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Do you have Mortgage?
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("hasMortgage", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="propertyValue"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Property Value ($)
                    </label>
                    <Input
                      id="propertyValue"
                      name="propertyValue"
                      value={formData.propertyValue}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter Amount..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mortgageBalance"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Mortgage Balance ($)
                    </label>
                    <Input
                      id="mortgageBalance"
                      name="mortgageBalance"
                      value={formData.mortgageBalance}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter Amount..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="loanAmount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Requested Loan Amount ($)
                    </label>
                    <Input
                      id="loanAmount"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter Amount..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactMethod"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Contact Method
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("contactMethod", value)
                      }
                    >
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
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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

                <Button
                  type="submit"
                  className="w-full bg-[#0a1e3b] hover:bg-[#0a1e3b]/90 text-white py-6 text-lg"
                >
                  Apply Now
                </Button>

                <p className="text-sm text-center text-gray-500 mt-2">
                  *After submit this form, we will contact within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
