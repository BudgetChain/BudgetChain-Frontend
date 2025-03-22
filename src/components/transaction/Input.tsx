import React, { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  fixed?: boolean;
  error?: string;
  readonly?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  fixed,
  error,
}) => {
  return (
    <div>
      <div className="w-[244px] col-span-1 flex flex-col ">
        <label className="text-[#4F4AE6] text-[16px] font-thin pb-1">
          {label}
        </label>
        <div className="flex items-center gap-2 text-[#848484]">
          <input
            className="outline-none border-none  bg-[#28283A] py-[10px] rounded-[5px] text-center placeholder-[#848484] text-[#848484]"
            id={label}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          {fixed && <span>*Fixed</span>}
        </div>
        {error && <span className="text-[#E20008] text-[12px]">{error}</span>}
      </div>
    </div>
  );
};

export default Input;