"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Top Bar */}
      <header className="bg-foreground text-background py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-serif font-bold">
            Niharika Traders
          </Link>
          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-background/70 hidden sm:block">
            {session?.user?.name || session?.user?.email}
          </span>
          <Button variant="ghost" size="sm" asChild className="text-background/70 hover:text-background hover:bg-background/10">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Store
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r min-h-[calc(100vh-52px)] p-4 hidden md:block">
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50 flex overflow-x-auto">
          {adminNav.slice(0, 5).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-3 text-xs min-w-[64px]",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 pb-20 md:pb-8">{children}</main>
      </div>
    </div>
  )
}
