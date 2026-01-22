"use client"

import React from "react"

import { CartProvider } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  )
}
