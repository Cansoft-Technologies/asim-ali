"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Textarea } from "components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Facebook, Instagram, Linkedin, Music } from "lucide-react"
import { Toast } from "components/ui/toast"

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
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show loading toast
    Toast({
      title: "Wait:Please wait while we process your request",
      duration: 3000,
    });

    // Extract first and last names from full name
    const [fname, ...lnameParts] = formData.name.split(" ");
    const lname = lnameParts.join(" ") || "";

    const bodyData = JSON.stringify({
      fromEmail: "noreply@asimali.ca",
      toEmail: "clientcare@asimali.ca",
      emailSubject: `${formData.subject} - ${formData.name}`,
      fname: fname || "",
      lname: lname || "",
      mail: formData.email || "",
      phone: formData.phone || "",
      province: formData.province || "",
      contact: formData.contactMethod || "",
      about: formData.contactAbout || "",
      message: formData.message || "",
    });

    const postBodyData = new FormData();
    postBodyData.set('email_subject', `${formData.subject} - ${formData.name}`);
    postBodyData.set('name', formData.name);
    postBodyData.set('email', formData.email);
    postBodyData.set('phone', formData.phone);
    postBodyData.set('province', formData.province);
    postBodyData.set('contact', formData.contactMethod);
    postBodyData.set('about', formData.contactAbout);
    postBodyData.set('message', formData.message);

    try {
      // First API call
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: bodyData
      });

      // Second API call to WordPress
      await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/api/v1/contact-form/`,
        {
          method: "POST",
          body: postBodyData
        }
      );

      // Show success toast
      Toast({
        title: "Message Sent!We'll contact you within 24 hours",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        province: "",
        contactMethod: "",
        contactAbout: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      // Show error toast
      Toast({
        title: "Error: Failed to send message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Submission error:", error);
    }
  };

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
            <h2 className="!text-xl md:!text-2xl xl:!text-4xl !font-bold mb-6 text-black font-oswald">
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
                        <a href="tel:+1 (604) 591-3950" className="!no-underline text-black !hover:text-[#F0B254]">
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
                            className="text-black"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          <span className="text-sm text-black">+1 (604) 591-3950</span>
                        </div>
                        </a>
          
                        <a href="mailto:clientcare@asmail.ca" className="!no-underline text-black !hover:text-[#F0B254]">
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
                            className="text-black"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </svg>
                          <span className="text-sm text-black">clientcare@asmail.ca</span>
                        </div>
                        </a>
          
                        <a href="https://maps.app.goo.gl/cG5KTbHiutikqXjeA" className="!no-underline text-black !hover:text-[#F0B254]">
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
                            className="text-black"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span className="text-sm text-black">7327 137 St Suite #311, Surrey, BC V3W 1A4, Canada</span>
                        </div>
                        </a>
                      </div>
            <div className="flex gap-4 mb-8">
              <a href="https://www.facebook.com/profile.php?id=100063649628029" aria-label="Facebook">
                <Facebook size={24} className="text-[#F0B254] hover:opacity-80" />
              </a>
              <a href="https://www.instagram.com/asimfinance/" aria-label="Instagram">
                <Instagram size={24} className="text-[#F0B254] hover:opacity-80" />
              </a>
              <a href="https://www.linkedin.com/in/asim-ali-a75168125/?originalSubdomain=ca" aria-label="LinkedIn">
                <Linkedin size={24} className="text-[#F0B254] hover:opacity-80" />
              </a>
              <a href="https://www.tiktok.com/@asimortgage/" aria-label="Podcast">
                <Music size={24} className="text-[#F0B254] hover:opacity-80" />
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
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5220.829340331075!2d-122.843247!3d49.1357508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d162fec05fd5%3A0x44d696e4c0940576!2sMortgage%20Broker%20Surrey%20-%20Asim%20Ali!5e0!3m2!1sen!2sbd!4v1749630202672!5m2!1sen!2sbd"
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
              <h3 className="!text-xl md:!text-2xl xl:!text-4xl !font-bold mb-4 font-oswald">Visit our Head office in Surrey</h3>
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
