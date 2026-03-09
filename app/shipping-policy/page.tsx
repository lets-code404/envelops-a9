import { SiteLayout } from "@/components/site-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Policy — Niharika Traders",
  description: "Shipping policy for Niharika Traders - delivery timelines, charges, and tracking information.",
}

export default function ShippingPolicyPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-serif font-bold mb-8">Shipping Policy</h1>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Delivery Coverage</h2>
            <p>We deliver across India through trusted courier partners. Currently, we ship to all major cities and towns with serviceable pin codes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Shipping Charges</h2>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Free Shipping:</strong> On all orders above ₹500</li>
              <li><strong>Standard Shipping:</strong> ₹50 for orders below ₹500</li>
              <li><strong>Express Shipping:</strong> Available at additional cost (calculated at checkout)</li>
              <li><strong>Bulk Orders:</strong> Custom shipping rates — contact us for a quote</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Delivery Timelines</h2>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Standard Delivery:</strong> 5-7 business days</li>
              <li><strong>Express Delivery:</strong> 2-3 business days</li>
              <li><strong>Metro Cities:</strong> 3-5 business days</li>
              <li><strong>Bulk Orders:</strong> 7-14 business days depending on quantity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Order Tracking</h2>
            <p>Once your order is shipped, you will receive a tracking number via email/SMS. You can track your order status from your account page.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Damaged/Lost Shipments</h2>
            <p>In case of damaged or lost shipments, please contact us within 48 hours of delivery at <a href="mailto:hello@envelop.in" className="text-primary hover:underline">hello@envelop.in</a>. We will arrange a replacement or refund.</p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
