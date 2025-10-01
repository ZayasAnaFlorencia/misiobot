"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, X } from "lucide-react"
import type { Category } from "@/lib/types"

interface ProductFiltersProps {
  categories: Category[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("categoria") || "all")
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("min_precio")) || 0,
    Number(searchParams.get("max_precio")) || 2000,
  ])
  const [sortBy, setSortBy] = useState(searchParams.get("orden") || "newest")

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (searchQuery) params.set("q", searchQuery)
    if (selectedCategory && selectedCategory !== "all") params.set("categoria", selectedCategory)
    if (priceRange[0] > 0) params.set("min_precio", priceRange[0].toString())
    if (priceRange[1] < 2000) params.set("max_precio", priceRange[1].toString())
    if (sortBy !== "newest") params.set("orden", sortBy)

    router.push(`/productos?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange([0, 2000])
    setSortBy("newest")
    router.push("/productos")
  }

  const hasActiveFilters =
    searchQuery || selectedCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 2000 || sortBy !== "newest"

  return (
    <div className="bg-card border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Buscar productos</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Nombre, descripción, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="pl-9"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Categoría</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label>Rango de precio</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={2000}
            step={50}
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <Label htmlFor="sort">Ordenar por</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger id="sort">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más recientes</SelectItem>
            <SelectItem value="price_asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="price_desc">Precio: mayor a menor</SelectItem>
            <SelectItem value="name_asc">Nombre: A-Z</SelectItem>
            <SelectItem value="name_desc">Nombre: Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply Button */}
      <Button onClick={applyFilters} className="w-full">
        Aplicar filtros
      </Button>
    </div>
  )
}
