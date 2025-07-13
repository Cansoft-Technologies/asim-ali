"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { apolloClient } from "../../lib/apollo";
import { gql } from "@apollo/client";

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState<
    { testimonial: string; clientName: string }[]
  >([]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

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

        const fetchedTestimonials = (
          data.pages?.nodes?.[0]?.Testimonials?.testimonials || []
        ).slice(0, 10);
        setTestimonials(fetchedTestimonials);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Create a triple-length array for infinite scroll effect
  const allTestimonials = [...testimonials];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId: number;
    let startTime: number;
    let lastTimestamp: number = 0;

    slider.scrollLeft = slider.scrollWidth / 3;

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      if (timestamp - lastTimestamp > 16) {
        lastTimestamp = timestamp;

        if (!isMouseOver) {
          slider.scrollLeft += 0.5;

          if (slider.scrollLeft >= (slider.scrollWidth / 3) * 2) {
            slider.scrollLeft = slider.scrollWidth / 3;
          }

          if (slider.scrollLeft <= 0) {
            slider.scrollLeft = slider.scrollWidth / 3;
          }
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isMouseOver]);

  return (
    <div
      className="relative w-full overflow-hidden py-6"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#0a1e3b] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#0a1e3b] to-transparent z-10"></div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 px-20"
        style={{
          scrollBehavior: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {allTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.clientName}-${index}`}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2"
          >
            <div className="bg-transparent backdrop-blur-sm p-3 rounded-md border border-white/10 h-full">
              <p className="text-sm text-white/90 mb-2 line-clamp-2">
                {testimonial.testimonial}
              </p>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F0B254] text-[#0a1e3b] font-bold text-[10px] uppercase">
                    {testimonial.clientName.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {testimonial.clientName}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-400">Reviews on</span>
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
  );
}
