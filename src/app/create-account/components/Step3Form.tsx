// app/create-account/components/Step3Form.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormContext } from '../utils/formContext';

export interface Step3FormData {
  virDocument: File | null;
  password: string;
  termsAccepted: boolean;
}

export default function Step3Form() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateFormData, setCurrentStep } = useFormContext();
  
  const [formData, setFormData] = useState<Step3FormData>({
    virDocument: null,
    password: '',
    termsAccepted: false,
  });
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fileError, setFileError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileChange(files[0]);
      }
    } else {
      if (name === 'password') {
        setFormData(prev => ({ ...prev, password: value }));
        
        if (confirmPassword && value !== confirmPassword) {
          setPasswordError('Passwords do not match');
        } else {
          setPasswordError('');
        }
      }
    }
  };
  
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (value !== formData.password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };
  
  const handleFileChange = (file: File) => {
    // Check file size
    if (file.size > 20 * 1024 * 1024) {
      setFileError('File size exceeds 20MB limit');
      return;
    }
    
    // Check file type
    const acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (!acceptedTypes.includes(file.type)) {
      setFileError('File type not supported. Please upload PDF, DOC, DOCX, JPEG or PNG');
      return;
    }
    
    setFileError('');
    setFileName(file.name);
    setFormData(prev => ({ ...prev, virDocument: file }));
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.virDocument) {
      setFileError('Please upload a VIR document');
      return;
    }
    
    if (formData.password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (!formData.termsAccepted) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    
    updateFormData('step3', formData);
    // Here you would typically submit the form data to your backend
    alert('Account created successfully!');
    router.push('/dashboard'); // Redirect to dashboard or confirmation page
  };

  const handlePrev = () => {
    setCurrentStep(2);
    router.push('/create-account/step2');
  };

  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-500 mb-1">Create An Account</h1>
      <p className="text-gray-300 mb-8">To Activate Our Service</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="virDocument" className="block text-gray-200 mb-2">
            Upload VIR Document
          </label>
          <div
            className={`border-2 border-dashed rounded-md p-10 text-center ${
              dragActive ? 'border-indigo-500 bg-indigo-900/20' : 'border-gray-700'
            } ${fileError ? 'border-red-500' : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <input
              type="file"
              id="virDocument"
              name="virDocument"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
              onChange={handleChange}
            />
            
            {fileName ? (
              <div className="text-indigo-400">
                <p>File selected: {fileName}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Click to change file
                </p>
              </div>
            ) : (
              <div>
                <p className="text-indigo-400 font-medium">Upload a file</p>
                <p className="text-gray-400">or drag and drop here</p>
                <p className="text-gray-500 text-sm mt-2">
                  Accepted files: PDF, DOC, DOCX, JPEG and PNG up to 20MB.
                </p>
              </div>
            )}
          </div>
          {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-gray-200 mb-2">
            Create Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full bg-gray-900 border ${
              passwordError && formData.password ? 'border-red-500' : 'border-gray-700'
            } rounded-md p-3 text-white`}
            required
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-200 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`w-full bg-gray-900 border ${
              passwordError && confirmPassword ? 'border-red-500' : 'border-gray-700'
            } rounded-md p-3 text-white`}
            required
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="w-4 h-4 bg-gray-900 border-gray-700 rounded"
            required
          />
          <label htmlFor="termsAccepted" className="ml-2 text-gray-300 text-sm">
            By clicking &#39;Create Account&#39;, I agree that I agree with the{' '}
            <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">
              Privacy Policy
            </Link>.
          </label>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handlePrev}
              className="text-gray-300 hover:text-white mr-4"
            >
              &lt; Prev
            </button>
            <span className="text-gray-400">Already have an Account? </span>
            <Link href="/login" className="text-indigo-500 hover:text-indigo-400 ml-1">
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-8 rounded-md"
          >
            CREATE ACCOUNT
          </button>
        </div>
      </form>
    </div>
  );
}