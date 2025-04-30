import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SystemStatusDisplay() {
  return (
    <Card className="bg-transparent border-gray-600 text-white rounded-md">
      <CardHeader className="border-b border-gray-600 p-3 md:p-4">
        <CardTitle className="text-base md:text-lg">System Status</CardTitle>
        <CardDescription className="text-xs md:text-sm text-blue-300">Current status of our services</CardDescription>
      </CardHeader>
      <CardContent className="p-3 md:p-4">
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-indigo-500"></div>
              <span className="text-xs md:text-sm font-medium">Dashboard</span>
            </div>
            <Badge variant="outline" className="text-indigo-700 text-xs">
              Operational
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-indigo-500"></div>
              <span className="text-xs md:text-sm font-medium">API</span>
            </div>
            <Badge variant="outline" className="text-indigo-700 text-xs">
              Operational
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-indigo-500"></div>
              <span className="text-xs md:text-sm font-medium">Authentication</span>
            </div>
            <Badge variant="outline" className="text-indigo-700 text-xs">
              Operational
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs md:text-sm font-medium">Data Processing</span>
            </div>
            <Badge variant="outline" className="text-yellow-500 text-xs">
              Degraded
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-indigo-500"></div>
              <span className="text-xs md:text-sm font-medium">Storage</span>
            </div>
            <Badge variant="outline" className="text-indigo-700 text-xs">
              Operational
            </Badge>
          </div>
        </div>
        <div className="mt-4 text-xs md:text-sm text-muted-foreground">
          Last updated: April 25, 2023 at 10:30 AM UTC
        </div>
      </CardContent>
    </Card>
  )
}
