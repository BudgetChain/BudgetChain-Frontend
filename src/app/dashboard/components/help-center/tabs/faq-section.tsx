"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useIsMobile } from "@/app/hooks/use-mobile"

interface FAQSectionProps {
  trackArticleView: (articleId: string) => void
}

export function FAQSection({ trackArticleView }: FAQSectionProps) {
  const isMobile = useIsMobile()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const handleItemClick = (itemId: string, articleId: string) => {
    trackArticleView(articleId)
    if (isMobile) {
      setExpandedItems(expandedItems.includes(itemId) ? [] : [itemId])
    }
  }

  const renderAccordionItems = () => (
    <>
      <AccordionItem value="item-1" onClick={() => handleItemClick("item-1", "faq-1")} className="border-b-0">
        <AccordionTrigger className="hover:text-blue-300 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base">
          How do I change my password?
        </AccordionTrigger>
        <AccordionContent className="text-blue-100 px-3 md:px-4 pb-3 md:pb-4 text-xs md:text-sm">
          <p>To change your password:</p>
          <ol className="list-decimal pl-4 md:pl-5 mt-2 space-y-1">
            <li>Go to Settings in the dashboard</li>
            <li>Select the Security tab</li>
            <li>Click on Change Password</li>
            <li>Enter your current password and your new password</li>
            <li>Click Save to update your password</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" onClick={() => handleItemClick("item-2", "faq-2")} className="border-b-0">
        <AccordionTrigger className="hover:text-blue-300 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base">
          How do I update my billing information?
        </AccordionTrigger>
        <AccordionContent className="text-blue-100 px-3 md:px-4 pb-3 md:pb-4 text-xs md:text-sm">
          <p>To update your billing information:</p>
          <ol className="list-decimal pl-4 md:pl-5 mt-2 space-y-1">
            <li>Navigate to Settings in the dashboard</li>
            <li>Select the Billing tab</li>
            <li>Click on Edit Payment Method</li>
            <li>Update your information</li>
            <li>Click Save to update your billing details</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" onClick={() => handleItemClick("item-3", "faq-3")} className="border-b-0">
        <AccordionTrigger className="hover:text-blue-300 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base">
          Can I change my subscription plan?
        </AccordionTrigger>
        <AccordionContent className="text-blue-100 px-3 md:px-4 pb-3 md:pb-4 text-xs md:text-sm">
          <p>Yes, you can change your subscription plan at any time:</p>
          <ol className="list-decimal pl-4 md:pl-5 mt-2 space-y-1">
            <li>Go to Settings in the dashboard</li>
            <li>Select the Billing tab</li>
            <li>Click on Change Plan</li>
            <li>Select your new plan</li>
            <li>Confirm the change</li>
          </ol>
          <p className="mt-2">
            Note: If you upgrade, the change takes effect immediately. If you downgrade, the change takes effect at the end of your current billing cycle.
          </p>
        </AccordionContent>
      </AccordionItem>
    </>
  )

  const renderFeaturesAccordionItems = () => (
    <>
      <AccordionItem value="item-4" onClick={() => handleItemClick("item-4", "faq-4")} className="border-b-0">
        <AccordionTrigger className="hover:text-blue-300 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base">
          How do I create a new project?
        </AccordionTrigger>
        <AccordionContent className="text-blue-100 px-3 md:px-4 pb-3 md:pb-4 text-xs md:text-sm">
          <p>To create a new project:</p>
          <ol className="list-decimal pl-4 md:pl-5 mt-2 space-y-1">
            <li>From the dashboard, click the New Project button</li>
            <li>Enter a name for your project</li>
            <li>Select a template or start from scratch</li>
            <li>Click Create Project</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5" onClick={() => handleItemClick("item-5", "faq-5")} className="border-b-0">
        <AccordionTrigger className="hover:text-blue-300 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base">
          How do I invite team members?
        </AccordionTrigger>
        <AccordionContent className="text-blue-100 px-3 md:px-4 pb-3 md:pb-4 text-xs md:text-sm">
          <p>To invite team members to your project:</p>
          <ol className="list-decimal pl-4 md:pl-5 mt-2 space-y-1">
            <li>Go to the project settings</li>
            <li>Select the Team tab</li>
            <li>Click Invite Member</li>
            <li>Enter their email address and select their role</li>
            <li>Click Send Invitation</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6" onClick={() => handleItemClick("item-6", "faq-6")} className="border-b-0">
        <AccordionTrigger className="hover:text-blue-300 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base">
          What are the export options?
        </AccordionTrigger>
        <AccordionContent className="text-blue-100 px-3 md:px-4 pb-3 md:pb-4 text-xs md:text-sm">
          <p>You can export your data in several formats:</p>
          <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1">
            <li>CSV - for spreadsheet applications</li>
            <li>JSON - for developers</li>
            <li>PDF - for reports and presentations</li>
            <li>Excel - for detailed analysis</li>
          </ul>
          <p className="mt-2">
            To export, go to the data view, click the Export button, and select your preferred format.
          </p>
        </AccordionContent>
      </AccordionItem>
    </>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-4 pb-20 md:pb-4">
      <Card className="bg-transparent border-gray-600 text-[#E5E7EB] rounded-md">
        <CardHeader className="border-b border-[#1a365d] p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Account & Billing</CardTitle>
          <CardDescription className="text-xs md:text-sm text-blue-300">
            Questions about your account and billing
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isMobile ? (
            <Accordion type="single" value={expandedItems[0]} collapsible className="w-full text-white">
              {renderAccordionItems()}
            </Accordion>
          ) : (
            <Accordion type="multiple" value={expandedItems} className="w-full text-white">
              {renderAccordionItems()}
            </Accordion>
          )}
        </CardContent>
      </Card>

      <Card className="bg-transparent border-gray-600 text-gray-300 rounded-md">
        <CardHeader className="border-b border-[#1a365d] p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Features & Usage</CardTitle>
          <CardDescription className="text-xs md:text-sm text-grey-600">
            Questions about using the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isMobile ? (
            <Accordion type="single" value={expandedItems[0]} collapsible className="w-full text-white">
              {renderFeaturesAccordionItems()}
            </Accordion>
          ) : (
            <Accordion type="multiple" value={expandedItems} className="w-full text-white">
              {renderFeaturesAccordionItems()}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
