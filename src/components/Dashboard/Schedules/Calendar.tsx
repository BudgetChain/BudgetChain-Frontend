'use client';

import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import ScheduleHeader from './ScheduleHeader';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'Day' | 'Week' | 'Month'>('Month');

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="flex gap-6 bg-secondary p-6">
      <div className="w-1/4 rounded-lg ring-2 ring-white/10 p-6">
        <ScheduleHeader />
      </div>
      <div className="flex-1 rounded-lg p-6 ring-2 ring-white/10">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          setView={setView}
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
        />
        <CalendarGrid currentDate={currentDate} view={view} />
      </div>
    </div>
  );
};

export default Calendar;
