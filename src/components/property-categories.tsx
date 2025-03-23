import Link from "next/link"
import { Building, Home, Hotel, Landmark, Mountain, Trees } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    title: "Houses",
    icon: Home,
    description: "Standalone homes for families",
    href: "/properties?category=house",
    count: 1245,
  },
  {
    title: "Apartments",
    icon: Building,
    description: "Flats and apartments in complexes",
    href: "/properties?category=apartment",
    count: 876,
  },
  {
    title: "Townhouses",
    icon: Landmark,
    description: "Multi-level attached homes",
    href: "/properties?category=townhouse",
    count: 543,
  },
  {
    title: "Vacant Land",
    icon: Mountain,
    description: "Plots for development",
    href: "/properties?category=land",
    count: 321,
  },
  {
    title: "Farms",
    icon: Trees,
    description: "Agricultural properties",
    href: "/properties?category=farm",
    count: 98,
  },
  {
    title: "Commercial",
    icon: Hotel,
    description: "Office and retail spaces",
    href: "/properties?category=commercial",
    count: 432,
  },
]

export function PropertyCategories() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link href={category.href} key={category.title}>
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{category.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
              <p className="text-sm font-medium mt-2">{category.count} listings</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

