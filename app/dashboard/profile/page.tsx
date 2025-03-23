"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileAvatarUpload } from "@/components/profile-avatar-upload"

export default function ProfilePage() {
  const { user, profile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    bio: "",
    avatar_url: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      setIsLoading(true)
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (error) {
        console.error("Error fetching profile:", error)
      } else if (data) {
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          bio: data.bio || "",
          avatar_url: data.avatar_url || "",
        })
      }

      setIsLoading(false)
    }

    fetchProfile()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (url: string) => {
    setFormData((prev) => ({ ...prev, avatar_url: url }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(false)

    try {
      if (!user) throw new Error("You must be logged in to update your profile")

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      setSuccess(true)
    } catch (error: any) {
      setError(error.message || "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4">
                <AlertDescription>Profile updated successfully!</AlertDescription>
              </Alert>
            )}
            <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+27 12 345 6789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="profile-form" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload a profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={formData.avatar_url || ""} alt={formData.first_name} />
              <AvatarFallback>
                {formData.first_name && formData.last_name
                  ? `${formData.first_name[0]}${formData.last_name[0]}`
                  : user?.email?.[0].toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <ProfileAvatarUpload currentAvatarUrl={formData.avatar_url} onAvatarChange={handleAvatarChange} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

