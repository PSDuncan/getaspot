import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArchitecturePage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">GetASpot Architecture Overview</h1>

      <Card>
        <CardHeader>
          <CardTitle>System Architecture</CardTitle>
          <CardDescription>High-level overview of GetASpot's architecture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-[400px] w-full">
            {/* This would be replaced with an actual architecture diagram */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Architecture Diagram Placeholder</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold">Key Components</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Frontend</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Next.js App Router for server and client components</li>
                  <li>TypeScript for type safety</li>
                  <li>Tailwind CSS for styling</li>
                  <li>shadcn/ui for UI components</li>
                  <li>Server Components for SEO and performance</li>
                  <li>Client Components for interactive elements</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Backend</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Supabase for authentication and database</li>
                  <li>PostgreSQL for relational data storage</li>
                  <li>Supabase Storage for property images</li>
                  <li>Next.js API routes for custom endpoints</li>
                  <li>Server Actions for form submissions</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Infrastructure</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Vercel for hosting and deployment</li>
                  <li>Vercel Edge Functions for global performance</li>
                  <li>Vercel Analytics for monitoring</li>
                  <li>Supabase for database hosting</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Integrations</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>PayFast for payment processing</li>
                  <li>Resend for transactional emails</li>
                  <li>Google Maps API for location services</li>
                  <li>Uploadthing for image uploads</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

