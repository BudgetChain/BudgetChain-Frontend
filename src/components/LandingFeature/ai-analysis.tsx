"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
})

const data = [
  { day: 2, value: 500, value2: 600 },
  { day: 4, value: 750, value2: 700 },
  { day: 6, value: 250, value2: 350 },
  { day: 8, value: 500, value2: 400 },
  { day: 10, value: 900, value2: 800 },
  { day: 12, value: 600, value2: 500 },
  { day: 14, value: 400, value2: 450 },
  { day: 16, value: 850, value2: 700 },
  { day: 18, value: 500, value2: 600 },
  { day: 20, value: 600, value2: 500 },
  { day: 22, value: 700, value2: 800 },
  { day: 24, value: 800, value2: 900 },
  { day: 26, value: 900, value2: 800 },
  { day: 28, value: 700, value2: 600 },
  { day: 30, value: 500, value2: 400 },
]

export function AIAnalysis() {
  return (
    <Card className={`${montserrat.variable} font-montserrat bg-[#171720] shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] border-none w-[650px] h-full`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-white">AI Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="110%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C7D2FE" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#C7D2FE" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#666" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                stroke="#666"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 1000]}
                ticks={[200, 300, 400, 500, 600, 700, 800, 900, 1000]}
              />
              <ReferenceLine y={100} stroke="#666" strokeWidth={0.5} />
              <ReferenceLine y={200} stroke="#666" strokeWidth={0.5} />
              <ReferenceLine y={300} stroke="#666" strokeWidth={0.5} />
              <ReferenceLine y={400} stroke="#666" strokeWidth={0.5} />
              <ReferenceLine y={500} stroke="#666" strokeWidth={0.5} />
              <ReferenceLine y={600} stroke="#666" strokeWidth={0.5} />
              <ReferenceLine y={700} stroke="#666" strokeWidth={0.5} />
              <ReferenceLine y={800} stroke="#666" strokeWidth={0.5} />
              <ReferenceLine y={900} stroke="#666" strokeWidth={0.5} />
              <ReferenceLine y={1000} stroke="#666" strokeWidth={0.5} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1c1917",
                  borderColor: "#292524",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fillOpacity={0.3}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="value2"
                stroke="#4f46e5"
                fillOpacity={0.3}
                fill="url(#colorValue2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
