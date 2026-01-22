"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Eye,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "Rs. 4,52,890",
    change: "+12.5%",
    trend: "up",
    icon: IndianRupee,
    color: "primary",
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "accent",
  },
  {
    title: "Products Sold",
    value: "15,492",
    change: "+23.1%",
    trend: "up",
    icon: Package,
    color: "primary",
  },
  {
    title: "New Customers",
    value: "342",
    change: "-2.4%",
    trend: "down",
    icon: Users,
    color: "accent",
  },
];

const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "Raj Enterprises",
    products: "Business Envelopes x 500",
    total: "Rs. 12,500",
    status: "processing",
    date: "2 hours ago",
  },
  {
    id: "ORD-2024-002",
    customer: "Priya Sharma",
    products: "Wedding Invites x 100",
    total: "Rs. 8,900",
    status: "shipped",
    date: "4 hours ago",
  },
  {
    id: "ORD-2024-003",
    customer: "Tech Solutions Ltd",
    products: "A4 Envelopes x 1000",
    total: "Rs. 22,000",
    status: "delivered",
    date: "1 day ago",
  },
  {
    id: "ORD-2024-004",
    customer: "Amit Patel",
    products: "Gift Envelopes x 50",
    total: "Rs. 1,250",
    status: "pending",
    date: "1 day ago",
  },
  {
    id: "ORD-2024-005",
    customer: "Global Corp",
    products: "Custom Printed x 2000",
    total: "Rs. 45,000",
    status: "processing",
    date: "2 days ago",
  },
];

const topProducts = [
  { name: "Premium White A4", sales: 2842, revenue: "Rs. 1,42,100", growth: 15 },
  { name: "Kraft Brown C5", sales: 2156, revenue: "Rs. 86,240", growth: 23 },
  { name: "Wedding Gold Pack", sales: 1892, revenue: "Rs. 1,89,200", growth: 8 },
  { name: "Business Blue DL", sales: 1654, revenue: "Rs. 49,620", growth: -5 },
];

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here is your store overview.</p>
        </div>
        <div className="flex items-center gap-2">
          {["24h", "7d", "30d", "12m"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      stat.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                    }`}
                  >
                    <stat.icon
                      className={`w-6 h-6 ${
                        stat.color === "primary" ? "text-primary" : "text-accent"
                      }`}
                    />
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${
                      stat.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif">Revenue Overview</CardTitle>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Simplified chart visualization */}
                <div className="absolute inset-0 flex items-end justify-around p-6 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-lg"
                    />
                  ))}
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-around text-xs text-muted-foreground px-6">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif">Top Products</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.sales.toLocaleString()} sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{product.revenue}</p>
                      <p
                        className={`text-xs ${
                          product.growth >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.growth >= 0 ? "+" : ""}
                        {product.growth}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif">Recent Orders</CardTitle>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              View All
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm hidden md:table-cell">
                      Products
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                      Total
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground text-sm hidden sm:table-cell">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm font-medium">{order.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium">{order.customer}</span>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">
                        <span className="text-muted-foreground text-sm">
                          {order.products}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold">{order.total}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={statusColors[order.status]} variant="secondary">
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right hidden sm:table-cell">
                        <span className="text-muted-foreground text-sm">{order.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
