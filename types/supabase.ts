export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          role: "user" | "agent" | "agency_admin" | "super_admin"
          agency_id: string | null
          phone: string | null
          bio: string | null
          is_verified: boolean
          email: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: "user" | "agent" | "agency_admin" | "super_admin"
          agency_id?: string | null
          phone?: string | null
          bio?: string | null
          is_verified?: boolean
          email?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: "user" | "agent" | "agency_admin" | "super_admin"
          agency_id?: string | null
          phone?: string | null
          bio?: string | null
          is_verified?: boolean
          email?: string | null
        }
      }
      agencies: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          logo_url: string | null
          description: string | null
          website: string | null
          address: string | null
          phone: string | null
          email: string | null
          subscription_tier: "free" | "standard" | "premium"
          subscription_status: "active" | "inactive" | "trial"
          subscription_end_date: string | null
          owner_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          logo_url?: string | null
          description?: string | null
          website?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          subscription_tier?: "free" | "standard" | "premium"
          subscription_status?: "active" | "inactive" | "trial"
          subscription_end_date?: string | null
          owner_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          logo_url?: string | null
          description?: string | null
          website?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          subscription_tier?: "free" | "standard" | "premium"
          subscription_status?: "active" | "inactive" | "trial"
          subscription_end_date?: string | null
          owner_id?: string | null
        }
      }
      properties: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          price: number
          property_type: string
          listing_type: "sale" | "rent"
          bedrooms: number | null
          bathrooms: number | null
          garages: number | null
          size: number | null
          address: string
          city: string
          province: string
          postal_code: string | null
          latitude: number | null
          longitude: number | null
          features: string[] | null
          images: string[] | null
          is_featured: boolean
          status: "draft" | "published" | "sold" | "rented"
          user_id: string
          agency_id: string | null
          agent_id: string | null
          views: number
          inquiries: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          price: number
          property_type: string
          listing_type: "sale" | "rent"
          bedrooms?: number | null
          bathrooms?: number | null
          garages?: number | null
          size?: number | null
          address: string
          city: string
          province: string
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          features?: string[] | null
          images?: string[] | null
          is_featured?: boolean
          status?: "draft" | "published" | "sold" | "rented"
          user_id: string
          agency_id?: string | null
          agent_id?: string | null
          views?: number
          inquiries?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          price?: number
          property_type?: string
          listing_type?: "sale" | "rent"
          bedrooms?: number | null
          bathrooms?: number | null
          garages?: number | null
          size?: number | null
          address?: string
          city?: string
          province?: string
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          features?: string[] | null
          images?: string[] | null
          is_featured?: boolean
          status?: "draft" | "published" | "sold" | "rented"
          user_id?: string
          agency_id?: string | null
          agent_id?: string | null
          views?: number
          inquiries?: number
        }
      }
      inquiries: {
        Row: {
          id: string
          created_at: string
          property_id: string
          name: string
          email: string
          phone: string
          message: string
          status: "new" | "contacted" | "closed"
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          name: string
          email: string
          phone: string
          message: string
          status?: "new" | "contacted" | "closed"
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          name?: string
          email?: string
          phone?: string
          message?: string
          status?: "new" | "contacted" | "closed"
          user_id?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          agency_id: string
          tier: "free" | "standard" | "premium"
          status: "active" | "inactive" | "trial"
          start_date: string
          end_date: string | null
          payment_id: string | null
          amount: number
          currency: string
          is_recurring: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          agency_id: string
          tier: "free" | "standard" | "premium"
          status: "active" | "inactive" | "trial"
          start_date: string
          end_date?: string | null
          payment_id?: string | null
          amount: number
          currency: string
          is_recurring: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          agency_id?: string
          tier?: "free" | "standard" | "premium"
          status?: "active" | "inactive" | "trial"
          start_date?: string
          end_date?: string | null
          payment_id?: string | null
          amount?: number
          currency?: string
          is_recurring?: boolean
        }
      }
      saved_properties: {
        Row: {
          id: string
          created_at: string
          user_id: string
          property_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          property_id: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          property_id?: string
        }
      }
      agent_invitations: {
        Row: {
          id: string
          created_at: string
          email: string
          first_name: string | null
          last_name: string | null
          agency_id: string
          status: "pending" | "accepted" | "rejected"
          token: string
          expires_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          agency_id: string
          status?: "pending" | "accepted" | "rejected"
          token?: string
          expires_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          agency_id?: string
          status?: "pending" | "accepted" | "rejected"
          token?: string
          expires_at?: string
        }
      }
      property_views: {
        Row: {
          id: string
          created_at: string
          property_id: string
          user_id: string | null
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

