import Image from "next/image"
import Link from "next/link"

export default function MortgageAgencyServices({serviceSection}: {serviceSection?: any}) {

  return (
    <section className="relative text-white py-16 px-4 h-full w-full md:px-8 overflow-hidden min-h-[850px] flex flex-col justify-center items-center">
      {/* Background image with overlay */}
      <Image
                src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/service-bg.webp?height=1080&width=1920"
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
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-16 gap-8 items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-5xl font-bold mb-4 font-oswald sm:text-center text-start">{serviceSection?.title}</h2>
            <p className="text-gray-300 text-lg" dangerouslySetInnerHTML={{__html: serviceSection?.description || `Navigating the world of mortgages can feel like a maze. Especially if you&apos;re new in this field. But you don&apos;t have to find your way alone. Asim Ali is here as your go-to mortgage broker in Surrey. <br/>We&apos;ll guide you through your whole mortgage journey. Let&apos;s find out what we offer:`}}></p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
            style={{ textDecoration: "none" }}
              href="/our-services"
              className="inline-block bg-[#f5b14a] hover:bg-[#e9a43c] text-white text-md xl:text-xl font-medium py-3 px-8 text-center min-w-[220px]"
            >
              More Services
            </Link>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {serviceSection?.services.map((service:any, index:number) => (
            <div key={index} className="flex">
              <div className="mr-4 mt-1">
                <Image
                  src={service.icon?.sourceUrl || "/placeholder.svg"}
                  alt={service.icon?.altText || "Service Icon"}
                  width={60}
                  height={40}
                  className="w-[80px] h-[30px] text-[#f5b14a]"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-300" dangerouslySetInnerHTML={{__html: service.description}}></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

