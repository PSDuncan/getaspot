import { getSupabaseServerClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Building2, Users, Home, Mail, Phone, Globe, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AgentsList } from "@/components/agency/agents-list"
import { InviteAgentDialog } from "@/components/agency/invite-agent-dialog"

export default async function AgencyPage({ params }: { params: { id: string } }) {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: agency } = await supabase.from("agencies").select("*").eq("id", params.id).single()

  if (!agency) {
    notFound()
  }

  // Check if user is owner
  const isOwner = agency.owner_id === user.id

  if (!isOwner) {
    // Check if user is an agent
    const { data: agentRelation } = await supabase
      .from("agency_agents")
      .select("*")
      .eq("agency_id", params.id)
      .eq("user_id", user.id)
      .single()

    if (!agentRelation) {
      notFound()
    }
  }

  // Get agents count
  const { count: agentsCount } = await supabase
    .from("agency_agents")
    .select("*", { count: "exact", head: true })
    .eq("agency_id", params.id)
    .eq("status", "active")

  // Get listings count
  const { count: listingsCount } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("agency_id", params.id)

  const stats = [
    {
      name: "Active Agents",
      value: agentsCount || 0,
      icon: Users,
      max: agency.max_agents,
    },
    {
      name: "Listings",
      value: listingsCount || 0,
      icon: Home,
      max: agency.max_listings,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Agency Header */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{agency.name}</h1>
                {agency.description && <p className="text-muted-foreground max-w-2xl">{agency.description}</p>}
              </div>
            </div>
            {isOwner && (
              <Button variant="outline" asChild>
                <Link href={`/agency/${params.id}/settings`}>Settings</Link>
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {agency.email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                {agency.email}
              </div>
            )}
            {agency.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                {agency.phone}
              </div>
            )}
            {agency.website && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-4 h-4" />
                <a href={agency.website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  Website
                </a>
              </div>
            )}
            {agency.city && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {agency.city}, {agency.province}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  {stat.max && <span className="text-sm text-muted-foreground">/ {stat.max} max</span>}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.name}</div>
              </div>
            )
          })}
        </div>

        {/* Agents Section */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Team Members</h2>
            {isOwner && <InviteAgentDialog agencyId={params.id} />}
          </div>
          <AgentsList agencyId={params.id} isOwner={isOwner} />
        </div>
      </main>
    </div>
  )
}
