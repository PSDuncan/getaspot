"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="font-bold text-xl text-foreground">GetASpot</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/buy"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Buy
            </Link>
            <Link
              href="/rent"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Rent
            </Link>
            <Link
              href="/sell"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sell
            </Link>
            <Link
              href="/agencies"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Agencies
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/buy"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Buy
              </Link>
              <Link
                href="/rent"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Rent
              </Link>
              <Link
                href="/sell"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sell
              </Link>
              <Link
                href="/agencies"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Agencies
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/auth/login">Log in</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
