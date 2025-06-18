import Image from "next/image"

export default function PartnerLogos({partnerLogoSection}: { partnerLogoSection?: any }) {
  const partners = partnerLogoSection?.partnerLogo || [];

  return (
    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
      {partners.map((partner,index) => (
        <div key={index} className="grayscale opacity-80 hover:opacity-100 transition-opacity">
          <Image
            src={partner.sourceUrl || "/placeholder.svg"}
            alt={partner.altText || partner.name}
            width={120}
            height={40}
            loading="lazy"
            className="h-30 w-auto"
          />
        </div>
      ))}
    </div>
  )
}

