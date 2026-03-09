"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemRowProps {
  item: {
    id: string
    name: string
    price: number
    quantity: number
    size: string
    color: string
    image: string
  }
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0">
      {/* Product Image */}
      <div className="h-20 w-20 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 overflow-hidden">
        <span className="text-3xl opacity-30">✉</span>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm md:text-base truncate">{item.name}</h3>
        <div className="flex gap-3 text-xs text-muted-foreground mt-1">
          {item.size && <span>Size: {item.size}</span>}
          {item.color && <span>Color: {item.color}</span>}
        </div>
        <p className="text-primary font-bold mt-1">₹{item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Subtotal & Remove */}
      <div className="text-right">
        <p className="font-bold">₹{item.price * item.quantity}</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2 mt-1"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-3 w-3 mr-1" />
          <span className="text-xs">Remove</span>
        </Button>
      </div>
    </div>
  )
}
