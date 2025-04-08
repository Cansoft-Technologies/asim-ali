import Link from "next/link"
import { Button } from "components/ui/button"
import Image from "next/image"

export default function Header() {
  return (
    <header className="relative z-10 container mx-auto px-6 md:px-12 py-6">
        <div className="flex justify-between items-center">
          <div className="w-48">
            <Image src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Frame-1984078075.png" alt="Asim Ali Mortgage Team" width={200} height={60} priority />
          </div>
          <div className="hidden md:flex items-center gap-8 no-underline m-auto">
            <Link style={{ textDecoration: 'none' }} href="/" className="text-base text-white hover:text-[#F0B254] transition-colors">
              Home
            </Link>
            <Link style={{ textDecoration: 'none' }} href="/services" className="text-base text-white hover:text-[#F0B254] transition-colors">
              Services
            </Link>
            <Link style={{ textDecoration: 'none' }} href="/rate" className="text-base text-white hover:text-[#F0B254] transition-colors">
              Current Rate
            </Link>
            <Link style={{ textDecoration: 'none' }} href="/how-it-works" className="text-base text-white hover:text-[#F0B254] transition-colors">
              How It Works
            </Link>
            <Link style={{ textDecoration: 'none' }} href="/about" className="text-base text-white hover:text-[#F0B254] transition-colors">
              About Us
            </Link>
          </div>
          <Link href="/apply" className="hidden md:block">
            <Button className="bg-transparent hover:bg-[#F0B254] text-white hover:text-black border border-1 border-[#F0B254] font-medium px-6 py-2 transition-colors">
              Apply Now
            </Button>
          </Link>
        </div>
      </header>
  )
}

