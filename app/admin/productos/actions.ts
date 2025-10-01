"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const productData = {
    name: formData.get("name") as string,
    slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
    short_description: formData.get("short_description") as string,
    description: formData.get("description") as string,
    price: Number.parseFloat(formData.get("price") as string),
    category_id: formData.get("category_id") as string,
    image_url: formData.get("image_url") as string,
    stock_quantity: Number.parseInt(formData.get("stock_quantity") as string),
    sku: formData.get("sku") as string,
    is_featured: formData.get("is_featured") === "on",
    is_active: formData.get("is_active") === "on",
  }

  const { error } = await supabase.from("products").insert(productData)

  if (error) {
    console.error("Error creating product:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/productos")
  redirect("/admin/productos")
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const productData = {
    name: formData.get("name") as string,
    slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
    short_description: formData.get("short_description") as string,
    description: formData.get("description") as string,
    price: Number.parseFloat(formData.get("price") as string),
    category_id: formData.get("category_id") as string,
    image_url: formData.get("image_url") as string,
    stock_quantity: Number.parseInt(formData.get("stock_quantity") as string),
    sku: formData.get("sku") as string,
    is_featured: formData.get("is_featured") === "on",
    is_active: formData.get("is_active") === "on",
  }

  const { error } = await supabase.from("products").update(productData).eq("id", id)

  if (error) {
    console.error("Error updating product:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/productos")
  redirect("/admin/productos")
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/productos")
  redirect("/admin/productos")
}
