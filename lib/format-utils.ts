/**
 * Formats a price value based on listing type
 */
export function formatPrice(price: number | string | undefined, listingType?: string): string {
  if (!price) return "Price on request"

  const numericPrice = typeof price === "string" ? Number.parseFloat(price.replace(/[^0-9.]/g, "")) : price

  if (isNaN(numericPrice)) return "Price on request"

  // Format as currency
  const formattedPrice = numericPrice.toLocaleString("en-ZA")

  return listingType === "rent" ? `R ${formattedPrice}/month` : `R ${formattedPrice}`
}

/**
 * Formats a date to a readable string
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch (error) {
    return ""
  }
}

/**
 * Gets the appropriate status badge class based on status
 */
export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "published":
      return "bg-green-50 text-green-700 border-green-200"
    case "draft":
      return "bg-yellow-50 text-yellow-700 border-yellow-200"
    case "sold":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "rented":
      return "bg-purple-50 text-purple-700 border-purple-200"
    case "inactive":
      return "bg-red-50 text-red-700 border-red-200"
    case "active":
      return "bg-green-50 text-green-700 border-green-200"
    case "featured":
      return "bg-blue-50 text-blue-700 border-blue-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

/**
 * Gets the image URL from a property
 */
export function getPropertyImage(property: any): string {
  if (property.images && property.images.length > 0) {
    return property.images[0]
  }

  if (property.image) {
    return property.image
  }

  return "/placeholder.svg?height=60&width=60"
}

/**
 * Gets the full name from a user or agent
 */
export function getFullName(user: any): string {
  if (!user) return "Unknown"

  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`
  }

  if (user.name) {
    return user.name
  }

  return user.email || "Unknown"
}

