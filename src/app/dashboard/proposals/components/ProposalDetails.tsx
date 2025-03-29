import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProposalDetailsProps {
  setSelectedProposal: (value: null | number) => void;
}

const ProposalDetails: React.FC<ProposalDetailsProps> = ({
  setSelectedProposal,
}) => {
  const [comments] = useState([
    {
      user: 'BC1',
      text: 'You know this is very unprofessional of you right? Stating with the facts that you’re requesting a large amount of money. Why should we add more money to what you stated at first?',
      time: '8:12 PM UTC',
      date: '18/02/2027',
    },
    {
      user: 'BC',
      text: 'Will you still be able to deliver in 5 days time? Because your deadline is fast approaching.',
      time: '8:00 PM UTC',
      date: '18/02/2027',
    },
  ]);

  return (
    <div className="max-w-full">
      <span
        className="cursor-pointer"
        onClick={() => setSelectedProposal(null)}
      >
        <ArrowLeft className="ml-3" />
      </span>

      <div className="border border-[#EBEBEB40] text-white p-6 rounded-lg shadow-lg mt-3 max-w-full mx-3 space-y-6">
        <div className=" p-6 rounded-lg">
          <p className="text-gray-400 pl-6 pb-3 md:pl-16">Pending Appeal</p>
          <div className=" text-center space-y-4">
            <h2 className="text-[#4F4AE6] text-lg font-semibold">Request of</h2>
            <p className="text-2xl font-bold">$20,000</p>
            <p className="text-gray-400 pt-2 pb-8">
              From <span className="text-white">Ndida DAO</span>
            </p>
          </div>

          <hr className="border-gray-700 my-4" />

          <div className=" text-center py-10 md:py-28 border-b border-gray-700 my-4">
            <h3 className="font-bold text-lg pb-8">REQUEST FOR MORE FUNDS</h3>
            <p className="text-gray-400 italic w-full mx-auto leading-8 md:w-[840px]">
              Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas, ac scelerisque ante pulvinar. Donec ut
              rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur
              vel bibendum lorem. Morbi convallis convallis diam sit amet
              lacinia. Aliquam in elementum tellus....
            </p>
            <p className="text-[#4F4AE6] font-semibold text-sm mt-5 cursor-pointer">
              READ MORE
            </p>
          </div>
        </div>

        <div className=" p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Write a Comment</h3>

          <div className="space-y-4 mt-4">
            {comments.map((comment, index) => (
              <div key={index} className=" p-4 rounded-lg">
                <div className="flex items-center w-full justify-">
                  {comment.user === 'BC' ? (
                    <span className="items-center gap-2 mr-3">
                      <span className="bg-white w-full text-[#4F4AE6] px-2 py-2 rounded-full text-xs">
                        {comment.user}
                      </span>
                    </span>
                  ) : (
                    <span className=" invisible items-center gap-2 mr-3">
                      <span className="bg-white text-[#4F4AE6] px-2 py-2 rounded-full text-xs">
                        {comment.user}
                      </span>
                    </span>
                  )}
                  <p className="text-[#848484] text-sm w-full rounded-lg border border-[#42415B] p-4">
                    {comment.text}
                  </p>
                </div>
                <div className="flex justify-end items-center text-gray-500 text-xs mt-2">
                  <span>
                    {comment.time} <br /> {comment.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm text-white px-3 cursor-pointer font-semibold">
              Reply
            </p>
            <div className="flex justify-between items-center p-2 rounded-lg mt-1">
              <span className="bg-white text-[#4F4AE6] mr-3 px-2.5 py-2.5 text-sm rounded-full">
                NP
              </span>
              <input
                type="text"
                placeholder="Write a comment"
                className="bg-transparent rounded-lg border border-[#42415B] p-4 flex-1 px-3 text-white outline-none"
              />
            </div>
            <span className="flex flex-col justify items-end text-gray-500 text-xs mt-2 mr-2">
              <p>8:00 PM UTC</p>
              <span>18/02/2027</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;
