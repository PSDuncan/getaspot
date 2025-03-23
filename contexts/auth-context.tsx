"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

type Profile = {
  id: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  role: "user" | "agent" | "agency_admin" | "super_admin"
  agency_id: string | null
  email: string | null
}

type AuthContextType = {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
  }>
  signUp: (
    email: string,
    password: string,
    role: string,
  ) => Promise<{
    error: Error | null
  }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{
    error: Error | null
  }>
  updateProfile: (data: Partial<Profile>) => Promise<{
    error: Error | null
  }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const setData = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          setIsLoading(false)
          return
        }

        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profileError && profileError.code !== "PGRST116") {
            console.error("Error fetching profile:", profileError)
          } else {
            setProfile(profileData)
          }
        }
      } catch (error) {
        console.error("Unexpected error in auth setup:", error)
      } finally {
        setIsLoading(false)
      }
    }

    setData()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") {
          console.error("Error fetching profile:", profileError)
        } else {
          setProfile(profileData)
        }
      } else {
        setProfile(null)
      }

      setIsLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error) {
        router.push("/dashboard")
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        })
      }

      return { error }
    } catch (error: any) {
      console.error("Error signing in:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, role: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          },
        },
      })

      if (!error && data.user) {
        // Create profile
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          role,
          email,
          is_verified: false,
        })

        if (profileError) {
          console.error("Error creating profile:", profileError)
        }

        router.push("/auth/verify")
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        })
      }

      return { error }
    } catch (error: any) {
      console.error("Error signing up:", error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (!error) {
        toast({
          title: "Password reset email sent",
          description: "Check your email for a link to reset your password.",
        })
      }

      return { error }
    } catch (error: any) {
      console.error("Error resetting password:", error)
      return { error }
    }
  }

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!user) throw new Error("User not authenticated")

      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (!error) {
        // Update local profile state
        setProfile((prev) => (prev ? { ...prev, ...data } : null))

        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        })
      }

      return { error }
    } catch (error: any) {
      console.error("Error updating profile:", error)
      return { error }
    }
  }

  const value = {
    user,
    profile,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

