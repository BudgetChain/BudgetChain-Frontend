import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const ProposalForm = () => {
  const [appealSpecification, setAppealSpecification] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <span className="cursor-pointer">
        <ArrowLeft className="my-3" />
      </span>

      <div className="bg-transparent text-white p-6 md:p-10 rounded-lg max-w-full my-4 mx-auto border border-gray-800">
        <div className="max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[#4F4AE6] mb-2">Date</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value="19/02/2027"
                  disabled
                  className="w-full text-[#848484] bg-[#28283A] p-2 rounded-md"
                />
                <span className="text-[#848484] text-sm">*Fixed</span>
              </div>
            </div>

            <div>
              <label className="block text-[#4F4AE6] mb-2">Time</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value="8:00 PM UTC"
                  disabled
                  className="w-full text-[#848484] bg-[#28283A] p-2 rounded-md"
                />
                <span className="text-[#848484] text-sm">*Fixed</span>
              </div>
            </div>

            <div className="relative">
              <label className="block text-[#4F4AE6] mb-2">
                Appeal Specification
              </label>
              <div
                className="w-full bg-[#28283A] text-[#848484] p-2 rounded-md cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {appealSpecification || 'Select specification'}
              </div>

              {showDropdown && (
                <div className="absolute w-full bg-gray-900 mt-1 rounded-md shadow-lg overflow-hidden">
                  <div
                    className="p-2 w-full hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setAppealSpecification('More Funds');
                      setShowDropdown(false);
                    }}
                  >
                    More Funds
                  </div>
                  <div
                    className="p-2 w-full hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setAppealSpecification('More Time');
                      setShowDropdown(false);
                    }}
                  >
                    More Time
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-[#4F4AE6] mb-2">Project</label>
              <div className="flex items-center  space-x-2">
                <input
                  type="text"
                  value="Ndidas"
                  disabled
                  className="w-full bg-[#28283A] text-[#848484] p-2 rounded-md"
                />
                <span className="text-[#848484] text-sm">*Fixed</span>
              </div>
            </div>

            <div>
              <label className="block text-[#4F4AE6] mb-2">Amount</label>
              <div className="flex justify-between items-center w-full bg-[#28283A] p-2 rounded-md">
                <input
                  type="text"
                  value="$****"
                  disabled
                  className="bg-[#28283A] text-[#848484] w-fit p-2 rounded-md"
                />
                <select className="text-[#848484] bg-transparent outline-none p-2 rounded-md">
                  <option>USDC</option>
                  <option>USDT</option>
                </select>
              </div>
            </div>

            {appealSpecification == 'More Funds' && (
              <div>
                <label className="block text-[#4F4AE6] mb-2">Amount</label>
                <div className="flex justify-between items-center w-full bg-[#28283A] p-2 rounded-md">
                  <input
                    type="text"
                    value="$****"
                    disabled
                    className="bg-[#28283A] text-[#848484] w-fit p-2 rounded-md"
                  />
                  <select className="text-[#848484] bg-transparent outline-none p-2 rounded-md">
                    <option>USDC</option>
                    <option>USDT</option>
                  </select>
                </div>
              </div>
            )}

            {appealSpecification == 'More Time' && (
              <div>
                <label className="block text-[#4F4AE6] mb-2">How Long</label>
                <div className="flex justify-between items-center w-full bg-[#28283A] p-2 rounded-md">
                  <input
                    type="text"
                    value="Be Specific"
                    disabled
                    className="bg-[#28283A] text-center text-[#848484] w-full p-2 rounded-md"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <label className="block text-[#4F4AE6] mb-2">
              Description/Note
            </label>
            <textarea
              className="w-full bg-[#28283A] text-[#848484] p-2 rounded-md h-72"
              placeholder="Write details of what you'll be using the funds for"
            ></textarea>
          </div>

          <button className="mt-6 bg-[#4F4AE6] py-2.5 md:px-16 px-6 rounded-md">
            Make Appeal
          </button>
        </div>
      </div>
    </>
  );
};

export default ProposalForm;
