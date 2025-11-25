import { createServerClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { revalidatePath } from "next/cache"

async function updateSettings(formData: FormData) {
  "use server"

  const supabase = await createServerClient()
  const maintenanceMode = formData.get("maintenance_mode") === "on"
  const featuredListingsLimit = Number.parseInt(formData.get("featured_listings_limit") as string)
  const maxPhotosPerListing = Number.parseInt(formData.get("max_photos_per_listing") as string)

  await supabase.from("admin_settings").upsert({
    id: "00000000-0000-0000-0000-000000000001",
    maintenance_mode: maintenanceMode,
    featured_listings_limit: featuredListingsLimit,
    max_photos_per_listing: maxPhotosPerListing,
  })

  revalidatePath("/admin/settings")
}

export default async function AdminSettingsPage() {
  const supabase = await createServerClient()

  const { data: settings } = await supabase.from("admin_settings").select("*").single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground">Configure global platform settings</p>
      </div>

      <Card className="p-6">
        <form action={updateSettings} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="maintenance_mode"
                defaultChecked={settings?.maintenance_mode}
                className="rounded"
              />
              <span className="text-sm font-medium text-foreground">Maintenance Mode</span>
            </label>
            <p className="text-sm text-muted-foreground">
              When enabled, the site will show a maintenance message to non-admin users
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="featured_listings_limit" className="text-sm font-medium text-foreground">
              Featured Listings Limit
            </label>
            <input
              type="number"
              id="featured_listings_limit"
              name="featured_listings_limit"
              defaultValue={settings?.featured_listings_limit || 10}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
            <p className="text-sm text-muted-foreground">
              Maximum number of listings that can be featured on the homepage
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="max_photos_per_listing" className="text-sm font-medium text-foreground">
              Max Photos Per Listing
            </label>
            <input
              type="number"
              id="max_photos_per_listing"
              name="max_photos_per_listing"
              defaultValue={settings?.max_photos_per_listing || 20}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
            <p className="text-sm text-muted-foreground">Maximum number of photos allowed per property listing</p>
          </div>

          <Button type="submit">Save Settings</Button>
        </form>
      </Card>
    </div>
  )
}
