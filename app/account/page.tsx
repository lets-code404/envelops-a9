"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SiteLayout } from "@/components/site-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { User, Mail, ShoppingBag, MapPin, LogOut, Package } from "lucide-react"

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </SiteLayout>
    )
  }

  if (!session?.user) return null

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-serif font-bold mb-8">My Account</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-16 w-16 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{session.user.name || "User"}</h3>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {session.user.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/orders">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">My Orders</h3>
                    <p className="text-sm text-muted-foreground">Track and manage your orders</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/cart">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">My Cart</h3>
                    <p className="text-sm text-muted-foreground">View items in your cart</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Saved Addresses</h3>
                  <p className="text-sm text-muted-foreground">Manage delivery addresses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <Separator className="mb-4" />
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  )
}
