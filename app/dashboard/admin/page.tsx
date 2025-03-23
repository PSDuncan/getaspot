"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminStats } from "@/components/dashboard/admin-stats"
import { AdminAgencies } from "@/components/dashboard/admin-agencies"
import { AdminUsers } from "@/components/dashboard/admin-users"
import { AdminProperties } from "@/components/dashboard/admin-properties"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"

export default function AdminDashboardPage() {
  const { profile } = useAuth()
  const { refetchData, isLoading, lastUpdated } = useDashboard()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <Button variant="outline" size="sm" onClick={() => refetchData()} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        <p className="text-muted-foreground">
          Welcome back, {profile?.first_name || "Admin"}! Platform overview and management
          {lastUpdated && <span className="text-xs ml-2">Last updated: {lastUpdated.toLocaleTimeString()}</span>}
        </p>
      </div>

      <AdminStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Platform Properties</CardTitle>
            <CardDescription>All properties listed on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminProperties />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Registered Agencies</CardTitle>
            <CardDescription>Agencies registered on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminAgencies />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage users across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminUsers />
        </CardContent>
      </Card>
    </div>
  )
}

