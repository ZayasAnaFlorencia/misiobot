import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"
import { updateCategory, deleteCategory } from "../actions"
import { notFound } from "next/navigation"

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: category } = await supabase.from("categories").select("*").eq("id", params.id).single()

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/admin/categorias"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a categorías
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Editar Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateCategory.bind(null, params.id)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Categoría *</Label>
              <Input id="name" name="name" required defaultValue={category.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea id="description" name="description" required rows={4} defaultValue={category.description} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Orden de Visualización</Label>
              <Input id="display_order" name="display_order" type="number" defaultValue={category.display_order} />
              <p className="text-xs text-muted-foreground">Número menor aparece primero (0 = primero)</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Guardar Cambios
              </Button>
              <Link href="/admin/categorias" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t">
            <form action={deleteCategory.bind(null, params.id)}>
              <Button type="submit" variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Categoría
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
