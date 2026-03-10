import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { products as staticProducts, categories as staticCategories } from "@/lib/products-data"

export const dynamic = "force-dynamic"

// GET /api/products — List products with filtering, search, pagination
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const sort = searchParams.get("sort") || "newest"
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "12")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const featured = searchParams.get("featured")
  const trending = searchParams.get("trending")

  try {
    // Try database first
    const where: Record<string, unknown> = {}

    if (category && category !== "all") {
      where.category = { slug: category }
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice)
      if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice)
    }
    if (featured === "true") where.featured = true
    if (trending === "true") where.trending = true

    const orderBy: Record<string, string> = {}
    switch (sort) {
      case "price-asc": orderBy.price = "asc"; break
      case "price-desc": orderBy.price = "desc"; break
      case "rating": orderBy.rating = "desc"; break
      case "name": orderBy.name = "asc"; break
      default: orderBy.createdAt = "desc"
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch {
    // Fallback to static data if database is unavailable
    let filtered = [...staticProducts]

    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.category === category)
    }
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }
    if (minPrice) filtered = filtered.filter((p) => p.price >= parseFloat(minPrice))
    if (maxPrice) filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice))

    if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price)
    else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price)
    else if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name))

    const total = filtered.length
    const paginated = filtered.slice((page - 1) * limit, page * limit)

    const mappedProducts = paginated.map((p) => ({
      ...p,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      images: ["/placeholder.svg"],
      categoryId: p.category,
      stock: 100,
      rating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 50) + 5,
      featured: false,
      trending: false,
      specifications: p.specifications,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: staticCategories.find((c) => c.id === p.category) || null,
    }))

    return NextResponse.json({
      products: mappedProducts,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  }
}

// POST /api/products — Create product (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, originalPrice, categoryId, stock, images, sizes, colors, badge, featured, trending, specifications } = body

    if (!name || !description || !price || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        originalPrice: originalPrice || null,
        categoryId,
        stock: stock || 100,
        images: images || ["/placeholder.svg"],
        sizes: sizes || [],
        colors: colors || [],
        badge: badge || null,
        featured: featured || false,
        trending: trending || false,
        specifications: specifications || null,
      },
      include: { category: true },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
