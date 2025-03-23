import Image from "next/image"
import { Eye, MessageSquare } from "lucide-react"

const recentListings = [
  {
    id: "1",
    title: "Modern Apartment in Sandton",
    address: "123 Main St, Sandton, Johannesburg",
    price: "R 2,450,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    views: 124,
    inquiries: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    title: "Family Home in Cape Town",
    address: "456 Beach Rd, Camps Bay, Cape Town",
    price: "R 5,950,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    views: 98,
    inquiries: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    title: "Luxury Villa in Umhlanga",
    address: "789 Ocean View, Umhlanga, Durban",
    price: "R 8,200,000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4.5,
    views: 156,
    inquiries: 12,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function RecentListings() {
  return (
    <div className="space-y-4">
      {recentListings.map((listing) => (
        <div key={listing.id} className="flex items-start space-x-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-md">
            <Image src={listing.image || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-medium leading-none">{listing.title}</h4>
            <p className="text-xs text-muted-foreground">{listing.address}</p>
            <div className="flex items-center text-xs">
              <span className="font-medium text-primary">{listing.price}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span>{listing.bedrooms} bed</span>
              <span className="mx-1 text-muted-foreground">•</span>
              <span>{listing.bathrooms} bath</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Eye className="mr-1 h-3 w-3" />
                {listing.views}
              </div>
              <div className="flex items-center">
                <MessageSquare className="mr-1 h-3 w-3" />
                {listing.inquiries}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

