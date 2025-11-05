import Link from "next/link";
import React from "react";
import { Button } from "components/ui/button";

const MapSection = () => {
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
    {
      name: "Aldergrove East",
      top: 78,
      left: 28,
      url: "/aldergrove-east-mortgage-broker",
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-24">
      <div className="flex flex-col justify-center items-start border-1 border-black mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5220.829340331075!2d-122.843247!3d49.1357508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d162fec05fd5%3A0x44d696e4c0940576!2sMortgage%20Broker%20Surrey%20-%20Asim%20Ali!5e0!3m2!1sen!2sbd!4v1749630202672!5m2!1sen!2sbd"
          title="Asim Ali"
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className="flex flex-col justify-center items-start mt-12">
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl xl:text-4xl font-bold mb-4 font-oswald">
            {"Visit our Head office in Surrey"}
          </h2>
          <p
            className="text-gray-600 mb-6"
            dangerouslySetInnerHTML={{
              __html: `Connect with the best mortgage broker in Surrey. Get expert
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
  );
};

export default MapSection;
