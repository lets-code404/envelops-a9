import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { verifyRazorpaySignature } from "@/lib/razorpay"

// POST /api/orders/verify — Verify Razorpay payment
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 })
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Update order status
    const order = await prisma.order.updateMany({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        paymentStatus: "paid",
        paymentId: razorpay_payment_id,
        orderStatus: "processing",
      },
    })

    if (order.count === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
