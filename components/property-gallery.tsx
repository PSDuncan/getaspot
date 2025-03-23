"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface PropertyGalleryProps {
  images: string[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image src={images[currentIndex] || "/placeholder.svg"} alt="Property image" fill className="object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next image</span>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-black/20 text-white hover:bg-black/40"
            >
              <Expand className="h-5 w-5" />
              <span className="sr-only">View full size</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="relative aspect-[16/9]">
              <Image
                src={images[currentIndex] || "/placeholder.svg"}
                alt="Property image"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <Button
                  key={index}
                  variant={index === currentIndex ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-[4/3] overflow-hidden rounded-md ${
              index === currentIndex ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

