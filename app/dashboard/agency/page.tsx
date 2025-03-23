"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AgencyStats } from "@/components/dashboard/agency-stats"
import { AgencyAgents } from "@/components/dashboard/agency-agents"
import { AgencyProperties } from "@/components/dashboard/agency-properties"
import { AgencyPerformance } from "@/components/dashboard/agency-performance"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"

export default function AgencyDashboardPage() {
  const { profile } = useAuth()
  const { refetchData, isLoading, lastUpdated } = useDashboard()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Agency Dashboard</h1>
          <Button variant="outline" size="sm" onClick={() => refetchData()} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        <p className="text-muted-foreground">
          Welcome back, {profile?.first_name || "Admin"}! Manage your agency, agents, and property listings
          {lastUpdated && <span className="text-xs ml-2">Last updated: {lastUpdated.toLocaleTimeString()}</span>}
        </p>
      </div>

      <AgencyStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Agency Properties</CardTitle>
            <CardDescription>All properties listed by your agency</CardDescription>
          </CardHeader>
          <CardContent>
            <AgencyProperties />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Agency Agents</CardTitle>
            <CardDescription>Agents working for your agency</CardDescription>
          </CardHeader>
          <CardContent>
            <AgencyAgents />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agency Performance</CardTitle>
          <CardDescription>Overall performance metrics for your agency</CardDescription>
        </CardHeader>
        <CardContent>
          <AgencyPerformance />
        </CardContent>
      </Card>
    </div>
  )
}

