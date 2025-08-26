'use client';

import React from 'react';
import Image from 'next/image';
import Icon1 from "../../../public/svg/Icons.svg"
import Icon2 from "../../../public/svg/Icons (1).svg"
import Icon4 from "../../../public/svg/Settings.svg"
import Icon3 from "../../../public/svg/Profile.svg"
import { StatCard } from './statsCard';

const stats = [
  {
    icon: <Image src={Icon1} alt="Decentralized Network" />,
    label: "Decentralized Network",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
  },
  {
    label: "Transparent & Secure",
    icon: <Image src={Icon2} alt="Transparent & Secure" />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
  },
  {
    label: "Data-Driven decisions",
    icon: <Image src={Icon3} alt="Data-Driven decisions" />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
  },
  {
    label: "Real-Time Insights",
    icon: <Image src={Icon4} alt="Real-Time Insights" />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
  },
];

const WhyChooseBudgetChain: React.FC = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="mb-12">
        <h2 className="text-white text-[16px] font-semibold mb-2">
          WHY CHOOSE BUDGETCHAIN
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <StatCard {...stats[0]} />
          </div>
          <div className="col-span-12 md:col-span-5">
            <StatCard {...stats[1]} />
          </div>
          
          <div className="col-span-12 md:col-span-5">
            <StatCard {...stats[2]} />
          </div>
          <div className="col-span-12 md:col-span-7">
            <StatCard {...stats[3]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseBudgetChain;