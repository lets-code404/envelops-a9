"use client"

import { useCart } from "@/context/cart-context"
import { SiteLayout } from "@/components/site-layout"
import { CartItemRow } from "@/components/ui/cart-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react"

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart()

  const shippingCost = totalPrice >= 500 ? 0 : 50
  const tax = Math.round(totalPrice * 0.18)
  const grandTotal = totalPrice + shippingCost + tax

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added any products yet
            </p>
            <Button asChild size="lg">
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Cart Items ({totalItems})</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                </CardHeader>
                <CardContent>
                  {items.map((item) => (
                    <CartItemRow key={`${item.id}-${item.size}-${item.color}`} item={item} />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                      {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{tax.toLocaleString("en-IN")}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-muted-foreground text-center">
                      Free shipping on orders above ₹500
                    </p>
                  )}
                  <Button asChild className="w-full h-12 text-base" size="lg">
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
