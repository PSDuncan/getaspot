import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TechStackPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">GetASpot Technology Stack</h1>

      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>The technologies powering GetASpot</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Frontend</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium mr-2">Next.js 14+:</span>
                  <span className="text-muted-foreground">
                    React framework with App Router for server and client components
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">TypeScript:</span>
                  <span className="text-muted-foreground">
                    Type-safe JavaScript for better developer experience and fewer bugs
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Tailwind CSS:</span>
                  <span className="text-muted-foreground">Utility-first CSS framework for rapid UI development</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">shadcn/ui:</span>
                  <span className="text-muted-foreground">Accessible and customizable UI components</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">React Hook Form:</span>
                  <span className="text-muted-foreground">Form validation and handling</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Zod:</span>
                  <span className="text-muted-foreground">TypeScript-first schema validation</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Lucide React:</span>
                  <span className="text-muted-foreground">Beautiful, consistent icon set</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Backend</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium mr-2">Supabase:</span>
                  <span className="text-muted-foreground">
                    Open-source Firebase alternative with PostgreSQL database
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">PostgreSQL:</span>
                  <span className="text-muted-foreground">Powerful, open-source relational database</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Next.js API Routes:</span>
                  <span className="text-muted-foreground">Serverless API endpoints</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Server Actions:</span>
                  <span className="text-muted-foreground">Next.js server-side functions for form handling</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Supabase Storage:</span>
                  <span className="text-muted-foreground">File storage for property images</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Supabase Auth:</span>
                  <span className="text-muted-foreground">Authentication and authorization</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">DevOps & Infrastructure</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium mr-2">Vercel:</span>
                  <span className="text-muted-foreground">Hosting and deployment platform</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">GitHub:</span>
                  <span className="text-muted-foreground">Version control and CI/CD</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">ESLint:</span>
                  <span className="text-muted-foreground">Code linting</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Prettier:</span>
                  <span className="text-muted-foreground">Code formatting</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Jest:</span>
                  <span className="text-muted-foreground">JavaScript testing framework</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Playwright:</span>
                  <span className="text-muted-foreground">End-to-end testing</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Third-Party Services</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium mr-2">PayFast:</span>
                  <span className="text-muted-foreground">South African payment gateway</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Google Maps API:</span>
                  <span className="text-muted-foreground">Maps and location services</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Resend:</span>
                  <span className="text-muted-foreground">Email delivery service</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Uploadthing:</span>
                  <span className="text-muted-foreground">File uploads</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Vercel Analytics:</span>
                  <span className="text-muted-foreground">Web analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Sentry:</span>
                  <span className="text-muted-foreground">Error tracking</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-4">Why This Stack?</h3>
            <p className="text-muted-foreground">
              This technology stack was carefully selected to provide the optimal balance of performance, developer
              experience, and scalability for GetASpot:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Next.js with App Router</strong> provides excellent SEO capabilities through server components
                while enabling interactive client components where needed.
              </li>
              <li>
                <strong>Supabase</strong> offers a powerful PostgreSQL database with built-in authentication, storage,
                and real-time capabilities, eliminating the need for multiple services.
              </li>
              <li>
                <strong>TypeScript</strong> ensures type safety across the codebase, reducing bugs and improving
                maintainability.
              </li>
              <li>
                <strong>Tailwind CSS</strong> enables rapid UI development with a consistent design system.
              </li>
              <li>
                <strong>Vercel</strong> provides global edge deployment for optimal performance across South Africa and
                beyond.
              </li>
              <li>
                <strong>PayFast</strong> is specifically chosen as a South African payment gateway for local currency
                support and compliance.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

