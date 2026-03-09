import { SiteLayout } from "@/components/site-layout"
import { products, categories } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PriceListPage() {
  return (
    <SiteLayout>
      <section className="bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Shagun Envelope Price List & Product Guide
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A comprehensive reference for retailers and wholesalers. Niharika Traders has been a trusted name in Indian Shagun Envelopes since the 1990s, offering premium quality at wholesale rates.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-4 font-semibold border-b border-border">Product Type</th>
                    <th className="p-4 font-semibold border-b border-border">Colours</th>
                    <th className="p-4 font-semibold border-b border-border">Quantity per Box</th>
                    <th className="p-4 font-semibold border-b border-border">Rate (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4 border-b border-border font-medium">{product.name}</td>
                      <td className="p-4 border-b border-border">{product.colors.join(", ")}</td>
                      <td className="p-4 border-b border-border">{product.specifications.packSize}</td>
                      <td className="p-4 border-b border-border text-primary font-bold">₹{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold">Why Choose Niharika Traders?</h2>
              <p className="text-muted-foreground">
                With a legacy spanning over three decades, we specialize in luxury and traditional Indian shagun cards and envelopes. Whether you are a small retailer or a large wholesale distributor, we provide consistent quality and transparent pricing across our entire range.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Wholesale and Retail availability</li>
                <li>Premium paper and handcrafted finishes</li>
                <li>Traditional Indian designs for all occasions</li>
                <li>Reliable delivery across India</li>
              </ul>
            </div>
            <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 flex flex-col items-center justify-center text-center space-y-4">
              <h3 className="text-xl font-bold">Interested in Bulk Orders?</h3>
              <p className="text-muted-foreground">
                We offer special rates for bulk purchases and wholesale distributors. Contact us for custom quotes and distribution inquiries.
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link href="/contact">Enquire for Wholesale</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 space-y-8">
            <h2 className="text-2xl font-serif font-bold text-center">Category Guide</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.filter(c => c.id !== 'all').map((cat) => (
                <div key={cat.id} className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Traditional {cat.name.toLowerCase()} crafted for luxury shagun gifting. Available in multiple colours and premium board qualities.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
