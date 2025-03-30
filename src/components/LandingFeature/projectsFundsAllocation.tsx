"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const data = [
  { name: "Fragma Project", value: 17000, color: "#5088FF" },
  { name: "Ndida Project", value: 20000, color: "#D456FD" },
]

export function FundsAllocation() {
  return (
    <Card className="${montserrat.variable} font-montserrat leading-[100%] tracking-[0%] bg-[#171720] shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] border-none w-full h-[246px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-[#848484]">Projects/Fund Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="40%"
                cy="45%"
                innerRadius={53}
                outerRadius={70}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderColor: "#292524",
                  borderRadius: "0.4rem",
                  fontSize: "0.875rem",
                }}
                formatter={(value) => [`$${value}`, ""]}
              />
              <Legend
                layout="vertical"
                verticalAlign="bottom"
                align="right"
                iconType="circle"
                iconSize={9}
                formatter={(value, entry, index) => (
                  <span style={{ color: "white", marginRight: "4px" }}>
                    {value}
                    <br />
                    <span style={{ color: "#848484", fontSize: "0.5 rem" }} className="m-4">${data[index].value}</span>
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

