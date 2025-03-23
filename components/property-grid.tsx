import Link from "next/link"
import Image from "next/image"
import { Bath, Bed, MapPin, Maximize } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Sample properties data
const properties = [
  {
    id: "1",
    title: "Modern Apartment in Sandton",
    address: "123 Main St, Sandton, Johannesburg",
    price: "R 2,450,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "120 m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    forSale: true,
  },
  {
    id: "2",
    title: "Family Home in Cape Town",
    address: "456 Beach Rd, Camps Bay, Cape Town",
    price: "R 5,950,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    size: "280 m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    forSale: true,
  },
  {
    id: "3",
    title: "Luxury Villa in Umhlanga",
    address: "789 Ocean View, Umhlanga, Durban",
    price: "R 8,200,000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    size: "350 m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    forSale: true,
  },
  {
    id: "4",
    title: "Penthouse in Pretoria",
    address: "101 High St, Pretoria Central, Pretoria",
    price: "R 3,750,000",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 2,
    size: "180 m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    forSale: true,
  },
  {
    id: "5",
    title: "Garden Cottage in Stellenbosch",
    address: "202 Vine Rd, Stellenbosch",
    price: "R 1,850,000",
    type: "Cottage",
    bedrooms: 2,
    bathrooms: 1,
    size: "90 m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    forSale: true,
  },
  {
    id: "6",
    title: "Beachfront Apartment in Ballito",
    address: "303 Coastal Dr, Ballito",
    price: "R 12,500 /month",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "110 m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    forSale: false,
  },
  {
    id: "7",
    title: "Modern Townhouse in Rosebank",
    address: "404 Rose Ave, Rosebank, Johannesburg",
    price: "R 3,200,000",
    type: "Townhouse",
    bedrooms: 3,
    bathrooms: 2.5,
    size: "160 m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    forSale: true,
  },
  {
    id: "8",
    title: "Luxury Apartment in Sandton",
    address: "505 Maude St, Sandton, Johannesburg",
    price: "R 25,000 /month",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: "150 m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    forSale: false,
  },
  {
    id: "9",
    title: "Family Home in Bloemfontein",
    address: "606 Park Rd, Bloemfontein",
    price: "R 2,100,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 2,
    size: "220 m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    forSale: true,
  },
]

export function PropertyGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Link href={`/properties/${property.id}`} key={property.id} className="group">
          <Card className="overflow-hidden h-full transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Badge className="absolute left-2 top-2 z-10">{property.forSale ? "For Sale" : "For Rent"}</Badge>
              {property.featured && (
                <Badge variant="secondary" className="absolute right-2 top-2 z-10">
                  Featured
                </Badge>
              )}
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="truncate">{property.address}</span>
              </div>
              <p className="text-lg font-bold mt-2 text-primary">{property.price}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center text-sm">
                  <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center text-sm">
                  <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center text-sm">
                  <Maximize className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{property.size}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">Listed 2 days ago</CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

