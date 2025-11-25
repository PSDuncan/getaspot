import type { Metadata } from "next"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, TrendingUp, Shield, FileText, Calculator } from "lucide-react"

export const metadata: Metadata = {
  title: "Property Guides | GetASpot",
  description: "Expert guides and resources to help you buy, sell, or rent property in South Africa.",
}

export default function GuidesPage() {
  const guides = [
    {
      icon: Home,
      title: "First-Time Buyer's Guide",
      description: "Everything you need to know about buying your first property in South Africa.",
      category: "Buying",
    },
    {
      icon: TrendingUp,
      title: "Selling Your Property",
      description: "Tips and strategies to get the best price when selling your home.",
      category: "Selling",
    },
    {
      icon: Shield,
      title: "Understanding Bond Applications",
      description: "Navigate the home loan process with confidence.",
      category: "Finance",
    },
    {
      icon: FileText,
      title: "Property Legal Requirements",
      description: "Legal documents and requirements for property transactions.",
      category: "Legal",
    },
    {
      icon: Calculator,
      title: "Property Investment Guide",
      description: "Make smart investment decisions in the property market.",
      category: "Investment",
    },
    {
      icon: BookOpen,
      title: "Rental Market Guide",
      description: "Everything landlords and tenants need to know.",
      category: "Renting",
    },
  ]

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Property Guides & Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Expert advice to help you navigate the South African property market with confidence.
            </p>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Card key={guide.title} className="hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <guide.icon className="w-12 h-12 text-primary mb-4" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 block">
                      {guide.category}
                    </span>
                    <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Personal Advice?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our property experts are here to help you with personalized guidance.
            </p>
            <Button size="lg">Contact an Expert</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
