import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

/**
 * Publishes a property
 */
export async function publishProperty(propertyId: string) {
  try {
    const { error } = await supabase.from("properties").update({ status: "published" }).eq("id", propertyId)

    if (error) throw error

    toast({
      title: "Property Published",
      description: "The property has been published successfully.",
    })

    return true
  } catch (error: any) {
    console.error("Error publishing property:", error)
    toast({
      title: "Error",
      description: "Failed to publish property. Please try again.",
      variant: "destructive",
    })
    return false
  }
}

/**
 * Unpublishes a property
 */
export async function unpublishProperty(propertyId: string) {
  try {
    const { error } = await supabase.from("properties").update({ status: "draft" }).eq("id", propertyId)

    if (error) throw error

    toast({
      title: "Property Unpublished",
      description: "The property has been unpublished successfully.",
    })

    return true
  } catch (error: any) {
    console.error("Error unpublishing property:", error)
    toast({
      title: "Error",
      description: "Failed to unpublish property. Please try again.",
      variant: "destructive",
    })
    return false
  }
}

/**
 * Deletes a property
 */
export async function deleteProperty(propertyId: string) {
  try {
    const { error } = await supabase.from("properties").delete().eq("id", propertyId)

    if (error) throw error

    toast({
      title: "Property Deleted",
      description: "The property has been deleted successfully.",
    })

    return true
  } catch (error: any) {
    console.error("Error deleting property:", error)
    toast({
      title: "Error",
      description: "Failed to delete property. Please try again.",
      variant: "destructive",
    })
    return false
  }
}

/**
 * Toggles the featured status of a property
 */
export async function toggleFeaturedProperty(propertyId: string, isFeatured: boolean) {
  try {
    const { error } = await supabase.from("properties").update({ is_featured: !isFeatured }).eq("id", propertyId)

    if (error) throw error

    toast({
      title: isFeatured ? "Feature Removed" : "Property Featured",
      description: isFeatured ? "The property is no longer featured." : "The property has been featured successfully.",
    })

    return true
  } catch (error: any) {
    console.error("Error toggling featured status:", error)
    toast({
      title: "Error",
      description: "Failed to update featured status. Please try again.",
      variant: "destructive",
    })
    return false
  }
}

