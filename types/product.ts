export interface ProductType {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice: number | null
  images: string[]
  categoryId: string
  stock: number
  rating: number
  reviewCount: number
  badge: string | null
  sizes: string[]
  colors: string[]
  featured: boolean
  trending: boolean
  specifications: {
    material: string
    weight: string
    closure: string
    packSize: string
  } | null
  createdAt: Date
  updatedAt: Date
  category?: CategoryType
}

export interface CategoryType {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  products?: ProductType[]
}

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  sort?: "price-asc" | "price-desc" | "newest" | "rating" | "name"
  page?: number
  limit?: number
}
