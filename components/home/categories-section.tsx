"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: "a4",
    name: "A4 Envelopes",
    description: "Perfect for documents & reports",
    count: "24 Products",
    color: "bg-amber-100",
    hoverColor: "group-hover:bg-amber-200",
  },
  {
    id: "a5",
    name: "A5 Envelopes",
    description: "Ideal for letters & cards",
    count: "18 Products",
    color: "bg-rose-100",
    hoverColor: "group-hover:bg-rose-200",
  },
  {
    id: "brown",
    name: "Brown Kraft",
    description: "Classic & eco-friendly",
    count: "32 Products",
    color: "bg-orange-100",
    hoverColor: "group-hover:bg-orange-200",
  },
  {
    id: "colored",
    name: "Colored",
    description: "Vibrant & eye-catching",
    count: "45 Products",
    color: "bg-teal-100",
    hoverColor: "group-hover:bg-teal-200",
  },
  {
    id: "printed",
    name: "Printed",
    description: "Custom designs available",
    count: "28 Products",
    color: "bg-indigo-100",
    hoverColor: "group-hover:bg-indigo-200",
  },
]

export function CategoriesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Categories
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
            Shop by Type
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Find the perfect envelope for every occasion. Browse our curated collection
            of premium quality envelopes.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  "relative h-64 rounded-2xl p-6 transition-all duration-500 overflow-hidden",
                  category.color,
                  category.hoverColor,
                  hoveredIndex === index ? "scale-105 shadow-2xl" : "scale-100 shadow-md"
                )}
              >
                {/* Envelope Shape Decoration */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 border-4 border-foreground/10 rotate-12 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-medium text-foreground/60 tracking-wider uppercase">
                      {category.count}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-foreground">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/70">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
