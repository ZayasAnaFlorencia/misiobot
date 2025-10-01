"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <Link href={`/productos/${product.slug}`} className="flex-1">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          {product.image_url ? (
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={`/.jpg?height=300&width=300&query=${encodeURIComponent(product.name)}`}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          {hasDiscount && (
            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}
          {product.is_featured && <Badge className="absolute top-3 left-3 bg-primary">Destacado</Badge>}
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance">
            {product.name}
          </h3>
          {product.short_description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.short_description}</p>
          )}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.compare_at_price!.toFixed(2)}
              </span>
            )}
          </div>
          {product.stock_quantity > 0 ? (
            <p className="text-xs text-muted-foreground mt-1">Stock: {product.stock_quantity} unidades</p>
          ) : (
            <Badge variant="secondary" className="mt-1">
              Sin stock
            </Badge>
          )}
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} className="w-full" />
      </CardFooter>
    </Card>
  )
}
