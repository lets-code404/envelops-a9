import { SiteLayout } from "@/components/site-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy — Niharika Traders",
  description: "Refund and return policy for Niharika Traders products.",
}

export default function RefundPolicyPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-serif font-bold mb-8">Refund & Return Policy</h1>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Return Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Returns are accepted within <strong>7 days</strong> of delivery</li>
              <li>Items must be unused, undamaged, and in original packaging</li>
              <li>Custom/personalized orders are <strong>non-returnable</strong></li>
              <li>Bulk orders with quantities over 500 units have separate return terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">How to Request a Return</h2>
            <ol className="list-decimal pl-6 space-y-2 mt-3">
              <li>Email us at <a href="mailto:hello@envelop.in" className="text-primary hover:underline">hello@envelop.in</a> with your order number</li>
              <li>Our team will review and approve the return request within 24 hours</li>
              <li>Ship the product back using the provided return label</li>
              <li>Refund will be processed after quality inspection</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Refund Process</h2>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Refunds are processed within <strong>5-7 business days</strong> after we receive the returned item</li>
              <li>Refund will be credited to the original payment method</li>
              <li>Shipping charges are non-refundable unless the return is due to our error</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Exchanges</h2>
            <p>We offer exchanges for defective or damaged products. Contact us within 48 hours of delivery with photos of the damaged item, and we will ship a replacement at no additional cost.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Cancellations</h2>
            <p>Orders can be cancelled within 24 hours of placement if they have not been shipped yet. Full refund will be processed for eligible cancellations.</p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
