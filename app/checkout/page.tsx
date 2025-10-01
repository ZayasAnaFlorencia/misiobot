"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShoppingBag, MessageCircle } from "lucide-react"
import Link from "next/link"
import { generateWhatsAppMessage, getWhatsAppUrl, WHATSAPP_CONTACTS } from "@/lib/whatsapp"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()

  const [customerName, setCustomerName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedContact, setSelectedContact] = useState(WHATSAPP_CONTACTS[0].number)

  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-8">Agrega productos para comenzar tu pedido</p>
            <Link href="/productos">
              <Button size="lg">Explorar productos</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage(items, {
      name: customerName || undefined,
      company: companyName || undefined,
    })

    // Add notes if provided
    const fullMessage = notes ? `${message}\n\n*Notas adicionales:*\n${notes}` : message

    const whatsappUrl = getWhatsAppUrl(selectedContact, fullMessage)

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank")

    // Optional: Clear cart after sending (uncomment if desired)
    // clearCart()
    // router.push("/pedido-enviado")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Finalizar Pedido</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Information Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      placeholder="Juan Pérez"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      placeholder="Mi Empresa S.A."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+593 99 999 9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Instrucciones especiales, dirección de entrega, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Contacto de WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedContact} onValueChange={setSelectedContact}>
                  {WHATSAPP_CONTACTS.map((contact) => (
                    <div key={contact.number} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value={contact.number} id={contact.number} />
                      <Label htmlFor={contact.number} className="flex-1 cursor-pointer">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">+{contact.number}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-foreground line-clamp-1">{item.product.name}</p>
                        <p className="text-muted-foreground">
                          {item.quantity} x ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full" onClick={handleSendWhatsApp} disabled={!customerName.trim()}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar pedido por WhatsApp
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Al hacer clic, se abrirá WhatsApp con tu pedido pre-llenado
                </p>

                <Link href="/carrito">
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Volver al carrito
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
