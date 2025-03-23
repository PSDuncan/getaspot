"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

// Sample data for agent performance
const data = [
  {
    month: "Jan",
    views: 420,
    inquiries: 18,
    conversions: 2,
  },
  {
    month: "Feb",
    views: 480,
    inquiries: 22,
    conversions: 3,
  },
  {
    month: "Mar",
    views: 510,
    inquiries: 25,
    conversions: 4,
  },
  {
    month: "Apr",
    views: 550,
    inquiries: 28,
    conversions: 3,
  },
  {
    month: "May",
    views: 620,
    inquiries: 32,
    conversions: 5,
  },
  {
    month: "Jun",
    views: 680,
    inquiries: 35,
    conversions: 6,
  },
]

export function AgentPerformance() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Conversion Rate</div>
          <div className="text-2xl font-bold">4.8%</div>
          <div className="text-xs text-muted-foreground">+0.6% from last quarter</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Avg. Response Time</div>
          <div className="text-2xl font-bold">3.2 hrs</div>
          <div className="text-xs text-muted-foreground">-0.5 hrs from last quarter</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Client Satisfaction</div>
          <div className="text-2xl font-bold">4.8/5</div>
          <div className="text-xs text-muted-foreground">+0.2 from last quarter</div>
        </div>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="views"
              name="Property Views"
              stroke="hsl(var(--primary))"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="inquiries"
              name="Inquiries"
              stroke="hsl(var(--primary) / 0.7)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversions"
              name="Conversions"
              stroke="hsl(var(--primary) / 0.4)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

