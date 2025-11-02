"use client";

import { Button } from "components/ui/button";
import Link from "next/link";

interface MapSectionProps {
  scheduleSection?: {
    visitTitle?: string;
    visitDescription?: string;
  };
}

export default function MapSection({ scheduleSection }: MapSectionProps) {
  const locations = [
    {
      name: "Abbotsford",
      top: 75,
      left: 25,
      url: "/mortgage-broker-in-abbotsford",
    },
    {
      name: "Aberdeen",
      top: 40,
      left: 30,
      url: "/mortgage-broker-in-aberdeen",
    },
   
    { name: "Burnaby", top: 65, left: 20, url: "/mortgage-broker-in-burnaby" },
    {
      name: "Campbell River",
      top: 30,
      left: 15,
      url: "/mortgage-broker-in-campbell-river",
    },
    {
      name: "Chilliwack",
      top: 72,
      left: 35,
      url: "/trusted-mortgage-broker-in-chilliwack",
    },
    {
      name: "Coquitlam",
      top: 62,
      left: 22,
      url: "/mortgage-broker-in-coquitlam",
    },
    { name: "Delta", top: 70, left: 18, url: "/mortgage-brokers-in-delta" },
    { name: "Hope", top: 68, left: 45, url: "/hope-mortgage-broker" },
    {
      name: "Kamloops",
      top: 45,
      left: 50,
      url: "/mortgage-brokers-in-kamloops",
    },
    { name: "Kelowna", top: 55, left: 60, url: "/mortgage-brokers-in-kelowna" },
    { name: "Langley", top: 75, left: 22, url: "/langley-mortgage-broker" },
    { name: "Nanaimo", top: 45, left: 10, url: "/mortgage-broker-in-nanaimo" },
    {
      name: "Prince George",
      top: 15,
      left: 55,
      url: "/mortgage-brokers-in-prince-george",
    },
    {
      name: "White Rock",
      top: 80,
      left: 20,
      url: "/mortgage-broker-in-white-rock",
    },
    {
      name: "Vancouver",
      top: 65,
      left: 15,
      url: "/mortgage-broker-in-vancouver",
    },
  ];

  return (
    <section className="w-full bg-[#f8f5f0] py-16 md:py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center items-start border-1 border-black mt-12">
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5220.829340331075!2d-122.843247!3d49.1357508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d162fec05fd5%3A0x44d696e4c0940576!2sMortgage%20Broker%20Surrey%20-%20Asim%20Ali!5e0!3m2!1sen!2sbd!4v1749630202672!5m2!1sen!2sbd"
              title="Asim Ali"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
            ></iframe> */}
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167164.5600369382!2d-122.57063425000001!3d49.106661550000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4d1fb95a6918b3%3A0x476b7cdef746c3ea!2sLangley%20Mortgage%20Broker%20-%20Asim%20Ali!5e0!3m2!1sen!2sbd!4v1761761594771!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Asim Ali"
            ></iframe>

          </div>
          <div className="flex flex-col justify-center items-start mt-12">
            <div className="mt-12">
              <h3 className="text-xl md:text-2xl xl:text-4xl font-bold mb-4 font-oswald">
                {scheduleSection?.visitTitle ||
                  "Visit our Head office in Surrey"}
              </h3>
              <p
                className="text-gray-600 mb-6"
                dangerouslySetInnerHTML={{
                  __html:
                    scheduleSection?.visitDescription ||
                    `Connect with the best mortgage broker in Surrey. Get expert
                advice, competitive rates, and customized solutions. Contact us
                now.`,
                }}
              ></p>

              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Link href={location?.url} key={location?.name}>
                    <Button
                      variant="outline"
                      className="border-gray-300 hover:bg-[#0a1e3b] hover:text-white text-[#0a1e3b] py-2 px-4 rounded-none"
                    >
                      {location?.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

