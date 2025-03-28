'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import Navbar from '@/components/navbar';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      
      const fieldErrors: any = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    console.log('Login attempt with:', email);
    setErrors({}); 
  };

  return (
    <div className="min-h-screen bg-[#050512] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex my-10 items-center justify-center p-4">
        <div className="w-full space-y-8 max-w-[1010px]">
          <div className="mb-4 text-center lg:text-left">
            <h1 className="text-[#4F4AE6] text-2xl font-bold mb-1">Login To Your Account</h1>
            <p className="text-white text-sm">To view activity</p>
          </div>
          
          <div className="gap-12 flex lg:justify-end">
            <form onSubmit={handleSubmit} className="lg:w-[60%] w-full text-center">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-left text-[#848484] mb-2">Enter Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#151523] backdrop-blur-sm border border-gray-800 text-white focus:outline-none focus:border-gray-500"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm text-left text-[#848484] mb-2">Enter Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#151523] border border-gray-800 text-white focus:outline-none focus:border-gray-500"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              
              <div className="mb-6 text-left">
                <a href="/forgot-password" className="text-sm text-[#4F4AE6] hover:underline">Forgot Password?</a>
              </div>
              
              <button
                type="submit"
                className="w-[50%] text-center bg-[#4F4AE6] hover:bg-[#36329c] text-white font-medium py-3 px-4 rounded-xl transition-colors"
              >
                LOGIN
              </button>
              
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-400">Don't have an account? </span>
                <a href="/create-account" className="text-[#4F4AE6] hover:underline">Create an Account</a>
              </div>
            </form>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default LoginPage;