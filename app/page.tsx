import { SiteLayout } from "@/components/site-layout"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { TrustIndicators } from "@/components/home/trust-indicators"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <TrustIndicators />
      <TestimonialsSection />
      <NewsletterSection />
    </SiteLayout>
  )
}
