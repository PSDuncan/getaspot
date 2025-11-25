import { createServerClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AdminSubscriptionsPage() {
  const supabase = await createServerClient()

  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select(`
      *,
      users (
        full_name,
        email
      )
    `)
    .order("created_at", { ascending: false })

  const activeCount = subscriptions?.filter((s) => s.status === "active").length || 0
  const totalRevenue = subscriptions?.reduce((sum, s) => sum + (s.amount || 0), 0) || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted-foreground">Manage user subscriptions and billing</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground">Total Subscriptions</div>
          <div className="text-3xl font-bold text-foreground">{subscriptions?.length || 0}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground">Active Subscriptions</div>
          <div className="text-3xl font-bold text-foreground">{activeCount}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground">Total Revenue</div>
          <div className="text-3xl font-bold text-foreground">R{totalRevenue.toLocaleString()}</div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">All Subscriptions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Started</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions?.map((subscription) => (
                  <tr key={subscription.id} className="border-b border-border">
                    <td className="py-3 px-4 text-sm text-foreground">
                      {subscription.users?.full_name}
                      <div className="text-xs text-muted-foreground">{subscription.users?.email}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground capitalize">{subscription.plan_type}</td>
                    <td className="py-3 px-4 text-sm text-foreground">R{subscription.amount}</td>
                    <td className="py-3 px-4">
                      <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                        {subscription.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(subscription.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}
