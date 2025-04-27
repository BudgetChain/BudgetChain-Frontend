"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import CoinImage from "../../../../public/coin.svg"
import TransactionTable from '../transactions/components/TransactionTable';
import { ArrowLeft, ChevronDown, Download, Loader, Plus } from 'lucide-react';

const CURRENCIES = ["USDC", "STRK", "FIAT"];

export default function ProjectsPageComponent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USDC');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

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

  return (
    <div className="bg-[#171720] min-h-screen text-white w-full">


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
          className={`py-4 px-6 text-sm font-medium relative `}
        >
          Add New Project
          {activeTab === 'register' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
        </button>
      </div>

      {/* Header */}
      <div className="flex w-full justify-between items-center mb-6">
        <div className="flex items-center">
          {activeTab !== "dashboard" && <button className="p-2 rounded-full hover:bg-gray-800">
            <ArrowLeft onClick={() => setActiveTab("dashboard")} size={20} />
          </button>}
        </div>
        {activeTab === "dashboard" &&
          <button onClick={() => setActiveTab("register")} className="flex justify-between items-center bg-[#4F4AE6] hover:bg-blue-700 text-white px-4 h-[40px] py-2 rounded-md text-sm">
            <Plus size={16} className="mr-2" />
            Add Project
          </button>
        }
      </div>

      {/* Dashboard Content */}
      {activeTab === "dashboard" &&
        <>
          <TransactionTable />
        </>
      }

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