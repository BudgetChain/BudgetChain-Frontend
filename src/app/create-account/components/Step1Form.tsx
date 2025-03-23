// app/create-account/components/Step1Form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Step1FormProps {
  onNext: (data: Step1FormData) => void;
}

export interface Step1FormData {
  companyName: string;
  companyEmail: string;
  projectDescription: string;
}

export default function Step1Form({ onNext }: Step1FormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Step1FormData>({
    companyName: '',
    companyEmail: '',
    projectDescription: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
    router.push('/create-account/step2');
  };

  return (
    <div className="w-full max-w-3xl mt-16 ml-14">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-gray-200 mb-2">
            Name of Company/Project
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="companyEmail" className="block text-gray-200 mb-2">
            Email Address of Company/Project
          </label>
          <input
            type="email"
            id="companyEmail"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="projectDescription"
            className="block text-gray-200 mb-2"
          >
            Project Description
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            rows={8}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white"
            required
          />
        </div>

        <div className="flex flex-col items-end mt-8 space-y-4">
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-10">
            {/* Previous Button */}
            <button className="text-gray-400 opacity-30 text-sm font-medium">
              &lt; Prev
            </button>

            {/* Next Button */}
            <button
              type="submit"
              className="bg-[#4F4AE6] hover:bg-indigo-700 text-white font-medium py-4 px-28 rounded-lg"
            >
              NEXT
            </button>
          </div>

          {/* Login Section (Below Next Button) */}
          <div className="text-right">
            <span className="text-white text-sm">Already have an Account? </span>
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
