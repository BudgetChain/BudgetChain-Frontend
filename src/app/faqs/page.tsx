'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const faqData = [
    {
      category: 'product',
      questions: [
        {
          question: 'What is BudgetChain?',
          answer:
            'BudgetChain is a revolutionary budgeting application that leverages blockchain technology to provide unparalleled security, transparency, and automation for personal and business finances. Our platform helps users track expenses, set savings goals, and analyze spending patterns with advanced cryptographic protection.',
        },
        {
          question: 'What makes BudgetChain different?',
          answer:
            "Unlike traditional budgeting apps, BudgetChain utilizes decentralized blockchain technology to ensure your financial data is immutable and secure. Our smart contract automation allows for advanced budgeting rules, automatic savings, and verifiable transaction histories that can't be altered or deleted.",
        },
        {
          question: 'How do I get started?',
          answer:
            "Getting started with BudgetChain is simple: 1) Download the app from our website or your device's app store, 2) Create your secure account using our blockchain-based identity verification, 3) Connect your financial accounts or enter transactions manually, 4) Set up your budget categories and savings goals, 5) Start tracking with our intuitive dashboard.",
        },
      ],
    },
    {
      category: 'blockchain',
      questions: [
        {
          question: 'How does blockchain improve budget management?',
          answer:
            'Blockchain technology enhances budget management in several key ways: 1) Immutable transaction records prevent tampering with financial history, 2) Smart contracts enable automatic budget rule enforcement, 3) Decentralized storage eliminates single points of failure, 4) Cryptographic security protects sensitive financial data, 5) Transparent audit trails provide verifiable spending records.',
        },
        {
          question: 'Do I need cryptocurrency to use BudgetChain?',
          answer:
            'No, BudgetChain is designed for traditional fiat currency users. While we utilize blockchain technology for security and automation, you can manage your regular bank accounts and credit cards without any cryptocurrency knowledge or investment. Our blockchain integration works behind the scenes to enhance your experience.',
        },
      ],
    },
    {
      category: 'security',
      questions: [
        {
          question: 'Is my financial data secure?',
          answer:
            "Absolutely. BudgetChain employs multiple layers of security: 1) End-to-end encryption for all data transmissions, 2) Blockchain-based storage that's resistant to hacking, 3) Zero-knowledge proof authentication that never stores your credentials, 4) Optional biometric login for mobile devices, 5) Regular third-party security audits. Your data is protected with military-grade cryptography.",
        },
        {
          question: 'Who has access to my financial information?',
          answer:
            'Only you have access to your complete financial information. BudgetChain uses advanced cryptographic techniques to ensure that even our engineers cannot view your sensitive data. When using bank connections, we follow strict read-only protocols and never store your banking login credentials. You maintain complete control over your data at all times.',
        },
      ],
    },
    {
      category: 'technical',
      questions: [
        {
          question: 'What devices and platforms does BudgetChain support?',
          answer:
            'BudgetChain is available across all major platforms: 1) iOS and Android mobile apps, 2) Web application accessible from any modern browser, 3) Desktop applications for Windows and macOS. All versions sync seamlessly via our blockchain backend. We also offer browser extensions for quick transaction entry and API access for enterprise users.',
        },
        {
          question: 'How often is my data synced across devices?',
          answer:
            'BudgetChain performs real-time synchronization thanks to our blockchain infrastructure. Any change made on one device is propagated to the network and reflected on all your other devices typically within 2-5 seconds. For bank transactions, we refresh connected accounts every 4 hours or immediately when you manually trigger a refresh.',
        },
      ],
    },
    {
      category: 'pricing',
      questions: [
        {
          question: 'What pricing plans are available?',
          answer:
            'BudgetChain offers three tiers: 1) Free Plan - Basic budgeting with manual entry and limited history, 2) Premium ($9.99/month) - Automatic bank connections, advanced analytics, and smart contract rules, 3) Enterprise (custom pricing) - For businesses with team features and API access. All plans include our blockchain security features.',
        },
        {
          question: 'Is there a free trial available?',
          answer:
            'Yes, we offer a 30-day free trial of our Premium plan with no credit card required. This gives you full access to all features including bank connections, automated rules, and unlimited transaction history. After the trial period, you can choose to continue with Premium or switch to our Free plan without losing any data.',
        },
      ],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'product', name: 'Product Features' },
    { id: 'technical', name: 'Technical Questions' },
    { id: 'blockchain', name: 'Blockchain Integration' },
    { id: 'security', name: 'Security and Privacy' },
    { id: 'pricing', name: 'Pricing and Plans' },
  ];

  const toggleQuestion = (index: string) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const filteredData = faqData
    .filter(
      (section) =>
        activeCategory === 'all' || section.category === activeCategory
    )
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.questions.length > 0);

  const hasResults = filteredData.length > 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#050512] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto md:mt-32 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="md:text-[64px] text-[30px] font-bold mb-4 bg-gradient-to-r from-[#c4c4cf] via-[#9493cf] to-[#5B54FF] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Find quick answers to common questions about BudgetChain. Can't
              find what you're looking for? Contact our support team.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category.id
                      ? 'bg-indigo-500 text-white shadow-md'
                      : ' bg-transparent text-gray-200 border border-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {!hasResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {hasResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {filteredData.map((section) => (
                  <motion.section
                    key={section.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className=" bg-transparent border text-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-200">
                        {
                          categories.find((c) => c.id === section.category)
                            ?.name
                        }
                      </h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {section.questions.map((item, index) => (
                        <div key={index} className="px-6 py-4">
                          <button
                            onClick={() =>
                              toggleQuestion(`${section.category}-${index}`)
                            }
                            className="w-full flex justify-between items-center text-left"
                          >
                            <h3 className="text-lg font-medium text-gray-100">
                              {item.question}
                            </h3>
                            <ChevronDown
                              className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                                activeQuestion ===
                                `${section.category}-${index}`
                                  ? 'rotate-180'
                                  : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {activeQuestion ===
                              `${section.category}-${index}` && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2"
                              >
                                <p className="text-gray-100">{item.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
