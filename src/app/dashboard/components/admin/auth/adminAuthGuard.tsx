'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AccessDenied from './accessDenied';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const userRole =
    typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
  const router = useRouter();

  useEffect(() => {
    if (!userRole) {
      router.push('/login');
      return;
    }

    // Check if user has admin role
    const checkAdminStatus = async () => {
      try {
        const hasAdminAccess = userRole.toLowerCase() === 'admin';
        setIsAdmin(hasAdminAccess);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [userRole, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
