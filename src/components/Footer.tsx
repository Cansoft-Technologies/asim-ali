"use client";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Music } from "lucide-react";
import { useMemo } from "react";

// Define MenuItem interface
interface MenuItem {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
  children: MenuItem[];
}



// Clean URL helper
function cleanUrl(url: string): string {
  if (!url) return "/";
  const cleaned = url.replace(/^https?:\/\/[^/]+/, "");
  return cleaned.endsWith("/") ? cleaned.slice(0, -1) : cleaned;
}

export default function Footer({ menuData, settings }: { menuData: any; settings: any }) {
  // Helper function to build menu tree
const menuTree = useMemo(() => {
    const nodes = menuData[0]?.menuItems?.nodes || []
    const menuMap = new Map()
    const rootItems = []

    nodes.forEach((node) => {
      menuMap.set(node.id, {
        id: node.id,
        label: node.label,
        uri: node?.url || node?.uri,
        parentId: node.parentId,
        children: []
      })
    })

    nodes.forEach((node) => {
      const item = menuMap.get(node.id)
      if (item) {
        if (node.parentId) {
          const parent = menuMap.get(node.parentId)
          if (parent) {
            parent.children.push(item)
          }
        } else {
          rootItems.push(item)
        }
      }
    })

    return rootItems
  }, [menuData]);
  const servicesItem = menuTree.find((item) => item.label === "Our Services");
  console.log(servicesItem, "servicesItem");

  return (
    <footer className="w-full text-white pt-16 pb-6 relative overflow-hidden">
      {/* Background watermark */}
      <div className="absolute inset-0">
        <Image
          src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Footerbgnew.png?height=1080&width=1920"
          alt="Footer background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 mix-blend-overlay" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Logo and Socials */}
          <div className="md:col-span-3">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 md:gap-4">
                <Image
                  src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Frame-1984078075.png"
                  alt="Primary Logo"
                  width={200}
                  height={60}
                />
                <Image
                  src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/05/AIMI-318x108px.webp"
                  alt="Secondary Logo"
                  width={80}
                  height={30}
                />
              </div>
            </div>

            <div className="flex gap-6 mb-6 items-center justify-center md:justify-start">
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

          {/* Contact */}
          <div className="md:col-span-3 flex flex-col md:items-start items-center justify-center md:justify-start">
            <p className="text-2xl font-medium mb-4 text-start">Contact Us</p>
            <ul className="space-y-3 flex flex-col md:items-start items-center mt-3 px-0">
              <a href="tel:+1 (604) 591-3950" className="!no-underline text-white !hover:text-[#F0B254]">
                <li className="flex items-start gap-2">
                <PhoneIcon />
                <span className="text-sm">+1 (604) 591-3950</span>
              </li>
              </a>
              <a href="mailto:clientcare@asmail.ca" className="!no-underline text-white !hover:text-[#F0B254]">
                <li className="flex items-center gap-2">
                <MailIcon />
                <span className="text-sm">clientcare@asmail.ca</span>
              </li>
              </a>
              <a href="https://maps.app.goo.gl/cG5KTbHiutikqXjeA" className="!no-underline text-white !hover:text-[#F0B254]">
                <li className="flex items-start gap-2">
                <MapPinIcon />
                <span className="text-sm">
                  7327 137 St Suite #311, Surrey, BC V3W 1A4, Canada
                </span>
              </li>
              </a>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <p className="text-xl font-medium mb-6">Quick Links</p>
            <ul className="space-y-3 mt-3 px-0">
              <li className="list-none">
                <Link style={{textDecoration: "none"}} href="/our-locations" className="hover:text-[#F0B254] text-white">
                  Our Locations
                </Link>
              </li>
              {menuTree
                .filter(
                  (item) =>
                    item.label !== "Our Services" &&
                    item.label !== "Calculators" &&
                    item.label !== "Our Locations"
                )
                .map((item) => (
                  <li key={item.id} className="list-none">
                    <Link style={{textDecoration: "none"}} href={cleanUrl(item.uri)} className="hover:text-[#F0B254] text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-4">
            <p className="text-xl font-medium mb-6">Services</p>
            <ul className="grid grid-cols-3 gap-y-4 gap-x-6 mt-3 px-0">
  {servicesItem?.children?.length > 0 ? (
    servicesItem.children.map((child:any) => (
      <li key={child.id} className="list-none col-span-1">
        <Link style={{textDecoration: "none"}} href={cleanUrl(child?.uri)} className="text-sm text-white hover:text-[#F0B254]">
          {child.label}
        </Link>
      </li>
    ))
  ) : (
    <li className="text-sm text-white/70 col-span-2">No services available.</li>
  )}
</ul>
          </div>
        </div>

        <div className="pt-6">
          <p className="text-xs text-white/60 text-center">
            © Copyright {new Date().getFullYear()} Asim Ali | SEO By Cansoft
          </p>
        </div>
      </div>
    </footer>
  );
}

// Icon components
function PhoneIcon() {
  return (
    <svg
      className="text-[#F0B254]"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81A2 2 0 0 1 9.36 8l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="text-[#F0B254]"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      className="text-[#F0B254] mt-1 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
