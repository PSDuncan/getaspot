import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-muted via-background to-background" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            South Africa's Fastest Growing Property Platform
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Find Your Perfect Home. <span className="text-primary">Faster.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            South Africa's most modern property marketplace. Browse thousands of homes, apartments, and commercial
            properties with the speed and simplicity you deserve.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative flex items-center gap-2 p-2 bg-card rounded-2xl shadow-lg border border-border">
              <div className="flex-1 flex items-center gap-3 px-4">
                <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter city, suburb, or address..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button size="lg" className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search Properties</span>
                <span className="sm:hidden">Search</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Popular:</span>
            <Link href="/properties?city=Cape+Town" className="text-foreground hover:text-primary transition-colors">
              Cape Town
            </Link>
            <span className="text-border">•</span>
            <Link href="/properties?city=Johannesburg" className="text-foreground hover:text-primary transition-colors">
              Johannesburg
            </Link>
            <span className="text-border">•</span>
            <Link href="/properties?city=Durban" className="text-foreground hover:text-primary transition-colors">
              Durban
            </Link>
            <span className="text-border">•</span>
            <Link href="/properties?city=Pretoria" className="text-foreground hover:text-primary transition-colors">
              Pretoria
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
