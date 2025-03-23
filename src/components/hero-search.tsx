"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export function HeroSearch() {
  const [priceRange, setPriceRange] = React.useState([0, 10000000])

  return (
    <Card className="w-full max-w-4xl">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="rent">Rent</TabsTrigger>
        </TabsList>
        <CardContent className="p-6">
          <TabsContent value="buy" className="mt-0">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by suburb, city or area..."
                    className="w-full bg-background pl-8"
                  />
                </div>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Min Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Min Baths" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Price Range</span>
                    <span className="text-sm font-medium">
                      R {priceRange[0].toLocaleString()} - R {priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 10000000]}
                    max={20000000}
                    step={100000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
              </div>
              <div className="md:col-span-4">
                <Button className="w-full">Search Properties</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="rent" className="mt-0">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by suburb, city or area..."
                    className="w-full bg-background pl-8"
                  />
                </div>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Min Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Min Baths" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Rent</span>
                    <span className="text-sm font-medium">
                      R {(priceRange[0] / 100).toLocaleString()} - R {(priceRange[1] / 100).toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 5000000]}
                    max={10000000}
                    step={50000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
              </div>
              <div className="md:col-span-4">
                <Button className="w-full">Search Rentals</Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}

