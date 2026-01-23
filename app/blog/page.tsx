import { SiteLayout } from "@/components/site-layout"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: 1,
    title: "The Significance of Shagun Envelopes in Indian Culture",
    excerpt: "Discover why shagun envelopes are more than just paper—they are a symbol of blessings, tradition, and respect in Indian ceremonies.",
    date: "May 15, 2025",
    category: "Tradition",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "How to Choose the Perfect Envelope for a Wedding",
    excerpt: "A guide to selecting the right colors, materials, and designs for wedding shagun cards to match the grandeur of the occasion.",
    date: "June 02, 2025",
    category: "Guide",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "30 Years of Niharika Traders: Our Journey Since 1990",
    excerpt: "Celebrating over three decades of craftsmanship and trust in the heart of the Indian stationery market.",
    date: "July 10, 2025",
    category: "Heritage",
    readTime: "6 min read"
  }
]

export default function BlogPage() {
  return (
    <SiteLayout>
      <section className="bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Heritage Blog & Insights
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Exploring the artistry and tradition of Indian Shagun envelopes. Insights from Niharika Traders, established in 1990.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted flex items-center justify-center">
                   <span className="text-muted-foreground font-serif italic text-lg">Niharika Heritage</span>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="text-xl font-serif line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  <Link 
                    href="#" 
                    className="inline-block mt-4 text-sm font-semibold text-primary hover:underline"
                  >
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
