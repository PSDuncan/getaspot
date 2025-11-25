import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Users, Building2, Home, DollarSign, Activity } from "lucide-react"
import Link from "next/link"

export default async function AdminPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is super admin
  const { data: userData } = await supabase.from("users").select("user_type").eq("id", user.id).single()

  if (userData?.user_type !== "super_admin") {
    redirect("/dashboard")
  }

  // Fetch statistics
  const { count: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })

  const { count: totalAgencies } = await supabase.from("agencies").select("*", { count: "exact", head: true })

  const { count: totalProperties } = await supabase.from("properties").select("*", { count: "exact", head: true })

  const { count: activeProperties } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("status", "active")

  const { data: subscriptions } = await supabase.from("subscriptions").select("amount").eq("status", "active")

  const monthlyRevenue = subscriptions?.reduce((sum, sub) => sum + Number(sub.amount), 0) || 0

  // Get recent users
  const { data: recentUsers } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Get recent properties
  const { data: recentProperties } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    {
      name: "Total Users",
      value: totalUsers || 0,
      icon: Users,
      href: "/admin/users",
      change: "+12%",
    },
    {
      name: "Agencies",
      value: totalAgencies || 0,
      icon: Building2,
      href: "/admin/agencies",
      change: "+8%",
    },
    {
      name: "Total Listings",
      value: totalProperties || 0,
      icon: Home,
      href: "/admin/properties",
      change: "+23%",
    },
    {
      name: "Active Listings",
      value: activeProperties || 0,
      icon: Activity,
      href: "/admin/properties",
      change: "+15%",
    },
    {
      name: "Monthly Revenue",
      value: `R ${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      href: "/admin/revenue",
      change: "+19%",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">GetASpot Admin</h1>
                <p className="text-xs text-muted-foreground">Super Administrator</p>
              </div>
            </div>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Platform Overview</h2>
          <p className="text-muted-foreground">Monitor and manage the GetASpot platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link
                key={stat.name}
                href={stat.href}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-primary">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.name}</div>
              </Link>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Recent Users</h3>
              <Link href="/admin/users" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentUsers?.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <div className="font-medium text-foreground">{user.full_name || "Unnamed"}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {user.user_type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Properties */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Recent Listings</h3>
              <Link href="/admin/properties" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentProperties?.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="font-medium text-foreground line-clamp-1">{property.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {property.city}, {property.province}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">R{property.price.toLocaleString()}</div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        property.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
