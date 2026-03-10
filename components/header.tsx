"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, ShoppingCart, User, LogOut, Package, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/products-data"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories", hasMega: true },
  { name: "Price List", href: "/price-list" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const { totalItems } = useCart()
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const displayCategories = categories.filter((c) => c.id !== "all")

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold text-foreground">
            Niharika Traders
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasMega && setShowCategories(true)}
                onMouseLeave={() => item.hasMega && setShowCategories(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  {item.hasMega && <ChevronDown className="h-3 w-3" />}
                </Link>

                {/* Mega Menu */}
                {item.hasMega && showCategories && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-card rounded-xl shadow-xl border p-4 min-w-[280px]">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        Shop by Category
                      </p>
                      <div className="space-y-1">
                        {displayCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/categories/${cat.id}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                            onClick={() => setShowCategories(false)}
                          >
                            <span className="text-lg">{(cat as { icon?: string }).icon || "📦"}</span>
                            <div>
                              <span className="text-sm font-medium">{cat.name}</span>
                              <p className="text-xs text-muted-foreground">{cat.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <SearchBar />

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            {session ? (
              <div
                className="relative hidden sm:block"
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full pt-2 z-50">
                    <div className="bg-card rounded-xl shadow-xl border p-2 min-w-[200px]">
                      <p className="px-3 py-2 text-sm font-medium truncate border-b mb-1">
                        {session.user?.name || session.user?.email}
                      </p>
                      <Link href="/account" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-secondary">
                        <User className="h-4 w-4" /> Account
                      </Link>
                      <Link href="/orders" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-secondary">
                        <Package className="h-4 w-4" /> Orders
                      </Link>
                      {(session.user as { role?: string })?.role === "admin" && (
                        <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-secondary">
                          <Package className="h-4 w-4" /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-secondary w-full text-left text-destructive"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button asChild size="sm" className="hidden sm:flex">
                <Link href="/login">Sign In</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t pt-2 mt-2">
              {session ? (
                <>
                  <Link href="/account" className="block px-4 py-2 rounded-lg text-sm hover:bg-secondary" onClick={() => setIsMenuOpen(false)}>
                    Account
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 rounded-lg text-sm hover:bg-secondary" onClick={() => setIsMenuOpen(false)}>
                    Orders
                  </Link>
                  <button
                    onClick={() => { signOut({ callbackUrl: "/" }); setIsMenuOpen(false) }}
                    className="block w-full text-left px-4 py-2 rounded-lg text-sm text-destructive hover:bg-secondary"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" className="block px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-secondary" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
