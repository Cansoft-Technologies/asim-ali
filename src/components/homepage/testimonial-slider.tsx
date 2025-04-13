"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Asad Marsh",
    text: "Working with Asim was a great experience. From start to finish, he guided me through every step...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 2,
    name: "Akshar Guha",
    text: "Asim and Nav are the best. They go above and beyond. They are very professional and have the friendliest and most positive...",
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
    text: '"I feel really grateful that I stumbled upon this program. I showed it to a bunch of my friends and was like, this is gold!"',
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 5,
    name: "Tasim Mahmood",
    text: "Asim and his team provide excellent support and guidance throughout the entire mortgage process...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 6,
    name: "Tasim Mahmood",
    text: "Asim and his team provide excellent support and guidance throughout the entire mortgage process...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 7,
    name: "Tasim Mahmood",
    text: "Asim and his team provide excellent support and guidance throughout the entire mortgage process...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
  {
    id: 8,
    name: "Tasim Mahmood",
    text: "Asim and his team provide excellent support and guidance throughout the entire mortgage process...",
    rating: 5,
    reviewLink: "Reviews on Google",
  },
]

export default function TestimonialSlider() {
  // Create a triple-length array for infinite scroll effect
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials]
  
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isMouseOver, setIsMouseOver] = useState(false)
  
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    
    let animationId: number
    let startTime: number
    let lastTimestamp: number = 0
    
    // Set initial scroll position to the first set of duplicated testimonials
    slider.scrollLeft = slider.scrollWidth / 3
    
    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      
      // Control animation speed
      if (timestamp - lastTimestamp > 16) { // ~60fps
        lastTimestamp = timestamp
        
        if (!isMouseOver) {
          // Increment scroll position for smooth scrolling
          slider.scrollLeft += 0.5 // Adjust speed here
          
          // When we reach the end of the middle set, jump back to the first set
          if (slider.scrollLeft >= (slider.scrollWidth / 3) * 2) {
            slider.scrollLeft = slider.scrollWidth / 3
          }
          
          // If somehow we scroll too far left, reset to the middle
          if (slider.scrollLeft <= 0) {
            slider.scrollLeft = slider.scrollWidth / 3
          }
        }
      }
      
      animationId = requestAnimationFrame(scroll)
    }
    
    animationId = requestAnimationFrame(scroll)
    
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isMouseOver])
  
  return (
    <div 
      className="relative w-full overflow-hidden py-6"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#0a1e3b] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#0a1e3b] to-transparent z-10"></div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 px-20"
        style={{ scrollBehavior: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allTestimonials.map((testimonial, index) => (
          <div key={testimonial.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2">
          <div className="bg-transparent backdrop-blur-sm p-3 rounded-md border border-white/10 h-full">
            <p className="text-xs text-white/90 mb-2 line-clamp-2">{testimonial.text}</p>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F0B254] text-[#0a1e3b] font-bold text-[10px]">
                {testimonial.name.charAt(0)}
              </div>
                <span className="text-xs font-medium text-white">{testimonial.name}</span>
              </div>
                <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">Reviews on</span>
                    <Image 
                      src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/logos_google.png" 
                      alt="Google" 
                      width={50} 
                      height={16}
                      className="h-4 w-auto"
                    />
                  </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}
