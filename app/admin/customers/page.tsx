"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Users,
  UserPlus,
  Crown,
  ShoppingBag,
} from "lucide-react";
import { useSearchParams, Suspense } from "next/navigation";
import Loading from "./loading";

const customers = [
  {
    id: 1,
    name: "Raj Enterprises",
    email: "raj@enterprises.com",
    phone: "+91 98765 43210",
    location: "Mumbai, MH",
    type: "business",
    orders: 45,
    totalSpent: 245000,
    lastOrder: "2024-01-20",
    status: "active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91 87654 32109",
    location: "Delhi, DL",
    type: "individual",
    orders: 12,
    totalSpent: 28500,
    lastOrder: "2024-01-19",
    status: "active",
  },
  {
    id: 3,
    name: "Tech Solutions Ltd",
    email: "orders@techsolutions.com",
    phone: "+91 76543 21098",
    location: "Bangalore, KA",
    type: "business",
    orders: 78,
    totalSpent: 520000,
    lastOrder: "2024-01-18",
    status: "vip",
  },
  {
    id: 4,
    name: "Amit Patel",
    email: "amit.patel@gmail.com",
    phone: "+91 65432 10987",
    location: "Ahmedabad, GJ",
    type: "individual",
    orders: 3,
    totalSpent: 4500,
    lastOrder: "2024-01-20",
    status: "new",
  },
  {
    id: 5,
    name: "Global Corp",
    email: "procurement@globalcorp.in",
    phone: "+91 54321 09876",
    location: "Chennai, TN",
    type: "business",
    orders: 156,
    totalSpent: 1250000,
    lastOrder: "2024-01-17",
    status: "vip",
  },
  {
    id: 6,
    name: "Meera Iyer",
    email: "meera.iyer@outlook.com",
    phone: "+91 43210 98765",
    location: "Pune, MH",
    type: "individual",
    orders: 8,
    totalSpent: 12800,
    lastOrder: "2024-01-10",
    status: "inactive",
  },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  active: { color: "bg-green-100 text-green-800", label: "Active" },
  vip: { color: "bg-purple-100 text-purple-800", label: "VIP" },
  new: { color: "bg-blue-100 text-blue-800", label: "New" },
  inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
};

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const searchParams = useSearchParams();

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || customer.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalCustomers = customers.length;
  const businessCustomers = customers.filter((c) => c.type === "business").length;
  const vipCustomers = customers.filter((c) => c.status === "vip").length;

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold">Customers</h1>
            <p className="text-muted-foreground">Manage your customer relationships</p>
          </div>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Customer
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCustomers}</p>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{businessCustomers}</p>
                <p className="text-sm text-muted-foreground">Business Accounts</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vipCustomers}</p>
                <p className="text-sm text-muted-foreground">VIP Customers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {["all", "individual", "business"].map((type) => (
                  <Button
                    key={type}
                    variant={typeFilter === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTypeFilter(type)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <Badge
                          variant="secondary"
                          className={statusConfig[customer.status].color}
                        >
                          {statusConfig[customer.status].label}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Orders</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{customer.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Orders</p>
                      <p className="font-semibold">{customer.orders}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Total Spent</p>
                      <p className="font-semibold text-primary">
                        Rs. {customer.totalSpent.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No customers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Suspense>
  );
}
