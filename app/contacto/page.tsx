import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react"
import { WHATSAPP_CONTACTS } from "@/lib/whatsapp"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contáctanos</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Estamos aquí para ayudarte. Comunícate con nuestro equipo de ventas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* WhatsApp Contacts */}
            {WHATSAPP_CONTACTS.map((contact) => (
              <Card key={contact.number}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    {contact.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">+{contact.number}</p>
                  <a href={`https://wa.me/${contact.number}`} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Abrir WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">ventas@misiobot.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Ubicación</h3>
                <p className="text-sm text-muted-foreground">Ecuador</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Horario</h3>
                <p className="text-sm text-muted-foreground">Lun - Vie: 9:00 - 18:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
