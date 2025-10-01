import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/database"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Package, Tag } from "lucide-react"
import Link from "next/link"

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/productos" className="hover:text-foreground">
            Productos
          </Link>
          {product.categories && (
            <>
              <span>/</span>
              <Link href={`/productos?categoria=${product.categories.slug}`} className="hover:text-foreground">
                {product.categories.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            {product.image_url ? (
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={`/.jpg?height=600&width=600&query=${encodeURIComponent(product.name)}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              {product.is_featured && <Badge className="mb-3">Producto Destacado</Badge>}
              <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">{product.name}</h1>
              {product.short_description && (
                <p className="text-lg text-muted-foreground text-pretty">{product.short_description}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.compare_at_price!.toFixed(2)}
                  </span>
                  <Badge variant="destructive">-{discountPercentage}%</Badge>
                </>
              )}
            </div>

            {/* Stock & SKU */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Stock: <span className="font-semibold text-foreground">{product.stock_quantity} unidades</span>
                </span>
              </div>
              {product.sku && (
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    SKU: <span className="font-semibold text-foreground">{product.sku}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-3 text-foreground">Descripción</h2>
                <p className="text-muted-foreground leading-relaxed text-pretty">{product.description}</p>
              </div>
            )}

            <div className="flex gap-3 mt-auto">
              <AddToCartButton product={product} className="flex-1 h-12 text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
