"use client";

import React, { Suspense } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CartProvider } from "@/context/cart-context";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart, badge: "12" },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <CartProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen bg-background">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={cn(
              "fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300",
              "lg:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-border">
                <Link href="/admin" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">E</span>
                  </div>
                  <div>
                    <span className="font-serif font-bold text-xl">Envelop</span>
                    <p className="text-xs text-muted-foreground">Admin Panel</p>
                  </div>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                      {link.badge && (
                        <Badge
                          variant={isActive ? "secondary" : "default"}
                          className="ml-auto"
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-border">
                <Link href="/">
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <LogOut className="w-5 h-5" />
                    Back to Store
                  </Button>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:pl-64">
            {/* Top Header */}
            <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border">
              <div className="flex items-center justify-between px-4 lg:px-6 h-16">
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>

                {/* Breadcrumb */}
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <Link href="/admin" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                  {pathname !== "/admin" && (
                    <>
                      <ChevronRight className="w-4 h-4" />
                      <span className="text-foreground capitalize">
                        {pathname.split("/").pop()}
                      </span>
                    </>
                  )}
                </div>

                {/* Search */}
                <div className="flex-1 max-w-md mx-4 hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products, orders..."
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
                      3
                    </span>
                  </Button>
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary text-sm">AD</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="p-4 lg:p-6">{children}</main>
          </div>
        </div>
      </Suspense>
    </CartProvider>
  );
}
