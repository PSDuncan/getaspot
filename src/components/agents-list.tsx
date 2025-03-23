"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Home, Mail, Phone, Trash, UserX } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabase"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"

interface AgentsListProps {
  agents: any[]
  isLoading: boolean
}

export function AgentsList({ agents, isLoading }: AgentsListProps) {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [agentToRemove, setAgentToRemove] = useState<string | null>(null)
  const router = useRouter()

  const handleRemoveClick = (id: string) => {
    setAgentToRemove(id)
    setRemoveDialogOpen(true)
  }

  const handleRemoveConfirm = async () => {
    if (!agentToRemove) return

    try {
      // Update the agent's profile to remove agency association
      const { error } = await supabase
        .from("profiles")
        .update({
          agency_id: null,
          role: "user",
        })
        .eq("id", agentToRemove)

      if (error) throw error

      // Refresh the page to update the list
      router.refresh()
    } catch (error) {
      console.error("Error removing agent:", error)
    } finally {
      setRemoveDialogOpen(false)
      setAgentToRemove(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (agents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <UserX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No agents found</h3>
        <p className="text-muted-foreground mt-1">You haven&apos;t added any agents to your agency yet.</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Avatar</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Properties</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell>
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={agent.avatar_url || "/placeholder.svg?height=40&width=40"}
                    alt={`${agent.first_name} ${agent.last_name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {agent.first_name} {agent.last_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Joined {new Date(agent.created_at).toLocaleDateString()}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{agent.email}</span>
                  </div>
                  {agent.phone && (
                    <div className="flex items-center">
                      <Phone className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{agent.phone}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>0 listings</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    agent.is_verified
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }
                >
                  {agent.is_verified ? "Verified" : "Pending"}
                </Badge>
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
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Agent
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Home className="mr-2 h-4 w-4" />
                      View Properties
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => handleRemoveClick(agent.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Remove from Agency
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the agent from your agency. They will no longer be able to manage properties on behalf of
              your agency.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveConfirm} className="bg-destructive text-destructive-foreground">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

