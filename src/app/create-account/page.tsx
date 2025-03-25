// app/create-account/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import Step1Form, { Step1FormData } from './components/Step1Form';
import { useFormContext } from './utils/formContext';

export default function CreateAccount() {
  const router = useRouter();
  const { updateFormData, setCurrentStep } = useFormContext();
  
  const handleStep1Submit = (data: Step1FormData) => {
    updateFormData('step1', data);
    setCurrentStep(2);
    router.push('/create-account/step2');
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-[#060612] text-white">
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-12 py-8">
            <div className="md:w-1/4">
              <Sidebar currentStep={1} />
            </div>
            <div className="md:w-3/4">
              <Step1Form onNext={handleStep1Submit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}