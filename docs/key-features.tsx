import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function KeyFeaturesPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">GetASpot Key Features</h1>

      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
          <CardDescription>Comprehensive feature set for GetASpot platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">User Management</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Role-based Access Control</span>
                    <p className="text-sm text-muted-foreground">
                      Different permissions for users, agents, agency admins, and super admins
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">User Registration & Profiles</span>
                    <p className="text-sm text-muted-foreground">
                      Customized registration flows for different user types
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Agency Management</span>
                    <p className="text-sm text-muted-foreground">
                      Create and manage real estate agencies with branding options
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Agent Invitation System</span>
                    <p className="text-sm text-muted-foreground">Agencies can invite and manage their agents</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Property Management</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Comprehensive Property Listings</span>
                    <p className="text-sm text-muted-foreground">
                      Detailed property information with multiple images and features
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Property Types</span>
                    <p className="text-sm text-muted-foreground">
                      Support for houses, apartments, townhouses, land, and commercial properties
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Sale & Rental Listings</span>
                    <p className="text-sm text-muted-foreground">Support for both property sales and rentals</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Property Status Management</span>
                    <p className="text-sm text-muted-foreground">
                      Track property status: active, pending, sold, or rented
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Search & Discovery</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Advanced Search Functionality</span>
                    <p className="text-sm text-muted-foreground">
                      Search by location, price, property type, and features
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Map-based Search</span>
                    <p className="text-sm text-muted-foreground">Find properties by location on an interactive map</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Saved Searches</span>
                    <p className="text-sm text-muted-foreground">Users can save search criteria for future use</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Featured Properties</span>
                    <p className="text-sm text-muted-foreground">Highlight premium listings on the homepage</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">User Interaction</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Property Inquiries</span>
                    <p className="text-sm text-muted-foreground">Contact agents or owners about properties</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Saved Properties</span>
                    <p className="text-sm text-muted-foreground">Users can save favorite properties</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Property Sharing</span>
                    <p className="text-sm text-muted-foreground">Share listings via email or social media</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Notifications</span>
                    <p className="text-sm text-muted-foreground">
                      Email and in-app notifications for inquiries and updates
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Monetization</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Subscription Plans</span>
                    <p className="text-sm text-muted-foreground">Tiered plans for agencies: Free, Standard, Premium</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">PayFast Integration</span>
                    <p className="text-sm text-muted-foreground">Secure payment processing for South African users</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Feature Gating</span>
                    <p className="text-sm text-muted-foreground">
                      Premium features available based on subscription level
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Listing Promotions</span>
                    <p className="text-sm text-muted-foreground">Options to boost visibility of specific listings</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Dashboards & Analytics</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Role-specific Dashboards</span>
                    <p className="text-sm text-muted-foreground">
                      Customized dashboards for users, agents, agencies, and admins
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Property Analytics</span>
                    <p className="text-sm text-muted-foreground">Track views, inquiries, and engagement for listings</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Performance Metrics</span>
                    <p className="text-sm text-muted-foreground">Insights on listing performance and user engagement</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Admin Reporting</span>
                    <p className="text-sm text-muted-foreground">Platform-wide analytics for super admins</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold">Value-Add Features</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Mortgage Calculator</h4>
                  <p className="text-sm text-muted-foreground">
                    Calculate monthly payments based on property price, interest rate, and loan term
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Property Guides</h4>
                  <p className="text-sm text-muted-foreground">
                    Educational content for buyers and sellers about the property market
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Area Insights</h4>
                  <p className="text-sm text-muted-foreground">
                    Information about neighborhoods, schools, amenities, and market trends
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Market Trends</h4>
                  <p className="text-sm text-muted-foreground">
                    Data visualization of property market trends in different areas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Property Alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Email notifications when new properties match saved search criteria
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Blog & Resources</h4>
                  <p className="text-sm text-muted-foreground">
                    Informative content to boost SEO and provide value to users
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

