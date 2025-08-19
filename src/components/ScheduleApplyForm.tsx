"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Textarea } from "components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Facebook, Instagram, Linkedin, Music } from "lucide-react";
import { toast } from "sonner";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 5;
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  province?: string;
  contactMethod?: string;
  contactAbout?: string;
  subject?: string;
  message?: string;
}

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

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Validation function for individual fields
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (!validateName(value)) return "Name must be at least 2 characters";
        return undefined;

      case "email":
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        return undefined;

      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!validatePhone(value)) return "Please enter a valid phone number";
        return undefined;

      case "province":
        if (!value) return "Please select a province";
        return undefined;

      case "contactMethod":
        if (!value) return "Please select a contact method";
        return undefined;

      case "contactAbout":
        if (!value) return "Please select what you want to be contacted about";
        return undefined;

      case "subject":
        if (!value) return "Please select a subject";
        return undefined;

      case "message":
        if (value.trim().length > 0 && value.trim().length < 10) {
          return "Message must be at least 10 characters if provided";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof ValidationErrors] = error;
      }
    });

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setTouched((prev) => ({ ...prev, [name]: true }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toast.error("Please fix the errors in the form before submitting");
      return;
    }

    setIsSubmitting(true);

    toast.loading("Sending your message...");

    const [fname, ...lnameParts] = formData.name.split(" ");
    const lname = lnameParts.join(" ") || "";

    const bodyData = JSON.stringify({
      fromEmail: "noreply-asimali@csoft.ca",
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
    postBodyData.set("email_subject", `${formData.subject} - ${formData.name}`);
    postBodyData.set("name", formData.name);
    postBodyData.set("email", formData.email);
    postBodyData.set("phone", formData.phone);
    postBodyData.set("province", formData.province);
    postBodyData.set("contact", formData.contactMethod);
    postBodyData.set("about", formData.contactAbout);
    postBodyData.set("message", formData.message);

    try {
      // First API call
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });

      // Second API call to WordPress
      await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/api/v1/contact-form/`,
        {
          method: "POST",
          body: postBodyData,
        }
      );

      // Show success toast
      toast.success("Message Sent! We'll contact you within 24 hours");

      // Reset form and validation state
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
      setErrors({});
      setTouched({});
    } catch (error) {
      // Show error toast
      toast.error("Failed to send message. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
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
  ];
  return (
    <div>
      <div className="bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name *
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full ${
                  errors.name ? "border-red-500 focus:border-red-500" : ""
                }`}
                placeholder="Enter Your Name..."
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone *
              </label>
              <Input
                id="phone"
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full ${
                  errors.phone ? "border-red-500 focus:border-red-500" : ""
                }`}
                placeholder="+1 (555) 123-4567"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
                placeholder="Enter Your Email..."
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Province *
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("province", value)}
                value={formData.province}
              >
                <SelectTrigger
                  className={`w-full ${
                    errors.province ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="alberta">Alberta</SelectItem>
                  <SelectItem value="bc">British Columbia</SelectItem>
                  <SelectItem value="ontario">Ontario</SelectItem>
                  <SelectItem value="quebec">Quebec</SelectItem>
                  <SelectItem value="manitoba">Manitoba</SelectItem>
                </SelectContent>
              </Select>
              {errors.province && (
                <p className="text-red-500 text-sm mt-1">{errors.province}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="contactMethod"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                How Should We Contact You? *
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("contactMethod", value)
                }
                value={formData.contactMethod}
              >
                <SelectTrigger
                  className={`w-full ${
                    errors.contactMethod ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="text">Text Message</SelectItem>
                </SelectContent>
              </Select>
              {errors.contactMethod && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactMethod}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactAbout"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Please Contact Me About *
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("contactAbout", value)
                }
                value={formData.contactAbout}
              >
                <SelectTrigger
                  className={`w-full ${
                    errors.contactAbout ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="new-mortgage">New Mortgage</SelectItem>
                  <SelectItem value="refinance">Refinance</SelectItem>
                  <SelectItem value="renewal">Mortgage Renewal</SelectItem>
                  <SelectItem value="consultation">
                    General Consultation
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.contactAbout && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactAbout}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject *
            </label>
            <Select
              onValueChange={(value) => handleSelectChange("subject", value)}
              value={formData.subject}
            >
              <SelectTrigger
                className={`w-full ${errors.subject ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="purchase">Home Purchase</SelectItem>
                <SelectItem value="refinance">Refinancing</SelectItem>
                <SelectItem value="renewal">Mortgage Renewal</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
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
              onBlur={handleBlur}
              className={`w-full min-h-[100px] ${
                errors.message ? "border-red-500 focus:border-red-500" : ""
              }`}
              placeholder="Type your Message..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0a1e3b] hover:bg-[#0a1e3b]/90 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>

          <p className="text-sm text-center text-gray-500 mt-2">
            *After submit this form, we will contact within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
