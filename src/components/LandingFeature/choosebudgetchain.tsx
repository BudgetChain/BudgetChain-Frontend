

'use client';

import React from 'react';
import Image from 'next/image';
import { ReactNode } from "react";
import Icon1 from "../../../public/svg/Icons.svg"
import Icon2 from "../../../public/svg/Icons (1).svg"
import Icon3 from "../../../public/svg/Settings.svg"
import Icon4 from "../../../public/svg/Profile.svg"
import { StatCard } from './statsCard';



const stats = [
  {
   
    icon: <Image src={Icon1} alt="Assets"  />,
    label: "Decentralized Network",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
   
  },
  {
  
    label: "Transparent & Secure ",
    icon: <Image src={Icon2} alt="Assets" />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
  },
  {

    label: "Data-Driven decisions",
    icon: <Image src={Icon3} alt="Assets"  />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
  },
  {
  
    label: "Real-Time Insights",
    icon: <Image src={Icon4} alt="Assets" />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
  },

];


const WhyChooseBudgetChain: React.FC = () => {
  return(
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mx-10">
    {stats.map((stat, index) => (
      <StatCard key={index} {...stat} />
    ))}
  </div>
    </>
  )}
     export default WhyChooseBudgetChain;

