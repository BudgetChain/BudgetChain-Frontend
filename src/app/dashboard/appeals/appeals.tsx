"use client"

import { useState } from "react"
import { Download, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation" // Import useRouter


// Types for our data
type AppealStatus = "APPROVED" | "REJECTED" | "PENDING"
type Appeal = {
  id: number
  project: string
  date: string
  time: string
  appeal: string
  amount: string
  note: string
  address: string
  currency: string
  status: AppealStatus
}

export default function Appeals() {
  // Sample data based on the image
  const appeals: Appeal[] = [
    {
      id: 1,
      project: "Ndida",
      date: "12/12/26",
      time: "8:00 UTC",
      appeal: "20,000 STRK",
      amount: "$10,200",
      note: "Lorem ipsum dolor amet, consectetur adipiscing elit. Nunc vulputate libero",
      address: "0x1234...abcd",
      currency: "STRK",
      status: "PENDING",
    },
    {
      id: 2,
      project: "Ndida",
      date: "12/12/26",
      time: "8:00 UTC",
      appeal: "20,000 STRK",
      amount: "$10,200",
      note: "Lorem ipsum dolor amet, consectetur adipiscing elit. Nunc vulputate libero",
      address: "0x1234...abcd",
      currency: "STRK",
      status: "APPROVED",
    },
    {
      id: 3,
      project: "Steloz",
      date: "12/12/26",
      time: "8:00 UTC",
      appeal: "2 Months",
      amount: "",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
      address: "0x1234...abcd",
      currency: "STRK",
      status: "REJECTED",
    },
    {
      id: 4,
      project: "Fragma",
      date: "12/12/26",
      time: "8:00 UTC",
      appeal: "20,000 STRK",
      amount: "$10,200",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
      address: "0x1234...abcd",
      currency: "STRK",
      status: "APPROVED",
    },
    {
      id: 5,
      project: "Ndida",
      date: "12/12/26",
      time: "8:00 UTC",
      appeal: "20,000 STRK",
      amount: "$10,200",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
      address: "0x1234...abcd",
      currency: "STRK",
      status: "APPROVED",
    },
    {
      id: 6,
      project: "Ndida",
      date: "12/12/26",
      time: "8:00 UTC",
      appeal: "1 Week",
      amount: "",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
      address: "0x1234...abcd",
      currency: "STRK",
      status: "APPROVED",
    },
    {
      id: 7,
      project: "Fragma",
      date: "12/12/26",
      time: "8:00 UTC",
      appeal: "20,000 STRK",
      amount: "$10,200",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
      address: "0x1234...abcd",
      currency: "STRK",
      status: "APPROVED",
    },
    {
      id: 8,
      project: "Steloz",
      date: "12/12/26",
      time: "8:00 UTC",
      appeal: "20,000 STRK",
      amount: "$10,200",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
      address: "0x1234...abcd",
      currency: "STRK",
      status: "REJECTED",
    },
  ]

  const [selectedAppeal, setSelectedAppeal] = useState<Appeal>(appeals[0])
  const [filter, setFilter] = useState<string>("ALL")
  const router = useRouter() // Initialize the router


  // Function to convert appeals data to CSV and download it
  const exportToCSV = () => {
    // Define CSV headers
    const headers = ["ID", "Project", "Date", "Time", "Appeal", "Amount", "Note", "Address", "Currency", "Status"]

    // Convert appeals data to CSV rows
    const csvRows = appeals.map((appeal) => [
      appeal.id,
      appeal.project,
      appeal.date,
      appeal.time,
      appeal.appeal,
      appeal.amount,
      appeal.note,
      appeal.address,
      appeal.currency,
      appeal.status,
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) =>
        row
          .map((cell) =>
            // Wrap cells with commas or quotes in double quotes
            cell !== null && cell !== undefined ? `"${String(cell).replace(/"/g, '""')}"` : "",
          )
          .join(","),
      ),
    ].join("\n")

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `appeals-export-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#171720] text-white min-h-screen">
      {/* Top section with total appeals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-xl shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] ">
        <div className="col-span-1 lg:col-span-3 bg-[linear-gradient(to_right,_#171720_80%,_#894DBD_140%,_#5E5EFF_110%)] border-[#2A2D3A] p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-medium text-[#E6E6E6]">Total Appeals</h2>
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <select className="bg-transparent text-[16px] text-gray-400 border-none outline-none">
                      <option className="text-[16px] mr-2 text-[#848484]">ALL</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-4xl font-bold mt-2 text-[#EBEBEB]">8</div>
              <button
                className="mt-6 text-sm flex items-center gap-2 text-[#EBEBEB] px-3 py-4 rounded-xl bg-transparent border border-[#4F4AE6]"
                onClick={exportToCSV}
              >
                Download Appeals
                <Download className="h-4 w-4 text-[#EBEBEB]" />
              </button>
            </div>
            <div className="h-24 w-24">
              <img src="/appeal.svg" alt="Justice scales" className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
      

      {/* Main content with table and details */}
      <div className="">
        <div className="">
          <div className="bg-[#171720] shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)]  rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#2A2D3A] flex justify-between items-center">
              <h2 className="text-xl font-medium">Total Appeals by Projects</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Filter by:</span>
                <div className="relative">
                  <select
                    className="appearance-none bg-[#171720] shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)]  rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}

                  >
                    <option value="ALL">First Uploaded</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="PENDING">Pending</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2B2B46] border-b border-[#2A2D3A]">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#EBEBEB]">S/N</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#EBEBEB]">Project</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#EBEBEB]">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#EBEBEB]">Time</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#EBEBEB]">Appeal</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#EBEBEB]">Note</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#EBEBEB]">Address</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#EBEBEB]">Currency</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#EBEBEB]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appeals
                    .filter((appeal) => {
                      if (filter === "ALL") return true
                      if (filter === "APPROVED" || filter === "REJECTED" || filter === "PENDING") {
                        return appeal.status === filter
                      }
                      return appeal.project.toUpperCase() === filter
                    })
                    .map((appeal) => (
                      <tr
                        key={appeal.id}
                        className="border-b border-[#2A2D3A] hover:bg-[#2A2D3A]/30 cursor-pointer"
                        onClick={() => {
                          setSelectedAppeal(appeal);
                          router.push(`/dashboard/appeals/appealsDetails`);
                        }}
                        
                    // onClick={() => router.push(`/dashboard/appeals/appealsDetails`)}

                      >
                        <td className="py-4 px-4 text-sm text-[#EBEBEB]">{appeal.id}.</td>
                        <td className="py-4 px-4 text-sm text-[#EBEBEB]">{appeal.project}</td>
                        <td className="py-4 px-4 text-sm text-[#EBEBEB]">{appeal.date}</td>
                        <td className="py-4 px-4 text-sm text-[#EBEBEB]">{appeal.time}</td>
                        <td className="py-4 px-4 text-sm text-[#EBEBEB]">
                          {appeal.appeal}
                          {appeal.amount && <div className="text-gray-400">{appeal.amount}</div>}
                        </td>
                        <td className="py-4 px-4 text-sm text-[#EBEBEB] max-w-[200px] break-words whitespace-normal">{appeal.note}</td>
                        <td className="py-4 px-4 text-sm text-[#EBEBEB]">{appeal.address}</td>
                        <td className="py-4 px-4 text-sm text-[#EBEBEB]">{appeal.currency}</td>
                        <td className="py-4 px-4 text-sm text-[#EBEBEB]">
                          <div className="flex items-center gap-2">
                            {appeal.status === "APPROVED" && (
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-[#00B759]"></div>
                                <div className=" text-[#00B759]">
                                  APPROVED
                                </div>
                              </div>
                            )}
                            {appeal.status === "REJECTED" && (
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-[#FA0303]"></div>
                                <div className=" text-[#FA0303]">REJECTED</div>
                              </div>
                            )}
                            {appeal.status === "PENDING" && (
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1.5"></div>
                                <div className=" text-yellow-500 ">
                                  PENDING
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

{/* floating div */}
        <div className="w-1/3 fixed top-44 right-20 z-50 shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] rounded-xl">
          <div className="bg-[#1A1D29] border-[#2A2D3A] rounded-xl h-full">
            <div className="p-6 border-b border-[#2A2D3A] flex justify-between items-center">
            <h2 className="text-lg font-medium text-[#848484]">
                {selectedAppeal.status === "PENDING" ? "Pending Appeal" : "Appeal Details"}
              </h2>
              <button  className="text-xs cursor-pointer py-1 px-1 border border-[#848484] flex items-center gap-1 text-[#EBEBEB] rounded-lg">
                View <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <div className="text-[#4F4AE6] mb-2">Request of</div>
              <div className="text-3xl font-bold mb-6">$20,000</div>

              <div className="flex items-center gap-1 mb-6">
                <span className="text-[#848484]">From</span>
                <span className="font-medium">{selectedAppeal.project} Project</span>
                <span className="text-[#848484]">via</span>
                <span className=""> BudgetChain</span>
              </div>
              </div>
              <div className="pb-3 px-3">

              {selectedAppeal.status === "PENDING" && (
                <div className="flex gap-3">
                  <button
                    className="flex-1 border cursor-pointer border-[#4F4AE6] py-3 rounded-xl text-white"
                  >
                    Reject
                  </button>
                  <button className="flex-1 bg-[#4F4AE6] cursor-pointer rounded-xl  text-white">Approve</button>
                </div>
              )}

              {selectedAppeal.status !== "PENDING" && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`
                      ${
                        selectedAppeal.status === "APPROVED"
                          ? "bg-[#00B759]/20 text-[#00B759]"
                          : "bg-[#FA0303]/20 text-[#FA0303]"
                      }
                    `}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          selectedAppeal.status === "APPROVED" ? "bg-[#00B759]" : "bg-[#FA0303]"
                        } mr-1.5`}
                      ></span>
                      {selectedAppeal.status}
                      </div>
                      <span className="text-gray-400">{selectedAppeal.address}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">{selectedAppeal.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* end of floating DIV */}
      </div>
    </div>
  )
}


