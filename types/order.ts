export interface OrderType {
  id: string
  orderNumber: string
  userId: string
  items: OrderItemType[]
  totalPrice: number
  shippingPrice: number
  taxPrice: number
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled"
  paymentId: string | null
  razorpayOrderId: string | null
  shippingAddress: ShippingAddress | null
  createdAt: Date
  updatedAt: Date
}

export interface OrderItemType {
  id: string
  orderId: string
  productId: string
  name: string
  price: number
  quantity: number
  size: string | null
  color: string | null
}

export interface ShippingAddress {
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
}
