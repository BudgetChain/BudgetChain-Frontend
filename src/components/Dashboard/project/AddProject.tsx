import React from 'react';
import Button from '@/components/form/Button';
import Input from '@/components/form/Input';
import TextArea from '@/components/form/TextArea';
import Select from '@/components/form/Select';

interface AddProjectProps {
  onBack: () => void;
}

const AddProject: React.FC<AddProjectProps> = ({ onBack }) => {
  return (
    <div className="space-y-6">
      <button
        className="flex items-center text-gray-400 hover:text-white"
        onClick={onBack}
      >
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </button>

      <div className="ring-2 ring-white/10 rounded-lg p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Date
                  </label>
                  <Input type="text" value="19/02/2027" disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Project
                  </label>
                  <Input type="text" placeholder="Name of Project" />
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Time
                  </label>
                  <Input type="text" value="8:00 PM UTC" disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Total Amount
                  </label>
                  <div className="flex gap-2">
                    <Input type="text" placeholder="$***" />
                    <Select
                      options={[
                        { value: 'USDC', label: 'USDC' },
                        { value: 'STRK', label: 'STRK' },
                        { value: 'FIAT', label: 'FIAT' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description/Note
            </label>
            <TextArea
              placeholder="Write Details of what you'll be using the funds for"
              rows={6}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Make Request</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
