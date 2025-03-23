import Image from "next/image"
import { MoreHorizontal, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for users
const users = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "user",
    status: "active",
    joined: "2023-01-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "agent",
    status: "active",
    joined: "2023-02-20",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "agency_admin",
    status: "active",
    joined: "2023-03-10",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "user",
    status: "inactive",
    joined: "2023-04-05",
  },
]

export function AdminUsers() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Mail className="mr-1 h-3 w-3" />
                    {user.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  user.role === "agency_admin"
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : user.role === "agent"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                }
              >
                {user.role === "agency_admin" ? "Agency Admin" : user.role === "agent" ? "Agent" : "User"}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  user.status === "active"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center text-sm">
                <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                {new Date(user.joined).toLocaleDateString()}
              </div>
            </TableCell>
            <TableCell className="text-right">
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
                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                  <DropdownMenuItem>Reset Password</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user.status === "active" ? (
                    <DropdownMenuItem className="text-destructive">Deactivate User</DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>Activate User</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

