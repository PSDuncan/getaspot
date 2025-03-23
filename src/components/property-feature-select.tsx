"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { useState } from "react"

const availableFeatures = [
  "Air Conditioning",
  "Alarm System",
  "Balcony",
  "Built-in Cupboards",
  "Electric Fence",
  "Fiber Ready",
  "Fireplace",
  "Garden",
  "Gym",
  "Parking",
  "Pet Friendly",
  "Pool",
  "Security",
  "Solar Panels",
  "Study",
  "View",
  "Walk-in Closet",
  "Wheelchair Access",
  "WiFi",
  "24-hour Security",
]

interface PropertyFeatureSelectProps {
  selectedFeatures: string[]
  onFeaturesChange: (features: string[]) => void
}

export function PropertyFeatureSelect({ selectedFeatures, onFeaturesChange }: PropertyFeatureSelectProps) {
  const [open, setOpen] = useState(false)

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      onFeaturesChange(selectedFeatures.filter((f) => f !== feature))
    } else {
      onFeaturesChange([...selectedFeatures, feature])
    }
  }

  const removeFeature = (feature: string) => {
    onFeaturesChange(selectedFeatures.filter((f) => f !== feature))
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            Select features
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search features..." />
            <CommandList>
              <CommandEmpty>No feature found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {availableFeatures.map((feature) => (
                  <CommandItem key={feature} onSelect={() => toggleFeature(feature)}>
                    <Check
                      className={`mr-2 h-4 w-4 ${selectedFeatures.includes(feature) ? "opacity-100" : "opacity-0"}`}
                    />
                    {feature}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedFeatures.map((feature) => (
          <Badge key={feature} variant="secondary" className="flex items-center gap-1">
            {feature}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => removeFeature(feature)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {feature}</span>
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

