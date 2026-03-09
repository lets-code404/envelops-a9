"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Loader2 } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  name: string
  price: number
  category?: { name: string } | null
  slug?: string
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=5`)
        const data = await res.json()
        setResults(data.products || [])
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
      setIsOpen(false)
      setQuery("")
    }
  }

  if (!isOpen) {
    return (
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="hover:bg-secondary">
        <Search className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} />
      {/* Search Modal */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-2xl border overflow-hidden">
          <form onSubmit={handleSubmit} className="flex items-center border-b px-4">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories..."
              className="border-0 focus-visible:ring-0 h-14 text-lg"
            />
            {isLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground mr-2" />}
            <Button type="button" variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </form>

          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto p-2">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  onClick={() => { setIsOpen(false); setQuery("") }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.category && (
                      <p className="text-sm text-muted-foreground">
                        {typeof item.category === "object" ? item.category.name : item.category}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold text-primary">₹{item.price}</span>
                </Link>
              ))}
              <button
                onClick={() => { handleSubmit({ preventDefault: () => {} } as React.FormEvent); }}
                className="w-full p-3 text-center text-sm text-primary hover:bg-muted rounded-lg transition-colors"
              >
                View all results for &quot;{query}&quot;
              </button>
            </div>
          )}

          {query.trim() && !isLoading && results.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No products found for &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>
    </>
  )
}
