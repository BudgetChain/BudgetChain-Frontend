"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface GuidesSectionProps {
  trackArticleView: (articleId: string) => void
}

export function GuidesSection({ trackArticleView }: GuidesSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 md:p-4 pb-20 md:pb-4">
      <Card
        className="flex flex-col bg-transparent border-[#374151] text-white rounded-md hover:border-blue-400 transition-colors"
        onClick={() => trackArticleView("guide-1")}
      >
        <CardHeader className="border-b border-[#374151] p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Getting Started Guide</CardTitle>
          <CardDescription className="text-xs md:text-sm text-blue-300">
            Learn the basics of the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-3 md:p-4 text-xs md:text-sm">
          <p>This guide covers the essential steps to get started with our platform:</p>
          <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1">
            <li>Setting up your account</li>
            <li>Creating your first project</li>
            <li>Understanding the dashboard</li>
            <li>Basic configuration options</li>
          </ul>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <Button
            variant="outline"
            className="w-full bg-transparent border border-[#4F4AE6] hover:border-[#EBEBEB40] text-white hover:bg-[#4F4AE6]"
          >
            Read Guide
          </Button>
        </CardFooter>
      </Card>

      <Card
        className="flex flex-col bg-transparent border-[#374151] text-white rounded-md hover:border-blue-400 transition-colors"
        onClick={() => trackArticleView("guide-2")}
      >
        <CardHeader className="border-b border-[#374151] p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Advanced Features</CardTitle>
          <CardDescription className="text-xs md:text-sm text-blue-300">
            Take your usage to the next level
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-3 md:p-4 text-xs md:text-sm">
          <p>Explore advanced features to maximize your productivity:</p>
          <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1">
            <li>Custom workflows</li>
            <li>Automation rules</li>
            <li>API integration</li>
            <li>Advanced reporting</li>
          </ul>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <Button
            variant="outline"
            className="w-full bg-transparent border border-[#4F4AE6] hover:border-[#EBEBEB40] text-white hover:bg-[#4F4AE6]"
          >
            Read Guide
          </Button>
        </CardFooter>
      </Card>

      <Card
        className="flex flex-col bg-transparent border-[#374151] text-white rounded-md hover:border-blue-400 transition-colors"
        onClick={() => trackArticleView("guide-3")}
      >
        <CardHeader className="border-b border-[#374151] p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Team Collaboration</CardTitle>
          <CardDescription className="text-xs md:text-sm text-blue-300">
            Work effectively with your team
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-3 md:p-4 text-xs md:text-sm">
          <p>Learn how to collaborate effectively with your team:</p>
          <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1">
            <li>Role management</li>
            <li>Permissions setup</li>
            <li>Shared workspaces</li>
            <li>Activity tracking</li>
          </ul>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <Button
            variant="outline"
            className="w-full bg-transparent border border-[#4F4AE6] hover:border-[#EBEBEB40] text-white hover:bg-[#4F4AE6]"
          >
            Read Guide
          </Button>
        </CardFooter>
      </Card>

      <Card
        className="flex flex-col bg-transparent border-[#374151] text-white rounded-md hover:border-blue-400 transition-colors"
        onClick={() => trackArticleView("guide-4")}
      >
        <CardHeader className="border-b border-[#374151] p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Security Best Practices</CardTitle>
          <CardDescription className="text-xs md:text-sm text-blue-300">
            Keep your account and data secure
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-3 md:p-4 text-xs md:text-sm">
          <p>Follow these security best practices:</p>
          <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1">
            <li>Two-factor authentication</li>
            <li>Password management</li>
            <li>Access control</li>
            <li>Security audits</li>
          </ul>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <Button
            variant="outline"
            className="w-full bg-transparent border border-[#4F4AE6] hover:border-[#EBEBEB40] text-white hover:bg-[#4F4AE6]"
          >
            Read Guide
          </Button>
        </CardFooter>
      </Card>

      <Card
        className="flex flex-col bg-transparent border-[#374151] text-white rounded-md hover:border-blue-400 transition-colors"
        onClick={() => trackArticleView("guide-5")}
      >
        <CardHeader className="border-b border-[#374151] p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Data Management</CardTitle>
          <CardDescription className="text-xs md:text-sm text-blue-300">
            Organize and manage your data effectively
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-3 md:p-4 text-xs md:text-sm">
          <p>Learn how to manage your data efficiently:</p>
          <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1">
            <li>Data organization</li>
            <li>Import and export</li>
            <li>Backup strategies</li>
            <li>Data cleanup</li>
          </ul>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <Button
            variant="outline"
            className="w-full bg-transparent border border-[#4F4AE6] hover:border-[#EBEBEB40] text-white hover:bg-[#4F4AE6]"
          >
            Read Guide
          </Button>
        </CardFooter>
      </Card>

      <Card
        className="flex flex-col bg-transparent border-[#374151] text-white rounded-md hover:border-blue-400 transition-colors"
        onClick={() => trackArticleView("guide-6")}
      >
        <CardHeader className="border-b border-[#374151] p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Reporting & Analytics</CardTitle>
          <CardDescription className="text-xs md:text-sm text-blue-300">Get insights from your data</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-3 md:p-4 text-xs md:text-sm">
          <p>Master reporting and analytics features:</p>
          <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1">
            <li>Creating custom reports</li>
            <li>Data visualization</li>
            <li>Scheduled reports</li>
            <li>Exporting insights</li>
          </ul>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <Button
            variant="outline"
            className="w-full bg-transparent border border-[#4F4AE6] hover:border-[#EBEBEB40] text-white hover:bg-[#4F4AE6]"
          >
            Read Guide
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
