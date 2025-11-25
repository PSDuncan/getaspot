import type { Metadata } from "next"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, HelpCircle, Mail, Phone, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Help Center | GetASpot",
  description: "Find answers to common questions and get support for GetASpot.",
}

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I list my property?",
      answer:
        'Sign up for a free account, navigate to your dashboard, and click "Add New Listing". Follow the step-by-step guide to add your property details, photos, and pricing.',
    },
    {
      question: "What are the subscription plans?",
      answer:
        "We offer Free, Basic (R299/month), Premium (R599/month), and Enterprise plans. Each plan offers different listing limits and features.",
    },
    {
      question: "How do I contact property owners?",
      answer: 'Click the "Contact" button on any property listing to send a message directly to the owner or agent.',
    },
    {
      question: "Can I save properties to view later?",
      answer:
        "Yes! Click the heart icon on any property to save it to your favorites. Access all saved properties from your dashboard.",
    },
    {
      question: "How do I create an agency account?",
      answer:
        "Sign up as a user, then navigate to the Agency section in your dashboard to create and manage your agency profile.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and EFT through our secure PayFast integration.",
    },
  ]

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">How Can We Help?</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
              Search our knowledge base or contact our support team.
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input type="search" placeholder="Search for help..." className="pl-12 h-12 text-base" />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Still Need Help?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">support@getaspot.co.za</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Send Email
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">+27 21 123 4567</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">Available 9am-5pm</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
