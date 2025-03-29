import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';

type RoleType = 'Investor' | 'Admin' | 'DAO Member' | '';

interface RoleSelectionProps {
  onRoleSelect: (role: RoleType) => void;
  onNext: () => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect, onNext }) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>('');
  
  const handleRoleChange = (role: RoleType) => {
    setSelectedRole(role);
  };
  
  const handleSubmit = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-[#050512] text-white flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4 mt-[-280px]">
        <div className="w-full space-y-8 max-w-[1010px]">
          <div className="mb-4 text-center lg:text-left">
            <h1 className="text-[#4F4AE6] text-2xl font-bold mb-1">Login To Your Account</h1>
            <p className="text-white text-sm">To View Activity</p>
          </div>
          
          <div className="gap-12 flex lg:justify-end">
            <div className="lg:w-[60%] w-full text-center">
              <div className="mb-8">
                <h2 className="text-white text-lg mb-6 text-center">Select Your Role</h2>
                
                <div className="space-y-4">
                  <button 
                    className={`w-full rounded-xl py-4 px-6 flex justify-between items-center bg-[#151523] hover:bg-[#232334] transition-colors ${
                      selectedRole === 'Investor' ? 'border border-[#4F4AE6]' : 'border border-gray-800'
                    }`}
                    onClick={() => handleRoleChange('Investor')}
                    type="button"
                  >
                    <span className="text-white text-lg">Investor</span>
                    <div className={`h-6 w-6 rounded-full border-2 ${
                      selectedRole === 'Investor' ? 'border-[#4F4AE6]' : 'border-gray-500'
                    }`}>
                      {selectedRole === 'Investor' && <div className="h-3 w-3 rounded-full bg-[#4F4AE6] mx-auto mt-1"></div>}
                    </div>
                  </button>
                  
                  <button 
                    className={`w-full rounded-xl py-4 px-6 flex justify-between items-center bg-[#151523] hover:bg-[#232334] transition-colors ${
                      selectedRole === 'Admin' ? 'border border-[#4F4AE6]' : 'border border-gray-800'
                    }`}
                    onClick={() => handleRoleChange('Admin')}
                    type="button"
                  >
                    <span className="text-white text-lg">Admin</span>
                    <div className={`h-6 w-6 rounded-full border-2 ${
                      selectedRole === 'Admin' ? 'border-[#4F4AE6]' : 'border-gray-500'
                    }`}>
                      {selectedRole === 'Admin' && <div className="h-3 w-3 rounded-full bg-[#4F4AE6] mx-auto mt-1"></div>}
                    </div>
                  </button>
                  
                  <button 
                    className={`w-full rounded-xl py-4 px-6 flex justify-between items-center bg-[#151523] hover:bg-[#232334] transition-colors ${
                      selectedRole === 'DAO Member' ? 'border border-[#4F4AE6]' : 'border border-gray-800'
                    }`}
                    onClick={() => handleRoleChange('DAO Member')}
                    type="button"
                  >
                    <span className="text-white text-lg">DAO Member</span>
                    <div className={`h-6 w-6 rounded-full border-2 ${
                      selectedRole === 'DAO Member' ? 'border-[#4F4AE6]' : 'border-gray-500'
                    }`}>
                      {selectedRole === 'DAO Member' && <div className="h-3 w-3 rounded-full bg-[#4F4AE6] mx-auto mt-1"></div>}
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={handleSubmit}
                  disabled={!selectedRole}
                  className={`w-[40%] py-4 px-4 rounded-xl text-white font-medium ${
                    selectedRole ? 'bg-[#4F4AE6] hover:bg-[#36329c]' : 'bg-[#4F4AE6] cursor-not-allowed'
                  } transition-colors`}
                  type="button"
                >
                  SELECT
                </button>
                
                <div className="mt-4 text-center text-sm">
                  <span className="text-gray-400">Don't have an Account? </span>
                  <Link href="/create-account" className="text-[#4F4AE6] hover:underline">
                    Create an Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleSelection;