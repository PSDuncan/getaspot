"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface ContactFormProps {
  propertyId: string
}

export function ContactForm({ propertyId }: ContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = getSupabaseBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error: submitError } = await supabase.from("inquiries").insert([
      {
        property_id: propertyId,
        sender_id: user?.id || null,
        sender_name: name,
        sender_email: email,
        sender_phone: phone || null,
        message,
      },
    ])

    if (submitError) {
      setError(submitError.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
      setLoading(false)
      setTimeout(() => setSuccess(false), 5000)
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Interested in this property?</h2>
      <p className="text-sm text-muted-foreground mb-6">Send a message to the property owner</p>

      {success ? (
        <div className="p-4 rounded-lg bg-primary/10 text-primary text-sm">
          Message sent successfully! The property owner will contact you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+27 XX XXX XXXX"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I'm interested in this property..."
              rows={4}
              required
              className="mt-1.5"
            />
          </div>

          {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
    </div>
  )
}
