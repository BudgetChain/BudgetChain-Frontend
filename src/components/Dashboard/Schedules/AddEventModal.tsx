import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Input from '@/components/form/Input';
import Button from '@/components/form/Button';
import TextArea from '@/components/form/TextArea';
import Select from '@/components/form/Select';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reminderOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center z-50
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'bg-black/30 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}
      `}
      onClick={onClose}
    >
      <div
        className={`
          bg-[#171721] rounded-2xl w-full max-w-lg p-6 relative
          transition-all duration-300 ease-in-out
          ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8 relative">
          <h2 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2">
            Add Event
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" placeholder="Enter Date here" />
            <Input label="Time" type="time" placeholder="Enter Time here" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Title of Event" placeholder="Enter Event name here" />

            <Select label="Reminder" options={reminderOptions} />
          </div>

          <TextArea
            label="Description/Note"
            placeholder="Write Details of what you'll be using the funds for"
          />

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="transition-transform hover:scale-[1.02] active:scale-[0.98] w-full"
            >
              Add Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
