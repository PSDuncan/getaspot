import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Home, MapPin, Search, TrendingUp } from "lucide-react"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata = {
  title: "Buy Property in South Africa | GetASpot",
  description:
    "Find your dream home. Browse thousands of properties for sale across South Africa. Houses, apartments, townhouses and more.",
}

export default function BuyPage() {
  const propertyTypes = [
    { name: "Houses", icon: Home, count: "12,450", link: "/properties?type=house&listing_type=sale" },
    { name: "Apartments", icon: Building2, count: "8,320", link: "/properties?type=apartment&listing_type=sale" },
    { name: "Townhouses", icon: Home, count: "5,680", link: "/properties?type=townhouse&listing_type=sale" },
    { name: "Land", icon: MapPin, count: "2,150", link: "/properties?type=land&listing_type=sale" },
  ]

  const popularCities = [
    { name: "Cape Town", properties: "3,245", image: "/placeholder.svg?height=200&width=300" },
    { name: "Johannesburg", properties: "4,890", image: "/placeholder.svg?height=200&width=300" },
    { name: "Durban", properties: "2,156", image: "/placeholder.svg?height=200&width=300" },
    { name: "Pretoria", properties: "1,987", image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-4 text-balance">Find Your Dream Home</h1>
              <p className="text-xl mb-8 text-teal-50 text-pretty">
                Browse thousands of properties for sale across South Africa. Your perfect home is waiting.
              </p>
              <Link href="/properties?listing_type=sale">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                  <Search className="w-5 h-5 mr-2" />
                  Search Properties for Sale
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Browse by Property Type</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {propertyTypes.map((type) => (
                <Link key={type.name} href={type.link}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <type.icon className="w-12 h-12 mx-auto mb-4 text-teal-600" />
                      <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                      <p className="text-muted-foreground">{type.count} properties</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Cities */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Cities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCities.map((city) => (
                <Link key={city.name} href={`/properties?city=${city.name}&listing_type=sale`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <img src={city.image || "/placeholder.svg"} alt={city.name} className="w-full h-48 object-cover" />
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-1">{city.name}</h3>
                      <p className="text-muted-foreground">{city.properties} properties</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Buy Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Buy with GetASpot</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
                  <p className="text-muted-foreground">
                    Filter by location, price, size, and features to find exactly what you need
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
                  <p className="text-muted-foreground">
                    Get real-time property values and market trends to make informed decisions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
                  <p className="text-muted-foreground">
                    All properties are verified for accuracy and quality assurance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Home?</h2>
            <p className="text-xl mb-8 text-teal-50">Start searching thousands of properties for sale today</p>
            <Link href="/properties?listing_type=sale">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                Browse All Properties
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
