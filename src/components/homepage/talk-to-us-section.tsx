import { Button } from "components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IoMdCheckboxOutline } from "react-icons/io";

export default function TalkToUsSection() {
  return (
    <section className="w-full bg-[#f8f5f0] py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[600px] w-full overflow-hidden">
            <Image
              src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/Asim-Ali-best-Mortgage-Broker-in-Surrey.webp"
              alt="Mortgage consultation"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="!text-3xl md:!text-4xl !font-bold mb-6 text-[#0a1e3b]">
              The sooner you contact us, the
              <br />
              A sooner we can hold your rate.
            </h2>

            <p className="text-gray-600 mb-8">
              Choosing us as your mortgage broker in Surrey offers you many benefits.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 text-[#0a1e3b]">
                    <IoMdCheckboxOutline className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-start">
                  <p className="text-gray-600">
                    <span className="font-semibold text-[#0a1e3b]">
                      Access to Multiple Lenders:
                    </span>{" "}
                    We connect you with various lenders for more options.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 text-[#0a1e3b]">
                    <IoMdCheckboxOutline className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-start">
                  <p className="text-gray-600">
                    <span className="font-semibold text-[#0a1e3b]">
                      Tailored Mortgage Solutions:
                    </span>{" "}
                    Our efficient process helps you save both time and money.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 text-[#0a1e3b]">
                    <IoMdCheckboxOutline className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-start">
                  <p className="text-gray-600">
                    <span className="font-semibold text-[#0a1e3b]">
                      Saving Time and Money:
                    </span>{" "}
                    Our efficient process helps you save both time and money.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 text-[#0a1e3b]">
                    <IoMdCheckboxOutline className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-start">
                  <p className="text-gray-600">
                    <span className="font-semibold text-[#0a1e3b]">
                      Streamline Process:{" "}
                    </span>
                    We make your mortgage pre-approval easy and set a clear path
                    toward homeownership.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/contact-us">
              <Button className="bg-transparent hover:bg-[#F0B254]/10 text-[#F0B254] font-medium text-2xl capitalize border border-[#F0B254] px-10 py-3 rounded-none">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
