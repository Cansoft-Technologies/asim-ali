"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { apolloClient } from "../lib/apollo";
import { gql } from "@apollo/client";

export default function TestimonialSliderRow() {
  const [testimonials, setTestimonials] = useState<
    { testimonial: string; clientName: string }[]
  >([]);
  const firstRowTestimonials = testimonials.slice(0, 14);
  const secondRowTestimonials = testimonials.slice(15, 30);

  // Create triple-length arrays for infinite scroll
  const allFirstRowTestimonials = [...firstRowTestimonials];
  const allSecondRowTestimonials = [...secondRowTestimonials];

  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [startSecondRow, setStartSecondRow] = useState(false);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await apolloClient.query({
          query: gql`
            query {
              pages(where: { id: 1370 }) {
                nodes {
                  Testimonials {
                    testimonials {
                      testimonial
                      clientName
                    }
                  }
                }
              }
            }
          `,
        });

        const fetchedTestimonials =
          data.pages?.nodes?.[0]?.Testimonials?.testimonials || [];
        setTestimonials(fetchedTestimonials);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const firstRow = firstRowRef.current;
    const secondRow = secondRowRef.current;
    if (!firstRow || !secondRow) return;

    let animationId: number;
    let lastTimestamp = 0;
    const scrollSpeed = 0.5;

    // Set initial positions
    firstRow.scrollLeft = firstRow.scrollWidth / 3;
    secondRow.scrollLeft = secondRow.scrollWidth / 3;

    const animate = (timestamp: number) => {
      if (!isMouseOver) {
        if (timestamp - lastTimestamp > 16) {
          // Animate first row
          firstRow.scrollLeft += scrollSpeed;
          if (firstRow.scrollLeft >= (firstRow.scrollWidth / 3) * 2) {
            firstRow.scrollLeft = firstRow.scrollWidth / 3;
          }

          // Start second row animation after short delay
          if (!startSecondRow) {
            setStartSecondRow(true);
          }
        }

        // Animate second row with offset
        if (startSecondRow) {
          secondRow.scrollLeft += scrollSpeed;
          if (secondRow.scrollLeft >= (secondRow.scrollWidth / 3) * 2) {
            secondRow.scrollLeft = secondRow.scrollWidth / 3;
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isMouseOver, startSecondRow]);

  return (
    <section className="w-full py-16">
      <div className="">
        <div className="!text-xl md:!text-2xl xl:!text-4xl !font-semibold mb-12 text-center font-oswald">
          What our Happy Clients have to say
        </div>

        <div
          className="relative w-full overflow-hidden mt-10"
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          {/* First row */}
          <div className="mb-6 relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <div
              ref={firstRowRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 px-6"
              style={{
                scrollBehavior: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {allFirstRowTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2"
                >
                  <div className="bg-transparent backdrop-blur-md p-3 rounded-md border border-white/10 h-full">
                    <p className="text-sm text-black/90 mb-2 line-clamp-2">
                      {testimonial?.testimonial}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F0B254] text-[#0a1e3b] font-bold text-[10px] uppercase">
                          {testimonial?.clientName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-black">
                          {testimonial?.clientName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-400">
                          Reviews on
                        </span>
                        <Image
                          src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/google.png"
                          alt="Google"
                          width={50}
                          height={16}
                          className="h-8 w-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second row */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <div
              ref={secondRowRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 px-6"
              style={{
                scrollBehavior: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {allSecondRowTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2"
                >
                  <div className="bg-transparent backdrop-blur-sm p-3 rounded-md border border-white/10 h-full">
                    <p className="text-sm text-black/90 mb-2 line-clamp-2">
                      {testimonial?.testimonial}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F0B254] text-[#0a1e3b] font-bold text-[10px] uppercase">
                          {testimonial?.clientName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-black">
                          {testimonial.clientName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-400">
                          Reviews on
                        </span>
                        <Image
                          src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/google.png"
                          alt="Google"
                          width={50}
                          height={16}
                          className="h-8 w-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
