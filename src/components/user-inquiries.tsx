import { MoreHorizontal, Calendar, Home } from "lucide-react"
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

// Sample data for user inquiries
const inquiries = [
  {
    id: "1",
    property: "Modern Apartment in Sandton",
    date: "2023-11-15",
    status: "new",
    response: false,
  },
  {
    id: "2",
    property: "Family Home in Cape Town",
    date: "2023-11-10",
    status: "contacted",
    response: true,
  },
  {
    id: "3",
    property: "Luxury Villa in Umhlanga",
    date: "2023-11-05",
    status: "closed",
    response: true,
  },
]

export function UserInquiries() {
  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <div className="flex items-center">
              <Home className="mr-2 h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">{inquiry.property}</h3>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(inquiry.date).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={
                inquiry.status === "new"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : inquiry.status === "contacted"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : "bg-green-50 text-green-700 border-green-200"
              }
            >
              {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
            </Badge>
            {inquiry.response && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Responded
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Inquiry</DropdownMenuItem>
                <DropdownMenuItem>View Property</DropdownMenuItem>
                <DropdownMenuItem>Contact Agent</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete Inquiry</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

