import { createClient } from "@supabase/supabase-js";

// Replace with your own Supabase URL and anon key
const supabaseUrl = "https://boykehkxwdoehzrokniq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJveWtlaGt4d2RvZWh6cm9rbmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMTM1MTAsImV4cCI6MjA1NjY4OTUxMH0.kG_tNwD757vP-Du1pD-sDtJgyvzCC9GTTudkWd1iyBY";

export const supabase = createClient(supabaseUrl, supabaseKey);
