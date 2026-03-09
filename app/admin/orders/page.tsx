"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Calendar, Clock } from "lucide-react"

export default function AdminOrdersPage() {
  const [orders] = useState<{
    id: string
    orderNumber: string
    totalPrice: number
    paymentStatus: string
    orderStatus: string
    createdAt: string
    items: { name: string; quantity: number }[]
  }[]>([])

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">
              No orders yet. Orders will appear here when customers make purchases.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    {order.orderNumber}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                    <Badge className={getStatusColor(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(order.createdAt).toLocaleTimeString("en-IN")}
                  </span>
                  <span className="font-semibold text-foreground">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {order.items.map((item) => `${item.name} (×${item.quantity})`).join(", ")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
