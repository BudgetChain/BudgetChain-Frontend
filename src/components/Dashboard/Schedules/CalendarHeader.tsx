import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  view: 'Day' | 'Week' | 'Month';
  setView: (view: 'Day' | 'Week' | 'Month') => void;
  onPrevious: () => void;
  onNext: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  setView,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <span className="text-gray-400">
          Today: {format(new Date(), 'MM/dd/yyyy')}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          className="p-1 hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button onClick={onNext} className="p-1 hover:bg-gray-700 rounded-full">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="flex gap-2 bg-[#2B2B46] rounded-lg p-1">
        <button
          onClick={() => setView('Day')}
          className={`px-4 py-1 rounded-md ${
            view === 'Day' ? 'bg-white text-black' : 'text-gray-400'
          }`}
        >
          Day
        </button>
        <button
          onClick={() => setView('Week')}
          className={`px-4 py-1 rounded-md ${
            view === 'Week' ? 'bg-white text-black' : 'text-gray-400'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setView('Month')}
          className={`px-4 py-1 rounded-md ${
            view === 'Month' ? 'bg-white text-black' : 'text-gray-400'
          }`}
        >
          Month
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
