import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Music } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full text-white pt-16 pb-6 relative overflow-hidden">
      {/* Background logo watermark */}
      <div className="absolute inset-0">
  <Image
    src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Footerbgnew.png?height=1080&width=1920"
    alt="Background"
    fill
    sizes="100vw"
    className="object-cover object-center"
    priority
  />
  {/* Overlay div to handle the blend mode */}
  <div 
    className="absolute inset-0 mix-blend-overlay" 
    aria-hidden="true"
  />
</div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-8">
              <Image src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Frame-1984078075.png" alt="Asim Ali Mortgage Team" width={200} height={60} />
            </div>

            <div className="flex gap-6 mb-6">
              <a href="#" >
                <Facebook size={24} className="text-[#F0B254] hover:opacity-80"/>
              </a>
              <a href="#" >
                <Instagram size={24} className="text-[#F0B254] hover:opacity-80"/>
              </a>
              <a href="#" >
                <Linkedin size={24} className="text-[#F0B254] hover:opacity-80"/>
              </a>
              <a href="#" >
                <Music size={24} className="text-[#F0B254] hover:opacity-80"/>
              </a>
            </div>
          </div>

          <div>
            <p className="text-2xl font-medium mb-4 text-start">Contact Us</p>
            <ul className="space-y-3 flex flex-col items-start mt-3 px-0">
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F0B254]"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-sm">+1 (604) 513-2190</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F0B254]"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span className="text-sm">info@asimali.ca</span>
              </li>

              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F0B254] mt-1 flex-shrink-0"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm">7327 137 St Suite #311, Surrey, BC V3W 1A4, Canada</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3 mt-3 px-0">
              <li>
                <Link style={{textDecoration: "none"}} href="/" className="hover:text-[#F0B254] text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link style={{textDecoration: "none"}} href="/services" className="hover:text-[#F0B254] text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link style={{textDecoration: "none"}} href="/about-us" className="hover:text-[#F0B254] text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link style={{textDecoration: "none"}} href="/blog" className="hover:text-[#F0B254] text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Services</h3>
            <ul className="space-y-3 mt-3 px-0">
              <li>
                <Link style={{textDecoration: "none"}} href="/services" className="hover:text-[#F0B254] text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link style={{textDecoration: "none"}} href="/services" className="hover:text-[#F0B254] text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link style={{textDecoration: "none"}} href="/about-us" className="hover:text-[#F0B254] text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link style={{textDecoration: "none"}} href="/privacy-policy" className="hover:text-[#F0B254] text-white">
                  Privacy & Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6">
          <p className="text-xs text-white/60 text-center">© Copyright 2025 Asim Ali | SEO By Cansoft</p>
        </div>
      </div>
    </footer>
  )
}
