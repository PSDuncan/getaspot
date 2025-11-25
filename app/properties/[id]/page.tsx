import { getSupabaseServerClient } from "@/lib/supabase/server"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { notFound } from "next/navigation"
import { MapPin, Bed, Bath, Car, Maximize, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/properties/contact-form"

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const supabase = await getSupabaseServerClient()

  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.id)
    .eq("status", "active")
    .single()

  if (!property) {
    notFound()
  }

  // Increment view count
  await supabase
    .from("properties")
    .update({ views_count: (property.views_count || 0) + 1 })
    .eq("id", params.id)

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main className="pt-20">
        {/* Image Gallery */}
        <div className="bg-muted">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            {property.images && property.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 aspect-video rounded-2xl overflow-hidden">
                  <img
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {property.images.slice(1, 5).map((image, idx) => (
                  <div key={idx} className="aspect-video rounded-2xl overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-muted flex items-center justify-center">
                <Maximize className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Main Content */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-3">
                      For {property.listing_type === "sale" ? "Sale" : "Rent"}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{property.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span>
                        {property.address}, {property.city}, {property.province}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                <div className="text-4xl font-bold text-primary">
                  R {property.price.toLocaleString()}
                  {property.listing_type === "rent" && (
                    <span className="text-lg font-normal text-muted-foreground">/month</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Property Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {property.bedrooms && (
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Bed className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{property.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Bath className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
                    </div>
                  )}
                  {property.garages && (
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Car className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{property.garages}</div>
                      <div className="text-sm text-muted-foreground">Garages</div>
                    </div>
                  )}
                  {property.floor_size && (
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Maximize className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{property.floor_size}</div>
                      <div className="text-sm text-muted-foreground">m² Floor</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{property.description}</p>
                </div>
              )}

              {/* Additional Features */}
              {property.features && property.features.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Additional Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24">
                <ContactForm propertyId={property.id} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
