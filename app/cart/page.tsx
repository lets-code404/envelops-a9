"use client"

import { useCart } from "@/context/cart-context"
import { SiteLayout } from "@/components/site-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CartItemRow } from "@/components/ui/cart-item"
import Link from "next/link"
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react"

export default function CartPage() {
  const { items, clearCart, totalItems, totalPrice } = useCart()

  const shippingPrice = totalPrice >= 500 ? 0 : 50
  const taxPrice = Math.round(totalPrice * 0.18)
  const grandTotal = totalPrice + shippingPrice + taxPrice

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-foreground">Your Cart is Empty</h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Looks like you haven&apos;t added any items yet. Browse our collection to find the perfect shagun envelopes.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemRow key={`${item.id}-${item.size}-${item.color}`} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold font-serif">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{shippingPrice === 0 ? "Free" : `₹${shippingPrice}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-medium">₹{taxPrice.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
                {shippingPrice === 0 && (
                  <p className="text-xs text-green-600 bg-green-50 p-2 rounded-lg text-center">
                    🎉 You qualify for free shipping!
                  </p>
                )}
                <Button asChild className="w-full h-12 text-base">
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
