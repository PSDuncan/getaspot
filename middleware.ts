import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Auth check for protected routes
  if (!session && (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/admin"))) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/auth/login"
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Role-based access control
  if (session) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    // Redirect to appropriate dashboard based on role
    if (req.nextUrl.pathname === "/dashboard") {
      const role = profile?.role
      let redirectPath = "/dashboard/user"

      if (role === "agent") {
        redirectPath = "/dashboard/agent"
      } else if (role === "agency_admin") {
        redirectPath = "/dashboard/agency"
      } else if (role === "super_admin") {
        redirectPath = "/dashboard/admin"
      }

      if (req.nextUrl.pathname !== redirectPath) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = redirectPath
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Restrict access to role-specific dashboards
    if (req.nextUrl.pathname.startsWith("/dashboard/admin") && profile?.role !== "super_admin") {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/dashboard"
      return NextResponse.redirect(redirectUrl)
    }

    if (req.nextUrl.pathname.startsWith("/dashboard/agency") && profile?.role !== "agency_admin") {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/dashboard"
      return NextResponse.redirect(redirectUrl)
    }

    if (req.nextUrl.pathname.startsWith("/dashboard/agent") && profile?.role !== "agent") {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/dashboard"
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*"],
}

