export type UserType = "private_seller" | "agent" | "agency_admin"
export type SubscriptionPlan = "free" | "basic" | "premium" | "enterprise"
export type SubscriptionStatus = "inactive" | "active" | "cancelled" | "past_due"
export type PropertyType = "house" | "apartment" | "townhouse" | "land" | "farm" | "commercial" | "industrial"
export type ListingType = "sale" | "rent"
export type PropertyStatus = "draft" | "active" | "pending" | "sold" | "rented" | "inactive"

export interface User {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  user_type: UserType
  subscription_plan: SubscriptionPlan
  subscription_status: SubscriptionStatus
  subscription_ends_at: string | null
  created_at: string
  updated_at: string
}

export interface Agency {
  id: string
  name: string
  description: string | null
  logo_url: string | null
  banner_url: string | null
  email: string
  phone: string | null
  website: string | null
  address: string | null
  city: string | null
  province: string | null
  postal_code: string | null
  owner_id: string
  subscription_plan: SubscriptionPlan
  subscription_status: SubscriptionStatus
  max_agents: number
  max_listings: number
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  title: string
  description: string | null
  property_type: PropertyType
  listing_type: ListingType
  price: number
  bedrooms: number | null
  bathrooms: number | null
  garages: number | null
  floor_size: number | null
  land_size: number | null
  address: string
  city: string
  province: string
  postal_code: string | null
  latitude: number | null
  longitude: number | null
  features: string[]
  images: string[]
  video_url: string | null
  virtual_tour_url: string | null
  status: PropertyStatus
  owner_id: string
  agency_id: string | null
  views_count: number
  favorites_count: number
  published_at: string | null
  created_at: string
  updated_at: string
}
