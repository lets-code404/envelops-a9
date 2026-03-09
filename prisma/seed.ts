import { PrismaClient } from "@prisma/client"
import { products, categories } from "../lib/products-data"

const prisma = new PrismaClient()

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

async function main() {
  console.log("🌱 Seeding database...")

  // Clear existing data
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Seed categories
  const categoryMap = new Map<string, string>()
  for (const cat of categories.filter((c) => c.id !== "all")) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.id,
        description: (cat as { description?: string }).description || null,
        image: null,
      },
    })
    categoryMap.set(cat.id, created.id)
    console.log(`  ✅ Category: ${cat.name}`)
  }

  // Seed products
  for (const product of products) {
    const categoryId = categoryMap.get(product.category)
    if (!categoryId) {
      console.warn(`  ⚠️ Skipping product "${product.name}" — no category "${product.category}"`)
      continue
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: slugify(product.name),
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        images: ["/placeholder.svg"],
        categoryId,
        stock: 100,
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 50) + 5,
        badge: product.badge,
        sizes: product.sizes,
        colors: product.colors,
        featured: ["1", "3", "6", "8"].includes(product.id),
        trending: ["2", "4", "9", "12"].includes(product.id),
        specifications: product.specifications,
      },
    })
    console.log(`  ✅ Product: ${product.name}`)
  }

  console.log("\n🎉 Seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
