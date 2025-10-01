import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"
import { updateProduct, deleteProduct } from "../actions"
import { notFound } from "next/navigation"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single()

  if (!product) {
    notFound()
  }

  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href="/admin/productos"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a productos
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Editar Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateProduct.bind(null, params.id)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input id="name" name="name" required defaultValue={product.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Descripción Corta *</Label>
              <Input
                id="short_description"
                name="short_description"
                required
                defaultValue={product.short_description}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Completa *</Label>
              <Textarea id="description" name="description" required rows={6} defaultValue={product.description} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio *</Label>
                <Input id="price" name="price" type="number" step="0.01" required defaultValue={product.price} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock_quantity">Stock *</Label>
                <Input
                  id="stock_quantity"
                  name="stock_quantity"
                  type="number"
                  required
                  defaultValue={product.stock_quantity}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id">Categoría *</Label>
                <select
                  id="category_id"
                  name="category_id"
                  required
                  defaultValue={product.category_id}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" name="sku" defaultValue={product.sku || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL de Imagen</Label>
              <Input id="image_url" name="image_url" type="url" defaultValue={product.image_url || ""} />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="is_featured">Producto Destacado</Label>
                <p className="text-sm text-muted-foreground">Mostrar en la página principal</p>
              </div>
              <Switch id="is_featured" name="is_featured" defaultChecked={product.is_featured} />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="is_active">Producto Activo</Label>
                <p className="text-sm text-muted-foreground">Visible en el catálogo público</p>
              </div>
              <Switch id="is_active" name="is_active" defaultChecked={product.is_active} />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Guardar Cambios
              </Button>
              <Link href="/admin/productos" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t">
            <form action={deleteProduct.bind(null, params.id)}>
              <Button type="submit" variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Producto
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
