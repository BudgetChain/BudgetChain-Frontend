"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SystemStatusDisplay } from "../system-status-display"

interface TroubleshootingSectionProps {
  trackArticleView: (articleId: string) => void
}

export function TroubleshootingSection({ trackArticleView }: TroubleshootingSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-2 md:p-4 pb-20 md:pb-4">
      <Card className="bg-transparent border-gray-600 text-white rounded-md">
        <CardHeader className="border-b border-gray-600 p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Common Issues</CardTitle>
          <CardDescription className="text-xs md:text-sm text-blue-300">
            Solutions to frequently encountered problems
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-4">
          <div className="space-y-3 md:space-y-4">
            <Collapsible
              className="border border-gray-600 rounded-md p-2 bg-transparent"
              onClick={() => trackArticleView("troubleshoot-1")}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs md:text-sm font-medium">Login Issues</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-7 w-7 md:h-8 md:w-8">
                    <HelpCircle className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2">
                <div className="space-y-2">
                  <h4 className="text-xs md:text-sm font-medium">Forgot Password</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    If you have forgotten your password, click the Forgot Password link on the login page. You will
                    receive an email with instructions to reset your password.
                  </p>

                  <h4 className="text-xs md:text-sm font-medium">Account Locked</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    After multiple failed login attempts, your account may be temporarily locked. Wait 30 minutes and
                    try again, or contact support for immediate assistance.
                  </p>

                  <h4 className="text-xs md:text-sm font-medium">Email Not Recognized</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    If your email isnt recognized, check for typos or try alternative email addresses you might have
                    used. If you are still having trouble, contact support.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              className="border border-gray-600 rounded-md p-2 bg-transparent"
              onClick={() => trackArticleView("troubleshoot-2")}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs md:text-sm font-medium">Performance Issues</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-7 w-7 md:h-8 md:w-8">
                    <HelpCircle className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2">
                <div className="space-y-2">
                  <h4 className="text-xs md:text-sm font-medium">Slow Loading Times</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    If the application is loading slowly, try clearing your browser cache and cookies. Also, check your
                    internet connection and try using a different browser.
                  </p>

                  <h4 className="text-xs md:text-sm font-medium">Browser Compatibility</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Our platform works best with the latest versions of Chrome, Firefox, Safari, and Edge. If you are
                    using an older browser, consider updating to the latest version.
                  </p>

                  <h4 className="text-xs md:text-sm font-medium">Large Data Sets</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    When working with large data sets, you may experience slower performance. Try filtering your data or
                    breaking it into smaller chunks for better performance.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              className="border border-gray-600 rounded-md p-2 bg-transparent"
              onClick={() => trackArticleView("troubleshoot-3")}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs md:text-sm font-medium">Integration Problems</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-7 w-7 md:h-8 md:w-8">
                    <HelpCircle className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2">
                <div className="space-y-2">
                  <h4 className="text-xs md:text-sm font-medium">API Connection Errors</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    If you are experiencing API connection errors, verify that your API keys are correct and that your
                    account has the necessary permissions. Check our API documentation for specific error codes.
                  </p>

                  <h4 className="text-xs md:text-sm font-medium">Webhook Failures</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    For webhook failures, ensure your endpoint is accessible and properly configured to receive our
                    webhook format. Check your server logs for more details on the failure.
                  </p>

                  <h4 className="text-xs md:text-sm font-medium">Third-Party Integration Issues</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    If you re having trouble with third-party integrations, verify that the service is operational and
                    that your connection settings are correct. You may need to reauthorize the integration.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              className="border border-gray-600 rounded-md p-2 bg-transparent"
              onClick={() => trackArticleView("troubleshoot-4")}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs md:text-sm font-medium">Data Import/Export Issues</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-7 w-7 md:h-8 md:w-8">
                    <HelpCircle className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2">
                <div className="space-y-2">
                  <h4 className="text-xs md:text-sm font-medium">Import Failures</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    If your data import fails, check that your file format matches our requirements. Common issues
                    include incorrect column headers, invalid data types, or files that exceed the size limit.
                  </p>

                  <h4 className="text-xs md:text-sm font-medium">Export Problems</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    For export problems, try exporting a smaller data set first to verify functionality. If you are
                    having trouble with a specific format, try an alternative format to isolate the issue.
                  </p>

                  <h4 className="text-xs md:text-sm font-medium">Data Formatting</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Ensure your data follows our formatting guidelines. Dates should be in YYYY-MM-DD format, and text
                    fields should not contain special characters that could cause parsing errors.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>

      <SystemStatusDisplay />
    </div>
  )
}
