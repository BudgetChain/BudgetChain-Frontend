"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SupportTicketForm } from "../support-ticket-form"
import { SupportResources } from "../support-resource"

export function SupportSection() {
  const [ticketSubmitted, setTicketSubmitted] = useState(false)

  // Mock function for ticket submission
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would submit the form data
    setTicketSubmitted(true)
    setTimeout(() => setTicketSubmitted(false), 3000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-4 pb-20 md:pb-4">
      <Card className="bg-transparent border-[#374151] text-grey-300 rounded-md">
        <CardHeader className="border-b border-[#374151] p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Contact Support</CardTitle>
          <CardDescription className="text-xs md:text-sm text-blue-300">
            Submit a support ticket for personalized help
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-4">
          <SupportTicketForm ticketSubmitted={ticketSubmitted} handleTicketSubmit={handleTicketSubmit} />
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card className="bg-transparent border-[#374151] text-white rounded-md">
          <CardHeader className="border-b border-[#374151] p-3 md:p-4">
            <CardTitle className="text-base md:text-lg">Support Hours</CardTitle>
            <CardDescription className="text-xs md:text-sm text-blue-300">
              When our team is available to help
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="font-medium">Monday - Friday</span>
                <span>9:00 AM - 8:00 PM EST</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="font-medium">Saturday</span>
                <span>10:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="font-medium">Sunday</span>
                <span>Closed</span>
              </div>
            </div>
            <div className="mt-4 text-xs md:text-sm text-muted-foreground">
              For critical issues outside of business hours, please mark your ticket as Critical and our on-call team
              will be notified.
            </div>
          </CardContent>
        </Card>

        <SupportResources />
      </div>
    </div>
  )
}
