import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let clientInstance: SupabaseClient | null = null

export function createClient() {
  if (clientInstance) {
    console.log("[v0] Returning existing Supabase client instance")
    return clientInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("[v0] Creating new Supabase client")
  console.log("[v0] Supabase URL:", supabaseUrl)
  console.log("[v0] Anon Key length:", supabaseAnonKey?.length || 0)

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "[v0] Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
    )
    throw new Error("Missing Supabase configuration")
  }

  try {
    clientInstance = createBrowserClient(supabaseUrl, supabaseAnonKey)
    console.log("[v0] Supabase client created successfully")
    return clientInstance
  } catch (error) {
    console.error("[v0] Error creating Supabase client:", error)
    throw error
  }
}

// Alias for compatibility with older code
export const getSupabaseBrowserClient = createClient
