import Image from "next/image"
import Link from "next/link"

export default function MortgageBrokerIntro({ helpSection }: { helpSection?: any }) {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div>
            <h2 className="!text-xl md:!text-2xl lg:!text-4xl !font-semibold mb-8 leading-tight font-oswald">
              {helpSection?.title || "Let The Best Mortgage Broker in Surrey Help You With Your Homeownership Dream"}
            </h2>

            <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: helpSection?.description || "Whether you are about to go after your first home or you are looking for possible ways to refinance your existing mortgage, we will gladly assist you with the most suitable financing solution customized to your needs." }}>
            </div>

            {/* <p className="text-gray-700 mb-10">
              Whether you are about to go after your first home or you are looking for possible ways to refinance your
              existing mortgage, we will gladly assist you with the most suitable financing solution customized to your
              needs.
            </p>

            <p className="!text-lg md:!text-xl lg:!text-2xl font-medium mb-6 font-oswald">Mortgage Solutions That Will Fit Your Needs</p>

            <p className="text-gray-700 mb-4">
              Asim Ali is your trusted local mortgage broker in Surrey. Our team offers a suite of mortgage solutions
              designed to cater to diverse financial needs and homeownership goals. We know that each client has unique
              needs and that&apos;s why we&apos;ve developed a{" "}
              <Link href="/our-services" className="text-[#F0B254] hover:underline">
                comprehensive range of services
              </Link>{" "}
              that address various aspects of the mortgage process, ensuring you&apos;re well-equipped to make wise decisions
              at every step. Here are the services we are offering
            </p> */}
          </div>

          {/* Right side - Image */}
          <div className="relative h-[400px] md:h-[500px] w-full">
            <Image
              src={helpSection?.helpImage?.sourceUrl || "https://asimaliprod.wpengine.com/wp-content/uploads/2024/09/Top-Mortgage-Broker-In-Chilliwack.webp"}
              alt={helpSection?.helpImage?.altText || "Asim Ali Mortgage Team"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
