import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Home, Key, MapPin, Search, Shield } from "lucide-react"

export const metadata = {
  title: "Rent Property in South Africa | GetASpot",
  description: "Find your perfect rental. Browse apartments, houses, and more for rent across South Africa.",
}

export default function RentPage() {
  const propertyTypes = [
    { name: "Apartments", icon: Building2, count: "6,780", link: "/properties?type=apartment&listing_type=rent" },
    { name: "Houses", icon: Home, count: "4,230", link: "/properties?type=house&listing_type=rent" },
    { name: "Townhouses", icon: Home, count: "2,890", link: "/properties?type=townhouse&listing_type=rent" },
    { name: "Rooms", icon: MapPin, count: "1,450", link: "/properties?type=room&listing_type=rent" },
  ]

  const priceRanges = [
    { range: "Under R5,000", count: "2,340", link: "/properties?listing_type=rent&max_price=5000" },
    { range: "R5,000 - R10,000", count: "4,560", link: "/properties?listing_type=rent&min_price=5000&max_price=10000" },
    {
      range: "R10,000 - R20,000",
      count: "3,780",
      link: "/properties?listing_type=rent&min_price=10000&max_price=20000",
    },
    { range: "R20,000+", count: "1,890", link: "/properties?listing_type=rent&min_price=20000" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-terra-600 to-terra-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4 text-balance">Find Your Perfect Rental</h1>
            <p className="text-xl mb-8 text-terra-50 text-pretty">
              Discover apartments, houses, and townhouses for rent across South Africa. Your next home awaits.
            </p>
            <Link href="/properties?listing_type=rent">
              <Button size="lg" className="bg-white text-terra-600 hover:bg-terra-50">
                <Search className="w-5 h-5 mr-2" />
                Search Rentals
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
                    <type.icon className="w-12 h-12 mx-auto mb-4 text-terra-600" />
                    <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                    <p className="text-muted-foreground">{type.count} available</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Price Ranges */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Monthly Rent</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {priceRanges.map((range) => (
              <Link key={range.range} href={range.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">{range.range}</h3>
                    <p className="text-muted-foreground">{range.count} properties</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Renting Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Rent with GetASpot</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-terra-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-terra-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Viewing</h3>
                <p className="text-muted-foreground">
                  Book property viewings instantly and connect directly with landlords
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-terra-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-terra-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Landlords</h3>
                <p className="text-muted-foreground">All landlords and agents are verified for your peace of mind</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-terra-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-terra-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Filters</h3>
                <p className="text-muted-foreground">Find properties that match your lifestyle with advanced filters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-terra-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Rental?</h2>
          <p className="text-xl mb-8 text-terra-50">Start browsing available properties today</p>
          <Link href="/properties?listing_type=rent">
            <Button size="lg" className="bg-white text-terra-600 hover:bg-terra-50">
              Browse All Rentals
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
