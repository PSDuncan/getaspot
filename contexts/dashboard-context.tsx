"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

type DashboardContextType = {
  properties: any[]
  agencies: any[]
  agents: any[]
  users: any[]
  inquiries: any[]
  stats: {
    totalProperties: number
    totalViews: number
    totalInquiries: number
    totalAgents: number
  }
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null
  refetchData: () => Promise<void>
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth()
  const [properties, setProperties] = useState<any[]>([])
  const [agencies, setAgencies] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [inquiries, setInquiries] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalViews: 0,
    totalInquiries: 0,
    totalAgents: 0,
  })

  const fetchData = async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      // Fetch data based on user role
      if (profile?.role === "super_admin") {
        await fetchAdminData()
      } else if (profile?.role === "agency_admin") {
        await fetchAgencyData()
      } else if (profile?.role === "agent") {
        await fetchAgentData()
      } else {
        await fetchUserData()
      }

      setLastUpdated(new Date())
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error)
      setError(error.message || "Failed to fetch dashboard data")
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAdminData = async () => {
    // Fetch all properties
    const { data: propertiesData } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })

    // Fetch all agencies
    const { data: agenciesData } = await supabase.from("agencies").select("*").order("created_at", { ascending: false })

    // Fetch all users
    const { data: usersData } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

    // Fetch all inquiries
    const { data: inquiriesData } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false })

    setProperties(propertiesData || [])
    setAgencies(agenciesData || [])
    setUsers(usersData || [])
    setInquiries(inquiriesData || [])

    // Calculate stats
    setStats({
      totalProperties: propertiesData?.length || 0,
      totalViews: propertiesData?.reduce((sum, prop) => sum + (prop.views || 0), 0) || 0,
      totalInquiries: inquiriesData?.length || 0,
      totalAgents: usersData?.filter((user) => user.role === "agent").length || 0,
    })
  }

  const fetchAgencyData = async () => {
    if (!profile?.agency_id) return

    // Fetch agency properties
    const { data: propertiesData } = await supabase
      .from("properties")
      .select("*")
      .eq("agency_id", profile.agency_id)
      .order("created_at", { ascending: false })

    // Fetch agency agents
    const { data: agentsData } = await supabase
      .from("profiles")
      .select("*")
      .eq("agency_id", profile.agency_id)
      .eq("role", "agent")
      .order("created_at", { ascending: false })

    // Fetch agency inquiries
    const { data: inquiriesData } = await supabase
      .from("inquiries")
      .select("*, properties!inner(*)")
      .eq("properties.agency_id", profile.agency_id)
      .order("created_at", { ascending: false })

    setProperties(propertiesData || [])
    setAgents(agentsData || [])
    setInquiries(inquiriesData || [])

    // Calculate stats
    setStats({
      totalProperties: propertiesData?.length || 0,
      totalViews: propertiesData?.reduce((sum, prop) => sum + (prop.views || 0), 0) || 0,
      totalInquiries: inquiriesData?.length || 0,
      totalAgents: agentsData?.length || 0,
    })
  }

  const fetchAgentData = async () => {
    // Fetch agent properties
    const { data: propertiesData } = await supabase
      .from("properties")
      .select("*")
      .eq("agent_id", user?.id)
      .order("created_at", { ascending: false })

    // Fetch agent inquiries
    const { data: inquiriesData } = await supabase
      .from("inquiries")
      .select("*, properties!inner(*)")
      .eq("properties.agent_id", user?.id)
      .order("created_at", { ascending: false })

    setProperties(propertiesData || [])
    setInquiries(inquiriesData || [])

    // Calculate stats
    setStats({
      totalProperties: propertiesData?.length || 0,
      totalViews: propertiesData?.reduce((sum, prop) => sum + (prop.views || 0), 0) || 0,
      totalInquiries: inquiriesData?.length || 0,
      totalAgents: 0,
    })
  }

  const fetchUserData = async () => {
    // Fetch user properties
    const { data: propertiesData } = await supabase
      .from("properties")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })

    // Fetch user inquiries
    const { data: inquiriesData } = await supabase
      .from("inquiries")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })

    setProperties(propertiesData || [])
    setInquiries(inquiriesData || [])

    // Calculate stats
    setStats({
      totalProperties: propertiesData?.length || 0,
      totalViews: propertiesData?.reduce((sum, prop) => sum + (prop.views || 0), 0) || 0,
      totalInquiries: inquiriesData?.length || 0,
      totalAgents: 0,
    })
  }

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user, profile])

  const refetchData = async () => {
    await fetchData()
  }

  const value = {
    properties,
    agencies,
    agents,
    users,
    inquiries,
    stats,
    isLoading,
    error,
    lastUpdated,
    refetchData,
  }

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

