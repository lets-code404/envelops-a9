import { SiteLayout } from "@/components/site-layout"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { TrustIndicators } from "@/components/home/trust-indicators"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { FAQSection } from "@/components/home/faq-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <SiteLayout>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
        🎉 Serving Luxury & Tradition Since the 1990s • Free Shipping Above ₹500 • Nationwide Delivery
      </div>
      <HeroSection />
      <TrustIndicators />
      <CategoriesSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <FAQSection />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Ready to Place Your Order?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection or get in touch for bulk pricing and custom requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link href="/bulk-orders">Bulk Order Inquiry</Link>
            </Button>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </SiteLayout>
  )
}
