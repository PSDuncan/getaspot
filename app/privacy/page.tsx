import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata = {
  title: "Privacy Policy | GetASpot",
  description: "GetASpot Privacy Policy - How we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
  return (
    <>
      <LandingHeader />
      <div className="min-h-screen bg-background py-16 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: November 25, 2025</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  GetASpot ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect personal information that you provide to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Account credentials</li>
                  <li>Property listing information</li>
                  <li>Payment and billing information</li>
                  <li>Communications with us</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 mt-6">Automatically Collected Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you use our platform, we automatically collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages viewed, time spent, links clicked)</li>
                  <li>Location information (with your permission)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide and maintain our services</li>
                  <li>Process your transactions and manage your account</li>
                  <li>Send you updates and marketing communications</li>
                  <li>Improve our platform and user experience</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Other users (when you list a property or make an inquiry)</li>
                  <li>Service providers who assist in operating our platform</li>
                  <li>Payment processors for transaction processing</li>
                  <li>Law enforcement or government agencies when required by law</li>
                  <li>Business partners with your consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information.
                  However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Under the Protection of Personal Information Act (POPIA), you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience. You can control cookies through
                  your browser settings. See our Cookie Policy for more details.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for users under 18 years of age. We do not knowingly collect personal
                  information from children.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  Email: privacy@getaspot.co.za
                  <br />
                  Phone: +27 10 123 4567
                  <br />
                  Address: 123 Property Lane, Sandton, Johannesburg, 2196
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
