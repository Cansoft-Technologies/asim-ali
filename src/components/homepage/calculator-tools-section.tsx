import Image from "next/image"
import Link from "next/link"
import { Button } from "components/ui/button"
import { Calculator } from "lucide-react"

export default function CalculatorToolsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <h2 className="text-xl md:text-2xl xl:text-4xl font-oswald md:text-[48px] font-bold text-[#0a1e3b] mb-4 md:mb-0 max-w-xl">
            Plan with Our Mortgage Calculator Tools
          </h2>

          <Link href="/mortgage-calculator">
            <Button className="bg-[#F0B254] hover:bg-[#F0B254]/90 text-white font-medium px-8 py-3 rounded-none">
              More Tools
            </Button>
          </Link>
        </div>

        <p className="text-gray-600 max-w-3xl mb-12">
          If you&apos;re looking to buy a home or refinance your current mortgage, you&apos;re in the right place. Asim Ali is
          your go-to mortgage broker in Surrey to guide you through the mortgage journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-8">
            <div className="mb-6 flex justify-center">
            <div className="bg-gray-100 p-4 rounded-md">
                <Calculator className="h-8 w-8 text-[#0a1e3b]" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-center mb-3">Mortgage Renewal Calculator</h3>
            <p className="text-gray-600 text-center mb-8">
              See for yourself how much you can save with our lower rates.
            </p>
            <Link href="/mortgage-renewal-calculator" className="block">
              <Button
                variant="outline"
                className="w-full border-gray-300 text-[#0a1e3b] hover:bg-[#0a1e3b] hover:text-white py-6 rounded-none"
              >
                Launch
              </Button>
            </Link>
          </div>

          <div className="bg-gray-50 p-8">
            <div className="mb-6 flex justify-center">
            <div className="bg-gray-100 p-4 rounded-md">
                <Calculator className="h-8 w-8 text-[#0a1e3b]" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-center mb-3">FTBHI Calculator</h3>
            <p className="text-gray-600 text-center mb-8">
              See for yourself how much you can save with our lower rates.
            </p>
            <Link href="/fthbi-calculator-bc" className="block">
            <Button
                variant="outline"
                className="w-full border-gray-300 text-[#0a1e3b] hover:bg-[#0a1e3b] hover:text-white py-6 rounded-none"
              >Launch</Button>
            </Link>
          </div>

          <div className="bg-gray-50 p-8">
            <div className="mb-6 flex justify-center">
            <div className="bg-gray-100 p-4 rounded-md">
                <Calculator className="h-8 w-8 text-[#0a1e3b]" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-center mb-3">Refinancing Calculator</h3>
            <p className="text-gray-600 text-center mb-8">
              See for yourself how much you can save with our lower rates.
            </p>
            <Link href="/mortgage-refinance-calculator-bc" className="block">
              <Button
                variant="outline"
                className="w-full border-gray-300 text-[#0a1e3b] hover:bg-[#0a1e3b] hover:text-white py-6 rounded-none"
              >
                Launch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
