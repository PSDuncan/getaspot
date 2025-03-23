"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Eye, MessageSquare, Edit, Trash, CheckCircle, Clock, Tag, AlertTriangle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabase"
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
import { Skeleton } from "@/components/ui/skeleton"

interface PropertyListingsProps {
  properties: any[]
  isLoading: boolean
}

export function PropertyListings({ properties, isLoading }: PropertyListingsProps) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)
  const router = useRouter()

  const toggleSelectAll = () => {
    if (selectedProperties.length === properties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(properties.map((p) => p.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedProperties.includes(id)) {
      setSelectedProperties(selectedProperties.filter((p) => p !== id))
    } else {
      setSelectedProperties([...selectedProperties, id])
    }
  }

  const handleDeleteClick = (id: string) => {
    setPropertyToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return

    try {
      const { error } = await supabase.from("properties").delete().eq("id", propertyToDelete)

      if (error) throw error

      // Refresh the page to update the list
      router.refresh()
    } catch (error) {
      console.error("Error deleting property:", error)
    } finally {
      setDeleteDialogOpen(false)
      setPropertyToDelete(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Draft
          </Badge>
        )
      case "sold":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Tag className="mr-1 h-3 w-3" /> Sold
          </Badge>
        )
      case "rented":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Tag className="mr-1 h-3 w-3" /> Rented
          </Badge>
        )
      default:
        return null
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

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No properties found</h3>
        <p className="text-muted-foreground mt-1">
          You haven&apos;t added any properties yet or none match your search criteria.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/properties/add">Add Your First Property</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={selectedProperties.length === properties.length && properties.length > 0}
                onChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Views</TableHead>
            <TableHead className="text-center">Inquiries</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedProperties.includes(property.id)}
                  onChange={() => toggleSelect(property.id)}
                />
              </TableCell>
              <TableCell>
                <div className="relative h-12 w-12 overflow-hidden rounded-md">
                  <Image
                    src={property.images?.[0] || "/placeholder.svg?height=60&width=60"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{property.title}</span>
                  <span className="text-xs text-muted-foreground">{property.address}</span>
                  <span className="text-xs text-muted-foreground">
                    {property.bedrooms} bed • {property.bathrooms} bath
                  </span>
                </div>
              </TableCell>
              <TableCell>{property.property_type}</TableCell>
              <TableCell>
                {property.listing_type === "rent" ? `R ${property.price}/month` : `R ${property.price}`}
              </TableCell>
              <TableCell>{getStatusBadge(property.status)}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <Eye className="mr-1 h-4 w-4 text-muted-foreground" />
                  {property.views}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
                  {property.inquiries}
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
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/properties/${property.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Property
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/properties/${property.id}`} target="_blank">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(property.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Property
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the property and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

