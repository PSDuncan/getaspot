import Image from "next/image"
import { MoreHorizontal, MapPin, Eye, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for agent properties
const properties = [
  {
    id: "1",
    title: "Modern Apartment in Sandton",
    address: "123 Main St, Sandton, Johannesburg",
    image: "/placeholder.svg?height=60&width=60",
    price: "R 2,450,000",
    views: 124,
    inquiries: 8,
    status: "published",
    featured: true,
  },
  {
    id: "2",
    title: "Family Home in Cape Town",
    address: "456 Beach Rd, Camps Bay, Cape Town",
    image: "/placeholder.svg?height=60&width=60",
    price: "R 5,950,000",
    views: 98,
    inquiries: 5,
    status: "published",
    featured: false,
  },
  {
    id: "3",
    title: "Luxury Villa in Umhlanga",
    address: "789 Ocean View, Umhlanga, Durban",
    image: "/placeholder.svg?height=60&width=60",
    price: "R 8,200,000",
    views: 156,
    inquiries: 12,
    status: "published",
    featured: true,
  },
]

export function AgentProperties() {
  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-md">
              <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{property.title}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                {property.address}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  <Eye className="mr-1 h-3 w-3" />
                  {property.views} views
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  {property.inquiries} inquiries
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-sm font-medium">{property.price}</div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={
                  property.status === "published"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }
              >
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </Badge>
              {property.featured && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Featured
                </Badge>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Property</DropdownMenuItem>
                <DropdownMenuItem>Edit Property</DropdownMenuItem>
                <DropdownMenuItem>View Inquiries</DropdownMenuItem>
                {property.featured ? (
                  <DropdownMenuItem>Remove Featured</DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>Mark as Featured</DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete Property</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

