'use client';

import React from 'react';
import Image from 'next/image';
import Icon1 from '../../../public/svg/newsletterimage.svg';

const Newsletter: React.FC = () => {
  return (
    <section className="py-16 px-8 md:px-16 bg-gradient-to-r from-indigo-900 via-black to-indigo-900 text-white text-center rounded-2xl w-[80%]">
      <div className="flex flex-col justify-center items-center">
        <Image src={Icon1} alt="People" />
      </div>

      <h3 className="text-sm text-gray-400 uppercase mb-2 mt-5">
        Subscribe to our Newsletter
      </h3>
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        Join over <span className="">10,000+</span> Subscribers who have{' '}
        <br className="hidden md:block" />
        scaled their <span className="">Budget Management Approach</span>
      </h2>
      <div className="w-[400px] mx-auto flex justify-center rounded-lg bg-[#28283A] overflow-hidden p-2">
        <input
          type="email"
          placeholder="Enter Email"
          className="bg-transparent w-64 md:w-80 p-3 text-gray-300 focus:outline-none"
        />
        <button className="px-3 rounded-lg bg-white hover:bg-indigo-600 hover:text-white text-black font-semibold">
          SUBSCRIBE
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
