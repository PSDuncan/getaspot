"use client"

import Image from "next/image"
import { MoreHorizontal, MapPin, Eye, MessageSquare } from "lucide-react"
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
import { useDashboard } from "@/contexts/dashboard-context"
import { Skeleton } from "@/components/ui/skeleton"

export function AgencyProperties() {
  const { properties, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  // Use real data if available, otherwise use sample data
  const displayProperties =
    properties.length > 0
      ? properties.slice(0, 5)
      : [
          {
            id: "1",
            title: "Modern Apartment in Sandton",
            address: "123 Main St, Sandton, Johannesburg",
            image: "/placeholder.svg?height=60&width=60",
            price: "R 2,450,000",
            agent: "John Smith",
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
            agent: "Sarah Johnson",
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
            agent: "Michael Brown",
            views: 156,
            inquiries: 12,
            status: "published",
            featured: true,
          },
        ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Agent</TableHead>
          <TableHead>Performance</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayProperties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                  <Image
                    src={property.images?.[0] || property.image || "/placeholder.svg?height=60&width=60"}
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
                </div>
              </div>
            </TableCell>
            <TableCell>
              {property.listing_type === "rent"
                ? `R ${property.price}/month`
                : `R ${property.price?.toLocaleString() || property.price}`}
            </TableCell>
            <TableCell>{property.agent || "Unassigned"}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center">
                  <Eye className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                  {property.views || 0}
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                  {property.inquiries || 0}
                </div>
              </div>
            </TableCell>
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
                {(property.is_featured || property.featured) && (
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
                  <DropdownMenuItem>Reassign Agent</DropdownMenuItem>
                  {property.is_featured || property.featured ? (
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

