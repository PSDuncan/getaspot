import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "GetASpot made finding our dream home so easy. The search tools are intuitive and the property listings are detailed and accurate.",
    name: "Sarah Johnson",
    role: "Homeowner",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "As a real estate agent, GetASpot has been a game-changer for my business. The platform is fast, reliable, and my clients love the user experience.",
    name: "Michael Ndlovu",
    role: "Real Estate Agent",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "I listed my property directly on GetASpot and had multiple inquiries within days. The process was straightforward and much faster than I expected.",
    name: "Thabo Molefe",
    role: "Property Owner",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.name} className="h-full">
          <CardContent className="pt-6">
            <div className="mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
            </div>
            <p className="italic">"{testimonial.quote}"</p>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

