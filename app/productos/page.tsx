import { getCategories, getProducts } from "@/lib/database"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { ProductFilters } from "@/components/product-filters"

interface ProductsPageProps {
  searchParams: Promise<{
    categoria?: string
    q?: string
    min_precio?: string
    max_precio?: string
    orden?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams

  const filters = {
    categorySlug: params.categoria,
    searchQuery: params.q,
    minPrice: params.min_precio ? Number(params.min_precio) : undefined,
    maxPrice: params.max_precio ? Number(params.max_precio) : undefined,
    sortBy: params.orden,
  }

  const [categories, products] = await Promise.all([getCategories(), getProducts(filters)])

  const currentCategory = filters.categorySlug ? categories.find((c) => c.slug === filters.categorySlug) : null

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
            {currentCategory ? currentCategory.name : "Todos los Productos"}
          </h1>
          <p className="text-muted-foreground">
            {currentCategory ? currentCategory.description : "Explora nuestro catálogo completo de productos B2B"}
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:sticky lg:top-4 h-fit">
            <ProductFilters categories={categories} />
          </aside>

          {/* Main Content */}
          <div>
            {/* Categories (only show when no category selected) */}
            {!filters.categorySlug && !filters.searchQuery && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-foreground">Categorías</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  {filters.searchQuery ? `Resultados para "${filters.searchQuery}"` : "Productos"}
                </h2>
                <p className="text-sm text-muted-foreground">{products.length} productos encontrados</p>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-lg border">
                  <p className="text-muted-foreground mb-2">No se encontraron productos con los filtros aplicados.</p>
                  <p className="text-sm text-muted-foreground">Intenta ajustar tus criterios de búsqueda.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
