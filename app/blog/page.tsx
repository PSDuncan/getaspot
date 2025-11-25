import type { Metadata } from "next"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Blog - Property News & Insights | GetASpot",
  description: "Latest property market news, trends, and insights for South Africa.",
}

export default function BlogPage() {
  const posts = [
    {
      title: "2025 Property Market Trends in South Africa",
      excerpt: "Discover the key trends shaping the South African property market this year.",
      date: "2025-03-20",
      category: "Market Trends",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Top 10 Neighborhoods in Cape Town",
      excerpt: "Explore the most desirable areas to live in Cape Town in 2025.",
      date: "2025-03-15",
      category: "Location Guide",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "How to Stage Your Home for a Quick Sale",
      excerpt: "Expert tips on preparing your property to attract buyers.",
      date: "2025-03-10",
      category: "Selling Tips",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Understanding Property Transfer Costs",
      excerpt: "A complete breakdown of transfer duties, fees, and costs.",
      date: "2025-03-05",
      category: "Finance",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Investing in Student Accommodation",
      excerpt: "Why student housing is a smart investment in South Africa.",
      date: "2025-02-28",
      category: "Investment",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Green Homes: Sustainable Living in SA",
      excerpt: "The rise of eco-friendly properties and sustainable design.",
      date: "2025-02-20",
      category: "Sustainability",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Property News & Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Stay updated with the latest trends, tips, and news from the South African property market.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.title} className="overflow-hidden hover:border-primary transition-colors">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 block">
                      {post.category}
                    </span>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-ZA", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
