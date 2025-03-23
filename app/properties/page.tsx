import Link from "next/link"
import { Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropertyGrid } from "@/components/property-grid"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"

export default function PropertiesPage() {
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
        <div className="container py-8">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
            <p className="text-muted-foreground">Browse our extensive collection of properties across South Africa.</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-4">
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by suburb, city or area..."
                      className="w-full bg-background pl-8"
                    />
                  </div>
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Type</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Price</SelectItem>
                      <SelectItem value="0-1000000">Under R1,000,000</SelectItem>
                      <SelectItem value="1000000-2000000">R1,000,000 - R2,000,000</SelectItem>
                      <SelectItem value="2000000-5000000">R2,000,000 - R5,000,000</SelectItem>
                      <SelectItem value="5000000-10000000">R5,000,000 - R10,000,000</SelectItem>
                      <SelectItem value="10000000+">Above R10,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button className="w-full gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">1,245 Properties Found</h2>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="beds-desc">Most Bedrooms</SelectItem>
                  <SelectItem value="size-desc">Largest Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <PropertyGrid />

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mx-auto">
              Load More Properties
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

