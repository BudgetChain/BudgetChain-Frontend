import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

interface LoginCredentials {
  walletAddress: string;
  password: string;
}

interface LoginProps {
  onLogin: (credentials: LoginCredentials) => void;
  onBack?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!walletAddress.trim()) {
      setError('Please enter your wallet address');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    
   
    setError('');
    onLogin({ walletAddress, password });
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 w-full">
      <div className="mb-8 text-left">
        <h1 className="text-[#6366F1] text-2xl sm:text-3xl font-semibold mb-2">Login To Your Account</h1>
        <p className="text-gray-400">To View Activity</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-400 text-sm py-2 px-3 bg-red-900 bg-opacity-20 rounded-md">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="wallet" className="block text-sm text-gray-300">
            Starknet Wallet Address/Domain ID
          </label>
          <input
            id="wallet"
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full py-3 px-4 bg-[#232334] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            placeholder="Enter your wallet address"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm text-gray-300">
            Enter Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 bg-[#232334] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            placeholder="••••••••"
          />
          <div className="text-right">
            <Link href="/forgot-password" className="text-[#6366F1] text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#6366F1] text-white rounded-md hover:bg-[#5254cc] transition-colors font-medium"
          >
            LOGIN
          </button>
        </div>
        
        <div className="text-center text-sm">
          <span className="text-gray-400">Don't have an Account? </span>
          <Link href="/create-account" className="text-[#6366F1] hover:underline">
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;