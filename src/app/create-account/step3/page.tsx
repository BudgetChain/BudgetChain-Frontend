// app/create-account/step3/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import Step3Form from '../components/Step3Form';
import { useFormContext } from '../utils/formContext';

export default function Step3Page() {
  const router = useRouter();
  const { formData, setCurrentStep } = useFormContext();

  // Check if user has completed steps 1 and 2
  useEffect(() => {
    if (!formData.step1 || !formData.step2) {
      if (!formData.step1) {
        router.push('/create-account');
      } else {
        router.push('/create-account/step2');
      }
    } else {
      setCurrentStep(3);
    }
  }, [formData, router, setCurrentStep]);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#060612] text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-12 py-8">
          <div className="md:w-1/4">
            <Sidebar currentStep={3} />
          </div>
          <div className="md:w-3/4">
            <Step3Form />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
