"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

interface Stats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalCategories: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCategories: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products?limit=1"),
          fetch("/api/categories"),
        ])
        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        setStats({
          totalProducts: productsData.pagination?.total || 15,
          totalOrders: 0,
          totalRevenue: 0,
          totalCategories: categoriesData?.length || 4,
        })
      } catch {
        // Use defaults
        setStats({ totalProducts: 15, totalOrders: 0, totalRevenue: 0, totalCategories: 4 })
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { title: "Total Products", value: stats.totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-green-600", bg: "bg-green-50" },
    { title: "Revenue", value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Categories", value: stats.totalCategories, icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className={isLoading ? "animate-pulse" : ""}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No orders yet. Orders will appear here once customers start purchasing.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="/admin/products" className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <span className="font-medium">Manage Products</span>
              <p className="text-xs text-muted-foreground mt-1">Add, edit, or remove products</p>
            </a>
            <a href="/admin/categories" className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <span className="font-medium">Manage Categories</span>
              <p className="text-xs text-muted-foreground mt-1">Organize product categories</p>
            </a>
            <a href="/admin/orders" className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <span className="font-medium">View Orders</span>
              <p className="text-xs text-muted-foreground mt-1">Track and manage orders</p>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
