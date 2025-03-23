import Link from "next/link"
import Image from "next/image"
import { Bath, Bed, Building, Calendar, ChevronLeft, Heart, Maximize, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"
import { PropertyEnquiryForm } from "@/components/property-enquiry-form"
import { PropertyFeatures } from "@/components/property-features"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyMap } from "@/components/property-map"
import { SimilarProperties } from "@/components/similar-properties"

// Sample property data
const property = {
  id: "1",
  title: "Modern Apartment in Sandton",
  description:
    "This beautiful modern apartment is located in the heart of Sandton, Johannesburg. It features 2 spacious bedrooms, 2 bathrooms, an open-plan kitchen and living area, and a balcony with city views. The apartment is in a secure complex with 24-hour security, a swimming pool, and a gym.",
  address: "123 Main St, Sandton, Johannesburg",
  price: "R 2,450,000",
  type: "Apartment",
  bedrooms: 2,
  bathrooms: 2,
  size: "120 m²",
  features: [
    "24-hour Security",
    "Swimming Pool",
    "Gym",
    "Balcony",
    "City Views",
    "Open-plan Kitchen",
    "Built-in Cupboards",
    "Parking Bay",
    "Fiber Internet Ready",
    "Air Conditioning",
  ],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  agent: {
    name: "John Smith",
    company: "GetASpot Realty",
    phone: "+27 82 123 4567",
    email: "john@getaspot.co.za",
    image: "/placeholder.svg?height=100&width=100",
  },
  listedDate: "2023-12-15",
  propertyId: "GSP12345",
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
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
          <div className="mb-6">
            <Button variant="ghost" size="sm" className="mb-4" asChild>
              <Link href="/properties">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Properties
              </Link>
            </Button>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
                <p className="text-muted-foreground mt-1">{property.address}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share property</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <PropertyGallery images={property.images} />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                  <Bed className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                  <Bath className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                  <Maximize className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">{property.size}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                  <Building className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">{property.type}</span>
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Property Description</h3>
                    <p>{property.description}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Property ID</p>
                        <p className="font-medium">{property.propertyId}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Property Type</p>
                        <p className="font-medium">{property.type}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">{property.price}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-medium">{property.size}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                        <p className="font-medium">{property.bedrooms}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                        <p className="font-medium">{property.bathrooms}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Listed Date</p>
                        <p className="font-medium flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(property.listedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="pt-4">
                  <PropertyFeatures features={property.features} />
                </TabsContent>
                <TabsContent value="map" className="pt-4">
                  <PropertyMap address={property.address} />
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">{property.price}</CardTitle>
                  <CardDescription>
                    {property.type} • {property.bedrooms} Beds • {property.bathrooms} Baths
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={property.agent.image || "/placeholder.svg"}
                        alt={property.agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{property.agent.name}</p>
                      <p className="text-sm text-muted-foreground">{property.agent.company}</p>
                    </div>
                  </div>
                  <Separator className="mb-6" />
                  <PropertyEnquiryForm propertyId={property.id} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mortgage Calculator</CardTitle>
                  <CardDescription>Estimate your monthly mortgage payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on a 20-year bond at 11.25% interest rate with 10% deposit
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
                    <p className="text-2xl font-bold text-primary">R 21,450</p>
                  </div>
                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href="/tools/mortgage-calculator">Customize Calculation</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <SimilarProperties />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

