"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

interface ProfileAvatarUploadProps {
  currentAvatarUrl: string
  onAvatarChange: (url: string) => void
}

export function ProfileAvatarUpload({ currentAvatarUrl, onAvatarChange }: ProfileAvatarUploadProps) {
  const { user } = useAuth()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return
    if (!user) return

    const file = e.target.files[0]
    const fileExt = file.name.split(".").pop()
    const fileName = `avatar-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `avatars/${user.id}/${fileName}`

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Upload the file
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

      if (uploadError) throw uploadError

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath)

      // Update the avatar URL
      onAvatarChange(publicUrl)

      // Delete the old avatar if it exists
      if (currentAvatarUrl) {
        const oldPath = currentAvatarUrl.split("/").pop()
        if (oldPath) {
          await supabase.storage.from("avatars").remove([`avatars/${user.id}/${oldPath}`])
        }
      }
    } catch (error) {
      console.error("Error uploading avatar:", error)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      e.target.value = ""
    }
  }

  const removeAvatar = async () => {
    if (!currentAvatarUrl || !user) return

    try {
      const oldPath = currentAvatarUrl.split("/").pop()
      if (oldPath) {
        await supabase.storage.from("avatars").remove([`avatars/${user.id}/${oldPath}`])
      }

      onAvatarChange("")
    } catch (error) {
      console.error("Error removing avatar:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="relative" disabled={isUploading}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          Upload New
        </Button>
        {currentAvatarUrl && (
          <Button variant="outline" size="sm" onClick={removeAvatar} disabled={isUploading}>
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        )}
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 animate-pulse" />
            <p className="text-sm">Uploading... {uploadProgress}%</p>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">Supported formats: JPEG, PNG, GIF. Max size: 5MB.</p>
    </div>
  )
}

