"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

const planDetails = {
  basic: {
    name: "Basic",
    price: 299,
    features: [
      "10 property listings",
      "Enhanced visibility",
      "Priority support",
      "90-day listing duration",
      "Property analytics",
      "Featured badge",
    ],
  },
  premium: {
    name: "Premium",
    price: 899,
    features: [
      "Unlimited listings",
      "Maximum visibility",
      "24/7 priority support",
      "Unlimited listing duration",
      "Advanced analytics",
      "Featured homepage placement",
      "Custom branding",
      "Up to 10 agents",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 2499,
    features: [
      "Everything in Premium",
      "Unlimited agents",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "White-label options",
      "Training & onboarding",
    ],
  },
}

export default function UpgradePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get("plan") as "basic" | "premium" | "enterprise"
  const [loading, setLoading] = useState(false)
  const supabase = getSupabaseBrowserClient()

  if (!plan || !planDetails[plan]) {
    router.push("/pricing")
    return null
  }

  const selectedPlan = planDetails[plan]

  const handleSubscribe = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/auth/login")
      return
    }

    // In a real implementation, you would:
    // 1. Create a PayFast payment form
    // 2. Generate a signature
    // 3. Redirect to PayFast
    // For now, we'll just show a placeholder

    // Create subscription record
    await supabase.from("subscriptions").insert([
      {
        user_id: user.id,
        plan_type: plan,
        amount: selectedPlan.price,
        currency: "ZAR",
        billing_cycle: "monthly",
        status: "pending",
      },
    ])

    alert("PayFast integration will redirect you to the payment gateway. This is a demo.")
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to pricing
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Upgrade to {selectedPlan.name}</h1>
            <p className="text-muted-foreground">Complete your subscription</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">{selectedPlan.name} Plan</h2>
                <p className="text-sm text-muted-foreground">Billed monthly</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-foreground">R{selectedPlan.price}</div>
                <div className="text-sm text-muted-foreground">/month</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-foreground mb-3">What's included:</h3>
              {selectedPlan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/50 border border-border rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-3">Payment Details</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You will be redirected to PayFast to complete your secure payment. PayFast is South Africa's leading
              payment gateway.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>Secure payment processing</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>No hidden fees</span>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={handleSubscribe} disabled={loading}>
            {loading ? "Processing..." : `Continue to PayFast - R${selectedPlan.price}/month`}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </main>
    </div>
  )
}
