import Link from "next/link"
import Image from "next/image"
import { Bath, Bed, MapPin, Maximize } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Sample similar properties data
const similarProperties = [
  {
    id: "2",
    title: "Luxury Apartment in Sandton",
    address: "456 Rivonia Rd, Sandton, Johannesburg",
    price: "R 2,750,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "130 m²",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Modern Studio in Rosebank",
    address: "789 Oxford Rd, Rosebank, Johannesburg",
    price: "R 1,850,000",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    size: "65 m²",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Penthouse in Melrose Arch",
    address: "101 High St, Melrose Arch, Johannesburg",
    price: "R 4,950,000",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 2,
    size: "180 m²",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function SimilarProperties() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {similarProperties.map((property) => (
        <Link href={`/properties/${property.id}`} key={property.id} className="group">
          <Card className="overflow-hidden h-full transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
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
          </Card>
        </Link>
      ))}
    </div>
  )
}

