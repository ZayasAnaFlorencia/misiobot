import type { CartItem } from "@/lib/types"

// WhatsApp contact numbers for Misiobot
export const WHATSAPP_CONTACTS = [
  { name: "Ventas Principal", number: "5493764156934" },
  { name: "Soporte", number: "5493764662524" },
]

export function generateWhatsAppMessage(items: CartItem[], customerInfo?: { name?: string; company?: string }) {
  const header = customerInfo?.name
    ? `Hola! Soy ${customerInfo.name}${customerInfo.company ? ` de ${customerInfo.company}` : ""} y me gustaría hacer el siguiente pedido:`
    : "Hola! Me gustaría hacer el siguiente pedido:"

  const itemsList = items
    .map((item, index) => {
      const subtotal = item.product.price * item.quantity
      return `${index + 1}. *${item.product.name}*
   - Cantidad: ${item.quantity}
   - Precio unitario: $${item.product.price.toFixed(2)}
   - Subtotal: $${subtotal.toFixed(2)}
   ${item.product.sku ? `- SKU: ${item.product.sku}` : ""}`
    })
    .join("\n\n")

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const footer = `
*TOTAL: $${total.toFixed(2)}*

Espero su confirmación. Gracias!`

  return `${header}\n\n${itemsList}\n${footer}`
}

export function getWhatsAppUrl(phoneNumber: string, message: string) {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
