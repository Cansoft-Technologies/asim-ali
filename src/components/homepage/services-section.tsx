import Image from "next/image"
import Link from "next/link"

export default function MortgageAgencyServices() {
  const services = [
    {
      title: "AAA Mortgages",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Group.png",
      description:
        "If you're looking to buy a home or refinance your current mortgage, you're in the your current mortgage, you're in the",
    },
    {
      title: "B Lending Solutions",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Frame-39586.png",
      description:
        "If you're looking to buy a home or refinance your current mortgage, you're in the your current mortgage, you're in the",
    },
    {
      title: "Borrow Down Payment Assistance",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/fi_18307309.png",
      description:
        "If you're looking to buy a home or refinance your current mortgage, you're in the your current mortgage, you're in the",
    },
    {
      title: "Commercial Mortgages",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/fi_4298940.png",
      description:
        "If you're looking to buy a home or refinance your current mortgage, you're in the your current mortgage, you're in the",
    },
    {
      title: "Construction Financing",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/fi_15564450.png",
      description:
        "If you're looking to buy a home or refinance your current mortgage, you're in the your current mortgage, you're in the",
    },
    {
      title: "Financing and Refinancing Options",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Group-1.png",
      description:
        "If you're looking to buy a home or refinance your current mortgage, you're in the your current mortgage, you're in the",
    },
  ]

  return (
    <section className="relative text-white py-16 px-4 h-full w-full md:px-8 overflow-hidden min-h-[850px] flex flex-col justify-center items-center">
      {/* Background image with overlay */}
      <Image
                src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/service-bg.png?height=1080&width=1920"
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-oswald">Our Mortgage Agency Services</h2>
            <p className="text-gray-300 text-lg">
              If you&apos;re looking to buy a home or refinance your current mortgage, you&apos;re in the right place. Asim Ali is
              your go-to mortgage broker in Surrey to guide you through the mortgage journey.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/services"
              className="inline-block bg-[#f5b14a] hover:bg-[#e9a43c] text-white font-medium py-3 px-8 text-center min-w-[220px]"
            >
              More Services
            </Link>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {services.map((service, index) => (
            <div key={index} className="flex">
              <div className="mr-4 mt-1">
                <Image
                  src={service.icon || "/placeholder.svg"}
                  alt=""
                  width={60}
                  height={40}
                  className="w-15 h-10 text-[#f5b14a]"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

