import Link from "next/link"
import { Building, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6" />
              <span className="font-bold text-xl">GetASpot</span>
            </div>
            <p className="text-muted-foreground">
              South Africa's premier property marketplace. Find your perfect home with GetASpot.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-muted-foreground hover:text-foreground">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-muted-foreground hover:text-foreground">
                  Find Agents
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Professionals</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register?type=agent" className="text-muted-foreground hover:text-foreground">
                  Join as Agent
                </Link>
              </li>
              <li>
                <Link href="/register?type=agency" className="text-muted-foreground hover:text-foreground">
                  Register Agency
                </Link>
              </li>
              <li>
                <Link href="/register?type=seller" className="text-muted-foreground hover:text-foreground">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-muted-foreground hover:text-foreground">
                  Advertise With Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest property news and updates.
            </p>
            <div className="space-y-2">
              <Input placeholder="Your email address" type="email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} GetASpot. All rights reserved.</p>
            <div className="flex gap-4 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

