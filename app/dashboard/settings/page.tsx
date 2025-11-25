import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function SettingsPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userData } = await supabase.from("users").select("*").eq("id", user!.id).single()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Profile Settings */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue={userData?.full_name || ""} className="mt-1.5" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email} disabled className="mt-1.5" />
              <p className="text-xs text-muted-foreground mt-1">Contact support to change your email</p>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue={userData?.phone || ""}
                placeholder="+27 XX XXX XXXX"
                className="mt-1.5"
              />
            </div>

            <Button>Save Changes</Button>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Subscription</h2>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">{userData?.subscription_plan || "Free"} Plan</div>
              <div className="text-sm text-muted-foreground">Status: {userData?.subscription_status || "inactive"}</div>
            </div>
            <Button variant="outline">Upgrade Plan</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
