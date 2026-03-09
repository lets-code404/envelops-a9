import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { products as staticProducts } from "@/lib/products-data"

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: { category: true },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch {
    // Fallback to static data
    const product = staticProducts.find((p) => p.id === id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...product,
      slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      images: ["/placeholder.svg"],
      categoryId: product.category,
      stock: 100,
      rating: 4.5,
      reviewCount: 25,
      featured: false,
      trending: false,
    })
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const body = await request.json()
    const product = await prisma.product.update({
      where: { id },
      data: body,
      include: { category: true },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ message: "Product deleted" })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
