import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createCategory } from "../actions"

export default function NewCategoryPage() {
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
          <CardTitle>Nueva Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCategory} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Categoría *</Label>
              <Input id="name" name="name" required placeholder="Ej: Robots Educativos" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                name="description"
                required
                rows={4}
                placeholder="Descripción de la categoría"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Orden de Visualización</Label>
              <Input id="display_order" name="display_order" type="number" defaultValue={0} placeholder="0" />
              <p className="text-xs text-muted-foreground">Número menor aparece primero (0 = primero)</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Crear Categoría
              </Button>
              <Link href="/admin/categorias" className="flex-1">
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
