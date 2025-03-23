"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

// Sample data for agency performance
const data = [
  {
    month: "Jan",
    views: 1200,
    inquiries: 45,
    listings: 8,
  },
  {
    month: "Feb",
    views: 1350,
    inquiries: 52,
    listings: 10,
  },
  {
    month: "Mar",
    views: 1500,
    inquiries: 60,
    listings: 12,
  },
  {
    month: "Apr",
    views: 1650,
    inquiries: 68,
    listings: 15,
  },
  {
    month: "May",
    views: 1800,
    inquiries: 75,
    listings: 18,
  },
  {
    month: "Jun",
    views: 2000,
    inquiries: 85,
    listings: 22,
  },
]

export function AgencyPerformance() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Total Views</div>
          <div className="text-2xl font-bold">9,500</div>
          <div className="text-xs text-muted-foreground">+15% from last quarter</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Total Inquiries</div>
          <div className="text-2xl font-bold">385</div>
          <div className="text-xs text-muted-foreground">+22% from last quarter</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Conversion Rate</div>
          <div className="text-2xl font-bold">4.05%</div>
          <div className="text-xs text-muted-foreground">+0.5% from last quarter</div>
        </div>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="#888888" />
            <YAxis yAxisId="right" orientation="right" stroke="#888888" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="views" name="Property Views" fill="hsl(var(--primary))" />
            <Bar yAxisId="left" dataKey="inquiries" name="Inquiries" fill="hsl(var(--primary) / 0.7)" />
            <Bar yAxisId="right" dataKey="listings" name="New Listings" fill="hsl(var(--primary) / 0.4)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

