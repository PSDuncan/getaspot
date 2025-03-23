"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AgentInviteFormProps {
  onAgentInvited: () => void
}

export function AgentInviteForm({ onAgentInvited }: AgentInviteFormProps) {
  const { profile } = useAuth()
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    if (!profile?.agency_id) {
      setError("You must be an agency admin to invite agents")
      setIsLoading(false)
      return
    }

    try {
      // Check if user already exists
      const { data: existingUsers, error: userError } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("email", email)

      if (userError) throw userError

      if (existingUsers && existingUsers.length > 0) {
        // User exists, update their profile
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            agency_id: profile.agency_id,
            role: "agent",
            first_name: firstName,
            last_name: lastName,
          })
          .eq("email", email)

        if (updateError) throw updateError
      } else {
        // Create a temporary user record
        const { error: insertError } = await supabase.from("agent_invitations").insert({
          email,
          first_name: firstName,
          last_name: lastName,
          agency_id: profile.agency_id,
          status: "pending",
        })

        if (insertError) throw insertError

        // In a real app, you would send an email invitation here
      }

      setSuccess(true)
      setTimeout(() => {
        onAgentInvited()
      }, 2000)
    } catch (error: any) {
      setError(error.message || "Failed to invite agent")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert>
          <AlertDescription>Agent invitation sent successfully!</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="agent@example.com"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending Invitation..." : "Send Invitation"}
        </Button>
      </div>
    </form>
  )
}

