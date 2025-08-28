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
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

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

  const toggleProjectExpansion = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <div className="bg-[#171720] min-h-screen text-white w-full p-3 sm:p-4 lg:p-6">
      {/* Banner Card */}
      <div className="w-full mb-4 sm:mb-5 border border-gray-700 bg-gradient-to-r from-[#171720] from-[60%] to-[#894DBD] to-[120%] rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        {/* Left section with transaction info */}
        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
            <span>Total Transactions</span>
            <div className="flex items-center text-xs bg-gray-800 rounded px-2 py-1 w-fit">
              <span className="mr-1">STRK</span>
              <ChevronDown size={12} />
            </div>
          </div>

          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">75</div>

          <button className="flex items-center text-xs sm:text-sm text-gray-300 border border-gray-700 hover:bg-gray-800 rounded-md px-3 sm:px-4 py-2 transition-colors w-full sm:w-auto justify-center sm:justify-start">
            <Download size={14} className="mr-2" />
            <span className="hidden sm:inline">Download Records</span>
            <span className="sm:hidden">Download</span>
          </button>
        </div>

        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 self-center sm:self-start">
          <Image src={CoinImage} alt='coin-image' className="w-full h-full object-contain" />
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-4 sm:mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium relative whitespace-nowrap ${activeTab === 'dashboard' ? 'text-white' : 'text-gray-400'}`}
        >
          Records
          {activeTab === 'dashboard' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium relative whitespace-nowrap ${activeTab === 'register' ? 'text-white' : 'text-gray-400'}`}
        >
          Add New Project
          {activeTab === 'register' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
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
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
          )}
          {activeTab === "dashboard" && !selectedProject && (
            <h1 className="text-lg sm:text-xl font-medium ml-2">All Projects</h1>
          )}
          {selectedProject && (
            <h1 className="text-lg sm:text-xl font-medium ml-2">{selectedProject.name} Project</h1>
          )}
        </div>
        
        {activeTab === "dashboard" && !selectedProject && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm gap-2 sm:gap-0">
              <span className="sm:mr-2">Filter by:</span>
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 bg-transparent border border-gray-700 px-3 py-2 rounded-md text-xs sm:text-sm w-full sm:w-auto justify-between sm:justify-center min-w-[120px]"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <span>{filterBy}</span>
                  <ChevronDown size={14} />
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
              className="flex justify-center items-center bg-[#4F4AE6] hover:bg-blue-700 text-white px-4 py-2 rounded-md text-xs sm:text-sm w-full sm:w-auto"
            >
              <Plus size={14} className="mr-2" />
              Add Project
            </button>
          </div>
        )}
        
        {activeTab === "dashboard" && selectedProject && (
          <button className="flex justify-center items-center bg-[#4F4AE6] hover:bg-blue-700 text-white px-4 py-2 rounded-md text-xs sm:text-sm w-full sm:w-auto">
            <Plus size={14} className="mr-2" />
            Add Transaction
          </button>
        )}
      </div>

      {/* Dashboard Content */}
      {activeTab === "dashboard" && !selectedProject && (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-lg bg-[#171720] border border-[#EBEBEB40]">
            <table className="min-w-full bg-[#171720] text-white text-sm">
              <thead>
                <tr className="bg-[#1c1c26] text-left">
                  <th className="p-3 lg:p-4 text-xs lg:text-sm">S/N</th>
                  <th className="p-3 lg:p-4 text-xs lg:text-sm">Project</th>
                  <th className="p-3 lg:p-4 text-xs lg:text-sm">Address</th>
                  <th className="p-3 lg:p-4 text-xs lg:text-sm">Amount</th>
                  <th className="p-3 lg:p-4 text-xs lg:text-sm">Start Date</th>
                  <th className="p-3 lg:p-4 text-xs lg:text-sm">Time Left</th>
                  <th className="p-3 lg:p-4 text-xs lg:text-sm">Status</th>
                  <th className="p-3 lg:p-4 text-xs lg:text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr 
                    key={project.id} 
                    className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <td className="p-3 lg:p-4 text-xs lg:text-sm">{project.id}.</td>
                    <td className="p-3 lg:p-4 text-xs lg:text-sm font-medium">{project.name}</td>
                    <td className="p-3 lg:p-4 text-xs lg:text-sm font-mono">{project.address}</td>
                    <td className="p-3 lg:p-4 text-xs lg:text-sm">
                      <div className="font-medium">{project.amount}</div>
                      <div className="text-xs text-gray-400">{project.amountInUSD}</div>
                    </td>
                    <td className="p-3 lg:p-4 text-xs lg:text-sm">{project.startDate}</td>
                    <td className="p-3 lg:p-4 text-xs lg:text-sm">{project.timeLeft}</td>
                    <td className="p-3 lg:p-4 text-xs lg:text-sm">
                      <span className={`flex items-center ${getStatusClass(project.status)}`}>
                        <span className="h-2 w-2 rounded-full bg-current mr-2"></span>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-3 lg:p-4">
                      <button className="text-gray-400 hover:text-white">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#171720] border border-[#EBEBEB40] rounded-lg"
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleProjectExpansion(project.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 text-sm">#{project.id}</span>
                        <span className="text-white font-medium">{project.name}</span>
                      </div>
                      <div className="text-sm font-medium mb-1">{project.amount}</div>
                      <div className="text-xs text-gray-400">{project.amountInUSD}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'ACTIVE'
                          ? 'text-green-400 bg-green-900/30'
                          : project.status === 'ON-HOLD'
                          ? 'text-gray-400 bg-gray-900/30'
                          : project.status === 'COMPLETED'
                          ? 'text-blue-400 bg-blue-900/30'
                          : 'text-red-400 bg-red-900/30'
                      }`}>
                        <span className="w-2 h-2 rounded-full mr-1 bg-current"></span>
                        {project.status}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project);
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse indicator */}
                  <div className="flex justify-center border-t border-gray-700 pt-3">
                    <span className="text-gray-400 text-xs flex items-center">
                      {expandedProject === project.id ? 'Less Info ▲' : 'More Info ▼'}
                    </span>
                  </div>
                </div>

                {/* Expanded content */}
                {expandedProject === project.id && (
                  <div className="px-4 pb-4 border-t border-gray-700 bg-[#1a1a24]">
                    <div className="pt-3 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Address:</span>
                        <span className="text-white font-mono">{project.address}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Start Date:</span>
                        <span className="text-white">{project.startDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Time Left:</span>
                        <span className="text-white">{project.timeLeft}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      
      {/* Selected Project Transactions */}
      {activeTab === "dashboard" && selectedProject && (
        <ProjectPageTransactionTable />
      )}

      {/* Add Project Form */}
      {activeTab === 'register' && (
        <div className="bg-transparent border border-[#EBEBEB40] rounded-lg p-4 sm:p-6 lg:p-8 w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
              {/* Date and Time Fields */}
              <div className="space-y-2 w-full">
                <label className="block text-[#4F4AE6] text-sm">Date</label>
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    className="bg-[#28283A] rounded p-3 w-full text-[#848484] text-sm"
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
                    className="bg-[#28283A] rounded p-3 w-full text-[#848484] text-sm"
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
                  className={`bg-[#28283A] rounded p-3 w-full text-[#848484] text-sm ${formErrors.project ? 'border border-red-500' : ''}`}
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
                    className={`bg-[#28283A] rounded p-3 pr-20 w-full text-sm ${formErrors.amount ? 'border border-red-500' : ''}`}
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
              <div className="col-span-1 lg:col-span-2 space-y-2 w-full">
                <label className="block text-[#4F4AE6] text-sm mb-1">Description/Note</label>
                <textarea
                  className={`bg-[#28283A] rounded p-3 w-full h-32 sm:h-40 lg:h-48 text-[#848484] text-sm resize-none ${formErrors.description ? 'border border-red-500' : ''}`}
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
              <div className="col-span-1 lg:col-span-2 flex justify-start w-full">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#4F4AE6] hover:bg-blue-700 text-white text-sm w-full sm:w-auto sm:min-w-[302px] px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
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
            <div className="mt-4 bg-green-700 bg-opacity-20 border border-green-500 rounded-md p-4 text-green-400 text-sm">
              Your project request has been submitted successfully. You will be notified when it&apos;s approved.
            </div>
          )}
        </div>
      )}
    </div>
  );
}