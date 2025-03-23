"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardProvider } from "@/contexts/dashboard-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <DashboardProvider>
        <div className="flex min-h-screen flex-col">
          <DashboardHeader />
          <div className="flex flex-1">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </div>
        <Toaster />
      </DashboardProvider>
    </ThemeProvider>
  )
}

