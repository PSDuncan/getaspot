import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getaspot.co.za"

  // Fetch all published properties
  const { data: properties } = await supabase.from("properties").select("id, updated_at").eq("status", "published")

  // Generate sitemap XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/properties</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/agents</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/resources</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  ${
    properties
      ?.map(
        (property) => `
  <url>
    <loc>${baseUrl}/properties/${property.id}</loc>
    <lastmod>${new Date(property.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `,
      )
      .join("") || ""
  }
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

