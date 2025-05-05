"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

// Testimonial data (same as before)
const testimonials = [
  {
    id: 1,
    name: "Akeel Mulah",
    text: "Asim and Nav are the best. They go above and beyond. They are very professional and have the friendliest and most positive...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 2,
    name: "Akshar Guha",
    text: "Asim is the most Professional mortgage broker I know. I have very high approval rating with Asim. Him and his team...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 3,
    name: "Asad Sultan",
    text: "We worked with Asim and he did an excellent job explaining every step to us, the entire way. We always felt up to date...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 4,
    name: "Natasha Nesrine",
    text: "I feel really grateful that I stumbled upon this program. I showed it to a bunch of my friends and was like, this is gold!",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 5,
    name: "Tazim Mahmood",
    text: "Asim and his team provide excellent support and guidance throughout the entire mortgage application process...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 6,
    name: "Tahira Muhammadali",
    text: "It was really grateful that I stumbled upon this program. I showed it to a bunch of my friends and this is a great mortgage application process.",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 7,
    name: "Niko A.",
    text: "We had the pleasure of working with Asim Ali and it was a great experience. From start to finish he was there every step...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 8,
    name: "Tazim Md.",
    text: "Asim and his team provided exceptional support and guidance throughout the entire mortgage application process...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 9,
    name: "Akeel Mulah",
    text: "Asim and Nav are the best. They go above and beyond. They are very professional and have the friendliest and most positive...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 10,
    name: "Akshar Guha",
    text: "Asim is the most Professional mortgage broker I know. I have very high approval rating with Asim. Him and his team...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 11,
    name: "Asad Sultan",
    text: "We worked with Asim and he did an excellent job explaining every step to us, the entire way. We always felt up to date...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 12,
    name: "Natasha Nesrine",
    text: "I feel really grateful that I stumbled upon this program. I showed it to a bunch of my friends and was like, this is gold!",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
]

export default function TestimonialSliderRow() {
  const firstRowTestimonials = testimonials.slice(0, 6)
  const secondRowTestimonials = testimonials.slice(6, 12)

  // Create triple-length arrays for infinite scroll
  const allFirstRowTestimonials = [...firstRowTestimonials, ...firstRowTestimonials, ...firstRowTestimonials]
  const allSecondRowTestimonials = [...secondRowTestimonials, ...secondRowTestimonials, ...secondRowTestimonials]

  const firstRowRef = useRef<HTMLDivElement>(null)
  const secondRowRef = useRef<HTMLDivElement>(null)
  const [isMouseOver, setIsMouseOver] = useState(false)
  const [startSecondRow, setStartSecondRow] = useState(false)

  useEffect(() => {
    const firstRow = firstRowRef.current
    const secondRow = secondRowRef.current
    if (!firstRow || !secondRow) return

    let animationId: number
    let lastTimestamp = 0
    const scrollSpeed = 0.5

    // Set initial positions
    firstRow.scrollLeft = firstRow.scrollWidth / 3
    secondRow.scrollLeft = secondRow.scrollWidth / 3

    const animate = (timestamp: number) => {
      if (!isMouseOver) {
        if (timestamp - lastTimestamp > 16) {
          // Animate first row
          firstRow.scrollLeft += scrollSpeed
          if (firstRow.scrollLeft >= (firstRow.scrollWidth / 3) * 2) {
            firstRow.scrollLeft = firstRow.scrollWidth / 3
          }

          // Start second row animation after short delay
          if (!startSecondRow) {
            setStartSecondRow(true)
          }
        }

        // Animate second row with offset
        if (startSecondRow) {
          secondRow.scrollLeft += scrollSpeed
          if (secondRow.scrollLeft >= (secondRow.scrollWidth / 3) * 2) {
            secondRow.scrollLeft = secondRow.scrollWidth / 3
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isMouseOver, startSecondRow])

  return (
    <section className="w-full py-16">
      <div className="">
        <h2 className="!text-xl md:!text-2xl xl:!text-4xl !font-semibold mb-12 text-center font-oswald">What our Happy Clients have to say</h2>

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
              style={{ scrollBehavior: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {allFirstRowTestimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2">
                <div className="bg-transparent backdrop-blur-md p-3 rounded-md border border-white/10 h-full">
                  <p className="text-xs text-black/90 mb-2 line-clamp-2">{testimonial.text}</p>
      
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F0B254] text-[#0a1e3b] font-bold text-[10px]">
                      {testimonial.name.charAt(0)}
                    </div>
                      <span className="text-xs font-medium text-black">{testimonial.name}</span>
                    </div>
                      <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-400">Reviews on</span>
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
              style={{ scrollBehavior: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {allSecondRowTestimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2">
                          <div className="bg-transparent backdrop-blur-sm p-3 rounded-md border border-white/10 h-full">
                            <p className="text-xs text-black/90 mb-2 line-clamp-2">{testimonial.text}</p>
                
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F0B254] text-[#0a1e3b] font-bold text-[10px]">
                                {testimonial.name.charAt(0)}
                              </div>
                                <span className="text-xs font-medium text-black">{testimonial.name}</span>
                              </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-gray-400">Reviews on</span>
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
  )
}