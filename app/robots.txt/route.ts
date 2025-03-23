import { NextResponse } from "next/server"

export function GET() {
  return new NextResponse(
    `# Allow all user agents
User-agent: *
Allow: /

# Sitemap
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || "https://getaspot.co.za"}/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  )
}

