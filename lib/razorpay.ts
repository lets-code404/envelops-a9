import Razorpay from "razorpay"

let razorpayInstance: Razorpay | null = null

export function getRazorpayInstance(): Razorpay | null {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.warn("Razorpay credentials not configured")
    return null
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  }

  return razorpayInstance
}

export async function createRazorpayOrder(amount: number, receipt: string) {
  const razorpay = getRazorpayInstance()
  if (!razorpay) throw new Error("Razorpay not configured")

  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: "INR",
    receipt,
    payment_capture: 1,
  }

  return razorpay.orders.create(options)
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const crypto = require("crypto")
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${orderId}|${paymentId}`)
    .digest("hex")

  return generatedSignature === signature
}
