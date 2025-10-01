"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  className?: string
  showIcon?: boolean
}

export function AddToCartButton({ product, className, showIcon = true }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.stock_quantity === 0 || added}
      className={className}
      variant={added ? "secondary" : "default"}
    >
      {added ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Agregado
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart className="w-4 h-4 mr-2" />}
          Agregar al carrito
        </>
      )}
    </Button>
  )
}
