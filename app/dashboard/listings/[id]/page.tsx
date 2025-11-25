import { getSupabaseServerClient } from "@/lib/supabase/server"
import { PropertyForm } from "@/components/dashboard/property-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    redirect("/dashboard/listings/new")
  }

  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: property } = await supabase.from("properties").select("*").eq("id", id).eq("owner_id", user.id).single()

  if (!property) {
    notFound()
  }

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
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit Listing</h1>
        <p className="text-muted-foreground">Update your property details</p>
      </div>

      <PropertyForm property={property} mode="edit" />
    </div>
  )
}
