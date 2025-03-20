

import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  description: string;
}

export function StatCard({ icon, label, description }: StatCardProps) {
  return (
    <div
      className={` bg-[#131322] cursor-pointer p-6 rounded-lg w-[px]`}
    >
      <div className=" min-h-[60px]  ">
        <div className="min-h-[px] flex justify-end text-end">
          <div
            className={`mb-2  rounded-full h-[66px] w-[66px]  hover:bg-opacity-[50%] bg-opacity-[40%] text-end `}
          >
            {icon}
          </div>
        </div>

        <div>
        
          <p className="text-white text-[13px] md:text-[24px]">{label}</p>
          <p className="text-[#848484] text-[13px] md:text-[14px]">{description}</p>
        </div>
      </div>
    </div>
  );
}
