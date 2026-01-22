"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products-data"

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
  index: number
}

export function ProductCard({ product, viewMode, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.size,
      color: product.color,
      image: "",
    })
  }

  if (viewMode === "list") {
    return (
      <div
        className="group flex flex-col sm:flex-row bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] sm:aspect-square sm:w-48 bg-muted shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 border-4 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground/50 text-sm">
                {product.color}
              </span>
            </div>
          </div>
          {product.badge && (
            <Badge
              className={cn(
                "absolute top-3 left-3 font-semibold",
                product.badge === "Bestseller" && "bg-primary text-primary-foreground",
                product.badge === "New" && "bg-accent text-accent-foreground",
                product.badge === "Sale" && "bg-destructive text-destructive-foreground",
                product.badge === "Popular" && "bg-foreground text-background"
              )}
            >
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.size} • {product.color}
                </p>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-primary">
                  ₹{product.price}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Button onClick={handleAddToCart} className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Link href={`/products/${product.id}`}>
              <Button variant="outline" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500 border-red-500" : ""}
            >
              <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              product.badge === "Popular" && "bg-foreground text-background",
              product.badge === "Premium" && "bg-amber-500 text-white",
              product.badge === "Custom" && "bg-indigo-500 text-white",
              product.badge === "Wedding" && "bg-pink-500 text-white",
              product.badge === "Eco" && "bg-green-500 text-white",
              product.badge === "Security" && "bg-blue-600 text-white"
            )}
          >
            {product.badge}
          </Badge>
        )}

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          )}
        >
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "h-10 w-10 rounded-full bg-card shadow-md flex items-center justify-center transition-colors",
              isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
            )}
          >
            <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
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
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Button
            onClick={handleAddToCart}
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
            <div className="font-bold text-lg text-primary">₹{product.price}</div>
            {product.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
