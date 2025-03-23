import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { HeroSearch } from "@/components/hero-search"
import { FeaturedProperties } from "@/components/featured-properties"
import { PropertyCategories } from "@/components/property-categories"
import { PopularLocations } from "@/components/popular-locations"
import { PropertyTools } from "@/components/property-tools"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="hidden items-center space-x-2 md:flex">
              <span className="hidden font-bold sm:inline-block text-xl">GetASpot</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Search */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-10" />
          <div
            className="h-[600px] bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
          >
            <div className="container relative z-20 h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                Find Your Perfect Home in South Africa
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl mb-8">
                Browse thousands of properties for sale and to rent across South Africa. Find your dream home with
                GetASpot.
              </p>
              <HeroSearch />
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="container py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
              <p className="text-muted-foreground mt-1">Handpicked properties you might love</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
          <FeaturedProperties />
        </section>

        {/* Property Categories */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Browse by Property Type</h2>
              <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">
                Explore properties by category to find exactly what you're looking for
              </p>
            </div>
            <PropertyCategories />
          </div>
        </section>

        {/* Popular Locations */}
        <section className="container py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Popular Locations</h2>
            <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">
              Discover properties in South Africa's most sought-after areas
            </p>
          </div>
          <PopularLocations />
        </section>

        {/* For Agents & Sellers */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary-foreground/10 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">For Property Owners</h3>
                <p className="mb-6">
                  List your property directly on GetASpot and reach thousands of potential buyers or tenants. No agent
                  needed.
                </p>
                <Button variant="secondary" asChild>
                  <Link href="/register?type=seller">List Your Property</Link>
                </Button>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">For Real Estate Agents</h3>
                <p className="mb-6">
                  Join GetASpot as an agent or agency and showcase your properties to a wider audience. Powerful tools
                  included.
                </p>
                <Button variant="secondary" asChild>
                  <Link href="/register?type=agent">Join as Agent</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Property Tools */}
        <section className="container py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Helpful Property Tools</h2>
            <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">
              Use our tools to help with your property journey
            </p>
          </div>
          <PropertyTools />
        </section>

        {/* Testimonials */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">What Our Users Say</h2>
              <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">
                Hear from people who have found their perfect property with GetASpot
              </p>
            </div>
            <Testimonials />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

