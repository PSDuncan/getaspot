import Link from "next/link"
import { Building } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Building className="h-8 w-8" />
        <span className="font-bold text-2xl">GetASpot</span>
      </Link>
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4 mt-8">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/properties">Browse Properties</Link>
        </Button>
      </div>
    </div>
  )
}

