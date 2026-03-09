import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://niharika-traders.vercel.app"

  const staticPages = [
    "",
    "/products",
    "/categories",
    "/cart",
    "/about",
    "/contact",
    "/blog",
    "/price-list",
    "/gallery",
    "/bulk-orders",
    "/login",
    "/signup",
    "/privacy",
    "/terms",
    "/shipping-policy",
    "/refund-policy",
  ]

  const categoryPages = [
    "/categories/basic-economy",
    "/categories/printed-decorative",
    "/categories/premium-fancy",
    "/categories/gaddi-special",
  ]

  const productPages = Array.from({ length: 15 }, (_, i) => `/products/${i + 1}`)

  const now = new Date()

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
    })),
    ...categoryPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...productPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
