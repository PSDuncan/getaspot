import { getSupabaseServerClient } from "@/lib/supabase/server"
import { MessageSquare, Mail, Phone } from "lucide-react"

export default async function InquiriesPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get inquiries for user's properties
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*, properties(title)")
    .in("property_id", supabase.from("properties").select("id").eq("owner_id", user!.id))
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Inquiries</h1>
        <p className="text-muted-foreground">Messages from interested buyers</p>
      </div>

      {!inquiries || inquiries.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No inquiries yet</h2>
          <p className="text-muted-foreground">
            When people are interested in your properties, their messages will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry: any) => (
            <div key={inquiry.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{inquiry.sender_name}</h3>
                  <p className="text-sm text-muted-foreground">Inquiry about: {inquiry.properties?.title}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    inquiry.status === "new" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>

              <p className="text-foreground mb-4">{inquiry.message}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {inquiry.sender_email}
                </div>
                {inquiry.sender_phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {inquiry.sender_phone}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
