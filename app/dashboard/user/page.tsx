"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserStats } from "@/components/dashboard/user-stats"
import { UserProperties } from "@/components/dashboard/user-properties"
import { UserInquiries } from "@/components/dashboard/user-inquiries"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"

export default function UserDashboardPage() {
  const { profile } = useAuth()
  const { refetchData, isLoading, lastUpdated } = useDashboard()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
          <Button variant="outline" size="sm" onClick={() => refetchData()} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        <p className="text-muted-foreground">
          Welcome back, {profile?.first_name || "User"}! Manage your properties and inquiries
          {lastUpdated && <span className="text-xs ml-2">Last updated: {lastUpdated.toLocaleTimeString()}</span>}
        </p>
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

