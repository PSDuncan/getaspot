"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan 1",
    views: 45,
    inquiries: 12,
  },
  {
    name: "Jan 5",
    views: 52,
    inquiries: 14,
  },
  {
    name: "Jan 10",
    views: 48,
    inquiries: 10,
  },
  {
    name: "Jan 15",
    views: 70,
    inquiries: 18,
  },
  {
    name: "Jan 20",
    views: 61,
    inquiries: 16,
  },
  {
    name: "Jan 25",
    views: 65,
    inquiries: 14,
  },
  {
    name: "Jan 30",
    views: 75,
    inquiries: 22,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="inquiries" fill="hsl(var(--primary) / 0.3)" radius={[4, 4, 0, 0]} className="fill-primary/30" />
      </BarChart>
    </ResponsiveContainer>
  )
}

