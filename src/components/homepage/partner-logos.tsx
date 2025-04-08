import Image from "next/image"

export default function PartnerLogos() {
  const partners = [
    { name: "CEO.CA", logo: "https://asimaliprod.wpengine.com/wp-content/uploads/2023/08/CEO-.ca_.png", width: 120 },
    { name: "Digital Journal", logo: "https://asimaliprod.wpengine.com/wp-content/uploads/2023/08/Digital-Journal.png", width: 120 },
    { name: "AP", logo: "https://asimaliprod.wpengine.com/wp-content/uploads/2023/08/AP.png", width: 80 },
    { name: "The Globe and Mail", logo: "https://asimaliprod.wpengine.com/wp-content/uploads/2023/08/the-globe-_-mail.png", width: 120 },
    { name: "MarketWatch", logo: "https://asimaliprod.wpengine.com/wp-content/uploads/2023/08/market-watch.png", width: 180 },
    { name: "Yahoo Finance", logo: "https://asimaliprod.wpengine.com/wp-content/uploads/2023/08/yahoo-finance.png", width: 120 },
  ]

  return (
    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
      {partners.map((partner) => (
        <div key={partner.name} className="grayscale opacity-80 hover:opacity-100 transition-opacity">
          <Image
            src={partner.logo || "/placeholder.svg"}
            alt={partner.name}
            width={partner.width}
            height={40}
            className="h-30 w-auto"
          />
        </div>
      ))}
    </div>
  )
}

