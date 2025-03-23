"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AgentStats } from "@/components/dashboard/agent-stats"
import { AgentProperties } from "@/components/dashboard/agent-properties"
import { AgentInquiries } from "@/components/dashboard/agent-inquiries"
import { AgentPerformance } from "@/components/dashboard/agent-performance"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"

export default function AgentDashboardPage() {
  const { profile } = useAuth()
  const { refetchData, isLoading, lastUpdated } = useDashboard()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Agent Dashboard</h1>
          <Button variant="outline" size="sm" onClick={() => refetchData()} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        <p className="text-muted-foreground">
          Welcome back, {profile?.first_name || "Agent"}! Manage your listings and client inquiries
          {lastUpdated && <span className="text-xs ml-2">Last updated: {lastUpdated.toLocaleTimeString()}</span>}
        </p>
      </div>

      <AgentStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>My Listings</CardTitle>
            <CardDescription>Properties you are managing</CardDescription>
          </CardHeader>
          <CardContent>
            <AgentProperties />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>Inquiries on your listings</CardDescription>
          </CardHeader>
          <CardContent>
            <AgentInquiries />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Your listing performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <AgentPerformance />
        </CardContent>
      </Card>
    </div>
  )
}

