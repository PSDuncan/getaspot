import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

const locations = [
  {
    name: "Cape Town",
    image: "/placeholder.svg?height=200&width=300",
    count: 856,
    href: "/properties?location=cape-town",
  },
  {
    name: "Johannesburg",
    image: "/placeholder.svg?height=200&width=300",
    count: 1243,
    href: "/properties?location=johannesburg",
  },
  {
    name: "Durban",
    image: "/placeholder.svg?height=200&width=300",
    count: 567,
    href: "/properties?location=durban",
  },
  {
    name: "Pretoria",
    image: "/placeholder.svg?height=200&width=300",
    count: 432,
    href: "/properties?location=pretoria",
  },
  {
    name: "Port Elizabeth",
    image: "/placeholder.svg?height=200&width=300",
    count: 289,
    href: "/properties?location=port-elizabeth",
  },
  {
    name: "Stellenbosch",
    image: "/placeholder.svg?height=200&width=300",
    count: 176,
    href: "/properties?location=stellenbosch",
  },
]

export function PopularLocations() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <Link href={location.href} key={location.name} className="group">
          <Card className="overflow-hidden h-full transition-all hover:shadow-md">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={location.image || "/placeholder.svg"}
                alt={location.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold">{location.name}</h3>
                <p className="text-sm">{location.count} properties</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

