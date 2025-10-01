import { getCategories, getFeaturedProducts } from "@/lib/database"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Package, Shield, Truck } from "lucide-react"

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([getCategories(), getFeaturedProducts()])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Soluciones B2B para tu Negocio
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Catálogo completo de productos industriales y comerciales. Calidad garantizada, precios competitivos y
              atención personalizada para empresas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/productos">
                <Button size="lg" className="h-12 px-8">
                  Ver catálogo completo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
                  Contactar ventas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Amplio Catálogo</h3>
                <p className="text-sm text-muted-foreground">Miles de productos disponibles para tu negocio</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Calidad Garantizada</h3>
                <p className="text-sm text-muted-foreground">Productos certificados y de marcas reconocidas</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground">Envíos a todo el país con seguimiento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Explora por Categoría</h2>
            <p className="text-muted-foreground">Encuentra exactamente lo que necesitas</p>
          </div>
          <Link href="/productos" className="hidden sm:inline">
            <Button variant="outline" className="bg-transparent">
              Ver todas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.slice(0, 5).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 border-y">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Productos Destacados</h2>
              <p className="text-muted-foreground">Los más populares de nuestro catálogo</p>
            </div>
            <Link href="/productos" className="hidden sm:inline">
              <Button variant="outline" className="bg-transparent">
                Ver todos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            ¿Listo para hacer tu pedido?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
            Explora nuestro catálogo completo y envía tu pedido directamente por WhatsApp. Atención personalizada para
            tu negocio.
          </p>
          <Link href="/productos">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Explorar productos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
