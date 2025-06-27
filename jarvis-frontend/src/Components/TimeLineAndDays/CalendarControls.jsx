import React from 'react'
import { store } from '../../ReduxToolkit/store'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import StrictModeModal from '../Modals/StrictModeModal';
import RepeatModal from '../Modals/RepeatModal';
import { useEffect } from 'react';
const CalendarControls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [nextScheduleTime, setNextScheduleTime] = useState(null);



  const HandleSubmit = async () => {
    const state = store.getState();
    const payload = {
      Photos: state.photo,
      CalendarEvents: state.calendar,
      AccountabilityMessages: state.message,
    };
    try {
      const res = await fetch("http://localhost:3000/SaveAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log("✅ Synced:", result);

      if (result?.nextScheduledAt) {
        const nextTime = new Date(result.nextScheduledAt); // ✅ Define this first
        setNextScheduleTime(nextTime);
        localStorage.setItem("nextScheduleTime", nextTime.toString());

      } else {
        setNextScheduleTime(null); // no upcoming events
        localStorage.removeItem("nextScheduleTime");

      }
      console.log("✅ Synced:", result);
      window.location.reload();
      return result;
    } catch (err) {
      console.error("❌ Sync failed:", err);
    }
    console.log("Payload to save", payload);
  };

  useEffect(() => {
    const savedTime = localStorage.getItem("nextScheduleTime");
    if (savedTime) {
      setNextScheduleTime(new Date(savedTime));
    }
  }, []);




  const openStrictModeModal = () => {
    setIsModalOpen(true);
    console.log("Strict Mode Clicked, opening modal.");
  };

  const closeStrictModeModal = () => {
    setIsModalOpen(false);
  };


  const HandleStrictMode = async () => {
    await fetch("http://localhost:3000/apiCalendar/StrictMode", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Message: "Strict Mode Activated" }),
    });
    console.log("Strict Mode Clicked");
  };

  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-2  sticky top-0 z-50 bg-white">
      <button
        className="
        bg-white
          border 
          text-xs
          px-3 py-1.5 
          font-medium 
          shadow-sm 
          hover:bg-gray-100 
          transition 
          whitespace-nowrap
          
        "
        onClick={() => setShowRepeatModal(true)}
      >
        Repeat
      </button>

      <button

        onClick={openStrictModeModal}
        className="
          bg-white 
          border 
          text-xs
          px-3 py-1.5 
          font-medium 
          shadow-sm 
          hover:bg-gray-100 
          transition 
          whitespace-nowrap
        "
      >
        Strict Mode
      </button>

      <button
        onClick={HandleSubmit}
        className="
          bg-white 
          border 
          text-xs
          px-3 py-1.5 
          font-medium 
          shadow-sm 
          hover:bg-gray-100 
          transition 
          whitespace-nowrap
        "
      >
        Save
      </button>
      <button
        // onClick={HandleSubmit}
        className="
          bg-white 
          border 
          text-xs
          px-3 py-1.5 
          font-medium 
          shadow-sm 
          hover:bg-gray-100 
          transition 
          whitespace-nowrap
        "
      >
        SignIn
      </button>

      {nextScheduleTime ? (
        <div className="mt-2 w-full flex justify-center">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-300 text-blue-700 text-sm rounded-lg px-4 py-2 shadow-sm">
            <span className="text-lg">⏰</span>
            <span>
              Next verification at:{" "}
              <span className="font-semibold">
                {nextScheduleTime.toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  day: "numeric",
                  month: "short",
                  weekday: "short",
                })}
              </span>
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-2 w-full flex justify-center">
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 text-sm rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>No upcoming accountability scheduled</span>
          </div>
        </div>
      )}






      <StrictModeModal
        isOpen={isModalOpen}
        onClose={closeStrictModeModal}
      />
      <RepeatModal isOpen={showRepeatModal} onClose={() => setShowRepeatModal(false)} />
    </div>
  );
};

export default CalendarControls;