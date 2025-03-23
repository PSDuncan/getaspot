"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyListings } from "@/components/dashboard/property-listings"
import { Plus } from "lucide-react"

export default function PropertiesPage() {
  const { user, profile } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [properties, setProperties] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user) return

      setIsLoading(true)
      let query = supabase.from("properties").select("*")

      // Filter based on user role
      if (profile?.role === "user") {
        query = query.eq("user_id", user.id)
      } else if (profile?.role === "agent") {
        query = query.eq("agent_id", user.id)
      } else if (profile?.role === "agency_admin" && profile.agency_id) {
        query = query.eq("agency_id", profile.agency_id)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching properties:", error)
      } else {
        setProperties(data || [])
      }

      setIsLoading(false)
    }

    fetchProperties()
  }, [user, profile])

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeProperties = filteredProperties.filter((p) => p.status === "published")
  const draftProperties = filteredProperties.filter((p) => p.status === "draft")
  const soldProperties = filteredProperties.filter((p) => p.status === "sold" || p.status === "rented")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <p className="text-muted-foreground">Manage your property listings and track their performance.</p>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search properties..."
            className="w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/dashboard/properties/add">
            <Plus className="mr-2 h-4 w-4" /> Add New Property
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Properties</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="sold">Sold/Rented</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Properties</CardTitle>
              <CardDescription>View and manage all your property listings.</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyListings properties={filteredProperties} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Properties</CardTitle>
              <CardDescription>Properties that are currently active on the market.</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyListings properties={activeProperties} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="draft" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Draft Properties</CardTitle>
              <CardDescription>Properties that are saved as drafts.</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyListings properties={draftProperties} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sold" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sold/Rented Properties</CardTitle>
              <CardDescription>Properties that have been sold or rented.</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyListings properties={soldProperties} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

