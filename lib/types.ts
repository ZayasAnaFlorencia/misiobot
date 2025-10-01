export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  category_id: string | null
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  compare_at_price: number | null
  sku: string | null
  stock_quantity: number
  image_url: string | null
  images: string[] | null
  is_featured: boolean
  is_active: boolean
  metadata: Record<string, any>
  created_at: string
  updated_at: string
  categories?: Category
}

export interface CartItem {
  product: Product
  quantity: number
}
