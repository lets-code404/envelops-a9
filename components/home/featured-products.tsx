"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"

const products = [
  {
    id: "1",
    name: "Premium White A4",
    price: 299,
    originalPrice: 399,
    size: "A4",
    color: "White",
    badge: "Bestseller",
    image: "/placeholder-envelope.jpg",
  },
  {
    id: "2",
    name: "Kraft Brown Classic",
    price: 249,
    originalPrice: null,
    size: "A5",
    color: "Brown",
    badge: null,
    image: "/placeholder-envelope.jpg",
  },
  {
    id: "3",
    name: "Royal Blue Matte",
    price: 349,
    originalPrice: 449,
    size: "A4",
    color: "Blue",
    badge: "New",
    image: "/placeholder-envelope.jpg",
  },
  {
    id: "4",
    name: "Vintage Cream",
    price: 279,
    originalPrice: null,
    size: "A5",
    color: "Cream",
    badge: null,
    image: "/placeholder-envelope.jpg",
  },
  {
    id: "5",
    name: "Business Grey",
    price: 329,
    originalPrice: 399,
    size: "A4",
    color: "Grey",
    badge: "Sale",
    image: "/placeholder-envelope.jpg",
  },
  {
    id: "6",
    name: "Coral Pink",
    price: 359,
    originalPrice: null,
    size: "A5",
    color: "Pink",
    badge: "Popular",
    image: "/placeholder-envelope.jpg",
  },
]

export function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  const toggleLike = (id: string) => {
    setLikedProducts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.size,
      color: product.color,
      image: product.image,
    })
  }

  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Featured Collection
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Popular Products
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Our most loved envelopes, handpicked for quality and design.
            </p>
          </div>
          <Link href="/products">
            <Button
              variant="outline"
              className="group border-2 border-foreground/20 hover:bg-foreground hover:text-background bg-transparent"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                {/* Placeholder Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-4 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                    <span className="text-muted-foreground/50 text-sm">
                      {product.color} Envelope
                    </span>
                  </div>
                </div>

                {/* Badge */}
                {product.badge && (
                  <Badge
                    className={cn(
                      "absolute top-4 left-4 font-semibold",
                      product.badge === "Bestseller" && "bg-primary text-primary-foreground",
                      product.badge === "New" && "bg-accent text-accent-foreground",
                      product.badge === "Sale" && "bg-destructive text-destructive-foreground",
                      product.badge === "Popular" && "bg-foreground text-background"
                    )}
                  >
                    {product.badge}
                  </Badge>
                )}

                {/* Quick Actions */}
                <div
                  className={cn(
                    "absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300",
                    hoveredId === product.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  )}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleLike(product.id)
                    }}
                    className={cn(
                      "h-10 w-10 rounded-full bg-card shadow-md flex items-center justify-center transition-colors",
                      likedProducts.has(product.id)
                        ? "text-red-500"
                        : "text-muted-foreground hover:text-red-500"
                    )}
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={likedProducts.has(product.id) ? "currentColor" : "none"}
                    />
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="h-10 w-10 rounded-full bg-card shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                </div>

                {/* Add to Cart Overlay */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent transition-all duration-300",
                    hoveredId === product.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                >
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.size} • {product.color}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-primary">
                      ₹{product.price}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
