'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  Coins,
  CreditCard,
  DollarSign,
  Download,
  LineChart,
  PieChart,
  Settings,
  Shield,
  Wallet,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Analytics as ImportedAnalytics } from '@/lib/analytics';
import { LocalAnalytics } from './LocalAnalytics';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Mock data for the demo
const walletData = {
  total: '$203,500,568',
  available: '$117,000.00',
  allocated: '$23,500,517',
};

const transactionHistory = [
  {
    id: 1,
    name: 'Ethereum Transfer',
    amount: '$1,250.00',
    date: 'April 24, 2025',
    status: 'completed',
  },
  {
    id: 2,
    name: 'BTC Purchase',
    amount: '$3,700.00',
    date: 'April 22, 2025',
    status: 'completed',
  },
  {
    id: 3,
    name: 'USDC Deposit',
    amount: '$5,000.00',
    date: 'April 20, 2025',
    status: 'completed',
  },
  {
    id: 4,
    name: 'NFT Purchase',
    amount: '$720.00',
    date: 'April 18, 2025',
    status: 'pending',
  },
];

const budgetCategories = [
  { name: 'Investment', percentage: 40, color: 'bg-blue-500' },
  { name: 'Savings', percentage: 30, color: 'bg-purple-500' },
  { name: 'Expenses', percentage: 20, color: 'bg-green-500' },
  { name: 'Leisure', percentage: 10, color: 'bg-pink-500' },
];

const testimonials = [
  {
    id: 1,
    name: 'Polly West',
    role: 'CEO, Aligned Synergies Ltd',
    content:
      'BudgetChain transformed how we manage our finances. The AI insights are particularly valuable for forecasting and decision-making.',
    avatar: '/avatars/polly-west.png',
    date: '25 January 2025',
  },
  {
    id: 2,
    name: 'Alex Morgan',
    role: 'Finance Director, TechVision',
    content:
      'The transparent and secure platform has significantly improved our financial tracking capabilities and budget allocation efficiency.',
    avatar: '/avatars/alex-morgan.png',
    date: '18 February 2025',
  },
  {
    id: 3,
    name: 'Sam Reynolds',
    role: 'CTO, Blockchain Solutions',
    content:
      'Real-time insights and AI-driven automation have revolutionized our approach to budget management. Highly recommended!',
    avatar: '/avatars/sam-reynolds.png',
    date: '03 March 2025',
  },
];

export default function Demo() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [demoWallet, setDemoWallet] = useState({
    connected: false,
    address: '',
  });

  // Track page view for analytics
  React.useEffect(() => {
    LocalAnalytics.trackPageView('demo_page_view');
  }, []);

  const trackFeatureEngagement = (feature: string) => {
    LocalAnalytics.trackEvent('demo_feature_engagement', { feature });
  };

  const connectWallet = () => {
    setDemoWallet({
      connected: true,
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    });
    trackFeatureEngagement('wallet_connection');
  };

  return (
    <div className="bg-[#050512] mt-32 min-h-screen text-white">
      <Navbar />

      {/* Demo Features */}
      <section id="demo-features" className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="md:text-[64px] text-[30px] font-bold mb-4 bg-gradient-to-r from-[#c4c4cf] via-[#9493cf] to-[#5B54FF] bg-clip-text text-transparent text-center">
            Interactive Demo Features
          </h1>

          <Tabs
            defaultValue="dashboard"
            className="w-full"
            onValueChange={(value) => {
              setActiveTab(value);
              trackFeatureEngagement(`tab_${value}`);
            }}
          >
            <TabsList className="flex gap-4 overflow-x-scroll md:overflow-x-visible scrollbar-hide bg-transparent border-gray-400 border mb-6">
              <TabsTrigger
                value="dashboard"
                className="flex-shrink-0 min-w-[120px] text-center opacity-0 sm:hidden"
              ></TabsTrigger>
              <TabsTrigger
                value="dashboard"
                className="flex-shrink-0 min-w-[120px] text-center opacity-0 sm:hidden"
              ></TabsTrigger>
              <TabsTrigger
                value="dashboard"
                className="flex-shrink-0 min-w-[120px] text-center"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="wallet"
                className="flex-shrink-0 min-w-[120px] text-center"
              >
                Wallet Integration
              </TabsTrigger>
              <TabsTrigger
                value="budget"
                className="flex-shrink-0 min-w-[120px] text-center"
              >
                Budget Management
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="flex-shrink-0 min-w-[120px] text-center"
              >
                AI Insights
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent
              value="dashboard"
              className="border border-gray-800 rounded-lg bg-gray-900/40 p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-300 text-sm">
                      Total Portfolio Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-white">
                      {walletData.total}
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge className="bg-green-600 hover:bg-green-700">
                        +2.4%
                      </Badge>
                      <span className="text-xs text-gray-400 ml-2">
                        from last week
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-300 text-sm">
                      Available Funds
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-white">
                      {walletData.available}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-400">
                        Ready to allocate
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-300 text-sm">
                      Allocated Funds
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-white">
                      {walletData.allocated}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-400">
                        Across 12 budget categories
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <LineChart className="h-5 w-5 mr-2 text-blue-400" />
                      Portfolio Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <BarChart3 className="h-12 w-12 mx-auto mb-3 text-blue-400 opacity-70" />
                      <p>Interactive chart would display here</p>
                      <p className="text-sm mt-2">
                        Shows your financial performance over time
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle className="flex items-center text-white">
                        <PieChart className="h-5 w-5 mr-2 text-blue-400" />
                        Budget Allocation
                      </CardTitle>
                      <Select defaultValue="month">
                        <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-gray-400">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-400">
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="quarter">This Quarter</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {budgetCategories.map((category) => (
                        <div key={category.name} className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>{category.name}</span>
                            <span>{category.percentage}%</span>
                          </div>
                          <Progress
                            value={category.percentage}
                            className={`h-2 ${category.color}`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Clock className="h-5 w-5 mr-2 text-blue-400" />
                      Recent Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactionHistory.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex justify-between items-center border-b border-gray-800 pb-3 last:border-0"
                        >
                          <div className="flex items-center">
                            <div className="bg-blue-900/30 p-2 rounded-full mr-3">
                              <CreditCard className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-400">
                                {transaction.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {transaction.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-400 text-sm mb-3">
                              {transaction.amount}
                            </p>
                            <Badge
                              variant={
                                transaction.status === 'completed'
                                  ? 'default'
                                  : 'outline'
                              }
                              className={
                                transaction.status === 'completed'
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'text-yellow-400 border-yellow-400'
                              }
                            >
                              {transaction.status === 'completed'
                                ? 'Completed'
                                : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
                    <Button
                      variant="outline"
                      className="border-blue-600 text-blue-400 hover:bg-gray-300 duration-500"
                    >
                      View All Transactions
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Wallet Integration Tab */}
            <TabsContent
              value="wallet"
              className="border border-gray-800 rounded-lg bg-gray-900/40 p-6"
            >
              <div className="max-w-2xl mx-auto">
                <Card className="bg-gray-900 border-gray-800 mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Wallet className="h-5 w-5 mr-2 text-blue-400" />
                      Connect Your Wallet
                    </CardTitle>
                    <CardDescription>
                      Securely connect your crypto wallet to access the full
                      features of BudgetChain
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!demoWallet.connected ? (
                      <div className="text-center py-6">
                        <Wallet className="h-16 w-16 mx-auto mb-4 text-blue-400 opacity-70" />
                        <p className="mb-6 text-gray-300">
                          Connect your wallet to start managing your finances
                          with BudgetChain
                        </p>
                        <Button
                          onClick={connectWallet}
                          className="bg-blue-600 hover:bg-blue-700 px-8"
                        >
                          Connect Demo Wallet
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <Alert className="bg-green-900/20 border-green-600 text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <AlertTitle>Wallet Connected</AlertTitle>
                          <AlertDescription>
                            Your wallet has been successfully connected to
                            BudgetChain
                          </AlertDescription>
                        </Alert>

                        <div className="bg-gray-800 p-4 rounded-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-400">
                                Connected Address
                              </p>
                              <p className="font-mono text-gray-300">
                                {demoWallet.address}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-300 hover:bg-gray-700"
                            >
                              <Copy className="h-4 w-4 mr-2" /> Copy
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-gray-800 border-gray-700">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm text-gray-300">
                                Detected Assets
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-xs">
                                      Ξ
                                    </div>
                                    ETH
                                  </span>
                                  <span>2.45 ETH</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-green-600 mr-2 flex items-center justify-center text-xs">
                                      $
                                    </div>
                                    USDC
                                  </span>
                                  <span>5,250 USDC</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-orange-600 mr-2 flex items-center justify-center text-xs">
                                      ₿
                                    </div>
                                    BTC
                                  </span>
                                  <span>0.12 BTC</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800 border-gray-700">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm text-gray-300">
                                Quick Actions
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                                >
                                  <DollarSign className="h-4 w-4 mr-1" />{' '}
                                  Deposit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                                >
                                  <ArrowRight className="h-4 w-4 mr-1" />{' '}
                                  Transfer
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                                >
                                  <Download className="h-4 w-4 mr-1" /> Withdraw
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                                >
                                  <Settings className="h-4 w-4 mr-1" /> Settings
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            setActiveTab('budget');
                            trackFeatureEngagement('proceed_to_budget');
                          }}
                        >
                          Proceed to Budget Management
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-900/30 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Secure & Private
                      </h3>
                      <p className="text-gray-400">
                        BudgetChain never stores your private keys. All
                        connections are secure and encrypted using the latest
                        blockchain security standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-900/30 p-3 rounded-full">
                      <Coins className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Multi-Chain Support
                      </h3>
                      <p className="text-gray-400">
                        Connect wallets from various blockchains including
                        Ethereum, Binance Smart Chain, Solana, and more.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Budget Management Tab */}
            <TabsContent
              value="budget"
              className="border border-gray-800 rounded-lg bg-gray-900/40 p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-1">
                  <Card className="bg-gray-900 border-gray-800 h-full">
                    <CardHeader>
                      <CardTitle className="text-gray-200">
                        Budget Categories
                      </CardTitle>
                      <CardDescription>
                        Create and manage your budget allocations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {budgetCategories.map((category) => (
                        <div
                          key={category.name}
                          className="flex justify-between items-center text-gray-400"
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${category.color} mr-3`}
                            ></div>
                            <span>{category.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{category.percentage}%</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Separator className="my-4" />

                      <div className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full border-blue-600 text-blue-400 hover:bg-blue-900/30 hover:text-gray-200 duration-500 "
                        >
                          + Add New Category
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-gray-200 mb-3">
                            Budget Configuration
                          </CardTitle>
                          <CardDescription>
                            Set up and manage your financial plan
                          </CardDescription>
                        </div>
                        <Select defaultValue="monthly">
                          <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-gray-400">
                            <SelectValue placeholder="Period" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-gray-400">
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="total-budget"
                              className="text-gray-400"
                            >
                              Total Budget Amount
                            </Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="total-budget"
                                placeholder="10,000.00"
                                className="pl-10 bg-gray-800 border-gray-700 text-gray-400"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="budget-start"
                              className="text-gray-400"
                            >
                              Start Date
                            </Label>
                            <Input
                              id="budget-start"
                              type="date"
                              defaultValue="2025-04-01"
                              className="bg-gray-800 border-gray-700 text-gray-400 placeholder:text-gray-400"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-gray-400">
                            Category Allocations
                          </h3>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {budgetCategories.map((category) => (
                              <Card
                                key={category.name}
                                className="bg-gray-800 border-gray-700"
                              >
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm flex items-center">
                                    <div
                                      className={`w-3 h-3 rounded-full ${category.color} mr-2`}
                                    ></div>
                                    {category.name}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                      placeholder="Amount"
                                      className="pl-10 bg-gray-700 border-gray-600"
                                      defaultValue={category.percentage * 100}
                                    />
                                  </div>
                                  <div className="mt-2 text-xs text-gray-400 flex justify-between">
                                    <span>{category.percentage}% of total</span>
                                    <span>
                                      $
                                      {(
                                        (10000 * category.percentage) /
                                        100
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                          <Button
                            variant="outline"
                            className="border-gray-700 text-gray-800 hover:text-gray-200 hover:bg-gray-800 duration-500"
                          >
                            Reset
                          </Button>
                          <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() =>
                              trackFeatureEngagement('save_budget')
                            }
                          >
                            Save Budget Plan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800 mt-6">
                    <CardHeader>
                      <CardTitle className="text-gray-400">
                        Smart Budget Rules
                      </CardTitle>
                      <CardDescription>
                        Automate your budget with blockchain-powered rules
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Alert className="bg-blue-900/20 border-blue-600">
                          <AlertCircle className="h-4 w-4 text-blue-400" />
                          <AlertTitle className="text-gray-700">
                            Smart Budget Rules
                          </AlertTitle>
                          <AlertDescription className="text-gray-700">
                            Create automated rules that trigger actions based on
                            your financial activity
                          </AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-gray-800 border-gray-700">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-sm text-gray-300">
                                  Monthly Auto-Invest
                                </CardTitle>
                                <Badge className="bg-green-600">Active</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-300">
                              Automatically invest 10% of incoming funds into
                              ETH when balance exceeds $1,000
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800 border-gray-700">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-sm text-gray-300">
                                  Emergency Fund
                                </CardTitle>
                                <Badge className="bg-green-600">Active</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-300">
                              Allocate 5% of all incoming funds to emergency
                              fund until it reaches $5,000
                            </CardContent>
                          </Card>
                        </div>

                        <div className="pt-2">
                          <Button
                            variant="outline"
                            className="w-full border-blue-600 text-blue-400 hover:bg-blue-900/30 hover:text-gray-200"
                            onClick={() =>
                              trackFeatureEngagement('add_budget_rule')
                            }
                          >
                            + Create New Rule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent
              value="insights"
              className="border border-gray-800 rounded-lg bg-gray-900/40 p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card className="bg-gray-900 border-gray-800 h-full">
                    <CardHeader>
                      <CardTitle className="text-gray-200">
                        AI Financial Assistant
                      </CardTitle>
                      <CardDescription>
                        Get personalized insights and recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                        <h3 className="text-sm font-medium mb-2 text-gray-300">
                          Available AI Tools
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="bg-blue-900/30 p-2 rounded-full mr-3">
                              <LineChart className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-400">
                                Spending Analysis
                              </p>
                              <p className="text-[10px] text-gray-400">
                                Get insights on your spending habits
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <div className="bg-blue-900/30 p-2 rounded-full mr-3">
                              <BarChart3 className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-400">
                                Budget Optimization
                              </p>
                              <p className="text-[10px] text-gray-400">
                                AI recommendations for budget adjustments
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <div className="bg-blue-900/30 p-2 rounded-full mr-3">
                              <PieChart className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-400">
                                Investment Suggestions
                              </p>
                              <p className="text-[10px] text-gray-400">
                                Personalized investment advice
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                        <h3 className="text-sm font-medium mb-2 text-gray-200">
                          AI Model Settings
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">
                              Risk Tolerance
                            </span>
                            <Select defaultValue="medium">
                              <SelectTrigger className="w-24 h-8 text-xs bg-gray-700 border-gray-600 text-gray-400">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-gray-400">
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">
                              Analysis Timeframe
                            </span>
                            <Select defaultValue="month">
                              <SelectTrigger className="w-24 h-8 text-xs bg-gray-700 border-gray-600 text-gray-400">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-gray-400">
                                <SelectItem value="week">Weekly</SelectItem>
                                <SelectItem value="month">Monthly</SelectItem>
                                <SelectItem value="quarter">
                                  Quarterly
                                </SelectItem>
                                <SelectItem value="year">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">
                              Notification Frequency
                            </span>
                            <Select defaultValue="daily">
                              <SelectTrigger className="w-24 h-8 text-xs bg-gray-700 border-gray-600 text-gray-400">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-gray-400">
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="biweekly">
                                  Biweekly
                                </SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() =>
                          trackFeatureEngagement('generate_insights')
                        }
                      >
                        Generate New Insights
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card className="bg-gray-900 border-gray-800 mb-6">
                    <CardHeader>
                      <CardTitle className="text-gray-200 mb-2">
                        AI-Powered Financial Insights
                      </CardTitle>
                      <CardDescription>
                        Smart analysis based on your financial data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <Alert className="bg-blue-900/20 border-blue-600 text-gray-700">
                          <AlertCircle className="h-4 w-4 text-blue-400" />
                          <AlertTitle>Demo Mode Active</AlertTitle>
                          <AlertDescription>
                            These are sample insights based on demo data.
                            Connect your wallet for personalized insights.
                          </AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-gray-800 border-gray-700">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm flex items-center text-gray-300">
                                <LineChart className="h-4 w-4 mr-2 text-blue-400" />
                                Spending Trend Analysis
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-32 flex items-center justify-center mb-3">
                                <div className="text-center text-gray-400">
                                  <LineChart className="h-8 w-8 mx-auto mb-2 text-blue-400 opacity-70" />
                                  <p className="text-xs">
                                    Interactive chart would display here
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-300">
                                <span className="text-blue-400 font-medium">
                                  Analysis:
                                </span>{' '}
                                Your spending has increased by 12% in
                                entertainment categories while decreasing in
                                utilities.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800 border-gray-700">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm flex items-center text-gray-300">
                                <BarChart3 className="h-4 w-4 mr-2 text-blue-400" />
                                Budget Variance
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-32 flex items-center justify-center mb-3">
                                <div className="text-center text-gray-400">
                                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-400 opacity-70" />
                                  <p className="text-xs">
                                    Interactive chart would display here
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-300">
                                <span className="text-blue-400 font-medium">
                                  Analysis:
                                </span>{' '}
                                Your Investment category is under budget by 15%,
                                while Leisure is over budget by 8%.
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-gray-800 border-gray-700">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-gray-300">
                              AI Recommendations
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-start space-x-3">
                                <div className="bg-green-900/30 p-2 rounded-full mt-1">
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-green-400">
                                    Savings Opportunity
                                  </p>
                                  <p className="text-sm text-gray-300">
                                    Consider shifting 5% of your leisure budget
                                    to your investment category to meet your
                                    long-term goals.
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="bg-blue-900/30 p-2 rounded-full mt-1">
                                  <AlertCircle className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-blue-400">
                                    Portfolio Rebalancing
                                  </p>
                                  <p className="text-sm text-gray-300">
                                    Based on current market conditions, consider
                                    reallocating 10% from your BTC holdings to
                                    ETH.
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="bg-orange-900/30 p-2 rounded-full mt-1">
                                  <AlertCircle className="h-4 w-4 text-orange-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-orange-400">
                                    Budget Alert
                                  </p>
                                  <p className="text-sm text-gray-300">
                                    Your leisure category is trending 8% over
                                    budget. Consider adjusting spending or
                                    increasing the budget allocation.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex justify-end space-x-3">
                          <Button
                            variant="outline"
                            className="border-blue-600 text-blue-400 hover:bg-blue-900/30"
                            onClick={() =>
                              trackFeatureEngagement('download_insights')
                            }
                          >
                            <Download className="h-4 w-4 mr-2" /> Download
                            Report
                          </Button>
                          <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() =>
                              trackFeatureEngagement('apply_recommendations')
                            }
                          >
                            Apply Recommendations
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-gray-200">
                        Future Projections
                      </CardTitle>
                      <CardDescription>
                        AI predictions based on your financial behavior
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center mb-6">
                        <div className="text-center text-gray-400">
                          <LineChart className="h-12 w-12 mx-auto mb-3 text-blue-400 opacity-70" />
                          <p>Projection chart would display here</p>
                          <p className="text-sm mt-2">
                            Shows future financial forecasts based on current
                            trends
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-900/30 p-2 rounded-full mt-1">
                            <LineChart className="h-4 w-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-300">
                              6-Month Forecast
                            </p>
                            <p className="text-sm text-gray-300">
                              If current trends continue, your portfolio value
                              is projected to increase by 18% over the next 6
                              months.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-900/30 p-2 rounded-full mt-1">
                            <CreditCard className="h-4 w-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-300">
                              Spending Projection
                            </p>
                            <p className="text-sm text-gray-300">
                              Your current spending patterns suggest you'll need
                              to increase your monthly budget by 5% in Q3 2025.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Mock function for a non-existing component
const Copy = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
};
