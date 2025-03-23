import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatabaseSchemaPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">GetASpot Database Schema</h1>

      <Card>
        <CardHeader>
          <CardTitle>Database Schema</CardTitle>
          <CardDescription>Supabase PostgreSQL database structure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Users Table</h3>
            <p className="text-sm text-muted-foreground">Extends Supabase auth.users</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Column</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">id</td>
                    <td className="py-2 px-4">uuid</td>
                    <td className="py-2 px-4">Primary key, references auth.users.id</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">email</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">User's email address</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">full_name</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">User's full name</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">phone</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">User's phone number</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">avatar_url</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">URL to user's profile image</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">role</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">user, agent, agency_admin, super_admin</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">agency_id</td>
                    <td className="py-2 px-4">uuid</td>
                    <td className="py-2 px-4">Foreign key to agencies table (for agents)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">created_at</td>
                    <td className="py-2 px-4">timestamp</td>
                    <td className="py-2 px-4">When the user was created</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">updated_at</td>
                    <td className="py-2 px-4">timestamp</td>
                    <td className="py-2 px-4">When the user was last updated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Agencies Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Column</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">id</td>
                    <td className="py-2 px-4">uuid</td>
                    <td className="py-2 px-4">Primary key</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">name</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Agency name</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">logo_url</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">URL to agency logo</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">description</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Agency description</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">address</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Physical address</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">phone</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Contact phone</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">email</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Contact email</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">website</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Agency website</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">subscription_plan</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">free, standard, premium</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">subscription_status</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">active, inactive, trial</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">subscription_end_date</td>
                    <td className="py-2 px-4">timestamp</td>
                    <td className="py-2 px-4">When subscription expires</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">owner_id</td>
                    <td className="py-2 px-4">uuid</td>
                    <td className="py-2 px-4">Foreign key to users table</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">created_at</td>
                    <td className="py-2 px-4">timestamp</td>
                    <td className="py-2 px-4">When the agency was created</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">updated_at</td>
                    <td className="py-2 px-4">timestamp</td>
                    <td className="py-2 px-4">When the agency was last updated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Properties Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Column</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">id</td>
                    <td className="py-2 px-4">uuid</td>
                    <td className="py-2 px-4">Primary key</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">title</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Property title</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">description</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Property description</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">price</td>
                    <td className="py-2 px-4">numeric</td>
                    <td className="py-2 px-4">Property price</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">property_type</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">house, apartment, townhouse, etc.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">listing_type</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">sale, rent</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">bedrooms</td>
                    <td className="py-2 px-4">integer</td>
                    <td className="py-2 px-4">Number of bedrooms</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">bathrooms</td>
                    <td className="py-2 px-4">numeric</td>
                    <td className="py-2 px-4">Number of bathrooms</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">size</td>
                    <td className="py-2 px-4">numeric</td>
                    <td className="py-2 px-4">Property size in square meters</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">address</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Property address</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">city</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">City</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">province</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Province</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">postal_code</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">Postal code</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">latitude</td>
                    <td className="py-2 px-4">numeric</td>
                    <td className="py-2 px-4">Latitude coordinates</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">longitude</td>
                    <td className="py-2 px-4">numeric</td>
                    <td className="py-2 px-4">Longitude coordinates</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">features</td>
                    <td className="py-2 px-4">jsonb</td>
                    <td className="py-2 px-4">Array of property features</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">images</td>
                    <td className="py-2 px-4">jsonb</td>
                    <td className="py-2 px-4">Array of image URLs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">status</td>
                    <td className="py-2 px-4">text</td>
                    <td className="py-2 px-4">active, pending, sold, rented</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">is_featured</td>
                    <td className="py-2 px-4">boolean</td>
                    <td className="py-2 px-4">Whether property is featured</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">view_count</td>
                    <td className="py-2 px-4">integer</td>
                    <td className="py-2 px-4">Number of views</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">user_id</td>
                    <td className="py-2 px-4">uuid</td>
                    <td className="py-2 px-4">Foreign key to users table</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">agency_id</td>
                    <td className="py-2 px-4">uuid</td>
                    <td className="py-2 px-4">Foreign key to agencies table</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">created_at</td>
                    <td className="py-2 px-4">timestamp</td>
                    <td className="py-2 px-4">When the property was created</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">updated_at</td>
                    <td className="py-2 px-4">timestamp</td>
                    <td className="py-2 px-4">When the property was last updated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Additional Tables</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>property_inquiries</strong> - Store user inquiries about properties
              </li>
              <li>
                <strong>subscriptions</strong> - Track agency subscription details
              </li>
              <li>
                <strong>payments</strong> - Record payment transactions
              </li>
              <li>
                <strong>saved_properties</strong> - Track user's saved/favorited properties
              </li>
              <li>
                <strong>agent_invitations</strong> - Manage agency invitations to agents
              </li>
              <li>
                <strong>property_views</strong> - Detailed analytics on property views
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

