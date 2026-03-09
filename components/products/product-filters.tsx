"use client"

import { categories, sizes, colors, priceRanges } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ProductFiltersProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedSizes: string[]
  setSelectedSizes: (sizes: string[]) => void
  selectedColors: string[]
  setSelectedColors: (colors: string[]) => void
  priceRange: { min: number; max: number } | null
  setPriceRange: (range: { min: number; max: number } | null) => void
  clearFilters: () => void
}

export function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  clearFilters,
}: ProductFiltersProps) {
  const toggleSize = (size: string) => {
    setSelectedSizes(
      selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size]
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors(
      selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color]
    )
  }

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all",
                selectedSizes.includes(size)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Color</h3>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border",
                selectedColors.includes(color)
                  ? "border-primary bg-primary/10"
                  : "border-transparent hover:bg-secondary"
              )}
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full border border-border",
                  color === "White" && "bg-white",
                  color === "Cream" && "bg-amber-50",
                  color === "Brown" && "bg-amber-700",
                  color === "Blue" && "bg-blue-500",
                  color === "Grey" && "bg-gray-400",
                  color === "Pink" && "bg-pink-400",
                  color === "Black" && "bg-gray-900",
                  color === "Green" && "bg-green-500",
                  color === "Pearl" && "bg-gradient-to-br from-pink-100 to-blue-100"
                )}
              />
              <span className="text-xs">{color}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center gap-3">
              <Checkbox
                id={range.label}
                checked={
                  priceRange?.min === range.min && priceRange?.max === range.max
                }
                onCheckedChange={(checked) =>
                  setPriceRange(
                    checked ? { min: range.min, max: range.max } : null
                  )
                }
              />
              <Label
                htmlFor={range.label}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full border-dashed bg-transparent"
      >
        Clear All Filters
      </Button>
    </div>
  )
}
