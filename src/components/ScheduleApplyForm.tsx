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

export default function ScheduleApplyForm() {
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
  )
}
