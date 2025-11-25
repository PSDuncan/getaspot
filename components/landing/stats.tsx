import { Home, Users, Building2, TrendingUp } from "lucide-react"
import { createServerClient } from "@/lib/supabase/server"

export async function Stats() {
  const supabase = await createServerClient()

  // Fetch real statistics from database
  const [propertiesResult, usersResult, agenciesResult] = await Promise.all([
    supabase.from("properties").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase.from("agencies").select("id", { count: "exact", head: true }),
  ])

  const activeListings = propertiesResult.count || 0
  const totalUsers = usersResult.count || 0
  const totalAgencies = agenciesResult.count || 0

  // Calculate success rate based on sold/rented properties vs total
  const soldRentedResult = await supabase
    .from("properties")
    .select("id", { count: "exact", head: true })
    .in("status", ["sold", "rented"])

  const totalPropertiesResult = await supabase.from("properties").select("id", { count: "exact", head: true })

  const soldRented = soldRentedResult.count || 0
  const totalProperties = totalPropertiesResult.count || 0
  const successRate = totalProperties > 0 ? Math.round((soldRented / totalProperties) * 100) : 0

  const stats = [
    {
      icon: Home,
      value: activeListings.toLocaleString(),
      label: "Active Listings",
    },
    {
      icon: Users,
      value: totalUsers.toLocaleString(),
      label: "Happy Users",
    },
    {
      icon: Building2,
      value: totalAgencies.toLocaleString(),
      label: "Agencies",
    },
    {
      icon: TrendingUp,
      value: `${successRate}%`,
      label: "Success Rate",
    },
  ]

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
