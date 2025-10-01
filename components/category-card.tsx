import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/types"
import { Package } from "lucide-react"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/productos?categoria=${category.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary">
        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {category.image_url ? (
              <img
                src={category.image_url || "/placeholder.svg"}
                alt={category.name}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <Package className="w-10 h-10 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{category.description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
