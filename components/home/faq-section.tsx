"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What types of envelopes do you offer?",
    answer:
      "We offer a wide range of premium Indian shagun envelopes including Basic & Economy, Printed & Decorative, Premium & Fancy, and Gaddi Box & Special Occasion envelopes. Each category is designed for specific gifting needs.",
  },
  {
    question: "Do you offer bulk/wholesale pricing?",
    answer:
      "Yes! We specialize in wholesale and bulk orders. Contact us directly or visit our Price List page for exclusive bulk pricing. We offer special rates for retail stores, wedding planners, and large quantity orders.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping within India takes 5-7 business days. Express shipping options are available for 2-3 day delivery. For bulk orders, delivery timelines may vary — contact us for specific estimates.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods through Razorpay including UPI, credit/debit cards, net banking, and popular wallets like Paytm and PhonePe. Cash on Delivery is available for select pin codes.",
  },
  {
    question: "Can I customize envelopes with my own design?",
    answer:
      "Yes, we offer custom printing and design services for bulk orders (minimum 500 pieces). Contact us with your requirements and our design team will work with you to create the perfect envelope.",
  },
  {
    question: "What is your return/refund policy?",
    answer:
      "We accept returns within 7 days of delivery for unused and undamaged items in original packaging. Custom orders are non-returnable. Refunds are processed within 5-7 business days after we receive the return.",
  },
]

export function FAQSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about our products and services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-base hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
