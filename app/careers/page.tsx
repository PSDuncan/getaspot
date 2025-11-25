import type { Metadata } from "next"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Users, TrendingUp, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers - Join Our Team | GetASpot",
  description:
    "Build your career with South Africa's fastest-growing property platform. Join GetASpot and help revolutionize real estate.",
}

export default function CareersPage() {
  const openings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Cape Town / Remote",
      type: "Full-time",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Johannesburg / Remote",
      type: "Full-time",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Support",
      location: "Durban / Remote",
      type: "Full-time",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Cape Town",
      type: "Full-time",
    },
  ]

  const benefits = [
    {
      icon: Briefcase,
      title: "Competitive Salary",
      description: "Market-leading compensation packages with performance bonuses",
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with talented, passionate people who love what they do",
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Continuous learning and career development programs",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible hours, remote work options, and generous leave",
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
              Join Us in Revolutionizing South African Real Estate
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
              Be part of a team that's building the future of property search and transactions in South Africa.
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Work at GetASpot?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <Card key={benefit.title}>
                  <CardContent className="p-6">
                    <benefit.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {openings.map((job) => (
                <Card key={job.title} className="hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.department} • {job.location} • {job.type}
                        </p>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented people. Send us your CV and tell us how you can contribute to GetASpot.
            </p>
            <Button size="lg">Send Your CV</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
