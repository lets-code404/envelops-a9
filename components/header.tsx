"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, ShoppingCart, User, LogOut, Package, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { SearchBar } from "@/components/ui/search-bar"
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
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-background"
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-primary tracking-tight hover:scale-105 transition-transform"
          >
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
                    "relative text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  {item.hasMega && <ChevronDown className="h-3 w-3" />}
                  {pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>

                {/* Mega Menu */}
                {item.hasMega && showCategories && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="bg-card rounded-xl shadow-xl border p-4 min-w-[320px]">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                        Shop by Category
                      </p>
                      <div className="grid gap-1">
                        {displayCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/categories/${cat.id}`}
                            className="block px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
                            onClick={() => setShowCategories(false)}
                          >
                            <span className="font-medium text-sm">{cat.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <SearchBar />

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-secondary"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Section */}
            {session?.user ? (
              <div
                className="relative"
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <Button variant="ghost" size="sm" className="gap-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt=""
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="max-w-[100px] truncate text-sm">
                    {session.user.name?.split(" ")[0] || "Account"}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 pt-2 z-50">
                    <div className="bg-card rounded-xl shadow-xl border p-2 min-w-[200px]">
                      <Link
                        href="/account"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4" /> My Account
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Package className="h-4 w-4" /> My Orders
                      </Link>
                      {(session.user as { role?: string }).role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm text-primary"
                          onClick={() => setShowUserMenu(false)}
                        >
                          ⚙️ Admin Panel
                        </Link>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-destructive/10 text-sm text-destructive w-full"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l pl-4 border-border ml-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-[500px] mt-4" : "max-h-0"
          )}
        >
          <div className="py-4 space-y-2 border-t border-border">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block py-2 text-base font-medium transition-colors",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.name}
              </Link>
            ))}
            <hr className="my-2" />
            {session?.user ? (
              <>
                <Link href="/account" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-medium text-muted-foreground hover:text-primary">
                  My Account
                </Link>
                <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-medium text-muted-foreground hover:text-primary">
                  My Orders
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="block py-2 text-base font-medium text-destructive">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
