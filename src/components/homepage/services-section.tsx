import Image from "next/image"
import Link from "next/link"

export default function MortgageAgencyServices() {
  const services = [
    {
      title: "AAA Mortgages",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Group.png",
      description:
        `<a href="https://asimali.ca/aaa-mortgage-in-bc"><span style="font-weight: 400;">AAA Mortgages</span></a><span style="font-weight: 400;"> are for those with strong credit. It offers you the best interest rates. If you want to save money and have peace of mind, choose this option. We’ll be there to assess if this one is the right pick for you.</span>`,
    },
    {
      title: "B Lending Solutions",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Frame-39586.png",
      description:
        `<span style="font-weight: 400;">Are you someone who isn’t looking for a traditional lending option? If yes, then our </span><a href="https://asimali.ca/b-lender-bc-mortgage"><span style="font-weight: 400;">B Lending Solutions</span></a><span style="font-weight: 400;"> is for you. It acts like an alternative for unique situations.</span>`,
    },
    {
      title: "Borrow Down Payment Assistance",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/fi_18307309.png",
      description:
        `<span style="font-weight: 400;">We know saving for a </span><a href="https://asimali.ca/borrow-down-payment-services"><span style="font-weight: 400;">down payment</span></a><span style="font-weight: 400;"> is quite tough. Our assistance programs are there to act as a bridge. Here, we’ll help you find out the options to gather the funds you need.</span>`,
    },
    {
      title: "Commercial Mortgages",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/fi_4298940.png",
      description:
        `<span style="font-weight: 400;">Need financing for your business property or investment? Then choose our </span><a href="https://asimali.ca/commercial-mortgage-broker"><span style="font-weight: 400;">commercial mortgage options</span></a><span style="font-weight: 400;">. Here, we understand the complexities and will find the right loan for your retail, office, or industrial spaces.</span>`,
    },
    {
      title: "Construction Financing",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/fi_15564450.png",
      description:
        `<span style="font-weight: 400;">If you’re building a new home or project, pick our </span><a href="https://asimali.ca/construction-financing"><span style="font-weight: 400;">construction financing solution</span></a><span style="font-weight: 400;">. Here, we'll arrange financing that matches your project's timeline and budget.</span>`,
    },
    {
      title: "Financing and Refinancing Options",
      icon: "https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/Group-1.png",
      description:
        `<span style="font-weight: 400;">Buying your first home while handling your current loan could be an overwhelming experience. In that case, </span><b>Asim Ali </b><span style="font-weight: 400;">offers many </span><a href="https://asimali.ca/financing-for-business-in-bc"><span style="font-weight: 400;">financing</span></a><span style="font-weight: 400;"> and </span><a href="https://asimali.ca/mortgage-refinance-calculator-bc"><span style="font-weight: 400;">refinancing solutions</span></a><span style="font-weight: 400;">. You’ll experience things like lower rates, reduced payments, etc.</span>`,
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
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-16 gap-8 items-center">
          <div className="max-w-2xl">
            <h2 className="!text-2xl md:!text-5xl font-bold mb-4 font-oswald sm:text-center text-start">Our Mortgage Agency Services</h2>
            <p className="text-gray-300 text-lg">
            Navigating the world of mortgages can feel like a maze. Especially if you&apos;re new in this field. But you don&apos;t have to find your way alone. Asim Ali is here as your go-to mortgage broker in Surrey. <br/>We&apos;ll guide you through your whole mortgage journey. Let&apos;s find out what we offer:

            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
            style={{ textDecoration: "none" }}
              href="/services"
              className="inline-block bg-[#f5b14a] hover:bg-[#e9a43c] text-white text-md xl:text-xl font-medium py-3 px-8 text-center min-w-[220px]"
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
                  className="w-[80px] h-[30px] text-[#f5b14a]"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <div className="text-gray-300" dangerouslySetInnerHTML={{__html: service.description}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

