"use client"

<<<<<<< HEAD
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <CartProvider>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  )
=======
import React from "react"

import { CartProvider } from "@/context/cart-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
>>>>>>> b1ca6fad81de2d4436bc8e3e5034e6825c26450a
}
