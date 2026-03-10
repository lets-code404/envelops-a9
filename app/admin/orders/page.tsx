"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface Order {
  id: string
  orderNumber: string
  totalPrice: number
  status: string
  createdAt: string
  items: { name: string; quantity: number; price: number }[]
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders")
        const data = await res.json()
        setOrders(Array.isArray(data) ? data : [])
      } catch {
        // Failed to fetch
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded w-48" />
        {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />)}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold">Orders</h1>
        <p className="text-muted-foreground">{orders.length} orders total</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
            <p className="text-muted-foreground">Orders will appear here when customers place them.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{order.orderNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={statusColors[order.status] || "bg-gray-100 text-gray-800"}>
                      {order.status}
                    </Badge>
                    <p className="text-sm font-semibold mt-1">₹{order.totalPrice.toLocaleString()}</p>
                  </div>
                </div>
                {order.items && order.items.length > 0 && (
                  <div className="text-xs text-muted-foreground border-t pt-2 mt-2">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} ×{item.quantity}
                        {i < order.items.length - 1 ? " • " : ""}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
