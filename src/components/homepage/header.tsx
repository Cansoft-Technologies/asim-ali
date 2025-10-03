"use client";

import type React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "components/ui/button";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  Phone,
  Linkedin,
  Instagram,
  Facebook,
  Mail,
} from "lucide-react";

// Define menu item type
interface MenuItem {
  id: string;
  label: string;
  uri: string;
  parentId: string | null;
  children: MenuItem[];
}

export default function Header(props: { menuData: any; settings: any }) {
  const { menuData, settings } = props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, menuName: string) => {
    if (e.key === "Escape") {
      setActiveMenu(null);
    }
    if (e.key === "Enter" || e.key === " ") {
      setActiveMenu(activeMenu === menuName ? null : menuName);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const buildMenuTree = useMemo(() => {
    const nodes = menuData[0]?.menuItems?.nodes || [];
    const menuMap = new Map<string, MenuItem>();
    const rootItems: MenuItem[] = [];

    nodes.forEach((node) => {
      menuMap.set(node.id, {
        id: node.id,
        label: node.label,
        uri: node?.url || node?.uri,
        parentId: node.parentId,
        children: [],
      });
    });

    nodes.forEach((node) => {
      const item = menuMap.get(node.id);
      if (item) {
        if (node.parentId) {
          const parent = menuMap.get(node.parentId);
          if (parent) {
            parent.children.push(item);
          }
        } else {
          rootItems.push(item);
        }
      }
    });

    return rootItems;
  }, [menuData]);

  const filterMenuItems = (
    items: MenuItem[],
    parentLabel?: string
  ): MenuItem[] => {
    return items.filter((item) => {
      if (parentLabel === "Our Services") {
        return ![
          "FTHBI Calculator",
          "Mortgage Payment Calculator",
          "Refinance Calculator",
        ].includes(item.label);
      }
      if (parentLabel === "How It Works") {
        return !["FTHBI Calculator", "Readvanceable Mortgage"].includes(
          item.label
        );
      }
      return true;
    });
  };

  const megaMenuPromos = {
    "Our Services": {
      title: "Let's Drive Results Together",
      subtitle: "Get the best mortgage rates today!",
      buttonText: "Apply Now",
      buttonLink: "/apply-now",
      bgColor: "bg-[#12143A]",
      textColor: "text-white",
    },
    "How It Works": {
      title: "Need Expert Guidance?",
      subtitle: "Our mortgage specialists are here to help!",
      buttonText: "Contact Us",
      buttonLink: "/contact-us",
      bgColor: "bg-[#12143A]",
      textColor: "text-white",
    },
    Calculators: {
      title: "Need Expert Calculated Rates?",
      subtitle: "Our mortgage specialists are here to help!",
      buttonText: "Contact Us",
      buttonLink: "/contact-us",
      bgColor: "bg-[#12143A]",
      textColor: "text-white",
    },
    "Our Locations": {
      title: "Need Location Based Guidance?",
      subtitle: "Our mortgage specialists are here to help!",
      buttonText: "Contact Us",
      buttonLink: "/contact-us",
      bgColor: "bg-[#12143A]",
      textColor: "text-white",
    },
    "About Us": {
      title: "Find Your Best Rate",
      subtitle: "Compare and save on your mortgage!",
      buttonText: "Get Quote",
      buttonLink: "/contact-us",
      bgColor: "bg-[#12143A]",
      textColor: "text-white",
    },
  } as const;

  const cleanUri = (uri: string) =>
    uri?.endsWith("/") ? uri.slice(0, -1) : uri;

  const splitChildren = (children: MenuItem[]) => {
    const half = Math.ceil(children.length / 2);
    return [children.slice(0, half), children.slice(half)];
  };

  return (
    <header
      className="relative z-50 bg-[#1a1a3a] shadow-sm sticky top-0"
      ref={menuRef}
    >
      {/* Top info bar */}
      <div className="w-full bg-[#1a1a3a] text-white py-2 md:px-4 px-0">
        <div className="container mx-auto flex flex-row justify-between items-center">
          <div className="flex items-center text-md md:mb-0">
            <Mail className="h-4 w-4 mr-2 text-white" />
            <a
              style={{ textDecoration: "none" }}
              href="mailto:clientcare@asimali.ca"
              className="mr-3 text-white no-underline hover:text-[#F0B254] transition-colors"
            >
              clientcare@asimali.ca
            </a>
            <span className="hidden md:inline-block">|</span>
            <span className="ml-3 hidden md:inline-block">
              Licensed in BC & AB
            </span>
          </div>

          <div className="flex space-x-2 md:space-x-4 md:mb-0  text-sm">
            <a
              href="https://www.facebook.com/profile.php?id=100063649628029"
              aria-label="Facebook"
              className="hover:text-gray-300 transition-colors no-underline"
            >
              <Facebook className="h-4 w-4 text-[#F0B254]" />
            </a>
            <a
              href="https://www.instagram.com/asimfinance/"
              aria-label="Instagram"
              className="hover:text-gray-300 transition-colors"
            >
              <Instagram className="h-4 w-4 text-[#F0B254]" />
            </a>
            <a
              href="https://www.linkedin.com/in/asim-ali-a75168125/?originalSubdomain=ca"
              aria-label="LinkedIn"
              className="hover:text-gray-300 transition-colors"
            >
              <Linkedin className="h-4 w-4 text-[#F0B254]" />
            </a>
            <a
              href="https://www.tiktok.com/@asimortgage/"
              aria-label="TikTok"
              className="hover:text-gray-300 transition-colors text-[#F0B254]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#F0B254]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>

          <div className="flex items-center text-md">
            <Phone className="h-4 w-4 mr-2 text-white" />
            <a
              style={{ textDecoration: "none" }}
              href="tel:+16045913590"
              className="text-white"
            >
              +1 (604) 591-3590
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`container mx-auto px-6 md:px-12 transition-all duration-300 ${
          isScrolled ? "py-1 pb-1" : "py-2 pb-3"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <Link
              style={{ textDecoration: "none" }}
              href="/"
              className="text-base text-white hover:text-[#F0B254] transition-colors"
            >
              <div
                className={`transition-all duration-300 ${
                  isScrolled ? "w-36 py-3" : "w-48"
                }`}
              >
                <Image
                  src={settings?.headerSettings?.uploadLogo?.sourceUrl}
                  alt="Asim Ali Mortgage Team"
                  width={200}
                  height={60}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 no-underline">
            {filterMenuItems(buildMenuTree).map((menuItem) => (
              <div
                key={menuItem.id}
                className="relative"
                onMouseEnter={() => setActiveMenu(menuItem.label)}
                onKeyDown={(e) => handleKeyDown(e, menuItem.label)}
                tabIndex={0}
              >
                {menuItem.children.length > 0 ? (
                  <Link
                    style={{ textDecoration: "none" }}
                    href={cleanUri(menuItem?.uri) || "/"}
                    className="flex items-center gap-1 text-base text-white hover:text-[#F0B254] transition-colors"
                  >
                    {menuItem.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        activeMenu === menuItem.label ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                ) : (
                  <Link
                    style={{ textDecoration: "none" }}
                    href={cleanUri(menuItem?.uri) || "/"}
                    className="text-base text-white hover:text-[#F0B254] transition-colors"
                  >
                    {menuItem.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Apply Now Button (Desktop) */}
          <Link href="/apply-now" className="hidden md:block">
            <Button
              className={`bg-transparent text-white hover:text-black hover:bg-[#F0B254]/10 border border-1 border-[#F0B254] font-medium rounded-md transition-all duration-300 ${
                isScrolled ? "px-4 py-1 text-xl" : "px-6 py-2"
              }`}
            >
              Apply Now
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu for Desktop */}
      {activeMenu &&
        megaMenuPromos[activeMenu as keyof typeof megaMenuPromos] && (
          <div
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
            className="absolute hidden md:block left-0 top-full w-full bg-[#FFF9F0] backdrop-blur-sm p-3 rounded-md border border-white/10 z-50"
          >
            <div className="container mx-auto px-6 md:px-12 py-8">
              <div className="grid grid-cols-12 gap-8">
                {/* Menu Columns */}
                {splitChildren(
                  filterMenuItems(
                    buildMenuTree.find((item) => item.label === activeMenu)
                      ?.children || [],
                    activeMenu
                  )
                ).map((column, colIndex) => (
                  <div key={colIndex} className="col-span-3">
                    <ul className="space-y-1">
                      {column.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={cleanUri(child?.uri) || "/"}
                            style={{ textDecoration: "none" }}
                            className="flex items-center gap-2"
                          >
                            <p className="!text-xl font-medium text-[#12143A] hover:text-[#F0B254] transition-colors">
                              {child.label}
                            </p>
                          </Link>
                          {/* Special handling for Commercial Mortgages */}
                          {child.label === "Commercial Mortgages" && (
                            <ul className="submenu-child pl-4 mt-2 space-y-2">
                              <li>
                                <Link
                                  href="/commercial-mortgage-in-bc"
                                  style={{ textDecoration: "none" }}
                                  className="flex items-center gap-2"
                                >
                                  <p className="text-xl text-[#12143A] hover:text-[#F0B254] transition-colors">
                                    British Columbia
                                  </p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/commercial-mortgage-in-surrey"
                                  style={{ textDecoration: "none" }}
                                  className="flex items-center gap-2"
                                >
                                  <p className="text-xl text-[#12143A] hover:text-[#F0B254] transition-colors">
                                    Surrey
                                  </p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/commercial-mortgage-in-vancouver"
                                  style={{ textDecoration: "none" }}
                                  className="flex items-center gap-2"
                                >
                                  <p className="text-xl text-[#12143A] hover:text-[#F0B254] transition-colors">
                                    Vancouver
                                  </p>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Promo Section */}
                <div className="col-span-6 h-[300px]">
                  <div
                    className={`${
                      megaMenuPromos[activeMenu as keyof typeof megaMenuPromos]
                        .bgColor
                    } rounded-lg p-8 h-full flex flex-col justify-center`}
                  >
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-8 w-8 text-[#F0B254] mr-2" />
                    </div>
                    <p
                      className={`text-3xl font-bold mb-2 ${
                        megaMenuPromos[
                          activeMenu as keyof typeof megaMenuPromos
                        ].textColor
                      }`}
                    >
                      {
                        megaMenuPromos[
                          activeMenu as keyof typeof megaMenuPromos
                        ].title
                      }
                    </p>
                    <p
                      className={`mb-6 ${
                        megaMenuPromos[
                          activeMenu as keyof typeof megaMenuPromos
                        ].textColor
                      } opacity-90`}
                    >
                      {
                        megaMenuPromos[
                          activeMenu as keyof typeof megaMenuPromos
                        ].subtitle
                      }
                    </p>
                    <Link
                      href={
                        megaMenuPromos[
                          activeMenu as keyof typeof megaMenuPromos
                        ].buttonLink
                      }
                    >
                      <Button className="bg-[#F0B254] hover:bg-[#e0a54a] text-white font-medium px-6 py-2 rounded-md transition-colors">
                        {
                          megaMenuPromos[
                            activeMenu as keyof typeof megaMenuPromos
                          ].buttonText
                        }
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
              <p className="block py-2 text-[#12143A] hover:text-[#F0B254] transition-colors">
                Home
              </p>
            </Link>

            {filterMenuItems(buildMenuTree).map((menuItem) => (
              <div key={menuItem.id} className="border-b border-gray-200 pb-2">
                {menuItem.children.length > 0 ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full py-2 text-white hover:text-[#F0B254] transition-colors"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === menuItem.label ? null : menuItem.label
                        )
                      }
                    >
                      <span className="block py-2 text-[#12143A] hover:text-[#F0B254] transition-colors">
                        {menuItem.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeMenu === menuItem.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeMenu === menuItem.label && (
                      <div className="pl-4 mt-2 space-y-4">
                        {filterMenuItems(menuItem.children, menuItem.label).map(
                          (child) => (
                            <div key={child.id} className="mb-4">
                              {child.children.length > 0 ? (
                                <>
                                  <button
                                    className="flex items-center justify-between w-full py-2"
                                    onClick={() =>
                                      setActiveMenu(
                                        activeMenu === child.label
                                          ? null
                                          : child.label
                                      )
                                    }
                                  >
                                    <p className="text-md text-[#12143A] mb-2">
                                      {child.label}
                                    </p>
                                    <ChevronDown
                                      className={`h-4 w-4 transition-transform ${
                                        activeMenu === child.label
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </button>

                                  {activeMenu === child.label && (
                                    <ul className="pl-4 space-y-2">
                                      {child.children.map((grandChild) => (
                                        <li key={grandChild.id}>
                                          <Link
                                            href={
                                              cleanUri(grandChild?.uri) || "/"
                                            }
                                            style={{ textDecoration: "none" }}
                                            className="block py-1 text-sm text-[#12143A] hover:text-[#F0B254] transition-colors"
                                            onClick={() =>
                                              setMobileMenuOpen(false)
                                            }
                                          >
                                            {grandChild.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={cleanUri(child?.uri) || "/"}
                                  style={{ textDecoration: "none" }}
                                  className="block py-1 text-sm text-[#12143A] hover:text-[#F0B254] transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={cleanUri(menuItem?.uri) || "/"}
                    style={{ textDecoration: "none" }}
                    className="block py-2 text-[#12143A] hover:text-[#F0B254] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menuItem.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Apply Now Button (Mobile) */}
            <div className="pt-2">
              <Link
                href="/apply-now"
                className="block w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-transparent text-[#12143A] hover:text-black hover:bg-[#F0B254]/10 border border-1 border-[#F0B254] font-medium py-2 rounded-md transition-colors">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
