import { Zap, Shield, Search, Smartphone, DollarSign, Users } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Browse properties at incredible speeds. No lag, no waiting. Just instant results.",
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Bank-level security for all transactions. Your data is protected with industry-leading encryption.",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description: "Filter by price, location, features, and more. Find exactly what you need in seconds.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Perfect experience on any device. Search for homes on the go with our optimized mobile interface.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. Simple, straightforward pricing that makes sense for everyone.",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Connect with verified agents and agencies. Get professional help when you need it.",
  },
]

export function Features() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Why Choose GetASpot?</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            We're not just another property site. We're building the future of real estate in South Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
