
import React from 'react';
import Calendarr from './Calendar.jsx';
import CalendarControls from './CalendarControls.jsx';

const TimeLineAndDays = () => {
  return (
    <div className="bg-white border border-slate-200 shadow-md flex flex-col h-full overflow-hidden">
      {/* Controls row */}
      <div className=" borde border-slate-200">
        <CalendarControls />
      </div>

      {/* Calendar content */}
      <div className=" overflow-x-scroll overflow-y-hidden bg-white">
        <div className="min-w-[900px]    ">
          <Calendarr />
        </div>
      </div>
    </div>
  );
};

export default TimeLineAndDays;
