"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "components/ui/button"
import Image from "next/image"
import { Menu, X, ChevronDown, TrendingUp } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent, menuName: string) => {
    if (e.key === "Escape") {
      setActiveMenu(null)
    }
    if (e.key === "Enter" || e.key === " ") {
      setActiveMenu(activeMenu === menuName ? null : menuName)
    }
  }

  // Menu data structure
  const menuData = {
    services: {
      title: "Services",
      columns: [
        {
          heading: "SERVICES WE PROVIDE",
          items: [
            { title: "AAA MORTGAGE", href: "/services/aaa-mortgage" },
            { title: "CONSTRUCTION FINANCING", href: "/services/construction-financing" },
            { title: "MORTGAGE FOR SELF EMPLOYED", href: "/services/self-employed" },
            { title: "UNINSURED MORTGAGE SOLUTIONS", href: "/services/uninsured-mortgage" },
            { title: "PPC SERVICES", href: "/services/ppc-services" },
            { title: "AI MORTGAGE SERVICES", href: "/services/ai-mortgage" },
          ],
        },
        {
          heading: "OUR MORTGAGE AGENCY",
          items: [
            { title: "B LENDING", href: "/services/b-lending" },
            { title: "DISCHARGE MORTGAGE", href: "/services/discharge-mortgage" },
            { title: "PRIVATE REFINANCE", href: "/services/private-refinance" },
            { title: "VACANT LAND MORTGAGE", href: "/services/vacant-land" },
            { title: "HOW MUCH DO MORTGAGES COST?", href: "/services/mortgage-cost" },
            { title: "HOW TO COMPARE MORTGAGE RATES", href: "/services/compare-rates" },
          ],
        },
      ],
      promo: {
        title: "Let's Drive Results Together",
        subtitle: "Get the best mortgage rates today!",
        buttonText: "Apply Now",
        buttonLink: "/apply",
        bgColor: "bg-[#12143A]",
        textColor: "text-white",
      },
    },
    rates: {
      title: "Current Rate",
      columns: [
        {
          heading: "MORTGAGE RATES",
          items: [
            { title: "FIXED MORTGAGE RATES", href: "/rates/fixed" },
            { title: "VARIABLE MORTGAGE RATES", href: "/rates/variable" },
            { title: "COMMERCIAL MORTGAGE RATES", href: "/rates/commercial" },
            { title: "HISTORICAL MORTGAGE RATES", href: "/rates/historical" },
          ],
        },
        {
          heading: "RATE COMPARISONS",
          items: [
            { title: "BANK VS BROKER RATES", href: "/rates/bank-vs-broker" },
            { title: "BEST MORTGAGE RATES", href: "/rates/best-rates" },
            { title: "RATE FORECASTS", href: "/rates/forecasts" },
            { title: "RATE CALCULATORS", href: "/rates/calculators" },
          ],
        },
      ],
      promo: {
        title: "Find Your Best Rate",
        subtitle: "Compare and save on your mortgage!",
        buttonText: "Get Quote",
        buttonLink: "/quote",
        bgColor: "bg-[#12143A]",
        textColor: "text-white",
      },
    },
    howItWorks: {
      title: "How It Works",
      columns: [
        {
          heading: "THE MORTGAGE PROCESS",
          items: [
            { title: "MORTGAGE PRE-APPROVAL", href: "/how-it-works/pre-approval" },
            { title: "MORTGAGE APPLICATION", href: "/how-it-works/application" },
            { title: "DOCUMENT REQUIREMENTS", href: "/how-it-works/documents" },
            { title: "CLOSING PROCESS", href: "/how-it-works/closing" },
          ],
        },
        {
          heading: "MORTGAGE GUIDES",
          items: [
            { title: "FIRST-TIME HOME BUYERS", href: "/how-it-works/first-time-buyers" },
            { title: "REFINANCING GUIDE", href: "/how-it-works/refinancing" },
            { title: "INVESTMENT PROPERTIES", href: "/how-it-works/investment" },
            { title: "MORTGAGE RENEWAL", href: "/how-it-works/renewal" },
          ],
        },
      ],
      promo: {
        title: "Need Expert Guidance?",
        subtitle: "Our mortgage specialists are here to help!",
        buttonText: "Contact Us",
        buttonLink: "/contact",
        bgColor: "bg-[#12143A]",
        textColor: "text-white",
      },
    },
  }

  return (
    <header className="relative z-50 bg-transparent shadow-sm" ref={menuRef}>
      <div className="container mx-auto px-6 md:px-12 py-4" onMouseLeave={() => setActiveMenu(null)}>
        <div className="flex justify-between items-center">
          <div className="w-48">
            <Image
              src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Frame-1984078075.png"
              alt="Asim Ali Mortgage Team"
              width={200}
              height={60}
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 no-underline">
            <Link style={{ textDecoration: "none" }} href="/" className="text-base text-white hover:text-[#F0B254] transition-colors">
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("services")}
              // onMouseLeave={() => setActiveMenu(null)}
              onKeyDown={(e) => handleKeyDown(e, "services")}
              tabIndex={0}
            >
              <button className="flex items-center gap-1 text-base text-white hover:text-[#F0B254] transition-colors">
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeMenu === "services" ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Current Rate Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("rates")}
              // onMouseLeave={() => setActiveMenu(null)}
              onKeyDown={(e) => handleKeyDown(e, "rates")}
              tabIndex={0}
            >
              <button className="flex items-center gap-1 text-base text-white hover:text-[#F0B254] transition-colors">
                Current Rate
                <ChevronDown className={`h-4 w-4 transition-transform ${activeMenu === "rates" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* How It Works Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("howItWorks")}
              onKeyDown={(e) => handleKeyDown(e, "howItWorks")}
              tabIndex={0}
            >
              <button className="flex items-center gap-1 text-base text-white hover:text-[#F0B254] transition-colors">
                How It Works
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeMenu === "howItWorks" ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <Link style={{ textDecoration: "none" }} href="/about" className="text-base text-white hover:text-[#F0B254] transition-colors">
              About Us
            </Link>
          </div>

          {/* Apply Now Button (Desktop) */}
          <Link href="/apply" className="hidden md:block">
            <Button className="bg-transparent text-white hover:text-black hover:bg-[#F0B254]/10 border border-1 border-[#F0B254] font-medium px-6 py-2 rounded-md transition-colors">
              Apply Now
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      {activeMenu && (
        <div onMouseEnter={() => setActiveMenu(activeMenu)} onMouseLeave={() => setActiveMenu(null)} className="absolute left-0 top-full w-full bg-[#FFF9F0] backdrop-blur-sm p-3 rounded-md border border-white/10 z-50">
          <div className="container mx-auto px-6 md:px-12 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Menu Columns */}
              {menuData[activeMenu as keyof typeof menuData].columns.map((column, colIndex) => (
                <div key={colIndex} className="col-span-3">
                  <p className="text-sm md:text-2xl font-oswald text-[#12143A] mb-4">{column.heading}</p>
                  <ul className="space-y-3">
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          href={item.href}
                          style={{ textDecoration: "none" }}
                          className=""
                        >
                          <p className="text-sm font-medium text-[#12143A] hover:text-[#F0B254] transition-colors">{item.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Promo Section */}
              <div className="col-span-6">
                <div
                  className={`${
                    menuData[activeMenu as keyof typeof menuData].promo.bgColor
                  } rounded-lg p-8 h-full flex flex-col justify-center`}
                >
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-8 w-8 text-[#F0B254] mr-2" />
                  </div>
                  <h3
                    className={`text-3xl font-bold mb-2 ${
                      menuData[activeMenu as keyof typeof menuData].promo.textColor
                    }`}
                  >
                    {menuData[activeMenu as keyof typeof menuData].promo.title}
                  </h3>
                  <p className={`mb-6 ${menuData[activeMenu as keyof typeof menuData].promo.textColor} opacity-90`}>
                    {menuData[activeMenu as keyof typeof menuData].promo.subtitle}
                  </p>
                  <Link href={menuData[activeMenu as keyof typeof menuData].promo.buttonLink}>
                    <Button className="bg-[#F0B254] hover:bg-[#e0a54a] text-white font-medium px-6 py-2 rounded-md transition-colors">
                      {menuData[activeMenu as keyof typeof menuData].promo.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-[#FFF9F0] backdrop-blur-sm p-3 rounded-md border-b border-gray-200 z-50 max-h-[80vh] overflow-y-auto"
        >
          <div className="p-4 space-y-4">
            <Link
              href="/"
              
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
            >
              <p className="block py-2 text-[#12143A] hover:text-[#F0B254] transition-colors">Home</p>
            </Link>

            {/* Mobile Services Menu */}
            <div className="border-b border-gray-200 pb-2">
              <button
                className="flex items-center justify-between w-full py-2 text-white hover:text-[#F0B254] transition-colors"
                onClick={() => setActiveMenu(activeMenu === "services" ? null : "services")}
              >
                <span className="block py-2 text-[#12143A] hover:text-[#F0B254] transition-colors">Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeMenu === "services" ? "rotate-180" : ""}`}
                />
              </button>

              {activeMenu === "services" && (
                <div className="pl-4 mt-2 space-y-4">
                  {menuData.services.columns.map((column, colIndex) => (
                    <div key={colIndex} className="mb-4">
                      <p className="text-md text-[#12143A] mb-2">{column.heading}</p>
                      <ul className="space-y-2">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={item.href}
                              className=""
                              onClick={() => setMobileMenuOpen(false)}
                              style={{ textDecoration: "none" }}
                            >
                              <p className="block py-1 text-sm text-[#12143A] hover:text-[#F0B254] transition-colors">{item.title}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Current Rate Menu */}
            <div className="border-b border-gray-200 pb-2">
              <button
                className="flex items-center justify-between w-full py-2 text-white hover:text-[#F0B254] transition-colors"
                onClick={() => setActiveMenu(activeMenu === "rates" ? null : "rates")}
              >
                <span className="block py-2 text-[#12143A] hover:text-[#F0B254] transition-colors">Current Rate</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${activeMenu === "rates" ? "rotate-180" : ""}`} />
              </button>

              {activeMenu === "rates" && (
                <div className="pl-4 mt-2 space-y-4">
                  {menuData.rates.columns.map((column, colIndex) => (
                    <div key={colIndex} className="mb-4">
                      <p className="text-md text-[#12143A] mb-2">{column.heading}</p>
                      <ul className="space-y-2">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={item.href}
                              style={{ textDecoration: "none" }}
                              className="block py-1 text-sm text-[#12143A] hover:text-[#F0B254] transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                            <p className="block py-1 text-sm text-[#12143A] hover:text-[#F0B254] transition-colors">{item.title}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile How It Works Menu */}
            <div className="border-b border-gray-200 pb-2">
              <button
                className="flex items-center justify-between w-full py-2 text-white hover:text-[#F0B254] transition-colors"
                onClick={() => setActiveMenu(activeMenu === "howItWorks" ? null : "howItWorks")}
              >
                <span className="block py-2 text-[#12143A] hover:text-[#F0B254] transition-colors">How It Works</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeMenu === "howItWorks" ? "rotate-180" : ""}`}
                />
              </button>

              {activeMenu === "howItWorks" && (
                <div className="pl-4 mt-2 space-y-4">
                  {menuData.howItWorks.columns.map((column, colIndex) => (
                    <div key={colIndex} className="mb-4">
                      <p className="text-md text-[#12143A] mb-2">{column.heading}</p>
                      <ul className="space-y-2">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                            style={{ textDecoration: "none" }}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <p className="block py-1 text-sm text-[#12143A] hover:text-[#F0B254] transition-colors">{item.title}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              style={{ textDecoration: "none" }}
              className="block py-2 text-[#12143A] hover:text-[#F0B254] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
            <p className="block py-2 text-[#12143A] hover:text-[#F0B254] transition-colors">About Us</p>
            </Link>

            {/* Apply Now Button (Mobile) */}
            <div className="pt-2">
              <Link href="/apply" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-transparent text-[#12143A] hover:text-black hover:bg-[#F0B254]/10 border border-1 border-[#F0B254] font-medium py-2 rounded-md transition-colors">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
