"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

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

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

