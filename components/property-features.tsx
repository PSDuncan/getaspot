import { Check } from "lucide-react"

interface PropertyFeaturesProps {
  features: string[]
}

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Property Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

