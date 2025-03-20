'use client';

import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1.',
      title: 'Register and Connect your Wallet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.',
    },
    {
      number: '2.',
      title: 'Transfer Funds and Make Budget',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.',
    },
    {
      number: '3.',
      title: 'Get AI Insights',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.',
    },
    {
      number: '4.',
      title: 'Monitor & Optimize',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.',
    },
  ];

  return (
    <main className="mt-20  mb-8">
      <h2 className="text-[16px] font-bold text-white uppercase pl-20 ">
        How It Works
      </h2>
      <section className=" text-white flex flex-col items-center justify-center py-16 px-8 md:px-16">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center justify-center space-x-4  gap-10 px-20"
            >
              <div className="flex items-center justify-center w-10 h-10 border border-dashed  rounded-full text-lg font-bold p-10">
                <span className="bg-[#28283A] py-5 px-6 rounded-full ">
                  {step.number}
                </span>
              </div>

              <hr className="border border-dashed text-white w-48" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
