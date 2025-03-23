"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Building, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Building className="h-8 w-8" />
        <span className="font-bold text-2xl">GetASpot</span>
      </Link>
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        We apologize for the inconvenience. An error occurred while processing your request.
      </p>
      <div className="flex gap-4 mt-8">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}

