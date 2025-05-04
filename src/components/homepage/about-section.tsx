import Image from "next/image"
import PartnerLogos from "./partner-logos"

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:!text-5xl !font-bold mb-2 font-oswald">
              Asim Ali, Your <span className="text-[#F0B254] font-normal">Mortgage</span> <br/>
              <span className="text-[#F0B254] font-normal">Broker</span> in Surrey
            </h2>
          </div>
          
          <div className="max-w-xl">
            <p className="text-gray-700">
              If you&apos;re looking to buy a home or refinance your current mortgage, you&apos;re in the right place. Asim Ali is your go-to mortgage broker in Surrey to guide you through the mortgage journey.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-medium mb-6 pb-2 border-b border-gray-200 font-oswald">Who We Are</h3>

            <div className="space-y-4 text-gray-700">
              <p>
                In such a busy real estate market, Asim Ali is the best mortgage broker in Surrey, BC. We&apos;re here to help you with all your financing needs.
              </p>
              <p>
                We have a dedicated team who knows everything about the world of mortgages. We don&apos;t just help you get loans; we also build strong relationships and make sure you feel happy.
              </p>
              <p>
                We have a dedicated team who knows everything about the world of mortgages. We don&apos;t just help you get loans; we also build strong relationships and make sure you feel happy.
              </p>
              <p>
                We don&apos;t just help you get loans; we also build strong relationships and make sure you feel happy.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6 pb-2 border-b border-gray-200 font-oswald">What Sets Us Apart</h3>

            <div className="relative h-80 w-full rounded-sm overflow-hidden">
              <Image
                src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/9e752e1e42b87a7c8c79ca3f01c4ef6f-scaled.jpeg?height=400&width=600"
                alt="Asim Ali and Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-12">
          <PartnerLogos />
        </div>
      </div>
    </section>
  )
}
