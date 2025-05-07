"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface SupportTicketFormProps {
  ticketSubmitted: boolean
  handleTicketSubmit: (e: React.FormEvent) => void
}

export function SupportTicketForm({ ticketSubmitted, handleTicketSubmit }: SupportTicketFormProps) {
  return (
    <form onSubmit={handleTicketSubmit} className="space-y-3 md:space-y-4">
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="name" className="text-xs md:text-sm">
          Name
        </Label>
        <Input
          className="bg-transparent border-[#374151] text-white placeholder:text-blue-300 text-xs md:text-sm h-8 md:h-10"
          id="name"
          placeholder="Your name"
          required
        />
      </div>
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="email" className="text-xs md:text-sm">
          Email
        </Label>
        <Input
          className="bg-transparent border-[#374151] text-white placeholder:text-blue-300 text-xs md:text-sm h-8 md:h-10"
          id="email"
          type="email"
          placeholder="Your email address"
          required
        />
      </div>
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="subject" className="text-xs md:text-sm">
          Subject
        </Label>
        <Input
          className="bg-transparent border-[#374151] text-white placeholder:text-blue-300 text-xs md:text-sm h-8 md:h-10"
          id="subject"
          placeholder="Brief description of your issue"
          required
        />
      </div>
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="category" className="text-xs md:text-sm">
          Category
        </Label>
        <Select defaultValue="general">
          <SelectTrigger className="bg-transparent border-[#374151] text-white text-xs md:text-sm h-8 md:h-10">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Question</SelectItem>
            <SelectItem value="account">Account Issue</SelectItem>
            <SelectItem value="billing">Billing Problem</SelectItem>
            <SelectItem value="technical">Technical Support</SelectItem>
            <SelectItem value="feature">Feature Request</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="priority" className="text-xs md:text-sm">
          Priority
        </Label>
        <Select defaultValue="medium">
          <SelectTrigger className="bg-transparent border-[#374151] text-white text-xs md:text-sm h-8 md:h-10">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="description" className="text-xs md:text-sm">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Please provide as much detail as possible about your issue"
          className="min-h-[80px] md:min-h-[120px] bg-transparent border-[#374151] text-white placeholder:text-blue-300 text-xs md:text-sm"
          required
        />
      </div>
      <Button type="submit" className="w-full bg-transparent border border-[#4F4AE6] hover:border-[#EBEBEB40] text-white hover:bg-[#4F4AE6]">
        {ticketSubmitted ? "Ticket Submitted!" : "Submit Ticket"}
      </Button>
    </form>
  )
}
