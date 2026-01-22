"use client"

import React from "react"

import { useState } from "react"
import { Mail, ArrowRight, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-1" />
          <div className="absolute inset-0 bg-secondary rounded-3xl rotate-1" />

          {/* Content */}
          <div className="relative bg-card rounded-3xl p-8 md:p-14 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5">
                  <Mail className="h-7 w-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Stay in the Loop
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Subscribe for exclusive offers, new product launches, and
                  stationery tips delivered straight to your inbox.
                </p>
              </div>

              {/* Form */}
              <div className="flex-1 w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div
                    className={cn(
                      "relative transition-all duration-300",
                      isFocused && "scale-105"
                    )}
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className="h-14 pl-5 pr-14 text-base bg-secondary border-2 border-transparent focus:border-primary rounded-xl"
                      required
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isSubmitted}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg transition-all",
                        isSubmitted
                          ? "bg-emerald-500 hover:bg-emerald-500"
                          : "bg-primary hover:bg-primary/90"
                      )}
                    >
                      {isSubmitted ? (
                        <Check className="h-5 w-5 text-white animate-in zoom-in" />
                      ) : (
                        <ArrowRight className="h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  {isSubmitted && (
                    <p className="text-sm text-emerald-600 animate-in fade-in slide-in-from-bottom-2">
                      Thank you for subscribing! Check your inbox for a welcome message.
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
