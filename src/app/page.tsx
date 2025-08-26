'use client';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import Brand from '../../public/svg/BUDGETCHAIN.svg';
import Land1 from '../../public/svg/landingImage1.svg';
import HowItWorks from '../components/LandingFeature/howItWorks';
import WhyChooseBudgetChain from '../components/LandingFeature/choosebudgetchain';
import Testimonial from '@/components/LandingFeature/testimonial';
import Newsletter from '@/components/LandingFeature/newsletter';
import Footer from '@/components/footer';
import LoginModal from '@/components/ui/login-modal';
import { Suspense, useState } from 'react';
import Loading from './loading';

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleRole = () => {
    router.push('/role-selection');
  };

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full bg-[#050512] overflow-hidden relative">
        <Navbar />
        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center mt-20 px-6 py-16 md:py-24 lg:py-32">
          <h4 className="font-semibold text-gray-300 md:text-[20px]">
            Introducing
          </h4>
          <h1 className="md:text-[64px] text-[30px] font-bold bg-gradient-to-r from-[#c4c4cf] via-[#9493cf] to-[#5B54FF] bg-clip-text text-transparent">
            BUDGETCHAIN
          </h1>
          <p className="mb-8 max-w-2xl text-center text-gray-300">
            Revolutionizing how you manage, allocate, and optimize financial
            resources with real-time insights and AI-driven automation
          </p>
          <div className="w-full flex md:flex-row flex-col gap-4 items-center justify-center">
            <button
              className="md:w-[170px] w-full h-[50px] rounded-[12px] bg-[#050512] border border-[#EBEBEB80] px-4 py-2 text-[#EBEBEB] transition hover:bg-white hover:text-black"
              onClick={handleLoginClick}
            >
              LOGIN
            </button>
            <button
              className="md:w-[170px] w-full h-[50px] rounded-[12px] bg-white px-4 py-2 text-black transition hover:bg-opacity-80"
              onClick={handleRole}
            >
              GET STARTED
            </button>
          </div>
        </main>

        {/* Snapshot Of Dashboard */}
        <div className="w-full p-4 md:p-0 flex flex-col items-center justify-center relative">
          <div
            className="w-full h-full absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 75%, rgba(5, 5, 18, 0.9) 85%, #050512 100%)',
            }}
          ></div>
          <Image
            src="/svg/landingImage1.svg"
            alt="Dashboard Preview"
            width={976}
            height={507}
            className="relative"
          />
        </div>

        {/* How it works */}
        <main className="flex flex-col items-center justify-center">
          <HowItWorks />
        </main>

        {/* Why Choose Budgetchain */}
        <main className="flex flex-col items-center justify-center">
          <WhyChooseBudgetChain />
        </main>

        {/* Testimonials */}
        <main className="flex flex-col items-center justify-center">
          <Testimonial />
        </main>

        {/* Newsletter section */}
        <main className="flex flex-col items-center justify-center">
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer />

        {/* Login Modal */}
        <LoginModal isOpen={loginOpen} onOpenChange={setLoginOpen} />
      </div>
    </Suspense>
  );
}
