import React from 'react';
import NotFoundHeader from './ui/notFoundHeader';

const NotFound = () => {
  return (
    <div className="text-white">
      <NotFoundHeader />
      <section className="text-center space-y-3 mt-5">
        <h2 className=" font-bold text-nowrap text-2xl sm:text-3xl mt-12">
          Oops! Page Not Found
        </h2>
        <h4 className="max-w-[33rem] mx-auto text-sm leading-6">
          The page you're looking for seems to have wandered off... Like a
          budget that got off track! Let’s help you get back to where you need
          to be.
        </h4>
      </section>
      <div className="absolute top-[22%] left-1/2 transform -translate-x-1/2 flex items-center justify-center text-[24rem] lg:text-[28rem] xl:text-[22rem] font-bold text-[#2D3248] opacity-60 select-none w-full -z-10">
        404
      </div>
    </div>
  );
};

export default NotFound;
