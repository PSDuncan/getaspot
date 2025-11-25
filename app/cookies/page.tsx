import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata = {
  title: "Cookie Policy | GetASpot",
  description: "GetASpot Cookie Policy - How we use cookies and tracking technologies.",
}

export default function CookiesPage() {
  return (
    <>
      <LandingHeader />
      <div className="min-h-screen bg-background py-16 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: November 25, 2025</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. They help us
                  provide you with a better experience by remembering your preferences and understanding how you use our
                  platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Types of Cookies We Use</h2>

                <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies are necessary for the website to function properly. They enable core functionality such
                  as security, network management, and accessibility.
                </p>

                <h3 className="text-xl font-semibold mb-2">Performance Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies collect information about how you use our website, such as which pages you visit most
                  often. This data helps us improve our website's performance.
                </p>

                <h3 className="text-xl font-semibold mb-2">Functionality Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies remember your preferences and choices (such as your language or region) to provide a
                  more personalized experience.
                </p>

                <h3 className="text-xl font-semibold mb-2">Targeting/Advertising Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies are used to deliver advertisements that are relevant to you. They also limit the number
                  of times you see an advertisement and help measure the effectiveness of advertising campaigns.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may use third-party services that also set cookies on your device:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Google Analytics - for website analytics</li>
                  <li>PayFast - for payment processing</li>
                  <li>Social media platforms - for social sharing features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control and manage cookies in various ways:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Browser settings: Most browsers allow you to refuse cookies or delete existing cookies</li>
                  <li>Third-party tools: You can use opt-out tools provided by advertising networks</li>
                  <li>Mobile devices: Check your device settings for cookie management options</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please note that disabling cookies may affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting the
                  new policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about our use of cookies, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  Email: privacy@getaspot.co.za
                  <br />
                  Phone: +27 10 123 4567
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
