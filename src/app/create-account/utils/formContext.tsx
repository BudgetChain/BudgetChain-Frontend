// app/create-account/utils/formContext.tsx (updated)
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Step1FormData } from '../components/Step1Form';
import { Step2FormData } from '../components/Step2Form';
import { Step3FormData } from '../components/Step3Form';


interface FormContextType {
  formData: {
    step1: Step1FormData | null;
    step2: Step2FormData | null;
    step3: Step3FormData | null;
  };
  updateFormData: (step: string, data: Step1FormData | Step2FormData | Step3FormData) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormContextType["formData"]>({
    step1: null,
    step2: null,
    step3: null
  });
  
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (step: string, data: Step1FormData | Step2FormData | Step3FormData) => {
    setFormData(prev => ({ ...prev, [step]: data }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}