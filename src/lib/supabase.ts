import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Check if environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined. Please set this environment variable.")
}

if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined. Please set this environment variable.")
}

// Create the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

