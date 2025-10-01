"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import Link from "next/link"

export function CartButton() {
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <Link href="/carrito">
      <Button variant="outline" size="icon" className="relative bg-transparent">
        <ShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
