import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { createRazorpayOrder } from "@/lib/razorpay"
import { auth } from "@/lib/auth"

// GET /api/orders — List user orders
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as { id?: string }).id
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Fetch orders error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

// POST /api/orders — Create order + Razorpay order
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as { id?: string }).id
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 })
    }

    const body = await request.json()
    const { items, shippingAddress } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const totalPrice = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    )
    const shippingPrice = totalPrice >= 500 ? 0 : 50
    const taxPrice = Math.round(totalPrice * 0.18)
    const grandTotal = totalPrice + shippingPrice + taxPrice

    // Generate order number
    const orderNumber = `NT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        totalPrice: grandTotal,
        shippingPrice,
        taxPrice,
        shippingAddress: shippingAddress || null,
        items: {
          create: items.map((item: { productId: string; name: string; price: number; quantity: number; size?: string; color?: string }) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size || null,
            color: item.color || null,
          })),
        },
      },
      include: { items: true },
    })

    // Create Razorpay order
    let razorpayOrder = null
    try {
      razorpayOrder = await createRazorpayOrder(grandTotal, orderNumber)
      // Update order with Razorpay order ID
      await prisma.order.update({
        where: { id: order.id },
        data: { razorpayOrderId: razorpayOrder.id },
      })
    } catch {
      // Razorpay not configured — order exists but needs offline payment
      console.warn("Razorpay order creation skipped — credentials not configured")
    }

    return NextResponse.json({
      order,
      razorpayOrder: razorpayOrder
        ? {
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
          }
        : null,
    }, { status: 201 })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
