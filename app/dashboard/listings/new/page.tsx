import { PropertyForm } from "@/components/dashboard/property-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewListingPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/dashboard/listings"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create New Listing</h1>
        <p className="text-muted-foreground">Fill in the details below to list your property</p>
      </div>

      <PropertyForm mode="create" />
    </div>
  )
}
