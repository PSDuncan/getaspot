import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Building2, MapPin } from "lucide-react"
import Link from "next/link"

export default async function FavoritesPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: favorites } = await supabase
    .from("favorites")
    .select("*, properties(*)")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Favorites</h1>
        <p className="text-muted-foreground">Properties you've saved for later</p>
      </div>

      {!favorites || favorites.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6">Start browsing properties and save your favorites here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((favorite: any) => {
            const property = favorite.properties
            return (
              <Link
                key={favorite.id}
                href={`/properties/${property.id}`}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-muted relative">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{property.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    {property.city}, {property.province}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    R {property.price.toLocaleString()}
                    {property.listing_type === "rent" && <span className="text-sm font-normal">/month</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
