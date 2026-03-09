"use client"

import React from "react"

import { useState } from "react"
import { SiteLayout } from "@/components/site-layout"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Building2,
  Package,
  Truck,
  BadgePercent,
  Check,
  Send,
  Phone,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: BadgePercent,
    title: "Volume Discounts",
    description: "Save up to 40% on large orders",
  },
  {
    icon: Package,
    title: "Custom Printing",
    description: "Add your logo and branding",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary shipping on bulk orders",
  },
  {
    icon: Building2,
    title: "Dedicated Support",
    description: "Personal account manager",
  },
]

const envelopeTypes = [
  "Standard White",
  "Kraft Brown",
  "Colored",
  "Window Envelope",
  "Security Envelope",
  "Custom Printed",
]

const sizes = ["A4", "A5", "DL", "C4", "C5", "Square", "Custom Size"]

export default function BulkOrdersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [customPrinting, setCustomPrinting] = useState("no")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <SiteLayout>
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-in zoom-in">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Request Submitted!
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Thank you for your bulk order inquiry. Our team will review your
                requirements and contact you within 24-48 hours with a customized
                quote.
              </p>
              <div className="mt-8 p-6 bg-secondary rounded-2xl">
                <p className="text-sm text-muted-foreground mb-4">
                  Need immediate assistance?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    +91 98765 43210
                  </a>
                  <a
                    href="mailto:bulk@envelop.in"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    bulk@envelop.in
                  </a>
                </div>
              </div>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="mt-8"
                size="lg"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </section>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Bulk Orders
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get competitive pricing for large volume orders. Perfect for
              businesses, events, and corporate needs. Fill out the form below
              and our team will get back to you with a customized quote.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                Request a Quote
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill in your requirements and we'll prepare a customized quote
                for you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Business Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Business Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Your Company Name"
                        required
                        className="bg-secondary border-0 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        placeholder="Full Name"
                        required
                        className="bg-secondary border-0 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        required
                        className="bg-secondary border-0 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        className="bg-secondary border-0 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Order Requirements
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="envelopeType">Envelope Type *</Label>
                      <Select required>
                        <SelectTrigger className="bg-secondary border-0">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {envelopeTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Size *</Label>
                      <Select required>
                        <SelectTrigger className="bg-secondary border-0">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size} value={size.toLowerCase()}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="color">Color Preference</Label>
                      <Input
                        id="color"
                        placeholder="e.g., White, Brown, Custom color"
                        className="bg-secondary border-0 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (Minimum 500) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="500"
                        placeholder="500"
                        required
                        className="bg-secondary border-0 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Custom Printing Required?</Label>
                    <RadioGroup
                      value={customPrinting}
                      onValueChange={setCustomPrinting}
                      className="flex gap-6"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="printing-yes" />
                        <Label htmlFor="printing-yes" className="font-normal cursor-pointer">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="printing-no" />
                        <Label htmlFor="printing-no" className="font-normal cursor-pointer">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {customPrinting === "yes" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                      <Label htmlFor="printingDetails">
                        Printing Details (Logo, text, colors, etc.)
                      </Label>
                      <Textarea
                        id="printingDetails"
                        placeholder="Please describe your printing requirements..."
                        rows={3}
                        className="bg-secondary border-0 focus-visible:ring-primary resize-none"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any other requirements or questions..."
                      rows={4}
                      className="bg-secondary border-0 focus-visible:ring-primary resize-none"
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) =>
                      setAgreedToTerms(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground font-normal cursor-pointer"
                  >
                    I agree to receive communications regarding my bulk order
                    inquiry. View our Privacy Policy for more information.
                  </Label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={!agreedToTerms || isSubmitting}
                  className={cn(
                    "w-full h-14 text-base font-semibold transition-all",
                    isSubmitting && "opacity-80"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Quote Request
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Prefer to speak with someone directly?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  +91 98765 43210
                </a>
                <a
                  href="mailto:bulk@envelop.in"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  bulk@envelop.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
