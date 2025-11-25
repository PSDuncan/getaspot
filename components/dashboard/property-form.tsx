"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Property, PropertyType, ListingType } from "@/lib/types/database"

interface PropertyFormProps {
  property?: Property
  mode: "create" | "edit"
}

export function PropertyForm({ property, mode }: PropertyFormProps) {
  const [title, setTitle] = useState(property?.title || "")
  const [description, setDescription] = useState(property?.description || "")
  const [propertyType, setPropertyType] = useState<PropertyType>(property?.property_type || "house")
  const [listingType, setListingType] = useState<ListingType>(property?.listing_type || "sale")
  const [price, setPrice] = useState(property?.price.toString() || "")
  const [bedrooms, setBedrooms] = useState(property?.bedrooms?.toString() || "")
  const [bathrooms, setBathrooms] = useState(property?.bathrooms?.toString() || "")
  const [garages, setGarages] = useState(property?.garages?.toString() || "")
  const [floorSize, setFloorSize] = useState(property?.floor_size?.toString() || "")
  const [landSize, setLandSize] = useState(property?.land_size?.toString() || "")
  const [address, setAddress] = useState(property?.address || "")
  const [city, setCity] = useState(property?.city || "")
  const [province, setProvince] = useState(property?.province || "")
  const [postalCode, setPostalCode] = useState(property?.postal_code || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      setError("You must be logged in to create a listing")
      setLoading(false)
      return
    }

    const propertyData = {
      title,
      description,
      property_type: propertyType,
      listing_type: listingType,
      price: Number.parseFloat(price),
      bedrooms: bedrooms ? Number.parseInt(bedrooms) : null,
      bathrooms: bathrooms ? Number.parseInt(bathrooms) : null,
      garages: garages ? Number.parseInt(garages) : null,
      floor_size: floorSize ? Number.parseInt(floorSize) : null,
      land_size: landSize ? Number.parseInt(landSize) : null,
      address,
      city,
      province,
      postal_code: postalCode || null,
      owner_id: user.id,
      status: "draft",
      features: [],
      images: [],
    }

    if (mode === "create") {
      const { error } = await supabase.from("properties").insert([propertyData])

      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        router.push("/dashboard/listings")
      }
    } else {
      const { error } = await supabase.from("properties").update(propertyData).eq("id", property!.id)

      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        router.push("/dashboard/listings")
      }
    }
  }

  const propertyTypes: { value: PropertyType; label: string }[] = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "townhouse", label: "Townhouse" },
    { value: "land", label: "Land" },
    { value: "farm", label: "Farm" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
  ]

  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Basic Information</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Property Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Beautiful 3 bedroom house in Cape Town"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your property..."
              rows={5}
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                className="mt-1.5 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                required
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="listingType">Listing Type</Label>
              <select
                id="listingType"
                value={listingType}
                onChange={(e) => setListingType(e.target.value as ListingType)}
                className="mt-1.5 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                required
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="price">Price (ZAR)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1500000"
              required
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Property Details</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              placeholder="3"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="2"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="garages">Garages</Label>
            <Input
              id="garages"
              type="number"
              value={garages}
              onChange={(e) => setGarages(e.target.value)}
              placeholder="1"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="floorSize">Floor Size (m²)</Label>
            <Input
              id="floorSize"
              type="number"
              value={floorSize}
              onChange={(e) => setFloorSize(e.target.value)}
              placeholder="150"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="landSize">Land Size (m²)</Label>
            <Input
              id="landSize"
              type="number"
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
              placeholder="300"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Location</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main Street"
              required
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Cape Town"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="province">Province</Label>
              <select
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="mt-1.5 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                required
              >
                <option value="">Select Province</option>
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="8001"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {error && <div className="p-4 rounded-lg bg-destructive/10 text-destructive">{error}</div>}

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Saving..." : mode === "create" ? "Create Listing" : "Update Listing"}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
