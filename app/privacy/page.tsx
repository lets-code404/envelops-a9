import { SiteLayout } from "@/components/site-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — Niharika Traders",
  description: "Privacy Policy for Niharika Traders - how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-serif font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p className="text-foreground font-medium">Last updated: March 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
            <p>When you visit our website or make a purchase, we collect certain information including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Personal details (name, email address, phone number)</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely through Razorpay)</li>
              <li>Order history and preferences</li>
              <li>Device and browser information for analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>To process and fulfill your orders</li>
              <li>To communicate order updates and shipping details</li>
              <li>To send promotional offers and newsletters (with your consent)</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal data. All payment transactions are processed through Razorpay&apos;s secure payment gateway with SSL encryption.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Third-Party Services</h2>
            <p>We use third-party services for payment processing (Razorpay), analytics, and authentication (Google OAuth). These services have their own privacy policies governing how they handle your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Cookies</h2>
            <p>Our website uses cookies for essential functionality (authentication, cart persistence) and analytics. You can control cookie settings through your browser preferences.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Contact Us</h2>
            <p>For privacy-related inquiries, please contact us at:</p>
            <p className="mt-2">Email: <a href="mailto:hello@envelop.in" className="text-primary hover:underline">hello@envelop.in</a></p>
            <p>Phone: <a href="tel:+919876543210" className="text-primary hover:underline">+91 98765 43210</a></p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
