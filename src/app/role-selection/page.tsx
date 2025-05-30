'use client';

import RoleSelection from '@/components/auth/RoleSelection';
import { useRouter } from 'next/navigation';

export default function RoleSelectionPage() {
  const router = useRouter();
  
  const handleRoleSelect = (role: 'Investor' | 'Admin' | 'DAO Member' | '') => {
    
    localStorage.setItem('userRole', role);
  };
  
  const handleNext = () => {
   
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#050512] flex items-center justify-center">
      <RoleSelection onRoleSelect={handleRoleSelect} onNext={handleNext} />
    </div>
  );
}