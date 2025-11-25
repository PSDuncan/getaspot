import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AdminAgenciesPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userData } = await supabase.from("users").select("user_type").eq("id", user.id).single()

  if (userData?.user_type !== "super_admin") {
    redirect("/dashboard")
  }

  const { data: agencies } = await supabase.from("agencies").select("*").order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Agency Management</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Agency</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Plan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Agents</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {agencies?.map((agency) => (
                <tr key={agency.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{agency.name}</div>
                    <div className="text-sm text-muted-foreground">{agency.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {agency.city ? `${agency.city}, ${agency.province}` : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {agency.subscription_plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        agency.subscription_status === "active"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {agency.subscription_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{agency.max_agents} max</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(agency.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
