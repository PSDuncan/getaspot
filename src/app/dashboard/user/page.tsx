import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserStats } from "@/components/dashboard/user-stats"
import { UserProperties } from "@/components/dashboard/user-properties"
import { UserInquiries } from "@/components/dashboard/user-inquiries"

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-muted-foreground">Manage your properties and inquiries</p>
      </div>

      <UserStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>My Properties</CardTitle>
            <CardDescription>Properties you have listed on GetASpot</CardDescription>
          </CardHeader>
          <CardContent>
            <UserProperties />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>My Inquiries</CardTitle>
            <CardDescription>Inquiries you have made on properties</CardDescription>
          </CardHeader>
          <CardContent>
            <UserInquiries />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

