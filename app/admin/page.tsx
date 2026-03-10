"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, IndianRupee, FolderTree, Plus, Eye, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    categories: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, ordersRes, categoriesRes] = await Promise.all([
          fetch("/api/products").then((r) => r.json()).catch(() => ({ products: [] })),
          fetch("/api/orders").then((r) => r.json()).catch(() => []),
          fetch("/api/categories").then((r) => r.json()).catch(() => []),
        ])

        const products = productsRes.products || productsRes || []
        const orders = Array.isArray(ordersRes) ? ordersRes : []
        const categories = Array.isArray(categoriesRes) ? categoriesRes : []

        setStats({
          products: products.length,
          orders: orders.length,
          revenue: orders.reduce((sum: number, o: { totalPrice?: number }) => sum + (o.totalPrice || 0), 0),
          categories: categories.length,
        })
      } catch {
        // Use fallback stats
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { title: "Products", value: stats.products, icon: Package, color: "text-blue-600 bg-blue-100", href: "/admin/products" },
    { title: "Orders", value: stats.orders, icon: ShoppingCart, color: "text-green-600 bg-green-100", href: "/admin/orders" },
    { title: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: IndianRupee, color: "text-amber-600 bg-amber-100", href: "/admin/orders" },
    { title: "Categories", value: stats.categories, icon: FolderTree, color: "text-purple-600 bg-purple-100", href: "/admin/categories" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to Niharika Traders admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-6">
            <Link href="/admin/products">
              <Plus className="h-5 w-5" />
              <span>Add Product</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-6">
            <Link href="/admin/orders">
              <Eye className="h-5 w-5" />
              <span>View Orders</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-6">
            <Link href="/admin/analytics">
              <BarChart3 className="h-5 w-5" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
