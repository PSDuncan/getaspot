"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Plus, X } from "lucide-react"

interface InviteAgentDialogProps {
  agencyId: string
}

export function InviteAgentDialog({ agencyId }: InviteAgentDialogProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = getSupabaseBrowserClient()

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Find user by email
    const { data: users } = await supabase.from("users").select("id").eq("email", email).single()

    if (!users) {
      setError("User not found. They need to sign up first.")
      setLoading(false)
      return
    }

    // Create invitation
    const { error: inviteError } = await supabase.from("agency_agents").insert([
      {
        agency_id: agencyId,
        user_id: users.id,
        status: "pending",
      },
    ])

    if (inviteError) {
      setError(inviteError.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setEmail("")
      setLoading(false)
      setTimeout(() => {
        setSuccess(false)
        setOpen(false)
      }, 2000)
    }
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Invite Agent
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Invite Agent</h2>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-4 rounded-lg bg-primary/10 text-primary text-center">Invitation sent successfully!</div>
        ) : (
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <Label htmlFor="email">Agent Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@example.com"
                required
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">The agent must have an existing GetASpot account</p>
            </div>

            {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Sending..." : "Send Invitation"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
