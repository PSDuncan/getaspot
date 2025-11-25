import { getSupabaseServerClient } from "@/lib/supabase/server"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Building2, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default async function AgenciesPage() {
  const supabase = await getSupabaseServerClient()

  const { data: agencies } = await supabase
    .from("agencies")
    .select("*, agency_agents(count)")
    .eq("subscription_status", "active")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main className="pt-20">
        <div className="bg-muted/30 border-b border-border py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Real Estate Agencies</h1>
            <p className="text-muted-foreground">Connect with trusted agencies across South Africa</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          {!agencies || agencies.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No agencies available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agencies.map((agency) => (
                <Link
                  key={agency.id}
                  href={`/agency/${agency.id}`}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{agency.name}</h3>
                      {agency.city && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {agency.city}, {agency.province}
                        </div>
                      )}
                    </div>
                  </div>

                  {agency.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{agency.description}</p>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{agency.agency_agents?.[0]?.count || 0} agents</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
