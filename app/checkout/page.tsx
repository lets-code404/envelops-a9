"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { SiteLayout } from "@/components/site-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import Link from "next/link"
import { ShieldCheck, Loader2, CreditCard, MapPin } from "lucide-react"

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void }
  }
}

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [address, setAddress] = useState({
    name: session?.user?.name || "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  })

  const shippingCost = totalPrice >= 500 ? 0 : 50
  const tax = Math.round(totalPrice * 0.18)
  const grandTotal = totalPrice + shippingCost + tax

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h1>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </SiteLayout>
    )
  }

  const handlePayment = async () => {
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.state || !address.pincode) {
      toast.error("Please fill in all required address fields")
      return
    }

    if (!session?.user) {
      toast.error("Please login to place an order")
      router.push("/login")
      return
    }

    setIsProcessing(true)

    try {
      // Create order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
          shippingAddress: address,
        }),
      })

      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        toast.error(orderData.error || "Failed to create order")
        return
      }

      // If Razorpay is configured, open payment window
      if (orderData.razorpayOrder) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.razorpayOrder.amount,
          currency: orderData.razorpayOrder.currency,
          name: "Niharika Traders",
          description: `Order ${orderData.order.orderNumber}`,
          order_id: orderData.razorpayOrder.id,
          handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
            // Verify payment
            const verifyRes = await fetch("/api/orders/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            })

            if (verifyRes.ok) {
              toast.success("Payment successful! Order placed.")
              clearCart()
              router.push("/orders")
            } else {
              toast.error("Payment verification failed")
            }
          },
          prefill: {
            name: address.name,
            email: session.user.email,
            contact: address.phone,
          },
          theme: { color: "#8B4513" },
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } else {
        // No Razorpay — just confirm order
        toast.success("Order placed successfully!")
        clearCart()
        router.push("/orders")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <SiteLayout>
      {/* Load Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            {!session?.user && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <p className="text-sm">
                    <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                    {" "}for a faster checkout experience
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line1">Address Line 1 *</Label>
                  <Input
                    id="line1"
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    placeholder="House/Flat No., Street"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line2">Address Line 2</Label>
                  <Input
                    id="line2"
                    value={address.line2}
                    onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                    placeholder="Landmark, Area (optional)"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="State"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="XXXXXX"
                      required
                    />
                  </div>
                </div>
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
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate max-w-[180px]">
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-600" : ""}>
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

                <Button
                  className="w-full h-12 text-base"
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay ₹{grandTotal.toLocaleString("en-IN")}
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Secure payment powered by Razorpay
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
