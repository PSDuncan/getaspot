import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Globe, Heart, Target, Users, Zap } from "lucide-react"
import Link from "next/link"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata = {
  title: "About Us | GetASpot",
  description:
    "Learn about GetASpot - South Africa's fastest-growing property platform, connecting buyers, sellers, and renters.",
}

export default function AboutPage() {
  const values = [
    { icon: Heart, title: "Customer First", description: "We put our users at the heart of everything we do" },
    { icon: Zap, title: "Innovation", description: "Leveraging technology to simplify property search" },
    { icon: Target, title: "Transparency", description: "Honest, clear, and fair in all our dealings" },
    { icon: Globe, title: "Accessibility", description: "Making property search accessible to all South Africans" },
  ]

  const stats = [
    { number: "500K+", label: "Active Users" },
    { number: "25K+", label: "Properties Listed" },
    { number: "1,200+", label: "Agencies" },
    { number: "98%", label: "Satisfaction Rate" },
  ]

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 text-balance">About GetASpot</h1>
              <p className="text-xl text-teal-50 text-pretty">
                We're on a mission to revolutionize the South African property market by making it faster, easier, and
                more transparent for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  GetASpot was founded in 2024 with a simple vision: to create the best property platform in South
                  Africa. We saw that existing platforms were slow, cluttered, and didn't put users first. So we built
                  something better.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Today, GetASpot is the fastest-growing property platform in South Africa, trusted by hundreds of
                  thousands of buyers, sellers, and renters. We've helped thousands of South Africans find their dream
                  homes and successfully sell their properties.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  But we're just getting started. Our team is constantly innovating, adding new features, and improving
                  the experience for everyone in the South African property market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-teal-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-teal-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent className="p-6 text-center">
                    <value.icon className="w-12 h-12 mx-auto mb-4 text-teal-600" />
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-16 h-16 mx-auto mb-6 text-teal-600" />
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To become South Africa's #1 property platform by providing the fastest, most intuitive, and most trusted
                way to buy, sell, and rent properties. We're committed to using technology to make property search
                accessible, transparent, and enjoyable for all South Africans.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Users className="w-16 h-16 mx-auto mb-6 text-teal-600" />
              <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're always looking for talented individuals who share our passion for innovation and customer service.
              </p>
              <Link href="/careers">
                <Button size="lg">View Open Positions</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience the Difference</h2>
            <p className="text-xl mb-8 text-teal-50">Join thousands who trust GetASpot for their property needs</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                  Browse Properties
                </Button>
              </Link>
              <Link href="/sell">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
