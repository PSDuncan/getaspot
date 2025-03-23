import Image from "next/image"
import { MoreHorizontal, MapPin, Bath, Bed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for properties
const properties = [
  {
    id: "1",
    title: "Modern Apartment in Sandton",
    address: "123 Main St, Sandton, Johannesburg",
    image: "/placeholder.svg?height=60&width=60",
    price: "R 2,450,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    status: "published",
    featured: true,
  },
  {
    id: "2",
    title: "Family Home in Cape Town",
    address: "456 Beach Rd, Camps Bay, Cape Town",
    image: "/placeholder.svg?height=60&width=60",
    price: "R 5,950,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    status: "published",
    featured: false,
  },
  {
    id: "3",
    title: "Luxury Villa in Umhlanga",
    address: "789 Ocean View, Umhlanga, Durban",
    image: "/placeholder.svg?height=60&width=60",
    price: "R 8,200,000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    status: "published",
    featured: true,
  },
  {
    id: "4",
    title: "Penthouse in Pretoria",
    address: "101 High St, Pretoria Central, Pretoria",
    image: "/placeholder.svg?height=60&width=60",
    price: "R 3,750,000",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 2,
    status: "draft",
    featured: false,
  },
]

export function AdminProperties() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{property.title}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {property.address}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center">
                      <Bed className="mr-1 h-3 w-3" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="mr-1 h-3 w-3" />
                      {property.bathrooms}
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{property.price}</TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Property</DropdownMenuItem>
                  <DropdownMenuItem>Edit Property</DropdownMenuItem>
                  {property.status === "published" ? (
                    <DropdownMenuItem>Unpublish</DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>Publish</DropdownMenuItem>
                  )}
                  {property.featured ? (
                    <DropdownMenuItem>Remove Featured</DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>Mark as Featured</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete Property</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

