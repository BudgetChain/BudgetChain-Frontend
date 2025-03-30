import React, { useState, FormEvent, DragEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';

interface AccountData {
  document: File | null;
  password: string;
}

interface AccountCreationProps {
  onBack: () => void;
  onSubmit: (data: AccountData) => void;
}

interface FormErrors {
  file?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const Upload: React.FC<AccountCreationProps> = ({ onBack, onSubmit }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const steps = [
    {
      number: '1',
      description: 'Provide Basic Info About The Project You\'d Like To Submit.'
    },
    {
      number: '2',
      description: 'This Section Collects Essential Information For Creating The User Account'
    },
    {
      number: '3',
      description: 'Provide Basic Info About The Project You\'d Like To Submit.'
    },
  ];

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    const maxSize = 20 * 1024 * 1024; 
    
    const newErrors = { ...errors };
    
    if (!validTypes.includes(file.type)) {
      newErrors.file = 'Please upload a valid file type (PDF, DOC, DOCX, JPEG, PNG)';
    } else if (file.size > maxSize) {
      newErrors.file = 'File size must be less than 20MB';
    } else {
      delete newErrors.file;
      setUploadedFile(file);
    }
    
    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!uploadedFile) {
      newErrors.file = 'Please upload a document';
    }
    
    if (!password) {
      newErrors.password = 'Please create a password';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms & Conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        document: uploadedFile,
        password
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050512] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex my-10 items-center justify-center p-4">
        <div className="w-full space-y-8 max-w-[1010px]">
          
          <div className="mb-4 text-center lg:text-left">
            <h1 className="text-[#4F4AE6] text-2xl font-bold mb-1">Create An Account</h1>
            <p className="text-white text-sm">To Activate Our Service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
            <div className="hidden md:block">
              <div className="relative">
                
                <div className="absolute left-6 top-0 bottom-0 w-px border-l border-dashed border-gray-600 h-full"></div>
                
                <div className="space-y-24">
                  {steps.map((step, index) => (
                    <div key={index} className="relative flex items-start">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full border border-dashed border-gray-500 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-[#151523] border border-[#4F4AE6] flex items-center justify-center z-10">
                            <span className="text-white text-sm">{step.number}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 mt-1">
                        <p className="text-white text-xs font-mono">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm text-[#848484] mb-2">
                    Upload VIR Document
                  </label>
                  <div 
                    className={`border-2  rounded-xl p-20 text-center cursor-pointer ${
                      isDragging ? 'border-[#4F4AE6] bg-[#151523]' : 'border-gray-700 bg-[#151523]'
                    } ${errors.file ? 'border-red-500' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                    />
                    
                    {uploadedFile ? (
                      <div className="text-white">
                        <p>File uploaded: {uploadedFile.name}</p>
                        <button 
                          type="button" 
                          className="text-[#4F4AE6] text-sm mt-2 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile(null);
                          }}
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[#4F4AE6] text-sm">Upload a file</p>
                        <p className="text-gray-400 text-sm mt-1">or drag and drop here</p>
                        <p className="text-gray-400 text-xs mt-2">
                          Accepted files: PDF, DOC, DOCX, JPEG and PNG up to 20MB.
                        </p>
                      </div>
                    )}
                  </div>
                  {errors.file && <p className="text-red-400 text-xs">{errors.file}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm text-[#848484]">
                    Create Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full py-3 px-4 bg-[#151523] text-white rounded-xl focus:outline-none focus:border-gray-500 border ${
                      errors.password ? 'border-red-500' : 'border-gray-800'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm text-[#848484]">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full py-3 px-4 bg-[#151523] text-white rounded-xl focus:outline-none focus:border-gray-500 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-800'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
                </div>
                
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 rounded-full border-gray-500 bg-[#151523] text-[#4F4AE6] focus:ring-[#4F4AE6] focus:ring-offset-0"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                    By clicking "Create Account", I agree with the {' '}
                    <Link href="/terms" className="text-[#4F4AE6] hover:underline">Terms & Conditions</Link>
                    {' '} and {' '}
                    <Link href="/privacy" className="text-[#4F4AE6] hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
                {errors.terms && <p className="text-red-400 text-xs">{errors.terms}</p>}
                
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-white hover:underline"
                  >
                    &lt; Prev
                  </button>
                  
                  <button
                    type="submit"
                    className="py-4 px-4 bg-[#4F4AE6] hover:bg-[#36329c] text-white rounded-xl transition-colors font-medium w-[30%]"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
                
                <div className="text-center text-sm">
                  <span className="text-gray-400">Already have an Account? </span>
                  <Link href="/login" className="text-[#4F4AE6] hover:underline">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;