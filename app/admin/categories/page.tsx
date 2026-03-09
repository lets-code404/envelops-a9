"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Plus, X, Loader2, FolderTree } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  _count?: { products: number }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data)
    } catch {
      toast.error("Failed to load categories")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      })

      if (res.ok) {
        toast.success("Category created")
        setName("")
        setDescription("")
        setShowForm(false)
        fetchCategories()
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to create category")
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {showForm ? "Cancel" : "Add Category"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <Button type="submit">Create Category</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6 h-28" />
            </Card>
          ))
        ) : categories.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground py-12">No categories found</p>
        ) : (
          categories.map((cat) => (
            <Card key={cat.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FolderTree className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cat.slug}
                      {cat._count && ` • ${cat._count.products} products`}
                    </p>
                    {cat.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{cat.description}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
