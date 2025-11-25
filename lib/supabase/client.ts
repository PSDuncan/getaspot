import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let clientInstance: SupabaseClient | null = null

export function createClient() {
  if (clientInstance) {
    return clientInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_gas_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_gas_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "[v0] Missing Supabase environment variables. Please set NEXT_PUBLIC_gas_SUPABASE_URL and NEXT_PUBLIC_gas_SUPABASE_ANON_KEY",
    )
    throw new Error("Missing Supabase configuration")
  }

  clientInstance = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return clientInstance
}

// Alias for compatibility with older code
export const getSupabaseBrowserClient = createClient
