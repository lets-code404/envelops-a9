"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteLayout } from "@/components/site-layout"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products-data"

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState(product.size)
  const [selectedColor, setSelectedColor] = useState(product.color)
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const images = [1, 2, 3, 4]

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: "",
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-4 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground/50">
                      Image {currentImage + 1}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentImage((p) => (p === 0 ? images.length - 1 : p - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentImage((p) => (p === images.length - 1 ? 0 : p + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-semibold">
                    {product.badge}
                  </Badge>
                )}
              </div>

              <div className="flex gap-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={cn(
                      "aspect-square w-20 rounded-lg bg-muted flex items-center justify-center border-2 transition-all",
                      currentImage === index ? "border-primary" : "border-transparent hover:border-primary/50"
                    )}
                  >
                    <span className="text-xs text-muted-foreground">{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                  {product.name}
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">{product.description}</p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Save ₹{product.originalPrice - product.price}
                    </Badge>
                  </>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-6 py-3 rounded-lg font-medium border-2 transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Color: {selectedColor}
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-12 h-12 rounded-full border-4 transition-all relative",
                        selectedColor === color
                          ? "border-primary scale-110"
                          : "border-transparent hover:scale-105",
                        color === "White" && "bg-white shadow-md",
                        color === "Cream" && "bg-amber-50 shadow-md",
                        color === "Grey" && "bg-gray-400",
                        color === "Brown" && "bg-amber-700",
                        color === "Tan" && "bg-amber-600",
                        color === "Natural" && "bg-amber-200",
                        color === "Blue" && "bg-blue-500",
                        color === "Navy" && "bg-blue-900",
                        color === "Teal" && "bg-teal-500",
                        color === "Ivory" && "bg-amber-100",
                        color === "Pearl" && "bg-gradient-to-br from-pink-100 to-blue-100",
                        color === "Charcoal" && "bg-gray-700",
                        color === "Silver" && "bg-gray-300",
                        color === "Pink" && "bg-pink-400",
                        color === "Coral" && "bg-orange-400",
                        color === "Blush" && "bg-pink-200",
                        color === "Black" && "bg-gray-900",
                        color === "Onyx" && "bg-gray-950",
                        color === "Kraft" && "bg-amber-600"
                      )}
                    >
                      {selectedColor === color && (
                        <Check
                          className={cn(
                            "absolute inset-0 m-auto h-5 w-5",
                            ["White", "Cream", "Ivory", "Pearl", "Silver", "Blush"].includes(color)
                              ? "text-foreground"
                              : "text-white"
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-12 w-12 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-12 w-12 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.specifications.packSize}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={cn(
                    "flex-1 h-14 text-base font-semibold transition-all",
                    addedToCart && "bg-green-500 hover:bg-green-500"
                  )}
                >
                  {addedToCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 px-8 text-base font-semibold">
                  <Link href="/contact">Enquire for Bulk</Link>
                </Button>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="text-sm font-medium text-primary">Wholesale / Bulk Available</p>
                <p className="text-xs text-muted-foreground mt-1">Perfect for weddings, shagun, and corporate gifting. Contact us for wholesale rates.</p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">Secure Payment</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start bg-secondary rounded-lg p-1">
                <TabsTrigger value="description" className="flex-1 md:flex-none">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specifications" className="flex-1 md:flex-none">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1 md:flex-none">
                  Shipping
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Our {product.name} is crafted with attention to detail and made from high-quality
                    materials to ensure your correspondence makes the perfect impression. Whether
                    you&apos;re sending business documents, invitations, or personal letters, this
                    envelope provides the professional finish you need.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We offer free shipping on all orders above ₹500. Standard delivery takes 3-5
                    business days across India.
                  </p>
                  <p>
                    Express delivery is available at an additional cost with delivery within 1-2
                    business days in metro cities.
                  </p>
                  <p>
                    All orders are carefully packaged to ensure your envelopes arrive in perfect
                    condition.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      <div className="w-3/4 h-3/4 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                        <span className="text-muted-foreground/50 text-xs">
                          {relatedProduct.color}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-primary font-bold mt-1">₹{relatedProduct.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}
