"use client"

import Link from "next/link"
import { Building, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2">
              <Building className="h-6 w-6" />
              <span className="font-bold text-xl">GetASpot</span>
            </Link>
          </div>
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>We&apos;ve sent you a verification link to your email address</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Please check your email and click on the verification link to complete your registration. If you don&apos;t
            see the email, check your spam folder.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/login">Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

