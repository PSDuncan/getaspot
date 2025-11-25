import type { Metadata } from "next"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Press & Media | GetASpot",
  description:
    "Latest news, press releases, and media resources from GetASpot - South Africa's leading property platform.",
}

export default function PressPage() {
  const pressReleases = [
    {
      date: "2025-03-15",
      title: "GetASpot Launches Revolutionary Property Platform",
      excerpt:
        "New platform aims to disrupt South African real estate market with innovative features and user-friendly design.",
    },
    {
      date: "2025-02-20",
      title: "GetASpot Secures Series A Funding",
      excerpt: "Leading South African VCs back GetASpot's mission to transform property transactions.",
    },
    {
      date: "2025-01-10",
      title: "GetASpot Partners with Major Real Estate Agencies",
      excerpt: "Strategic partnerships bring thousands of new listings to the platform.",
    },
  ]

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Press & Media</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              The latest news, announcements, and media resources from GetASpot.
            </p>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl font-bold mb-12">Latest Press Releases</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {pressReleases.map((release) => (
                <Card key={release.title}>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(release.date).toLocaleDateString("en-ZA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                    <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                    <Button variant="outline">Read More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Media Inquiries</h2>
              <p className="text-muted-foreground mb-8">
                For press inquiries, interviews, or media kits, please contact our press team.
              </p>
              <div className="space-y-2 mb-8">
                <p className="text-foreground">
                  <strong>Email:</strong> press@getaspot.co.za
                </p>
                <p className="text-foreground">
                  <strong>Phone:</strong> +27 21 123 4567
                </p>
              </div>
              <Button size="lg">Download Media Kit</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
