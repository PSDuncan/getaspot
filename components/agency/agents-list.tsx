import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Mail, Shield, User } from "lucide-react"

interface AgentsListProps {
  agencyId: string
  isOwner: boolean
}

export async function AgentsList({ agencyId, isOwner }: AgentsListProps) {
  const supabase = await getSupabaseServerClient()

  const { data: agents } = await supabase
    .from("agency_agents")
    .select("*, users(full_name, email, avatar_url)")
    .eq("agency_id", agencyId)
    .order("created_at", { ascending: false })

  if (!agents || agents.length === 0) {
    return (
      <div className="text-center py-8">
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No agents yet. Invite your first agent to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {agents.map((agent: any) => (
        <div
          key={agent.id}
          className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-foreground">{agent.users?.full_name || "Unnamed User"}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="w-3 h-3" />
                {agent.users?.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                agent.status === "active"
                  ? "bg-primary/10 text-primary"
                  : agent.status === "pending"
                    ? "bg-muted text-muted-foreground"
                    : "bg-destructive/10 text-destructive"
              }`}
            >
              {agent.status}
            </span>
            {agent.role === "manager" && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                Manager
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
