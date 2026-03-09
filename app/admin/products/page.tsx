"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  badge: string | null
  category?: { name: string } | null | string
  featured: boolean
  trending: boolean
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", categoryId: "", stock: "100", badge: "",
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products?limit=100")
      const data = await res.json()
      setProducts(data.products || [])
    } catch {
      toast.error("Failed to load products")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/products/${editingId}` : "/api/products"
      const method = editingId ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      })

      if (res.ok) {
        toast.success(editingId ? "Product updated" : "Product created")
        setShowForm(false)
        setEditingId(null)
        setFormData({ name: "", description: "", price: "", categoryId: "", stock: "100", badge: "" })
        fetchProducts()
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to save product")
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Product deleted")
        fetchProducts()
      } else {
        toast.error("Failed to delete product")
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null) }}>
          {showForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Product" : "New Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Badge</Label>
                <Input value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} placeholder="e.g. New, Popular" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div className="md:col-span-2">
                <Button type="submit">{editingId ? "Update" : "Create"} Product</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No products found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium hidden md:table-cell">Stock</th>
                    <th className="pb-3 font-medium hidden md:table-cell">Badge</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3">
                        <span className="font-medium">{product.name}</span>
                        {product.category && (
                          <p className="text-xs text-muted-foreground">
                            {typeof product.category === "object" ? product.category.name : product.category}
                          </p>
                        )}
                      </td>
                      <td className="py-3 font-medium">₹{product.price}</td>
                      <td className="py-3 hidden md:table-cell">{product.stock || "—"}</td>
                      <td className="py-3 hidden md:table-cell">
                        {product.badge ? <Badge variant="secondary">{product.badge}</Badge> : "—"}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setEditingId(product.id)
                              setFormData({
                                name: product.name,
                                description: "",
                                price: String(product.price),
                                categoryId: "",
                                stock: String(product.stock || 100),
                                badge: product.badge || "",
                              })
                              setShowForm(true)
                            }}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
