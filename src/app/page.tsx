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

export default function Home() {
  const router = useRouter();

  const handleRole = () => {
    router.push('/role-selection');
  };


  return (
    <div className="bg-[#050512]">
      <Navbar />
      {/* Hero Section */}
      <main className=" flex flex-col items-center justify-center px-4 py-16 md:py-24 lg:py-32">
        <h1 className="mb-6  font-semibold md:text-[20px]">Introducing</h1>
        <div className="mb-5">
          <Image src={Brand} alt="Brand" />
        </div>
        <p className="mb-8 max-w-2xl text-center text-gray-300">
          Revolutionizing how you manage, allocate, and optimize financial
          resources with real-time insights and AI-driven automation.
        </p>
        <div className="flex space-x-4">

          <button className="w-[170px] h-[50px] rounded-[12px]  border border-[#EBEBEB80] px-4 py-2 transition hover:bg-white hover:text-black"  onClick={handleRole}>
          </button>
          <button className="w-[170px] h-[50px] rounded-[12px] bg-[#050512] border border-[#EBEBEB80] px-4 py-2 text-[#EBEBEB] transition hover:bg-white hover:text-black">

            LOGIN
          </button>
          <button 
            className="w-[170px] h-[50px] rounded-[12px] bg-white px-4 py-2 text-black transition hover:bg-opacity-80"
           
          >
            GET STARTED
          </button>
        </div>
      </main>

      {/* Snapshot Od Dashboard */}

      <main className="flex flex-col items-center justify-center">
        <Image src={Land1} alt="Images" />
      </main>
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
    </div>
  );
}
