import Image from "next/image"
import { MoreHorizontal, Mail, Phone, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for agents
const agents = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+27 82 123 4567",
    avatar: "/placeholder.svg?height=40&width=40",
    properties: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+27 83 234 5678",
    avatar: "/placeholder.svg?height=40&width=40",
    properties: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+27 84 345 6789",
    avatar: "/placeholder.svg?height=40&width=40",
    properties: 5,
    status: "active",
  },
]

export function AgencyAgents() {
  return (
    <div className="space-y-4">
      {agents.map((agent) => (
        <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image src={agent.avatar || "/placeholder.svg"} alt={agent.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{agent.name}</h3>
              <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Mail className="mr-1 h-3.5 w-3.5" />
                  {agent.email}
                </div>
                <div className="flex items-center">
                  <Phone className="mr-1 h-3.5 w-3.5" />
                  {agent.phone}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Home className="mr-1 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{agent.properties} properties</span>
            </div>
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
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Contact Agent</DropdownMenuItem>
                <DropdownMenuItem>View Properties</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Remove from Agency</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

