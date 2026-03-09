import { SiteLayout } from "@/components/site-layout"
import { products, categories } from "@/lib/products-data"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find((c) => c.id === slug)
  if (!category) return { title: "Category Not Found" }
  return {
    title: `${category.name} — Niharika Traders`,
    description: (category as { description?: string }).description || `Browse ${category.name} at Niharika Traders`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find((c) => c.id === slug)

  if (!category || category.id === "all") {
    notFound()
  }

  const categoryProducts = products.filter((p) => p.category === slug)

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          {" / "}
          <Link href="/categories" className="hover:text-primary">Categories</Link>
          {" / "}
          <span className="text-foreground">{category.name}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">{category.name}</h1>
          {"description" in category && (
            <p className="text-muted-foreground text-lg">
              {(category as { description?: string }).description}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No products in this category yet</p>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-muted/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                    <span className="text-6xl opacity-20">✉</span>
                  </div>
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 z-10">{product.badge}</Badge>
                  )}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="rounded-full shadow-lg">
                      <ShoppingCart className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-primary">₹{product.price}</span>
                    <span className="text-xs text-muted-foreground">per {product.specifications.packSize}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
