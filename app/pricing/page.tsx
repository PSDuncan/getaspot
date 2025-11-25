import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    features: ["3 property listings", "Basic search visibility", "Email support", "30-day listing duration"],
    cta: "Get Started",
    href: "/auth/signup",
    popular: false,
  },
  {
    name: "Basic",
    price: 299,
    description: "For private sellers",
    features: [
      "10 property listings",
      "Enhanced visibility",
      "Priority support",
      "90-day listing duration",
      "Property analytics",
      "Featured badge",
    ],
    cta: "Upgrade Now",
    href: "/dashboard/upgrade?plan=basic",
    popular: false,
  },
  {
    name: "Premium",
    price: 899,
    description: "For agencies & professionals",
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
    cta: "Upgrade Now",
    href: "/dashboard/upgrade?plan=premium",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 2499,
    description: "For large agencies",
    features: [
      "Everything in Premium",
      "Unlimited agents",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "White-label options",
      "Training & onboarding",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Choose the perfect plan for your property listing needs. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-card border rounded-2xl p-8 flex flex-col ${
                  plan.popular ? "border-primary shadow-lg relative" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">R{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant={plan.popular ? "default" : "outline"} size="lg" className="w-full">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">All plans include:</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                Secure payments via PayFast
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                Cancel anytime
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                No setup fees
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                Email support
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
