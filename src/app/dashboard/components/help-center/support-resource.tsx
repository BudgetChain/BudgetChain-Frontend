"use client"

import { Book, Command, LifeBuoy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SupportResources() {
  return (
    <Card className="bg-transparent border-[#374151] text-white rounded-md">
      <CardHeader className="border-b border-[#374151] p-3 md:p-4">
        <CardTitle className="text-base md:text-lg">Support Resources</CardTitle>
        <CardDescription className="text-xs md:text-sm text-blue-300">Additional ways to get help</CardDescription>
      </CardHeader>
      <CardContent className="p-3 md:p-4">
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-start gap-2 md:gap-3">
            <LifeBuoy className="h-4 w-4 md:h-5 md:w-5 mt-0.5 text-muted-foreground" />
            <div>
              <h3 className="text-xs md:text-sm font-medium">Community Forums</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Connect with other users and get help from the community.
              </p>
              <Button variant="link" className="h-auto p-0 text-xs md:text-sm">
                Visit Forums
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-2 md:gap-3">
            <Book className="h-4 w-4 md:h-5 md:w-5 mt-0.5 text-muted-foreground" />
            <div>
              <h3 className="text-xs md:text-sm font-medium">Knowledge Base</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Browse our extensive collection of articles and tutorials.
              </p>
              <Button variant="link" className="h-auto p-0 text-xs md:text-sm">
                Browse Articles
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-2 md:gap-3">
            <Command className="h-4 w-4 md:h-5 md:w-5 mt-0.5 text-muted-foreground" />
            <div>
              <h3 className="text-xs md:text-sm font-medium">Developer Documentation</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Technical documentation for developers and API users.
              </p>
              <Button variant="link" className="h-auto p-0 text-xs md:text-sm">
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
