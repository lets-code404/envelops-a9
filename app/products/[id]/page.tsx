import { notFound } from "next/navigation"
import { products } from "@/lib/products-data"
import { ProductDetailClient } from "@/components/products/product-detail-client"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
