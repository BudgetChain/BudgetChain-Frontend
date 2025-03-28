// app/create-account/step2/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Step2Form from '../components/Step2Form';
import { useFormContext } from '../utils/formContext';

export default function Step2Page() {
  const router = useRouter();
  const { formData, setCurrentStep } = useFormContext();

  // Check if user has completed step 1
  useEffect(() => {
    if (!formData.step1) {
      router.push('/create-account');
    } else {
      setCurrentStep(2);
    }
  }, [formData, router, setCurrentStep]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#060612] text-white">
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-12 py-8">
            <div className="md:w-1/4">
              <Sidebar currentStep={2} />
            </div>
            <div className="md:w-3/4">
              <Step2Form />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
