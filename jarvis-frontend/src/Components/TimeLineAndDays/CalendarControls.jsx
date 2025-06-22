import React from 'react'
import { store } from '../../ReduxToolkit/store'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import StrictModeModal from '../Modals/StrictModeModal';
import RepeatModal from '../Modals/RepeatModal';

const CalendarControls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRepeatModal, setShowRepeatModal] = useState(false);

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
      return result;
    } catch (err) {
      console.error("❌ Sync failed:", err);
    }
    console.log("Payload to save", payload);
  };



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

      <StrictModeModal
        isOpen={isModalOpen}
        onClose={closeStrictModeModal}
      />
      <RepeatModal isOpen={showRepeatModal} onClose={() => setShowRepeatModal(false)} />
    </div>
  );
};

export default CalendarControls;