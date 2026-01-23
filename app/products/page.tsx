"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SiteLayout } from "@/components/site-layout"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { products, categories } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal, X, Grid3X3, LayoutList } from "lucide-react"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import Loading from "./loading"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.includes(p.size))
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color))
    }

    // Price filter
    if (priceRange) {
      result = result.filter(
        (p) => p.price >= priceRange.min && p.price <= priceRange.max
      )
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured - keep original order
        break
    }

    return result
  }, [search, selectedCategory, selectedSizes, selectedColors, priceRange, sortBy])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const clearFilters = () => {
    setSearch("")
    setSelectedCategory("all")
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange(null)
    setCurrentPage(1)
  }

  const hasActiveFilters =
    search ||
    selectedCategory !== "all" ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Our Products
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover our complete range of premium Indian Shagun envelopes. 
              Luxury, tradition, and quality craftsmanship since the 1990s.
              Wholesale and bulk orders available for retail partners.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<Loading />}>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Filters Sidebar */}
              <aside className="hidden lg:block w-72 shrink-0">
                <ProductFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSizes={selectedSizes}
                  setSelectedSizes={setSelectedSizes}
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  clearFilters={clearFilters}
                />
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="pl-10 bg-secondary border-0 focus-visible:ring-primary"
                    />
                  </div>

                  {/* Mobile Filters Button */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        !
                      </span>
                    )}
                  </Button>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] bg-secondary border-0">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name: A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden md:flex items-center gap-1 bg-secondary rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "h-8 w-8",
                        viewMode === "grid" && "bg-card shadow-sm"
                      )}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "h-8 w-8",
                        viewMode === "list" && "bg-card shadow-sm"
                      )}
                    >
                      <LayoutList className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mobile Filters Panel */}
                {showFilters && (
                  <div className="lg:hidden mb-8 p-6 bg-card rounded-xl border border-border animate-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Filters</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowFilters(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <ProductFilters
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      selectedSizes={selectedSizes}
                      setSelectedSizes={setSelectedSizes}
                      selectedColors={selectedColors}
                      setSelectedColors={setSelectedColors}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      clearFilters={clearFilters}
                    />
                  </div>
                )}

                {/* Active Filters */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-sm text-muted-foreground">
                      Active filters:
                    </span>
                    {selectedCategory !== "all" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedCategory("all")}
                        className="h-7 text-xs"
                      >
                        {categories.find((c) => c.id === selectedCategory)?.name}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    {selectedSizes.map((size) => (
                      <Button
                        key={size}
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          setSelectedSizes((prev) => prev.filter((s) => s !== size))
                        }
                        className="h-7 text-xs"
                      >
                        {size}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    ))}
                    {selectedColors.map((color) => (
                      <Button
                        key={color}
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          setSelectedColors((prev) =>
                            prev.filter((c) => c !== color)
                          )
                        }
                        className="h-7 text-xs"
                      >
                        {color}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-7 text-xs text-destructive hover:text-destructive"
                    >
                      Clear all
                    </Button>
                  </div>
                )}

                {/* Results Count */}
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
                  products
                </p>

                {/* Products Grid */}
                {paginatedProducts.length > 0 ? (
                  <div
                    className={cn(
                      "grid gap-6",
                      viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                        : "grid-cols-1"
                    )}
                  >
                    {paginatedProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        viewMode={viewMode}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-lg text-muted-foreground">
                      No products found matching your criteria.
                    </p>
                    <Button onClick={clearFilters} className="mt-4">
                      Clear Filters
                    </Button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(i + 1)}
                        className="h-10 w-10"
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </SiteLayout>
  )
}
