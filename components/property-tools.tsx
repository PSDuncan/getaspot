import Link from "next/link"
import { Calculator, FileText, LineChart, Map } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  {
    title: "Mortgage Calculator",
    description: "Calculate your monthly mortgage payments",
    icon: Calculator,
    href: "/tools/mortgage-calculator",
  },
  {
    title: "Property Guides",
    description: "Helpful guides for buyers and sellers",
    icon: FileText,
    href: "/resources/guides",
  },
  {
    title: "Market Trends",
    description: "Stay updated with the latest market trends",
    icon: LineChart,
    href: "/resources/market-trends",
  },
  {
    title: "Area Insights",
    description: "Explore neighborhoods and area statistics",
    icon: Map,
    href: "/tools/area-insights",
  },
]

export function PropertyTools() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {tools.map((tool) => (
        <Link href={tool.href} key={tool.title}>
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
            <CardHeader className="pb-2">
              <tool.icon className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-lg">{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm font-medium text-primary">Learn more →</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

