"use client"

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
import { useDashboard } from "@/contexts/dashboard-context"
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice, getStatusBadgeClass, getPropertyImage } from "@/lib/format-utils"
import { useState } from "react"
import { publishProperty, unpublishProperty, deleteProperty, toggleFeaturedProperty } from "@/lib/property-actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AdminProperties() {
  const { properties, isLoading, refetchData } = useDashboard()

  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return

    setIsDeleting(true)
    const success = await deleteProperty(propertyToDelete)
    setIsDeleting(false)

    if (success) {
      refetchData()
    }

    setPropertyToDelete(null)
  }

  const handlePropertyAction = async (
    propertyId: string,
    action: "publish" | "unpublish" | "feature" | "unfeature",
  ) => {
    let success = false

    switch (action) {
      case "publish":
        success = await publishProperty(propertyId)
        break
      case "unpublish":
        success = await unpublishProperty(propertyId)
        break
      case "feature":
        success = await toggleFeaturedProperty(propertyId, false)
        break
      case "unfeature":
        success = await toggleFeaturedProperty(propertyId, true)
        break
    }

    if (success) {
      refetchData()
    }
  }

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

  return (
    <>
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
          {displayProperties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image
                      src={getPropertyImage(property) || "/placeholder.svg"}
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
              <TableCell>{formatPrice(property.price, property.listing_type)}</TableCell>
              <TableCell>{property.property_type || property.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusBadgeClass(property.status)}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                  {(property.is_featured || property.featured) && (
                    <Badge variant="outline" className={getStatusBadgeClass("featured")}>
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
                      <DropdownMenuItem onClick={() => handlePropertyAction(property.id, "unpublish")}>
                        Unpublish
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => handlePropertyAction(property.id, "publish")}>
                        Publish
                      </DropdownMenuItem>
                    )}
                    {property.is_featured || property.featured ? (
                      <DropdownMenuItem onClick={() => handlePropertyAction(property.id, "unfeature")}>
                        Remove Featured
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => handlePropertyAction(property.id, "feature")}>
                        Mark as Featured
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => setPropertyToDelete(property.id)}>
                      Delete Property
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog open={!!propertyToDelete} onOpenChange={(open) => !open && setPropertyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the property and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

