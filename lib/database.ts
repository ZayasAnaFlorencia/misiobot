import { createClient } from "@/lib/supabase/server"
import type { Category, Product } from "@/lib/types"

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("categories").select("*").order("display_order", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching categories:", error)
    return []
  }

  return data || []
}

export async function getProducts(filters?: {
  categorySlug?: string
  searchQuery?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: string
}): Promise<Product[]> {
  const supabase = await createClient()

  let query = supabase.from("products").select("*, categories(*)").eq("is_active", true)

  // Category filter
  if (filters?.categorySlug) {
    const { data: category } = await supabase.from("categories").select("id").eq("slug", filters.categorySlug).single()

    if (category) {
      query = query.eq("category_id", category.id)
    }
  }

  // Price range filter
  if (filters?.minPrice !== undefined && filters.minPrice > 0) {
    query = query.gte("price", filters.minPrice)
  }
  if (filters?.maxPrice !== undefined && filters.maxPrice < 2000) {
    query = query.lte("price", filters.maxPrice)
  }

  // Search query - using text search on name and description
  if (filters?.searchQuery) {
    query = query.or(
      `name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%,sku.ilike.%${filters.searchQuery}%`,
    )
  }

  // Sorting
  switch (filters?.sortBy) {
    case "price_asc":
      query = query.order("price", { ascending: true })
      break
    case "price_desc":
      query = query.order("price", { ascending: false })
      break
    case "name_asc":
      query = query.order("name", { ascending: true })
      break
    case "name_desc":
      query = query.order("name", { ascending: false })
      break
    default:
      query = query.order("created_at", { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6)

  if (error) {
    console.error("[v0] Error fetching featured products:", error)
    return []
  }

  return data || []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error) {
    console.error("[v0] Error fetching product:", error)
    return null
  }

  return data
}
