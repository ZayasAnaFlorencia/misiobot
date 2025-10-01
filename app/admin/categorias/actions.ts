"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCategory(formData: FormData) {
  const supabase = await createClient()

  const categoryData = {
    name: formData.get("name") as string,
    slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
    description: formData.get("description") as string,
    display_order: Number.parseInt(formData.get("display_order") as string) || 0,
  }

  const { error } = await supabase.from("categories").insert(categoryData)

  if (error) {
    console.error("Error creating category:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/categorias")
  redirect("/admin/categorias")
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()

  const categoryData = {
    name: formData.get("name") as string,
    slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
    description: formData.get("description") as string,
    display_order: Number.parseInt(formData.get("display_order") as string) || 0,
  }

  const { error } = await supabase.from("categories").update(categoryData).eq("id", id)

  if (error) {
    console.error("Error updating category:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/categorias")
  redirect("/admin/categorias")
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    console.error("Error deleting category:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/categorias")
  redirect("/admin/categorias")
}
