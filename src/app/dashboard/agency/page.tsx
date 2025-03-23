import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AgencyStats } from "@/components/dashboard/agency-stats"
import { AgencyAgents } from "@/components/dashboard/agency-agents"
import { AgencyProperties } from "@/components/dashboard/agency-properties"
import { AgencyPerformance } from "@/components/dashboard/agency-performance"

export default function AgencyDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Agency Dashboard</h1>
        <p className="text-muted-foreground">Manage your agency, agents, and property listings</p>
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

