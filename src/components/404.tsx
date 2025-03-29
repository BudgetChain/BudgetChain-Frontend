import React from 'react';
import NotFoundHeader from './ui/notFoundHeader';
import Image from 'next/image';
import errorimage from '../../public/404image.webp.png';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="text-white relative  overflow-hidden max-h-screen">
      <NotFoundHeader />
      <section className="text-center space-y-4 mt-7">
        <h2 className=" font-bold text-nowrap text-2xl sm:text-3xl mt-12">
          Oops! Page Not Found
        </h2>
        <h4 className="max-w-[33rem] mx-auto text-sm leading-6 px-2">
          The page you're looking for seems to have wandered off... Like a
          budget that got off track! Let’s help you get back to where you need
          to be.
        </h4>
      </section>
      <div className="absolute top-[29%] md:top-[22%] left-1/2 transform -translate-x-1/2 flex items-center justify-center text-[12rem] sm:text-[20rem] md:text-[24rem] lg:text-[28rem] xl:text-[25rem] font-bold text-[#2D3248] opacity-60 w-full -z-10">
        404
      </div>
      <Image
        src={errorimage}
        alt="404_image"
        className=" w-[25rem] h-[-2rem] mx-auto mt-[3rem]"
      />
      <section className="flex flex-row w-full justify-center items-center">
        <div className="absolute bottom-0 h-20 w-[40rem] bg-[#050512] rounded-xl border-[#736fe8] border-solid border-[1px] flex flex-row items-center gap-3 justify-center px-4 py-2">
          <h3>Recommeded Routes:</h3>{' '}
          <ul className="flex flex-row gap-2">
            <Link href={'/'}>Home</Link>/
            <Link href={'/dashboard'}>Dashboard</Link>/
            <Link href={''}>Other link</Link>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
