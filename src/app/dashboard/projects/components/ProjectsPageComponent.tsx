"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import CoinImage from "../../../../../public/coin.svg"
import { ArrowLeft, ChevronDown, Download, Loader, Plus, MoreVertical } from 'lucide-react';
import ProjectPageTransactionTable from './TransactionTable';


// Define types for our data structures
interface Project {
  id: number;
  name: string;
  address: string;
  amount: string;
  amountInUSD: string;
  startDate: string;
  timeLeft: string;
  status: 'ACTIVE' | 'ON-HOLD' | 'COMPLETED' | 'CANCELLED';
}

const CURRENCIES = ["USDC", "STRK", "FIAT"];

// Sample data for projects
const projects: Project[] = [
  {
    id: 1,
    name: "Ndida",
    address: "0xcK4R....7G4F",
    amount: "20,000 STRK",
    amountInUSD: "$10,200",
    startDate: "21/12/2026",
    timeLeft: "4 Weeks",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Fragma",
    address: "0xcK4R....7G4F",
    amount: "$1,200",
    amountInUSD: "$1,200",
    startDate: "21/12/2026",
    timeLeft: "5 Days",
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Steloz",
    address: "0xcK4R....7G4F",
    amount: "2,000 STRK",
    amountInUSD: "$1,200",
    startDate: "21/12/2026",
    timeLeft: "2 Months",
    status: "ON-HOLD"
  }
];

export default function ProjectsPageComponent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USDC');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterBy, setFilterBy] = useState("Date Added");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Form fields state
  const [formData, setFormData] = useState({
    date: "19/02/2027",
    time: "8:00 PM UTC",
    project: "",
    amount: "",
    description: ""
  });

  // Form errors state
  const [formErrors, setFormErrors] = useState({
    project: "",
    amount: "",
    description: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear errors when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      project: "",
      amount: "",
      description: ""
    };

    // Project validation
    if (!formData.project.trim()) {
      errors.project = "Project name is required";
      isValid = false;
    }

    // Amount validation
    if (!formData.amount.trim()) {
      errors.amount = "Amount is required";
      isValid = false;
    } else if (isNaN(Number(formData.amount.replace(/[$,]/g, "")))) {
      errors.amount = "Please enter a valid number";
      isValid = false;
    }

    // Description validation
    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    } else if (formData.description.trim().length < 10) {
      errors.description = "Description should be at least 10 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        date: "19/02/2027",
        time: "8:00 PM UTC",
        project: "",
        amount: "",
        description: ""
      });

      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    setShowCurrencyDropdown(false);
  };
  
  const handleProjectClick = (project: Project) => {
    if (selectedProject && selectedProject.id === project.id) {
      setSelectedProject(null); // Close if already selected
    } else {
      setSelectedProject(project); // Select new project
    }
  };

  const selectFilter = (filter: string) => {
    setFilterBy(filter);
    setShowFilterDropdown(false);
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'ACTIVE': 
        return 'text-green-500';
      case 'ON-HOLD': 
        return 'text-gray-400';
      case 'COMPLETED': 
        return 'text-blue-500';
      case 'CANCELLED': 
        return 'text-red-500';
      default: 
        return 'text-white';
    }
  };

  return (
    <div className="bg-[#171720] min-h-screen text-white w-full p-4">
      {/* Banner Card */}
      <div className="w-full mb-5 border border-gray-700 bg-gradient-to-r from-[#171720] from-[60%] to-[#894DBD] to-[120%] rounded-lg p-6 flex justify-between items-center">
        {/* Left section with transaction info */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
            <span>Total Transactions</span>
            <div className="flex items-center text-xs bg-gray-800 rounded px-2 py-0.5">
              <span className="mr-1">STRK</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div className="text-4xl font-bold text-white mb-4">75</div>

          <button className="flex items-center text-sm text-gray-300 border border-gray-700 hover:bg-gray-800 rounded-md px-4 py-2 transition-colors">
            <Download size={16} className="mr-2" />
            Download Records
          </button>
        </div>

        <div className="">
          <div>
            <Image src={CoinImage} alt='coin-image' />
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-4 px-6 text-sm font-medium relative ${activeTab === 'dashboard' ? 'text-white' : 'text-gray-400'}`}
        >
          Records
          {activeTab === 'dashboard' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`py-4 px-6 text-sm font-medium relative ${activeTab === 'register' ? 'text-white' : 'text-gray-400'}`}
        >
          Add New Project
          {activeTab === 'register' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
        </button>
      </div>

      {/* Header */}
      <div className="flex w-full justify-between items-center mb-6">
        <div className="flex items-center">
          {(activeTab !== "dashboard" || selectedProject) && (
            <button 
              className="p-2 rounded-full hover:bg-gray-800"
              onClick={() => {
                if (selectedProject) {
                  setSelectedProject(null);
                } else {
                  setActiveTab("dashboard");
                }
              }}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {activeTab === "dashboard" && !selectedProject && (
            <h1 className="text-xl font-medium ml-2">All Projects</h1>
          )}
          {selectedProject && (
            <h1 className="text-xl font-medium ml-2">{selectedProject.name} Project</h1>
          )}
        </div>
        
        {activeTab === "dashboard" && !selectedProject && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <span className="mr-2">Filter by:</span>
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 bg-transparent border border-gray-700 px-3 py-1.5 rounded-md"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <span>{filterBy}</span>
                  <ChevronDown size={16} />
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-1 w-40 bg-[#28283A] rounded-md shadow-lg z-10">
                    {["Date Added", "Status", "Amount"].map((filter) => (
                      <div
                        key={filter}
                        className="px-4 py-2 text-sm hover:bg-[#3a3a4d] cursor-pointer"
                        onClick={() => selectFilter(filter)}
                      >
                        {filter}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => setActiveTab("register")} 
              className="flex justify-between items-center bg-[#4F4AE6] hover:bg-blue-700 text-white px-4 h-[40px] py-2 rounded-md text-sm"
            >
              <Plus size={16} className="mr-2" />
              Add Project
            </button>
          </div>
        )}
        
        {activeTab === "dashboard" && selectedProject && (
          <button className="flex justify-between items-center bg-[#4F4AE6] hover:bg-blue-700 text-white px-4 h-[40px] py-2 rounded-md text-sm">
            <Plus size={16} className="mr-2" />
            Add Transaction
          </button>
        )}
      </div>

      {/* Dashboard Content */}
      {activeTab === "dashboard" && !selectedProject && (
        <div className="overflow-x-auto rounded-lg bg-[#171720] border border-[#EBEBEB40]">
          <table className="min-w-full bg-[#171720] text-white text-sm">
            <thead>
              <tr className="bg-[#1c1c26] text-left">
                <th className="p-4">S/N</th>
                <th className="p-4">Project</th>
                <th className="p-4">Address</th>
                <th className="p-4">Amount Requested</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">Time Left</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr 
                  key={project.id} 
                  className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <td className="p-4">{project.id}.</td>
                  <td className="p-4">{project.name}</td>
                  <td className="p-4">{project.address}</td>
                  <td className="p-4">
                    {project.amount}
                    <div className="text-xs text-gray-400">{project.amountInUSD}</div>
                  </td>
                  <td className="p-4">{project.startDate}</td>
                  <td className="p-4">{project.timeLeft}</td>
                  <td className="p-4">
                    <span className={`flex items-center ${getStatusClass(project.status)}`}>
                      <span className="h-2 w-2 rounded-full bg-current mr-2"></span>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Selected Project Transactions */}
      {activeTab === "dashboard" && selectedProject && (
        <ProjectPageTransactionTable />
      )}

      {/* Add Project Form */}
      {activeTab === 'register' && (
        <div className="bg-transparent border border-[#EBEBEB40] rounded-lg p-8 w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Date and Time Fields */}
              <div className="space-y-2 w-full">
                <label className="block text-[#4F4AE6] text-sm">Date</label>
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    className="bg-[#28283A] rounded p-3 w-full text-[#848484]"
                    placeholder="19/02/2027"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    disabled
                  />
                  <span className="ml-2 text-xs text-gray-400 whitespace-nowrap">*Fixed</span>
                </div>
              </div>

              <div className="space-y-2 w-full">
                <label className="block text-[#4F4AE6] text-sm mb-2">Time</label>
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    className="bg-[#28283A] rounded p-3 w-full text-[#848484]"
                    placeholder="8:00 PM UTC"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    disabled
                  />
                  <span className="ml-2 text-xs text-gray-400 whitespace-nowrap">*Fixed</span>
                </div>
              </div>

              {/* Project and Amount Fields */}
              <div className="space-y-2 w-full">
                <label className="block text-[#4F4AE6] text-sm">Project</label>
                <input
                  type="text"
                  className={`bg-[#28283A] rounded p-3 w-full text-[#848484] ${formErrors.project ? 'border border-red-500' : ''}`}
                  placeholder="Name of Project"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                />
                {formErrors.project && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.project}</p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <label className="block text-[#4F4AE6] text-sm mb-1">Total Amount</label>
                <div className="relative w-full text-[#848484]">
                  <input
                    type="text"
                    className={`bg-[#28283A] rounded p-3 pr-2 w-full ${formErrors.amount ? 'border border-red-500' : ''}`}
                    placeholder="$****"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />

                  <div
                    className="absolute inset-y-0 right-3 flex items-center space-x-1 text-sm cursor-pointer"
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  >
                    <span>{selectedCurrency}</span>
                    <ChevronDown size={16} />
                  </div>

                  {showCurrencyDropdown && (
                    <div className="absolute right-0 mt-1 w-24 bg-[#28283A] rounded-md shadow-lg z-10">
                      {CURRENCIES.map((currency) => (
                        <div
                          key={currency}
                          className="px-4 py-2 text-sm hover:bg-[#3a3a4d] cursor-pointer"
                          onClick={() => selectCurrency(currency)}
                        >
                          {currency}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {formErrors.amount && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.amount}</p>
                )}
              </div>

              {/* Description/Note Field - Full Width */}
              <div className="col-span-1 md:col-span-2 space-y-2 w-full">
                <label className="block text-[#4F4AE6] text-sm mb-1">Description/Note</label>
                <textarea
                  className={`bg-[#28283A] rounded p-3 w-full h-48 text-[#848484] resize-none ${formErrors.description ? 'border border-red-500' : ''}`}
                  placeholder="Write Details of what you'll be using the funds for"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                {formErrors.description && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex justify-start w-full">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#4F4AE6] h-[40px] hover:bg-blue-700 text-white text-sm w-full max-w-[302px] rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader size={16} className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : isSubmitted ? (
                    "Request Submitted!"
                  ) : (
                    "Make Request"
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mt-4 bg-green-700 bg-opacity-20 border border-green-500 rounded-md p-4 text-green-400">
              Your project request has been submitted successfully. You will be notified when it&apos;s approved.
            </div>
          )}
        </div>
      )}
    </div>
  );
}