'use client';

import React from 'react';
import Image from 'next/image';
import Icon1 from '../../../public/svg/TestImage.svg';

const testimonial = [
  {
    name: 'Poly West',
    icon: <Image src={Icon1} alt="Assets" />,
    title: 'CEO Aligned Surgeries Ltd.',
    feedback:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
    date: '03 January 2026',
  },
  {
    name: 'Poly West',
    icon: <Image src={Icon1} alt="Assets" />,
    title: 'CEO Aligned Surgeries Ltd.',
    feedback:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
    date: '03 January 2026',
  },
  {
    name: 'Poly West',
    icon: <Image src={Icon1} alt="Assets" />,
    title: 'CEO Aligned Surgeries Ltd.',
    feedback:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
    date: '03 January 2026',
  },
  {
    name: 'Poly West',
    icon: <Image src={Icon1} alt="Assets" />,
    title: 'CEO Aligned Surgeries Ltd.',
    feedback:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
    date: '03 January 2026',
  },
  {
    name: 'Poly West',
    icon: <Image src={Icon1} alt="Assets" />,
    title: 'CEO Aligned Surgeries Ltd.',
    feedback:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
    date: '03 January 2026',
  },
  {
    name: 'Poly West',
    icon: <Image src={Icon1} alt="Assets" />,
    title: 'CEO Aligned Surgeries Ltd.',
    feedback:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis.',
    date: '03 January 2026',
  },
];
const Testimonial: React.FC = () => {
  return (
    <section className="py-16 px-8 md:px-16  text-[#848484]">
      <h2 className="text-[16px] font-semibold text-[#ffff] uppercase mb-8">
        What Our Clients Say About Us
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonial.map((testimonial, index) => (
          <div
            key={index}
            className={`${
              index === 1
                ? 'h-[251px]'
                : index === 4
                  ? 'h-[349px] md:-mt-12 mt-0'
                  : 'h-[300px]'
            } p-6 rounded-lg shadow-lg border border-gray-800 flex flex-col`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={Icon1}
                alt={testimonial.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className=" text-sm italic">{testimonial.title}</p>
              </div>
            </div>
            <p className=" text-sm mb-4 flex-grow">{testimonial.feedback}</p>
            <p className=" text-xs mt-auto">{testimonial.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
