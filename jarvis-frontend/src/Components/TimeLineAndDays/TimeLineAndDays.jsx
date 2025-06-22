import React from 'react';
import Calendarr from './Calendar.jsx';
import CalendarControls from './CalendarControls.jsx';

const TimeLineAndDays = () => {
  return (
    <div className="bg-white border border-slate-200  shadow-md flex flex-col h-full overflow-hidden">
      {/* Controls row */}
      <div className="px-4 py-3 borde border-slate-200">
        <CalendarControls />
      </div>

      {/* Calendar content */}
      <div className="flex-1 overflow-auto bg-slate-200 min-h-[500px] md:min-h-[100%]">
        <Calendarr />
      </div>
    </div>
  );
};

export default TimeLineAndDays;
