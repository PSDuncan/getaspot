interface PropertyMapProps {
  address: string
}

export function PropertyMap({ address }: PropertyMapProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Location</h3>
      <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-muted-foreground">Map showing {address}</p>
          {/* In a real implementation, you would integrate with Google Maps or similar */}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">The exact location will be provided after booking a viewing.</p>
    </div>
  )
}

