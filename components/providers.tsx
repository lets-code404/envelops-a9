"use client"

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
}
