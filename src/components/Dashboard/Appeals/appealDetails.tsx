"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Button from "@/components/form/Button"

interface AppealData {
  id: string
  status: "pending" | "approved" | "rejected"
  amount: number
  project: string
  description: string
  date: string
  time: string
}

// This would typically come from an API or database
const mockAppealData: AppealData = {
  id: "appeal-123",
  status: "pending",
  amount: 20000,
  project: "Ndida Project",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
  
  Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
  
  Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisi. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id nisl ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.
  
  Vestibulum dictum ultrices elit a luctus. Sed metus at leo congue pharetra at sit amet ligula. Pellentesque eget augue nec nisl sodales blandit sed et sem. Aenean quis finibus diam. Nulla feugiat purus. Praesent ac aliquet lorem. Morbi feugiat aliquam ligula.
  
  Yours Faithfully
  Joe Dele`,
  date: "12/01/2027",
  time: "8:00 UTC",
}

export default function AppealPage({ params }: { params: { id: string } }) {
  const [appeal] = useState<AppealData>(mockAppealData)
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">(appeal.status)
  const [activeTab, setActiveTab] = useState<"appeal" | "document">("appeal")

  const handleApprove = () => {
    setStatus("approved")
  }

  const handleReject = () => {
    setStatus("rejected")
  }

  // Helper function to conditionally join class names
  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <div className="flex flex-col p-6 min-h-screen bg-[#171720]">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 max-w-md ">
          <div
            className={`py-2 text-center cursor-pointer ${activeTab === "appeal" ? "border-b-4 border-[#4F4AE6]" : "border-b border-white"}`}
            onClick={() => setActiveTab("appeal")}
          >
            Appeal
          </div>
          <div
            className={`py-2 text-center cursor-pointer ${activeTab === "document" ? "border-b-4 border-[#4F4AE6]" : "border-b border-white"}`}
            onClick={() => setActiveTab("document")}
          >
            Document
          </div>
        </div>

        {activeTab === "appeal" && (
          <div className="mt-0">
            <div className="bg-[#171720] shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] my-5 rounded-lg p-6 relative">
              <button onClick={() => window.history.back()} className="flex items-center text-muted-foreground mb-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Pending Appeal</span>
              </button>

              <div className="flex flex-col items-center justify-center mb-8">
                <p className="text-sm text-muted-foreground">Request of</p>
                <h1 className="text-3xl font-bold">${appeal.amount.toLocaleString()}</h1>
                <p className="text-sm text-muted-foreground mt-4">
                  From <span className="font-medium text-foreground">{appeal.project}</span>
                </p>

                <div className="flex gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleReject}
                    disabled={status !== "pending"}
                    className={cn(
                      "px-8",
                      status === "rejected" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    )}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={handleApprove}
                    disabled={status !== "pending"}
                    className={cn("px-8", status === "approved" && "bg-green-600 hover:bg-green-700")}
                  >
                    Approve
                  </Button>
                </div>
              </div>

              <div className="mt-12 relative ">
                <h2 className="text-lg font-semibold uppercase tracking-wider mb-6">Request for more funds</h2>

                <div className="whitespace-pre-line text-muted-foreground">{appeal.description}</div>

                {status === "approved" && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 opacity-80">
                    <div className="border-8 border-green-600 rounded-full p-8 w-48 h-48 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-2xl uppercase">Approved</span>
                    </div>
                  </div>
                )}

                {status === "rejected" && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 opacity-80">
                    <div className="border-8 border-red-600 rounded-full p-8 w-48 h-48 flex items-center justify-center">
                      <span className="text-red-600 font-bold text-2xl uppercase">Rejected</span>
                    </div>
                  </div>
                )}

                <div className="text-right mt-4 text-xs text-muted-foreground">
                  Date: {appeal.date} Time: {appeal.time}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "document" && (
          <div className="p-6 text-center text-muted-foreground">Document view would go here</div>
        )}
      </div>
    </div>
  )
}

