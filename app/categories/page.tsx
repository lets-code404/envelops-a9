import { SiteLayout } from "@/components/site-layout"
import Link from "next/link"
import { categories } from "@/lib/products-data"

export const metadata = {
  title: "Categories — Niharika Traders",
  description: "Browse our collection of premium Indian shagun envelopes by category.",
}

export default function CategoriesPage() {
  const displayCategories = categories.filter((c) => c.id !== "all")
  const categoryImages = [
    "linear-gradient(135deg, #f5e6d3 0%, #e8d4b8 100%)",
    "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
    "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
    "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)",
  ]

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Shop by Category</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of premium Indian shagun envelopes for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayCategories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="group relative overflow-hidden rounded-2xl h-64 flex items-end p-8 transition-transform hover:scale-[1.02]"
              style={{ background: categoryImages[i % categoryImages.length] }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="relative z-10 text-white">
                <h2 className="text-2xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                  {cat.name}
                </h2>
                {"description" in cat && (
                  <p className="text-white/80 text-sm max-w-xs">
                    {(cat as { description?: string }).description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
