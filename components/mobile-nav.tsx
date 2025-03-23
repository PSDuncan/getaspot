"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  {
    title: "Buy",
    href: "/properties?type=sale",
  },
  {
    title: "Rent",
    href: "/properties?type=rent",
  },
  {
    title: "New Developments",
    href: "/new-developments",
  },
  {
    title: "Find Agents",
    href: "/agents",
  },
  {
    title: "Resources",
    href: "/resources",
  },
]

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <span className="font-bold text-xl">GetASpot</span>
        </Link>
        <div className="mt-8 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

