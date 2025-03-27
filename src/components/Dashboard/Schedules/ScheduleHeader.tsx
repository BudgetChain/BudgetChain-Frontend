import React, { useState } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import Button from '@/components/form/Button';
import AddEventModal from './AddEventModal';
import ViewEventModal from './ViewEventModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  avatar?: string;
  reminder: string;
  description?: string;
  native_date: string;
  native_time: string;
}

const ScheduleHeader = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event>({
    title: 'Meeting with BudgetChain',
    date: '23/01/2027',
    time: '4:00 PM UTC',
    location: '56 Davison Space, Room 54\nSpain',
    avatar: '/avatar.svg',
    reminder: 'Daily',
    description: 'Discussion about the new features and roadmap.',
    native_date: '2027-01-23',
    native_time: '16:00',
  });

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    setIsViewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Schedule</h2>
      
      <div className="space-y-4">
        <div 
          className="flex items-start gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors"
          onClick={() => setIsViewModalOpen(true)}
        >
          {currentEvent.avatar && (
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={currentEvent.avatar}
                alt="Avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="font-medium">{currentEvent.title}</h3>
            <p className="text-sm text-gray-400">On {currentEvent.date}, {currentEvent.time}</p>
            <p className="text-sm text-gray-400 whitespace-pre-line">{currentEvent.location}</p>
          </div>
        </div>
      </div>
      <hr className="border-white/10" />

      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="w-full"
      >
        <Plus className="w-5 h-5" />
        Add New Event
      </Button>

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <ViewEventModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onDelete={handleDeleteClick}
        event={currentEvent}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ScheduleHeader; 