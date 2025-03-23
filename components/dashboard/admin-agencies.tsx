import Image from "next/image"
import { MoreHorizontal, Users, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for agencies
const agencies = [
  {
    id: "1",
    name: "Premier Properties",
    logo: "/placeholder.svg?height=40&width=40",
    agents: 12,
    properties: 87,
    subscription: "premium",
    status: "active",
  },
  {
    id: "2",
    name: "Cape Realty",
    logo: "/placeholder.svg?height=40&width=40",
    agents: 8,
    properties: 54,
    subscription: "standard",
    status: "active",
  },
  {
    id: "3",
    name: "Durban Homes",
    logo: "/placeholder.svg?height=40&width=40",
    agents: 5,
    properties: 32,
    subscription: "standard",
    status: "active",
  },
]

export function AdminAgencies() {
  return (
    <div className="space-y-4">
      {agencies.map((agency) => (
        <div key={agency.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image src={agency.logo || "/placeholder.svg"} alt={agency.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{agency.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-3.5 w-3.5" />
                  {agency.agents} agents
                </div>
                <div className="flex items-center">
                  <Home className="mr-1 h-3.5 w-3.5" />
                  {agency.properties} properties
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className={
                agency.subscription === "premium"
                  ? "bg-purple-50 text-purple-700 border-purple-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }
            >
              {agency.subscription.charAt(0).toUpperCase() + agency.subscription.slice(1)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Contact Agency</DropdownMenuItem>
                <DropdownMenuItem>View Properties</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Suspend Agency</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

