import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, CheckCircle, TrendingUp, Users, Zap } from "lucide-react"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata = {
  title: "Sell Your Property | GetASpot",
  description:
    "List your property on GetASpot and reach thousands of buyers. Free and premium listing options available.",
}

export default function SellPage() {
  const steps = [
    { number: "1", title: "Create Account", description: "Sign up for free in less than 2 minutes" },
    { number: "2", title: "List Property", description: "Add photos, details, and set your price" },
    { number: "3", title: "Get Discovered", description: "Your listing goes live to thousands of buyers" },
    { number: "4", title: "Close the Deal", description: "Connect with buyers and sell your property" },
  ]

  const features = [
    { icon: Users, title: "Reach Thousands", description: "Connect with over 500,000+ active property seekers" },
    { icon: Camera, title: "Professional Tools", description: "Upload unlimited photos and virtual tours" },
    { icon: TrendingUp, title: "Market Analytics", description: "Get insights on pricing and market trends" },
    { icon: Zap, title: "Instant Notifications", description: "Receive inquiries directly to your email and phone" },
  ]

  return (
    <>
      {/* Header */}
      <LandingHeader />
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-4 text-balance">Sell Your Property with GetASpot</h1>
              <p className="text-xl mb-8 text-teal-50 text-pretty">
                List your property and reach thousands of qualified buyers across South Africa. Free listings available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                    Start Listing for Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Sell with GetASpot</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-teal-600" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Free</h3>
                  <div className="text-4xl font-bold mb-6">
                    R0<span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Up to 3 active listings</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>10 photos per listing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Basic analytics</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-teal-600 border-2 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Premium</h3>
                  <div className="text-4xl font-bold mb-6">
                    R299<span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Unlimited listings</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Unlimited photos & videos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Featured placement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                  <Link href="/pricing">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Upgrade to Premium</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Agency</h3>
                  <div className="text-4xl font-bold mb-6">Custom</div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Everything in Premium</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Multiple agents</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Agency branding</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full bg-transparent">
                      Contact Sales
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to List Your Property?</h2>
            <p className="text-xl mb-8 text-teal-50">Join thousands of sellers who trust GetASpot</p>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </>
  )
}
