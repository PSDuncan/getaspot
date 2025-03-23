"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PropertyImageUpload } from "@/components/property-image-upload"
import { PropertyFeatureSelect } from "@/components/property-feature-select"

export default function AddPropertyPage() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    property_type: "",
    listing_type: "sale",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    size: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    is_featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!user) throw new Error("You must be logged in to add a property")

      // Convert numeric fields
      const numericPrice = Number.parseFloat(formData.price)
      const numericBedrooms = formData.bedrooms ? Number.parseInt(formData.bedrooms) : null
      const numericBathrooms = formData.bathrooms ? Number.parseInt(formData.bathrooms) : null
      const numericGarages = formData.garages ? Number.parseInt(formData.garages) : null
      const numericSize = formData.size ? Number.parseFloat(formData.size) : null

      // Insert property
      const { data, error: insertError } = await supabase
        .from("properties")
        .insert({
          title: formData.title,
          description: formData.description,
          price: numericPrice,
          property_type: formData.property_type,
          listing_type: formData.listing_type as "sale" | "rent",
          bedrooms: numericBedrooms,
          bathrooms: numericBathrooms,
          garages: numericGarages,
          size: numericSize,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postal_code: formData.postal_code,
          features: features.length > 0 ? features : null,
          images: images.length > 0 ? images : null,
          is_featured: formData.is_featured,
          status: "published",
          user_id: user.id,
          agency_id: profile?.agency_id || null,
          agent_id: profile?.role === "agent" ? user.id : null,
          views: 0,
          inquiries: 0,
        })
        .select()

      if (insertError) throw insertError

      // Redirect to the property page
      router.push(`/dashboard/properties`)
    } catch (error: any) {
      setError(error.message || "Failed to add property")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
        <p className="text-muted-foreground">Create a new property listing</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern Apartment in Sandton"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property in detail"
                  rows={5}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (ZAR)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 1500000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="listing_type">Listing Type</Label>
                  <Select
                    value={formData.listing_type}
                    onValueChange={(value) => handleSelectChange("listing_type", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_type">Property Type</Label>
                <Select
                  value={formData.property_type}
                  onValueChange={(value) => handleSelectChange("property_type", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Vacant Land</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>Enter the specific details of your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="garages">Garages</Label>
                  <Input
                    id="garages"
                    name="garages"
                    type="number"
                    value={formData.garages}
                    onChange={handleChange}
                    placeholder="e.g. 1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Size (m²)</Label>
                  <Input
                    id="size"
                    name="size"
                    type="number"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="e.g. 120"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Property Features</Label>
                <PropertyFeatureSelect selectedFeatures={features} onFeaturesChange={setFeatures} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Enter the location details of your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. 123 Main Street"
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Johannesburg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Select
                    value={formData.province}
                    onValueChange={(value) => handleSelectChange("province", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gauteng">Gauteng</SelectItem>
                      <SelectItem value="western_cape">Western Cape</SelectItem>
                      <SelectItem value="eastern_cape">Eastern Cape</SelectItem>
                      <SelectItem value="kwazulu_natal">KwaZulu-Natal</SelectItem>
                      <SelectItem value="free_state">Free State</SelectItem>
                      <SelectItem value="north_west">North West</SelectItem>
                      <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
                      <SelectItem value="limpopo">Limpopo</SelectItem>
                      <SelectItem value="northern_cape">Northern Cape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  placeholder="e.g. 2196"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Property Images</CardTitle>
              <CardDescription>Upload images of your property (up to 10 images)</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyImageUpload images={images} onImagesChange={setImages} maxImages={10} />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Listing Options</CardTitle>
              <CardDescription>Additional options for your property listing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleCheckboxChange("is_featured", checked as boolean)}
                />
                <Label htmlFor="is_featured">Feature this property (premium feature)</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding Property..." : "Add Property"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

