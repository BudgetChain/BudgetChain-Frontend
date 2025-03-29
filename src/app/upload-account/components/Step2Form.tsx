'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormContext } from '../utils/formContext';

export interface Step2FormData {
  issuerName: string;
  roleInCompany: string;
  numberOfDAOs: string;
  listOfDAOs: string;
  totalAmount: string;
}

export default function Step2Form() {
  const router = useRouter();
  const { updateFormData, setCurrentStep } = useFormContext();

  const [formData, setFormData] = useState<Step2FormData>({
    issuerName: '',
    roleInCompany: '',
    numberOfDAOs: '',
    listOfDAOs: '',
    totalAmount: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData('step2', formData);
    setCurrentStep(3);
    router.push('/create-account/step3');
  };

  const handlePrev = () => {
    setCurrentStep(1);
    router.push('/create-account');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:ml-14 mt-8 sm:mt-16">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="issuerName" className="block text-gray-200 mb-2">
              Name of Issuer
            </label>
            <input
              type="text"
              id="issuerName"
              name="issuerName"
              value={formData.issuerName}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 sm:p-3 text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="roleInCompany" className="block text-gray-200 mb-2">
              Role in Company/Project
            </label>
            <input
              type="text"
              id="roleInCompany"
              name="roleInCompany"
              value={formData.roleInCompany}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 sm:p-3 text-white"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="numberOfDAOs" className="block text-gray-200 mb-2">
            Number of DAOs for Funds Allocation
          </label>
          <div className="relative">
            <select
              id="numberOfDAOs"
              name="numberOfDAOs"
              value={formData.numberOfDAOs}
              onChange={handleChange}
              className="w-full appearance-none bg-gray-900 border border-gray-700 rounded-md p-2 sm:p-3 pr-10 text-white"
              required
            >
              <option value="">Select</option>
              <option value="1">1 STRK</option>
              <option value="2">2 STRK</option>
              <option value="3">3 STRK</option>
              <option value="4">4 STRK</option>
              <option value="5">5 STRK</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-400">STRK</span>
              <svg
                className="w-5 h-5 ml-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="listOfDAOs" className="block text-gray-200 mb-2">
            List the DAOs
          </label>
          <textarea
            id="listOfDAOs"
            name="listOfDAOs"
            value={formData.listOfDAOs}
            onChange={handleChange}
            rows={5}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 sm:p-3 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="totalAmount" className="block text-gray-200 mb-2">
            Total Amount to be Funded
          </label>
          <div className="relative">
            <select
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="w-full appearance-none bg-gray-900 border border-gray-700 rounded-md p-2 sm:p-3 pr-10 text-white"
              required
            >
              <option value="">Select</option>
              <option value="100">100 STRK</option>
              <option value="500">500 STRK</option>
              <option value="1000">1000 STRK</option>
              <option value="5000">5000 STRK</option>
              <option value="10000">10000 STRK</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-400">STRK</span>
              <svg
                className="w-5 h-5 ml-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-end mt-6 sm:mt-8 space-y-4">
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4 sm:space-x-10 w-full sm:w-auto">
            {/* Previous Button */}
            <button
              className="text-gray-400 text-sm font-medium hover:text-gray-300"
              type="button"
              onClick={handlePrev}
            >
              &lt; Prev
            </button>

            {/* Next Button */}
            <button
              type="submit"
              className="bg-[#4F4AE6] hover:bg-indigo-700 text-white font-medium py-3 px-6 sm:py-4 sm:px-28 rounded-lg ml-auto"
            >
              NEXT
            </button>
          </div>

          {/* Login Section (Below Next Button) */}
          <div className="text-center sm:text-right w-full">
            <span className="text-white text-sm">
              Already have an Account?{' '}
            </span>
            <Link
              href="/login"
              className="text-indigo-500 hover:text-indigo-400 font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
