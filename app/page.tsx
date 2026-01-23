import { SiteLayout } from "@/components/site-layout"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { TrustIndicators } from "@/components/home/trust-indicators"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <SiteLayout>
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
        Serving Luxury & Tradition Since the 1990s • Nationwide Delivery in India
      </div>
      <HeroSection />
      
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Wholesale & Bulk Inquiries</h2>
            <p className="text-muted-foreground">Get exclusive pricing for retail stores and bulk requirements. Our heritage of 30+ years ensures quality and trust.</p>
          </div>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/price-list">View Wholesale Price List</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact for Bulk</Link>
            </Button>
          </div>
        </div>
      </section>

      <CategoriesSection />
      <FeaturedProducts />
      <TrustIndicators />
      <TestimonialsSection />
      <NewsletterSection />
    </SiteLayout>
  )
}
