'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WalletSelectionModal from './walletselectionmodal';

// Create validation schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();

  // State for email login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // State for wallet login
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState('');
  const [isWalletSelectionOpen, setIsWalletSelectionOpen] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs using Zod
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // If validation passes, proceed with login
    console.log('Login attempt with:', email);
    setErrors({});
    router.push('/role-selection');
  };

  const handleWalletLogin = () => {
    // Handle wallet login logic here
    console.log(`Logging in with ${walletType} wallet:`, walletAddress);
    router.push('/role-selection');
  };

  const handleWalletSelected = (wallet: string, address: string) => {
    setWalletType(wallet);
    setWalletAddress(address);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-[#050512] text-white border border-[#EBEBEB80]">
          <DialogHeader>
            <DialogTitle className="text-[#4F4AE6] text-2xl font-bold">
              Login To Your Account
            </DialogTitle>
            <DialogDescription className="text-white text-sm">
              To view activity
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid grid-cols-2 w-full bg-[#151523]">
              <TabsTrigger
                value="email"
                className="data-[state=active]:bg-[#4F4AE6]"
              >
                Email
              </TabsTrigger>
              <TabsTrigger
                value="wallet"
                className="data-[state=active]:bg-[#4F4AE6]"
              >
                Wallet
              </TabsTrigger>
            </TabsList>

            {/* Email Login Tab */}
            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="w-full">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm text-left text-[#848484] mb-2"
                  >
                    Enter Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#151523] backdrop-blur-sm border border-gray-800 text-white focus:outline-none focus:border-gray-500"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm text-left text-[#848484] mb-2"
                  >
                    Enter Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#151523] border border-gray-800 text-white focus:outline-none focus:border-gray-500"
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="mb-6 text-left">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#4F4AE6] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-[50%] text-center bg-[#4F4AE6] hover:bg-[#36329c] text-white font-medium py-3 px-4 rounded-xl transition-colors"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </TabsContent>

            {/* Wallet Login Tab */}
            <TabsContent value="wallet">
              <div className="grid gap-4 py-4">
                {walletAddress ? (
                  <div className="bg-[#151523] p-4 rounded-xl border border-gray-800">
                    <div className="text-sm text-[#848484] mb-2">
                      Connected Wallet ({walletType})
                    </div>
                    <div className="font-mono text-sm break-all text-white">
                      {walletAddress}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="mb-4 text-[#848484]">
                      Connect your wallet to continue
                    </p>
                    <button
                      onClick={() => setIsWalletSelectionOpen(true)}
                      className="bg-[#4F4AE6] hover:bg-[#36329c] text-white font-medium py-3 px-6 rounded-xl transition-colors"
                    >
                      Connect Wallet
                    </button>
                  </div>
                )}
              </div>
              {walletAddress && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleWalletLogin}
                    className="w-[50%] text-center bg-[#4F4AE6] hover:bg-[#36329c] text-white font-medium py-3 px-4 rounded-xl transition-colors"
                  >
                    LOGIN WITH WALLET
                  </button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="text-center mt-4 text-sm">
            <span className="text-gray-400">Don&apos;t have an account? </span>
            <Link
              href="/create-account"
              className="text-[#4F4AE6] hover:underline"
            >
              Create an Account
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Wallet Selection Modal */}
      <WalletSelectionModal
        isOpen={isWalletSelectionOpen}
        onOpenChange={setIsWalletSelectionOpen}
        onWalletSelected={handleWalletSelected}
      />
    </>
  );
};

export default LoginModal;
