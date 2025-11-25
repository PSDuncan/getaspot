import Link from "next/link"
import { MapPin, Bed, Bath, Car, Maximize } from "lucide-react"
import type { Property } from "@/lib/types/database"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Maximize className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/90 backdrop-blur text-foreground">
            For {property.listing_type === "sale" ? "Sale" : "Rent"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="text-2xl font-bold text-primary mb-2">
          R {property.price.toLocaleString()}
          {property.listing_type === "rent" && (
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">{property.title}</h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">
            {property.city}, {property.province}
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.garages && (
            <div className="flex items-center gap-1">
              <Car className="w-4 h-4" />
              <span>{property.garages}</span>
            </div>
          )}
          {property.floor_size && (
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{property.floor_size}m²</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
