"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Filter } from "lucide-react"

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [city, setCity] = useState(searchParams.get("city") || "")
  const [province, setProvince] = useState(searchParams.get("province") || "")
  const [propertyType, setPropertyType] = useState(searchParams.get("property_type") || "")
  const [listingType, setListingType] = useState(searchParams.get("listing_type") || "")
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "")
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "")

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

  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "townhouse", label: "Townhouse" },
    { value: "land", label: "Land" },
    { value: "farm", label: "Farm" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
  ]

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (city) params.set("city", city)
    if (province) params.set("province", province)
    if (propertyType) params.set("property_type", propertyType)
    if (listingType) params.set("listing_type", listingType)
    if (minPrice) params.set("min_price", minPrice)
    if (maxPrice) params.set("max_price", maxPrice)
    if (bedrooms) params.set("bedrooms", bedrooms)

    router.push(`/properties?${params.toString()}`)
  }

  const handleReset = () => {
    setCity("")
    setProvince("")
    setPropertyType("")
    setListingType("")
    setMinPrice("")
    setMaxPrice("")
    setBedrooms("")
    router.push("/properties")
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
      </div>

      <div className="space-y-4">
        {/* City */}
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="e.g. Cape Town"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1.5"
          />
        </div>

        {/* Province */}
        <div>
          <Label htmlFor="province">Province</Label>
          <select
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="mt-1.5 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
          >
            <option value="">All Provinces</option>
            {provinces.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <select
            id="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="mt-1.5 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
          >
            <option value="">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Listing Type */}
        <div>
          <Label htmlFor="listingType">Listing Type</Label>
          <select
            id="listingType"
            value={listingType}
            onChange={(e) => setListingType(e.target.value)}
            className="mt-1.5 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
          >
            <option value="">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <Label>Price Range (ZAR)</Label>
          <div className="grid grid-cols-2 gap-2 mt-1.5">
            <Input placeholder="Min" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <Input placeholder="Max" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <Label htmlFor="bedrooms">Min Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            placeholder="Any"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="mt-1.5"
          />
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-4">
          <Button onClick={handleSearch} className="w-full">
            Apply Filters
          </Button>
          <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
