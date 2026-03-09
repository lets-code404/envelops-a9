"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Event Planner",
    company: "Dream Events Co.",
    content:
      "The quality of envelopes from Envelop is exceptional. Our clients always compliment the beautiful invitations, and it starts with the envelope! Fast delivery and excellent customer service.",
    rating: 5,
    avatar: "PS",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Office Manager",
    company: "TechCorp India",
    content:
      "We've been ordering bulk envelopes for our corporate communications for over 3 years. Consistent quality, competitive pricing, and reliable delivery every single time.",
    rating: 5,
    avatar: "RK",
  },
  {
    id: 3,
    name: "Anita Patel",
    role: "Small Business Owner",
    company: "Anita's Boutique",
    content:
      "The colored envelopes I ordered for my boutique packaging were exactly what I needed. The vibrant colors and premium paper quality make my products stand out!",
    rating: 5,
    avatar: "AP",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "HR Director",
    company: "Global Solutions Ltd.",
    content:
      "For our company's official correspondence, we trust only Envelop. Professional look, secure closure, and the custom printing option is a game-changer.",
    rating: 5,
    avatar: "VS",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  useEffect(() => {
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 md:py-28 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto relative">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Quote className="h-8 w-8 text-primary" />
          </div>

          <div className="bg-background/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Content */}
            <div
              key={currentIndex}
              className={cn(
                "animate-in fade-in duration-500",
                direction > 0 ? "slide-in-from-right-4" : "slide-in-from-left-4"
              )}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg md:text-xl text-center leading-relaxed mb-8 text-background/90">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-3">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-background/70">
                    {testimonials[currentIndex].role},{" "}
                    {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={prev}
                className="h-12 w-12 rounded-full bg-background/10 hover:bg-background/20 text-background"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-background/30 hover:bg-background/50"
                    )}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={next}
                className="h-12 w-12 rounded-full bg-background/10 hover:bg-background/20 text-background"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
