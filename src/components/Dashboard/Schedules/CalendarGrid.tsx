import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

interface CalendarGridProps {
  currentDate: Date;
  view: 'Day' | 'Week' | 'Month';
}

const WEEKDAYS = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, view }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const events = [
    {
      date: new Date(),
      title: 'Deadline',
      type: 'deadline',
    },
  ];

  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-0 border-[0.5px] border-white/100 rounded-xl">
        {WEEKDAYS.map((day, index) => (
          <div
            key={day}
            className={`p-4 text-center text-sm font-medium text-gray-400 bg-[#2B2B46] ${
              index === 0 ? 'rounded-tl-2xl' : ''
            } ${index === WEEKDAYS.length - 1 ? 'rounded-tr-2xl' : ''}`}
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const dayEvents = events.filter((event) =>
            isSameDay(event.date, day)
          );

          return (
            <div
              key={day.toString()}
              className={`
                min-h-[100px] p-2 border-[0.5px] border-gray-800 flex flex-col justify-between
                ${
                  !isSameMonth(day, currentDate)
                    ? 'bg-[linear-gradient(45deg,transparent_46%,#2C2C6A_49%,#2C2C6A_51%,transparent_55%)] bg-[length:15px_15px] bg-opacity-50'
                    : ''
                }
              `}
            >
              <span
                className={`
                  inline-block w-6 h-6 text-center text-sm rounded-full self-end
                `}
              >
                {format(day, 'd')}
              </span>

              {dayEvents.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={`
                    mb-0 p-2 text-xs
                    ${event.type === 'deadline' ? 'bg-green-500/20 bg-[linear-gradient(45deg,transparent_46%,#22C55E_49%,#22C55E_51%,transparent_55%)] bg-[length:5px_5px] border-l-4 border-l-green-500 text-green-400' : ''}
                  `}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
