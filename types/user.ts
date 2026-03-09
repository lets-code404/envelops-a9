export interface UserType {
  id: string
  name: string | null
  email: string
  image: string | null
  role: "user" | "admin"
  phone: string | null
  createdAt: Date
  updatedAt: Date
}

export interface AddressType {
  id: string
  userId: string
  name: string
  phone: string
  line1: string
  line2: string | null
  city: string
  state: string
  pincode: string
  isDefault: boolean
}
