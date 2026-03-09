import { SiteLayout } from "@/components/site-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions — Niharika Traders",
  description: "Terms and Conditions for using the Niharika Traders website and purchasing our products.",
}

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-serif font-bold mb-8">Terms & Conditions</h1>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p className="text-foreground font-medium">Last updated: March 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. General Terms</h2>
            <p>By accessing and using the Niharika Traders website, you agree to these terms and conditions. We reserve the right to modify these terms at any time without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Products & Pricing</h2>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise</li>
              <li>Product images are for representation; actual colors and textures may vary slightly</li>
              <li>We reserve the right to modify prices without prior notice</li>
              <li>Minimum order quantities may apply for certain products</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Orders & Payment</h2>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>An order is confirmed only after successful payment</li>
              <li>We accept payments through Razorpay (UPI, cards, net banking, wallets)</li>
              <li>Order cancellation is possible within 24 hours of placement if the order has not been shipped</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Shipping</h2>
            <p>Free shipping on orders above ₹500. Standard delivery takes 5-7 business days within India. Express shipping options available at additional cost.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Intellectual Property</h2>
            <p>All content on this website, including logos, images, text, and design elements, is the property of Niharika Traders and is protected by intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:hello@envelop.in" className="text-primary hover:underline">hello@envelop.in</a></p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
