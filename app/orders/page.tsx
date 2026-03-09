"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SiteLayout } from "@/components/site-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, ShoppingBag, Calendar, CreditCard } from "lucide-react"

interface Order {
  id: string
  orderNumber: string
  totalPrice: number
  paymentStatus: string
  orderStatus: string
  createdAt: string
  items: { id: string; name: string; price: number; quantity: number }[]
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated") {
      fetchOrders()
    }
  }, [status, router])

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders")
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800"
      case "processing": return "bg-blue-100 text-blue-800"
      case "shipped": return "bg-purple-100 text-purple-800"
      case "delivered": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (!session?.user) return null

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-serif font-bold mb-8">My Orders</h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6 h-32" />
              </Card>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Button asChild size="lg">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-primary" />
                        <span className="font-semibold">{order.orderNumber}</span>
                        <Badge className={getStatusColor(order.orderStatus)}>
                          {order.orderStatus}
                        </Badge>
                        <Badge className={getStatusColor(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          ₹{order.totalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}:
                        {" "}
                        {order.items.map((item) => `${item.name} (×${item.quantity})`).join(", ")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
