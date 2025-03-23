import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AgentStats } from "@/components/dashboard/agent-stats"
import { AgentProperties } from "@/components/dashboard/agent-properties"
import { AgentInquiries } from "@/components/dashboard/agent-inquiries"
import { AgentPerformance } from "@/components/dashboard/agent-performance"

export default function AgentDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Agent Dashboard</h1>
        <p className="text-muted-foreground">Manage your listings and client inquiries</p>
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

