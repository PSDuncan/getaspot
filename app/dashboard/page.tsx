import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentListings } from "@/components/dashboard/recent-listings"
import { DashboardStats } from "@/components/dashboard/stats"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to GetASpot, your complete real estate management platform.</p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Property views and inquiries for the past 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
            <CardDescription>Your most recently added properties.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentListings />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

