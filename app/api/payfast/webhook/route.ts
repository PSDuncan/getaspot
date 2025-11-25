import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)

    // Verify PayFast signature (in production)
    // const signature = params.get('signature')

    const paymentStatus = params.get("payment_status")
    const customStr1 = params.get("custom_str1") // user_id or subscription_id
    const amount = params.get("amount_gross")

    const supabase = await getSupabaseServerClient()

    if (paymentStatus === "COMPLETE") {
      // Update subscription status
      await supabase
        .from("subscriptions")
        .update({
          status: "active",
          start_date: new Date().toISOString(),
        })
        .eq("id", customStr1)

      // Update user subscription
      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("user_id, plan_type")
        .eq("id", customStr1)
        .single()

      if (subscription) {
        await supabase
          .from("users")
          .update({
            subscription_plan: subscription.plan_type,
            subscription_status: "active",
          })
          .eq("id", subscription.user_id)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] PayFast webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
