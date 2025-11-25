import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Offline",
  description: "You are currently offline",
}

export default function OfflinePage() {
  return (
    <>
      <LandingHeader />
      <main className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
            <WifiOff className="h-10 w-10 text-muted-foreground" />
          </div>

          <h1 className="text-3xl font-bold mb-3 text-balance">You're Offline</h1>
          <p className="text-muted-foreground mb-8 text-pretty">
            It looks like you've lost your internet connection. Some features may not be available until you're back
            online.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/properties">View Cached Properties</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Tip: Previously viewed properties may still be available offline.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
