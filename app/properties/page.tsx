import { getSupabaseServerClient } from "@/lib/supabase/server"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PropertyCard } from "@/components/properties/property-card"
import { SearchFilters } from "@/components/properties/search-filters"

interface SearchParams {
  city?: string
  province?: string
  property_type?: string
  listing_type?: string
  min_price?: string
  max_price?: string
  bedrooms?: string
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const supabase = await getSupabaseServerClient()

  // Build query
  let query = supabase.from("properties").select("*").eq("status", "active")

  // Apply filters
  if (searchParams.city) {
    query = query.ilike("city", `%${searchParams.city}%`)
  }
  if (searchParams.province) {
    query = query.eq("province", searchParams.province)
  }
  if (searchParams.property_type) {
    query = query.eq("property_type", searchParams.property_type)
  }
  if (searchParams.listing_type) {
    query = query.eq("listing_type", searchParams.listing_type)
  }
  if (searchParams.min_price) {
    query = query.gte("price", Number.parseFloat(searchParams.min_price))
  }
  if (searchParams.max_price) {
    query = query.lte("price", Number.parseFloat(searchParams.max_price))
  }
  if (searchParams.bedrooms) {
    query = query.gte("bedrooms", Number.parseInt(searchParams.bedrooms))
  }

  const { data: properties } = await query.order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main className="pt-20">
        <div className="bg-muted/30 border-b border-border py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Browse Properties</h1>
            <p className="text-muted-foreground">{properties?.length || 0} properties available</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Filters Sidebar */}
            <aside>
              <SearchFilters />
            </aside>

            {/* Results */}
            <div>
              {!properties || properties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No properties found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
