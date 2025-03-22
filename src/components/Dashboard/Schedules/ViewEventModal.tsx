import React, { useEffect, useState } from 'react';
import { X, Trash2, Edit } from 'lucide-react';
import Button from '@/components/form/Button';
import Input from '@/components/form/Input';
import TextArea from '@/components/form/TextArea';
import Select from '@/components/form/Select';

interface ViewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  event: {
    title: string;
    date: string;
    time: string;
    location: string;
    description?: string;
    reminder: string;
    native_date: string;
    native_time: string;
  };
}

const reminderOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const ViewEventModal: React.FC<ViewEventModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  event,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(event);

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

  useEffect(() => {
    setFormData(event);
  }, [event]);

  if (!shouldRender) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
            Your Schedule
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
            <Input
              label="Date"
              type="date"
              name="native_date"
              value={formData.native_date}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Time"
              type="time"
              name="native_time"
              value={formData.native_time}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Select
              label="Reminder"
              name="reminder"
              value={formData.reminder}
              onChange={handleChange}
              options={reminderOptions}
              disabled={!isEditing}
            />
          </div>

          <TextArea
            label="Description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="w-4 h-4" />
              Edit Event
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1 !bg-red-500/10 !text-red-500 hover:!bg-red-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
              Delete Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewEventModal;
