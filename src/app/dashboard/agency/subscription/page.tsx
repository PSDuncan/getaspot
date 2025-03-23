"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SubscriptionPage() {
  const { profile } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [agency, setAgency] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    const fetchAgencyAndSubscription = async () => {
      if (!profile?.agency_id) return

      setIsLoading(true)

      // Fetch agency details
      const { data: agencyData, error: agencyError } = await supabase
        .from("agencies")
        .select("*")
        .eq("id", profile.agency_id)
        .single()

      if (agencyError) {
        console.error("Error fetching agency:", agencyError)
      } else {
        setAgency(agencyData)
      }

      // Fetch subscription details
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("agency_id", profile.agency_id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      if (subscriptionError && subscriptionError.code !== "PGRST116") {
        console.error("Error fetching subscription:", subscriptionError)
      } else {
        setSubscription(subscriptionData)
      }

      setIsLoading(false)
    }

    fetchAgencyAndSubscription()
  }, [profile])

  const getSubscriptionStatus = () => {
    if (!subscription) return "No active subscription"

    const endDate = new Date(subscription.end_date)
    const now = new Date()

    if (subscription.status === "active" && endDate > now) {
      return `Active until ${endDate.toLocaleDateString()}`
    } else if (subscription.status === "trial") {
      return `Trial until ${endDate.toLocaleDateString()}`
    } else {
      return "Expired"
    }
  }

  const getStatusBadge = () => {
    if (!subscription) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          No Subscription
        </Badge>
      )
    }

    switch (subscription.status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case "trial":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Trial
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Inactive
          </Badge>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
          <p className="text-muted-foreground">Manage your agency subscription plan</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
        <p className="text-muted-foreground">Manage your agency subscription plan</p>
      </div>

      {agency && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Subscription</CardTitle>
                <CardDescription>Your current subscription details</CardDescription>
              </div>
              {getStatusBadge()}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium">
                  {agency.subscription_tier
                    ? agency.subscription_tier.charAt(0).toUpperCase() + agency.subscription_tier.slice(1)
                    : "None"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{getSubscriptionStatus()}</p>
              </div>
              {subscription && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{new Date(subscription.start_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">{new Date(subscription.end_date).toLocaleDateString()}</p>
                  </div>
                </>
              )}
            </div>

            {subscription && subscription.status === "active" && (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertTitle>Active Subscription</AlertTitle>
                <AlertDescription>
                  Your subscription is active and you have access to all features included in your plan.
                </AlertDescription>
              </Alert>
            )}

            {(!subscription || subscription.status === "inactive") && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>No Active Subscription</AlertTitle>
                <AlertDescription>
                  You don't have an active subscription. Upgrade now to access premium features.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Basic features for small agencies</CardDescription>
            <div className="mt-4 text-4xl font-bold">R 0</div>
            <p className="text-sm text-muted-foreground">per month</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Up to 5 property listings</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled={agency?.subscription_tier === "free"}>
              {agency?.subscription_tier === "free" ? "Current Plan" : "Downgrade"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Standard</CardTitle>
                <CardDescription>Ideal for growing agencies</CardDescription>
              </div>
              <Badge>Popular</Badge>
            </div>
            <div className="mt-4 text-4xl font-bold">R 499</div>
            <p className="text-sm text-muted-foreground">per month</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Up to 50 property listings</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Up to 5 agents</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Featured properties</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={agency?.subscription_tier === "standard"}>
              {agency?.subscription_tier === "standard" ? "Current Plan" : "Upgrade"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>For established agencies</CardDescription>
            <div className="mt-4 text-4xl font-bold">R 999</div>
            <p className="text-sm text-muted-foreground">per month</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Unlimited property listings</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Comprehensive analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Unlimited agents</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Featured properties</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Priority listing in search</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Dedicated account manager</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled={agency?.subscription_tier === "premium"}>
              {agency?.subscription_tier === "premium" ? "Current Plan" : "Upgrade"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

