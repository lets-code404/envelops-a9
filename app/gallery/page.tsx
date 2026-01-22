"use client"

import { useState } from "react"
import { SiteLayout } from "@/components/site-layout"
import { Button } from "@/components/ui/button"
import { X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

const galleryItems = [
  {
    id: 1,
    title: "Premium White Collection",
    category: "White",
    description: "Elegant white envelopes for professional correspondence",
    size: "large",
  },
  {
    id: 2,
    title: "Kraft Paper Texture",
    category: "Kraft",
    description: "Natural kraft paper with organic texture",
    size: "medium",
  },
  {
    id: 3,
    title: "Colored Assortment",
    category: "Colored",
    description: "Vibrant colors for every occasion",
    size: "medium",
  },
  {
    id: 4,
    title: "Wedding Invitation Set",
    category: "Wedding",
    description: "Luxurious pearl finish for special occasions",
    size: "large",
  },
  {
    id: 5,
    title: "Business Correspondence",
    category: "Business",
    description: "Professional envelopes for corporate use",
    size: "small",
  },
  {
    id: 6,
    title: "Custom Printed Design",
    category: "Custom",
    description: "Branded envelopes with custom printing",
    size: "small",
  },
  {
    id: 7,
    title: "Eco-Friendly Range",
    category: "Eco",
    description: "100% recycled and sustainable materials",
    size: "medium",
  },
  {
    id: 8,
    title: "Gift Packaging",
    category: "Gift",
    description: "Beautiful packaging solutions",
    size: "small",
  },
  {
    id: 9,
    title: "Textured Linen Paper",
    category: "Textured",
    description: "Premium linen texture finish",
    size: "large",
  },
  {
    id: 10,
    title: "Mini Envelope Set",
    category: "Mini",
    description: "Perfect for gift cards and small notes",
    size: "small",
  },
  {
    id: 11,
    title: "Metallic Gold Trim",
    category: "Metallic",
    description: "Elegant gold foil accents",
    size: "medium",
  },
  {
    id: 12,
    title: "Bulk Pack Display",
    category: "Bulk",
    description: "Our bulk packaging options",
    size: "medium",
  },
]

const categories = [
  "All",
  "White",
  "Kraft",
  "Colored",
  "Wedding",
  "Business",
  "Custom",
  "Eco",
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)

  const selectedItem = galleryItems.find((item) => item.id === selectedImage)

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Gallery
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our stunning collection of envelope designs, paper textures,
              and packaging samples. Get inspired for your next project.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full transition-all",
                  selectedCategory === category &&
                    "bg-primary text-primary-foreground"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 animate-in fade-in slide-in-from-bottom-4",
                  item.size === "large" && "aspect-[3/4]",
                  item.size === "medium" && "aspect-square",
                  item.size === "small" && "aspect-[4/3]"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedImage(item.id)}
              >
                {/* Placeholder Image */}
                <div
                  className={cn(
                    "absolute inset-0 transition-transform duration-500",
                    hoveredId === item.id && "scale-110",
                    item.category === "White" && "bg-gray-100",
                    item.category === "Kraft" && "bg-amber-200",
                    item.category === "Colored" && "bg-gradient-to-br from-pink-200 via-blue-200 to-teal-200",
                    item.category === "Wedding" && "bg-gradient-to-br from-pink-100 to-amber-100",
                    item.category === "Business" && "bg-gray-300",
                    item.category === "Custom" && "bg-gradient-to-br from-indigo-200 to-purple-200",
                    item.category === "Eco" && "bg-green-200",
                    item.category === "Gift" && "bg-gradient-to-br from-rose-200 to-orange-200",
                    item.category === "Textured" && "bg-amber-100",
                    item.category === "Mini" && "bg-sky-200",
                    item.category === "Metallic" && "bg-gradient-to-br from-amber-200 to-yellow-100",
                    item.category === "Bulk" && "bg-gray-200"
                  )}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-1/3 border-4 border-white/50 rotate-6 shadow-lg" />
                  </div>
                </div>

                {/* Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-300",
                    hoveredId === item.id ? "opacity-100" : "opacity-0"
                  )}
                />

                {/* Content */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-5 text-white transition-all duration-300",
                    hoveredId === item.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
                  <p className="text-sm text-white/80 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Zoom Icon */}
                <div
                  className={cn(
                    "absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300",
                    hoveredId === item.id
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  )}
                >
                  <ZoomIn className="h-5 w-5 text-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="max-w-4xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                "aspect-video flex items-center justify-center",
                selectedItem.category === "White" && "bg-gray-100",
                selectedItem.category === "Kraft" && "bg-amber-200",
                selectedItem.category === "Colored" && "bg-gradient-to-br from-pink-200 via-blue-200 to-teal-200",
                selectedItem.category === "Wedding" && "bg-gradient-to-br from-pink-100 to-amber-100",
                selectedItem.category === "Business" && "bg-gray-300",
                selectedItem.category === "Custom" && "bg-gradient-to-br from-indigo-200 to-purple-200",
                selectedItem.category === "Eco" && "bg-green-200",
                selectedItem.category === "Gift" && "bg-gradient-to-br from-rose-200 to-orange-200",
                selectedItem.category === "Textured" && "bg-amber-100",
                selectedItem.category === "Mini" && "bg-sky-200",
                selectedItem.category === "Metallic" && "bg-gradient-to-br from-amber-200 to-yellow-100",
                selectedItem.category === "Bulk" && "bg-gray-200"
              )}
            >
              <div className="w-1/3 h-1/2 border-8 border-white/50 rotate-6 shadow-2xl" />
            </div>
            <div className="p-6">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {selectedItem.category}
              </span>
              <h3 className="text-2xl font-serif font-bold text-foreground mt-2">
                {selectedItem.title}
              </h3>
              <p className="text-muted-foreground mt-2">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  )
}
