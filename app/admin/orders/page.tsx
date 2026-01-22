"use client";

import React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Download,
} from "lucide-react";

const orders = [
  {
    id: "ORD-2024-001",
    customer: "Raj Enterprises",
    email: "raj@enterprises.com",
    products: "Business Envelopes x 500, A4 White x 200",
    total: 15500,
    status: "processing",
    date: "2024-01-20",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-002",
    customer: "Priya Sharma",
    email: "priya@email.com",
    products: "Wedding Invites x 100",
    total: 8900,
    status: "shipped",
    date: "2024-01-19",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-003",
    customer: "Tech Solutions Ltd",
    email: "orders@techsolutions.com",
    products: "A4 Envelopes x 1000, DL Envelopes x 500",
    total: 28000,
    status: "delivered",
    date: "2024-01-18",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-004",
    customer: "Amit Patel",
    email: "amit.patel@gmail.com",
    products: "Gift Envelopes x 50",
    total: 1250,
    status: "pending",
    date: "2024-01-20",
    paymentStatus: "pending",
  },
  {
    id: "ORD-2024-005",
    customer: "Global Corp",
    email: "procurement@globalcorp.in",
    products: "Custom Printed x 2000",
    total: 45000,
    status: "processing",
    date: "2024-01-17",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-006",
    customer: "Meera Iyer",
    email: "meera.iyer@outlook.com",
    products: "Kraft Envelopes x 100",
    total: 2200,
    status: "cancelled",
    date: "2024-01-16",
    paymentStatus: "refunded",
  },
];

const statusConfig: Record<
  string,
  { color: string; icon: React.ElementType; label: string }
> = {
  pending: { color: "bg-amber-100 text-amber-800", icon: Clock, label: "Pending" },
  processing: { color: "bg-blue-100 text-blue-800", icon: Package, label: "Processing" },
  shipped: { color: "bg-purple-100 text-purple-800", icon: Truck, label: "Shipped" },
  delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Delivered" },
  cancelled: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Cancelled" },
};

const paymentStatusConfig: Record<string, string> = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  refunded: "bg-gray-100 text-gray-800",
};

const Loading = () => null;

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const searchParams = useSearchParams();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">
              Manage and track all customer orders
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Orders
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {statuses.slice(1).map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            const config = statusConfig[status];
            const StatusIcon = config.icon;
            return (
              <Card
                key={status}
                className={`cursor-pointer transition-all ${
                  statusFilter === status ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setStatusFilter(status === statusFilter ? "all" : status)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">{config.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground text-sm">
                      Order
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground text-sm">
                      Customer
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground text-sm hidden lg:table-cell">
                      Products
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground text-sm">
                      Total
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground text-sm">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground text-sm hidden md:table-cell">
                      Payment
                    </th>
                    <th className="text-right py-4 px-4 font-medium text-muted-foreground text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const StatusIcon = statusConfig[order.status].icon;
                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <span className="font-mono text-sm font-medium">{order.id}</span>
                            <p className="text-xs text-muted-foreground">{order.date}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 hidden lg:table-cell">
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {order.products}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold">
                            Rs. {order.total.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={statusConfig[order.status].color} variant="secondary">
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[order.status].label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          <Badge
                            className={paymentStatusConfig[order.paymentStatus]}
                            variant="secondary"
                          >
                            {order.paymentStatus}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="w-4 h-4 mr-2" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download Invoice
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="py-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No orders found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
