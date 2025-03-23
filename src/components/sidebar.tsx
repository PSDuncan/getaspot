"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, Home, LayoutDashboard, ListFilter, MessageSquare, PieChart, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const agencyRoutes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: Home,
  },
  {
    title: "Agents",
    href: "/dashboard/agents",
    icon: Users,
  },
  {
    title: "Inquiries",
    href: "/dashboard/inquiries",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: PieChart,
  },
  {
    title: "Agency Settings",
    href: "/dashboard/agency-settings",
    icon: Building,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block md:w-64">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Building className="h-6 w-6" />
            <span>GetASpot</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="flex flex-col gap-1 py-2">
            {agencyRoutes.map((route) => (
              <Button
                key={route.href}
                variant="ghost"
                className={cn("justify-start", pathname === route.href && "bg-accent text-accent-foreground")}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.title}
                </Link>
              </Button>
            ))}
          </div>

          <div className="py-2">
            <h4 className="px-4 py-2 text-xs font-semibold text-muted-foreground">Quick Filters</h4>
            <div className="grid gap-1">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/properties?filter=featured">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Featured Properties
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/properties?filter=recent">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Recently Added
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/properties?filter=popular">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Most Viewed
                </Link>
              </Button>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-medium leading-none">Premium Plan</p>
              <p className="text-xs text-muted-foreground">Upgrade for more features</p>
            </div>
            <Button size="sm" className="ml-auto">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

