import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoveUpRight } from "lucide-react";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export function PendingAppeals() {
  return (
    <Card className="${montserrat.variable} font-montserrat leading-[100%] tracking-[0%] bg-[#171720] shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] border-none w-full h-[246px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-normal text-[#848484]">Pending Appeal</CardTitle>
        <Button variant="ghost" className="h-8 px-2 text-sm font-normal text-white shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)]">
          View <MoveUpRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <div className="space-y-1">
        <div className="text-sm font-normal text-[#4F4AE6]">Request of</div>
        <div className="text-2xl font-bold text-white">$20,000</div>
        </div>
        <p className="text-xs text-muted-foreground mt-5">From <span className="text-white">Nidus Project</span> via <span className="text-white">BudgetChain</span></p>
      </CardContent>
      <CardFooter className="flex justify-center gap-3 pt-0 overflow-hidden">
        <Button className="h-9 px-12 py-6 bg-[#171720] border-[#4F4AE6] border-2 text-sm font-semibold">
          Reject
        </Button>
        <Button size="sm" className="h-9 px-12 py-6 bg-indigo-600 hover:bg-indigo-700 font-semibold">
          Approve
        </Button>
      </CardFooter>
    </Card>
  )
}

