import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Building2, Eye, Heart, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch user's properties count
  const { count: propertiesCount } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("owner_id", user!.id)

  // Fetch user's favorites count
  const { count: favoritesCount } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)

  // Fetch total views on user's properties
  const { data: properties } = await supabase.from("properties").select("views_count").eq("owner_id", user!.id)

  const totalViews = properties?.reduce((sum, prop) => sum + (prop.views_count || 0), 0) || 0

  // Fetch inquiries count
  const { count: inquiriesCount } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("property_id", user!.id)

  const stats = [
    {
      name: "Active Listings",
      value: propertiesCount || 0,
      icon: Building2,
      href: "/dashboard/listings",
    },
    {
      name: "Total Views",
      value: totalViews,
      icon: Eye,
      href: "/dashboard/listings",
    },
    {
      name: "Favorites",
      value: favoritesCount || 0,
      icon: Heart,
      href: "/dashboard/favorites",
    },
    {
      name: "Inquiries",
      value: inquiriesCount || 0,
      icon: MessageSquare,
      href: "/dashboard/inquiries",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.name}</div>
            </Link>
          )
        })}
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Ready to list a property?</h2>
        <p className="text-muted-foreground mb-6">Create your first listing and reach thousands of potential buyers.</p>
        <Button asChild size="lg">
          <Link href="/dashboard/listings/new">Create New Listing</Link>
        </Button>
      </div>
    </div>
  )
}
