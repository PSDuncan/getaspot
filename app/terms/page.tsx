import type { Metadata } from "next"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  title: "Terms of Service | GetASpot",
  description: "Terms and conditions for using GetASpot property platform.",
}

export default function TermsPage() {
  return (
    <>
      <LandingHeader />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing and using GetASpot (the "Platform"), you accept and agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Service</h2>
            <p className="text-muted-foreground mb-6">
              GetASpot provides a platform for property listings, searches, and real estate services in South Africa.
              You agree to use the Platform only for lawful purposes and in accordance with these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-6">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities
              that occur under your account. You must notify us immediately of any unauthorized access or security
              breaches.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Property Listings</h2>
            <p className="text-muted-foreground mb-6">
              Users who create property listings must ensure that all information provided is accurate, complete, and
              not misleading. GetASpot reserves the right to remove any listing that violates these terms or applicable
              laws.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Payment and Subscriptions</h2>
            <p className="text-muted-foreground mb-6">
              Subscription fees are charged through PayFast and are non-refundable except as required by law. Prices are
              subject to change with 30 days notice to active subscribers.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground mb-6">
              All content on GetASpot, including text, graphics, logos, and software, is the property of GetASpot or its
              licensors and is protected by copyright and trademark laws.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              GetASpot is not liable for any indirect, incidental, or consequential damages arising from your use of the
              Platform. We do not guarantee the accuracy of property information provided by third parties.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Termination</h2>
            <p className="text-muted-foreground mb-6">
              We reserve the right to suspend or terminate your account at any time for violation of these Terms or for
              any other reason at our discretion.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
            <p className="text-muted-foreground mb-6">
              These Terms are governed by the laws of the Republic of South Africa. Any disputes shall be resolved in
              the courts of South Africa.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              If you have questions about these Terms of Service, please contact us at legal@getaspot.co.za or +27 21
              123 4567.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
