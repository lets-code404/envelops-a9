"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  IndianRupee,
  Eye,
  MousePointer,
  BarChart3,
  PieChart,
  ArrowUpRight,
} from "lucide-react";

const metrics = [
  {
    title: "Page Views",
    value: "45,892",
    change: "+18.2%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Unique Visitors",
    value: "12,453",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    trend: "up",
    icon: MousePointer,
  },
  {
    title: "Avg. Order Value",
    value: "Rs. 2,450",
    change: "-2.1%",
    trend: "down",
    icon: ShoppingCart,
  },
];

const topPages = [
  { page: "/products", views: 15234, bounce: "32%", duration: "2m 45s" },
  { page: "/products/wedding", views: 8921, bounce: "28%", duration: "3m 12s" },
  { page: "/bulk-orders", views: 6543, bounce: "45%", duration: "1m 58s" },
  { page: "/gallery", views: 5678, bounce: "38%", duration: "2m 30s" },
  { page: "/contact", views: 3421, bounce: "52%", duration: "1m 15s" },
];

const categoryPerformance = [
  { category: "Business", revenue: 245000, orders: 156, growth: 15 },
  { category: "Wedding", revenue: 189000, orders: 89, growth: 28 },
  { category: "Gift", revenue: 98000, orders: 234, growth: 12 },
  { category: "Kraft", revenue: 76000, orders: 178, growth: -5 },
];

const trafficSources = [
  { source: "Organic Search", visitors: 5234, percentage: 42 },
  { source: "Direct", visitors: 3421, percentage: 28 },
  { source: "Social Media", visitors: 1856, percentage: 15 },
  { source: "Referral", visitors: 1123, percentage: 9 },
  { source: "Email", visitors: 819, percentage: 6 },
];

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState("7d");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your store performance</p>
        </div>
        <div className="flex items-center gap-2">
          {["24h", "7d", "30d", "90d"].map((p) => (
            <Button
              key={p}
              variant={period === p ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <metric.icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      metric.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl flex items-end justify-around p-6 gap-3 relative overflow-hidden">
              {[35, 55, 42, 78, 62, 85, 70, 90, 65, 88, 72, 95].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg relative group cursor-pointer"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Rs. {(height * 500).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2 px-3">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                (month) => (
                  <span key={month}>{month}</span>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif flex items-center gap-2">
              <PieChart className="w-5 h-5 text-accent" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <motion.div
                  key={source.source}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{source.source}</span>
                      <span className="text-sm text-muted-foreground">
                        {source.visitors.toLocaleString()} visitors
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${source.percentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                  <span className="font-semibold text-sm w-12 text-right">
                    {source.percentage}%
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif">Top Pages</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-medium text-muted-foreground text-sm">
                      Page
                    </th>
                    <th className="text-right py-3 font-medium text-muted-foreground text-sm">
                      Views
                    </th>
                    <th className="text-right py-3 font-medium text-muted-foreground text-sm hidden sm:table-cell">
                      Bounce
                    </th>
                    <th className="text-right py-3 font-medium text-muted-foreground text-sm hidden sm:table-cell">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((page) => (
                    <tr key={page.page} className="border-b border-border/50">
                      <td className="py-3">
                        <span className="font-mono text-sm">{page.page}</span>
                      </td>
                      <td className="py-3 text-right font-medium">
                        {page.views.toLocaleString()}
                      </td>
                      <td className="py-3 text-right text-muted-foreground hidden sm:table-cell">
                        {page.bounce}
                      </td>
                      <td className="py-3 text-right text-muted-foreground hidden sm:table-cell">
                        {page.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif">Category Performance</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((cat, index) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      {cat.category.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{cat.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {cat.orders} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      Rs. {cat.revenue.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs ${
                        cat.growth >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {cat.growth >= 0 ? "+" : ""}
                      {cat.growth}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
