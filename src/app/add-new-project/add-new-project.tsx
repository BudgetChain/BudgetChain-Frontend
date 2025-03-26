'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
// import Sidebar from '';

interface FormData {
  project: string;
  totalAmount: string;
  currency: string;
  description: string;
}

interface Errors {
  project: string;
  totalAmount: string;
  description: string;
}

export default function Project() {
  const fixedDate = '19/02/2027';
  const fixedTime = '8:00 PM UTC';

  const [formData, setFormData] = useState<FormData>({
    project: '',
    totalAmount: '',
    currency: 'USDC',
    description: '',
  });

  const [errors, setErrors] = useState<Errors>({
    project: '',
    totalAmount: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'totalAmount') {
      const sanitizedValue = value.replace(/[^0-9.]/g, '');
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateProject = (project: string): string => {
    if (!project.trim()) return 'Project name is required';
    return '';
  };

  const validateTotalAmount = (totalAmount: string): string => {
    if (!totalAmount.trim()) return 'Amount is required';
    if (!/^\d+(\.\d{1,2})?$/.test(totalAmount))
      return 'Please enter a valid amount';
    return '';
  };

  const validateDescription = (description: string): string => {
    if (description.trim().length < 20)
      return 'Description must be at least 20 characters';
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors = {
      project: validateProject(formData.project),
      totalAmount: validateTotalAmount(formData.totalAmount),
      description: validateDescription(formData.description),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            date: fixedDate,
            time: fixedTime,
          }),
        });

        if (response.ok) {
          console.log('Project created successfully');
        } else {
          console.error('Failed to create project');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-[#171720] text-white w-full p-7 ">
      {/* Add the Header component here */}

      {/* <Sidebar /> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-xl shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] ">
        <div className="col-span-1 lg:col-span-3 bg-[linear-gradient(to_right,_#171720_80%,_#894DBD_140%,_#5E5EFF_110%)] border-[#2A2D3A] p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-medium text-[#E6E6E6]">
                  Total Transactions
                </h2>
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <select className="bg-transparent text-[16px] text-gray-400 border-none outline-none">
                      <option className="text-[16px] mr-2 text-[#848484]">
                        STRK
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-4xl font-bold mt-2 text-[#EBEBEB]">75</div>
              <button className="mt-6 text-sm flex items-center gap-2 text-[#EBEBEB] px-3 py-4 rounded-xl bg-transparent border border-[#4F4AE6]">
                Download Records
                <Download className="h-4 w-4 text-[#EBEBEB]" />
              </button>
            </div>
            <div className="h-24 w-24">
              <img
                src="/currency.svg"
                alt="Currency"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Navigation tabs */}
      <div className="flex border-b border-gray-800">
        <Link
          href="/records"
          className="py-3 px-4 text-gray-400 hover:text-gray-300 transition-colors"
        >
          Records
        </Link>
        <div className="py-3 px-4 text-blue-500 border-b-2 border-blue-500 font-medium">
          Add New Project
        </div>
      </div>

      {/* Back button */}
      <div className="p-4">
        <button
          className="text-gray-400 hover:text-white flex items-center transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="py-7 px-4 md:p-6 m-7 rounded-xl w-[96%] shadow-[0px_0px_4px_0px_#EBEBEB40]"
      >
        <div className="max-w-4xl">
          {/* Date and Time row - Fixed fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4  md:gap-8">
            <div className="space-y-2">
              <label className="block text-blue-500 text-sm">Date</label>
              <input
                type="text"
                name="date"
                value={fixedDate}
                disabled
                className="w-full bg-[#4a4a5b] rounded p-3 text-white opacity-70"
              />
              <p className="text-xs text-gray-500">*Fixed</p>
            </div>

            <div className="space-y-2">
              <label className="block text-blue-500 text-sm">Time</label>
              <input
                type="text"
                name="time"
                value={fixedTime}
                disabled
                className="w-full bg-[#4a4a5b] rounded p-3 text-white opacity-70"
              />
              <p className="text-xs text-gray-500">*Fixed</p>
            </div>
          </div>

          {/* Project and Total Amount row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2">
              <label className="block text-blue-500 text-sm">Project</label>
              <input
                type="text"
                name="project"
                placeholder="Name of Project"
                value={formData.project}
                onChange={handleChange}
                className={`w-full bg-[#4a4a5b] rounded p-3 text-white ${errors.project ? 'border border-red-500' : 'border-transparent border'}`}
              />
              {errors.project && (
                <p className="text-red-500 text-xs mt-1">{errors.project}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-blue-500 text-sm">
                Total Amount
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="totalAmount"
                  placeholder="$***"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  className={`w-full bg-[#4a4a5b] rounded-l p-3 text-white ${errors.totalAmount ? 'border border-red-500' : 'border-transparent border'}`}
                />
                <div
                  className={`bg-[#1c1c24] rounded-r p-3 text-gray-400 flex items-center ${errors.totalAmount ? 'border-r border-t border-b border-red-500' : 'border-transparent border'}`}
                >
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="bg-transparent text-gray-400 outline-none cursor-pointer"
                    aria-label="Select currency"
                  >
                    <option value="USDC">USDC</option>
                    <option value="ETH">ETH</option>
                    <option value="BTC">BTC</option>
                  </select>
                  {/* <span className="ml-1"><ChevronDown size={20} /></span> */}
                </div>
              </div>
              {errors.totalAmount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.totalAmount}
                </p>
              )}
            </div>
          </div>

          {/* Description/Note */}
          <div className="space-y-2">
            <label className="block text-blue-500 text-sm">
              Description/Note
            </label>
            <textarea
              name="description"
              placeholder="Write Details of what you'll be using the funds for"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className={`w-full bg-[#4a4a5b] rounded p-3 text-white resize-none ${errors.description ? 'border border-red-500' : 'border-transparent border'}`}
            />
            <div className="flex justify-between">
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description}</p>
              )}
              <p
                className={`text-xs ${formData.description.length < 20 ? 'text-gray-400' : 'text-green-400'}`}
              >
                {formData.description.length}/20 characters minimum
              </p>
            </div>
          </div>

          {/* Make Request button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-2/4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 rounded text-lg font-medium transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Make Request'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
