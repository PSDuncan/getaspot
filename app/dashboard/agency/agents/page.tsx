"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AgentInviteForm } from "@/components/dashboard/agent-invite-form"
import { AgentsList } from "@/components/dashboard/agents-list"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AgentsPage() {
  const { user, profile } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [agents, setAgents] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const fetchAgents = async () => {
      if (!user || !profile?.agency_id) return

      setIsLoading(true)
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("agency_id", profile.agency_id)
        .eq("role", "agent")

      if (error) {
        console.error("Error fetching agents:", error)
      } else {
        setAgents(data || [])
      }

      setIsLoading(false)
    }

    fetchAgents()
  }, [user, profile])

  const filteredAgents = agents.filter(
    (agent) =>
      (agent.first_name && agent.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (agent.last_name && agent.last_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (agent.email && agent.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAgentInvited = () => {
    setDialogOpen(false)
    // Refresh the agents list
    window.location.reload()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Agents</h1>
        <p className="text-muted-foreground">Invite and manage agents for your agency.</p>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search agents..."
            className="w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Invite Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a New Agent</DialogTitle>
              <DialogDescription>Send an invitation to a new agent to join your agency.</DialogDescription>
            </DialogHeader>
            <AgentInviteForm onAgentInvited={handleAgentInvited} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agency Agents</CardTitle>
          <CardDescription>Manage the agents working for your agency.</CardDescription>
        </CardHeader>
        <CardContent>
          <AgentsList agents={filteredAgents} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}

