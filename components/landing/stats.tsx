import { Home, Users, Building2, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Home,
    value: "15,000+",
    label: "Active Listings",
  },
  {
    icon: Users,
    value: "50,000+",
    label: "Happy Users",
  },
  {
    icon: Building2,
    value: "500+",
    label: "Agencies",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Success Rate",
  },
]

export function Stats() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
