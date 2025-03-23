"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X, Upload, ImagePlus } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

interface PropertyImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export function PropertyImageUpload({ images, onImagesChange, maxImages = 10 }: PropertyImageUploadProps) {
  const { user } = useAuth()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return
    if (images.length >= maxImages) {
      alert(`You can only upload up to ${maxImages} images`)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    const files = Array.from(e.target.files).slice(0, maxImages - images.length)
    const newImages: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `properties/${user?.id}/${fileName}`

      const { error: uploadError, data } = await supabase.storage.from("property-images").upload(filePath, file)

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        continue
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("property-images").getPublicUrl(filePath)

      newImages.push(publicUrl)
      setUploadProgress(Math.round(((i + 1) / files.length) * 100))
    }

    setIsUploading(false)
    setUploadProgress(0)
    onImagesChange([...images, ...newImages])
    e.target.value = ""
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <label className="flex flex-col items-center justify-center border border-dashed rounded-md aspect-square cursor-pointer hover:bg-muted/50">
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload</p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 animate-pulse" />
            <p className="text-sm">Uploading images... {uploadProgress}%</p>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        You can upload up to {maxImages} images. The first image will be used as the main image.
      </p>
    </div>
  )
}

