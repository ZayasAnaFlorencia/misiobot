import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createProduct } from "../actions"

export default async function NewProductPage() {
  const supabase = await createClient()
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
          <CardTitle>Nuevo Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProduct} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input id="name" name="name" required placeholder="Ej: Robot Educativo MisioBot" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Descripción Corta *</Label>
              <Input
                id="short_description"
                name="short_description"
                required
                placeholder="Descripción breve para listados"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Completa *</Label>
              <Textarea
                id="description"
                name="description"
                required
                rows={6}
                placeholder="Descripción detallada del producto"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio *</Label>
                <Input id="price" name="price" type="number" step="0.01" required placeholder="0.00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock_quantity">Stock *</Label>
                <Input id="stock_quantity" name="stock_quantity" type="number" required placeholder="0" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id">Categoría *</Label>
                <select
                  id="category_id"
                  name="category_id"
                  required
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
                <Input id="sku" name="sku" placeholder="Código único del producto" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL de Imagen</Label>
              <Input id="image_url" name="image_url" type="url" placeholder="https://ejemplo.com/imagen.jpg" />
              <p className="text-xs text-muted-foreground">Ingresa la URL completa de la imagen del producto</p>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="is_featured">Producto Destacado</Label>
                <p className="text-sm text-muted-foreground">Mostrar en la página principal</p>
              </div>
              <Switch id="is_featured" name="is_featured" />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="is_active">Producto Activo</Label>
                <p className="text-sm text-muted-foreground">Visible en el catálogo público</p>
              </div>
              <Switch id="is_active" name="is_active" defaultChecked />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Crear Producto
              </Button>
              <Link href="/admin/productos" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
