export const metadata = {
  title: "Disclaimer | GetASpot",
  description: "GetASpot Disclaimer and Terms of Use.",
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
          <p className="text-muted-foreground mb-8">Last updated: November 25, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. General Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                The information provided on GetASpot is for general informational purposes only. While we strive to keep
                the information accurate and up-to-date, we make no representations or warranties of any kind, express
                or implied, about the completeness, accuracy, reliability, suitability, or availability of the
                information, products, services, or related graphics contained on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Property Listings</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Property listings on GetASpot are provided by individual sellers, agents, and agencies. GetASpot:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Does not verify all property information provided by sellers</li>
                <li>Is not responsible for the accuracy of property descriptions, prices, or availability</li>
                <li>Does not guarantee that properties meet any specific standards or requirements</li>
                <li>Recommends that buyers conduct their own due diligence before making any property decisions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. No Professional Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                GetASpot does not provide legal, financial, tax, or real estate advice. Any information or tools
                provided (including the mortgage calculator) are for informational purposes only and should not be
                relied upon as professional advice. Always consult with qualified professionals before making
                property-related decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform may contain links to third-party websites or services that are not owned or controlled by
                GetASpot. We have no control over and assume no responsibility for the content, privacy policies, or
                practices of any third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall GetASpot, its directors, employees, partners, agents, suppliers, or affiliates be
                liable for any indirect, incidental, special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
                to or use of or inability to access or use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Pricing and Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Property prices and availability are subject to change without notice. While we strive to keep
                information current, we cannot guarantee that all prices and property details are up-to-date at all
                times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. User Responsibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Users of GetASpot are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Verifying all property information independently</li>
                <li>Conducting proper due diligence before property transactions</li>
                <li>Ensuring compliance with all applicable laws and regulations</li>
                <li>Seeking professional advice when necessary</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Calculations and Estimates</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any calculations, estimates, or projections provided on our platform (such as mortgage calculations) are
                for illustrative purposes only. Actual costs, payments, and terms may vary based on individual
                circumstances and lender requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Changes to This Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or replace this disclaimer at any time. Your continued use of the
                platform after any changes constitutes acceptance of the new disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                This disclaimer shall be governed by and construed in accordance with the laws of South Africa, without
                regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this disclaimer, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
                Email: legal@getaspot.co.za
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
  )
}
