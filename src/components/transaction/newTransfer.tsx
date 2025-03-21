import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function NewTransfer() {
  return (
    <section>
      <div>
        <button>
          <ArrowLeft />
        </button>
      </div>
      <div className="shadow-[0px_0px_4px_0px_#EBEBEB40] rounded-[12px] p-[30px]">
        <form className="w-1/2 flex-wrap font-['Montserrat'] flex" action="">
        <div className="w-[244px] flex flex-col">
            <label
              className="text-[#4F4AE6] text-[16px]"
              htmlFor="date"
            >
              Date
            </label>
            <div className="flex items-center gap-2 text-[#848484]">
              <div className="flex gap-2 rounded-[5px]  p-[10px]  bg-[#28283A] ">
                <input
                  className="outline-none border-none text-center bg-transparent placeholder-[#848484] text-[#848484]"
                  type="text"
                  name="date"
                  id="date"
                  placeholder='19/02/2027'
                />
              </div>
              <span>*Fixed</span>
            </div>
          </div>
          <div className="w-[244px] flex flex-col">
            <label
              className="text-[#4F4AE6] text-[16px]"
              htmlFor="date"
            >
              Date
            </label>
            <div className="flex items-center gap-2 text-[#848484]">
              <div className="flex gap-2 rounded-[5px]  p-[10px]  bg-[#28283A] ">
                <input
                  className="outline-none border-none text-center bg-transparent placeholder-[#848484] text-[#848484]"
                  type="text"
                  name="date"
                  id="date"
                  placeholder='19/02/2027'
                />
              </div>
              <span>*Fixed</span>
            </div>
          </div>
          <div className="w-[244px] flex flex-col">
            <label
              className="text-[#4F4AE6] text-[16px]"
              htmlFor="date"
            >
              Date
            </label>
            <div className="flex items-center gap-2 text-[#848484]">
              <div className="flex gap-2 rounded-[5px]  p-[10px]  bg-[#28283A] ">
                <input
                  className="outline-none border-none text-center bg-transparent placeholder-[#848484] text-[#848484]"
                  type="text"
                  name="date"
                  id="date"
                  placeholder='19/02/2027'
                />
              </div>
              <span>*Fixed</span>
            </div>
          </div>
          <div className="w-[244px] flex flex-col">
            <label
              className="text-[#4F4AE6] text-[16px]"
              htmlFor="date"
            >
              Date
            </label>
            <div className="flex items-center gap-2 text-[#848484]">
              <div className="flex gap-2 rounded-[5px]  p-[10px]  bg-[#28283A] ">
                <input
                  className="outline-none border-none text-center bg-transparent placeholder-[#848484] text-[#848484]"
                  type="text"
                  name="date"
                  id="date"
                  placeholder='19/02/2027'
                />
              </div>
              <span>*Fixed</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
