"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const headlines = [
  "Craft Your Message",
  "Seal Every Moment",
  "Deliver Excellence",
]

export function HeroSection() {
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentHeadline((prev) => (prev + 1) % headlines.length)
        setIsAnimating(false)
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-secondary">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Envelope Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-16 h-12 border-2 border-primary/20 rotate-12 animate-float",
              i % 2 === 0 ? "bg-primary/5" : "bg-accent/5"
            )}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Premium Quality Since 2010</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            <span
              className={cn(
                "inline-block transition-all duration-500",
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              )}
            >
              {headlines[currentHeadline]}
            </span>
            <br />
            <span className="text-primary">With Every Envelope</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            From elegant invitations to professional business correspondence, 
            discover envelopes that make every message unforgettable.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
            <Link href="/products">
              <Button
                size="lg"
                className="group h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Shop Envelopes
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/bulk-orders">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold border-2 border-foreground/20 hover:bg-foreground hover:text-background transition-all bg-transparent"
              >
                Bulk Orders
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-700">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "100+", label: "Product Varieties" },
              { value: "15+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
