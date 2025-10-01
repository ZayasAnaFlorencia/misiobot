import Link from "next/link"
import { MessageCircle, Mail, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl text-foreground">Misiobot</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Soluciones B2B de calidad para tu negocio. Catálogo completo de productos industriales y comerciales.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/productos?categoria=electronica"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Electrónica
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?categoria=oficina"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Oficina
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?categoria=herramientas"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Herramientas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>WhatsApp: +593 99 999 9999</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>ventas@misiobot.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Ecuador</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Misiobot. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
