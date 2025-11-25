"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <Mail className="w-8 h-8 text-teal-600 mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">support@getaspot.co.za</p>
                  <p className="text-muted-foreground">sales@getaspot.co.za</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Phone className="w-8 h-8 text-teal-600 mb-4" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">+27 10 123 4567</p>
                  <p className="text-sm text-muted-foreground mt-1">Mon-Fri 8am-6pm SAST</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 text-teal-600 mb-4" />
                  <h3 className="font-semibold mb-2">Office</h3>
                  <p className="text-muted-foreground">
                    123 Property Lane
                    <br />
                    Sandton, Johannesburg
                    <br />
                    2196, South Africa
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">Thank you for contacting us. We'll get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" required placeholder="John Doe" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required placeholder="john@example.com" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input id="phone" type="tel" placeholder="+27 10 123 4567" />
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" required placeholder="How can we help?" />
                      </div>

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" required placeholder="Tell us more about your inquiry..." rows={6} />
                      </div>

                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
