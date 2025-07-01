import React, { useState, useEffect } from 'react';
import { store } from '../../ReduxToolkit/store';
import StrictModeModal from '../Modals/StrictModeModal';
import RepeatModal from '../Modals/RepeatModal';
import SignInModal from '../Modals/SignInModal';
import { saveAllCalendarData } from '../../services/calendarService.js'; // ✅ refactored service
import { activateStrictMode } from '../../services/strictModeService'; // ✅ NEW
import { toast } from 'react-toastify'

const CalendarControls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [nextScheduleTime, setNextScheduleTime] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const HandleSubmit = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const state = store.getState();
    const payload = {
      Photos: state.photo,
      CalendarEvents: state.calendar,
      AccountabilityMessages: state.message,
    };

    try {
      const result = await saveAllCalendarData(payload);
      console.log("✅ Synced:", result);

      if (result?.nextScheduledAt) {
        const nextTime = new Date(result.nextScheduledAt);
        setNextScheduleTime(nextTime);
        localStorage.setItem("nextScheduleTime", nextTime.toString());
      } else {
        setNextScheduleTime(null);
        localStorage.removeItem("nextScheduleTime");
      }

      toast.success("✅ All changes saved successfully!");
      window.location.reload(); // 🔄 Reload on save

    } catch (err) {
      console.error("❌ Sync failed:", err);

      if (err.response?.status === 403 && err.response?.data?.error?.includes("Strict Mode")) {
        const blockedItems = err.response?.data?.blocked || [];
        const itemTypes = [...new Set(blockedItems.map(item => item.type))].join(", ");
        toast.error(`❌ Strict Mode active! Blocked changes in: ${itemTypes}`);
      } else {
        toast.error(err.response?.data?.error || "❌ Unknown error occurred");
      }
    } finally {
      setIsSaving(false);
    }
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
    console.log("fdgfh")
    try {
      const timestamp = Date.now(); // 🔐 always send current strict cutoff
      const res = await activateStrictMode(timestamp);
      console.log("✅ Strict Mode Activated:", res);
    } catch (err) {
      console.error("❌ Failed to activate strict mode:", err);
    }
  };

  return (
    <div className="w-full mt-1 flex flex-wrap justify-center items-center gap-2 sticky top-0 z-50 bg-white">
      <button
        className="bg-white border text-xs px-3 py-1.5 font-medium shadow-sm hover:bg-gray-100 transition whitespace-nowrap"
        onClick={() => setShowRepeatModal(true)}
      >
        Repeat
      </button>

      <button
        onClick={openStrictModeModal}
        className="bg-white border text-xs px-3 py-1.5 font-medium shadow-sm hover:bg-gray-100 transition whitespace-nowrap"
      >
        Strict Mode
      </button>

      <button
        onClick={HandleSubmit}
        disabled={isSaving}
        className={`border text-xs px-3 py-1.5 font-medium shadow-sm transition whitespace-nowrap ${isSaving
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
          }`}
      >
        {isSaving ? "Saving..." : "Save"}
      </button>


      <button
        onClick={() => setShowSignInModal(true)}
        className="bg-white border text-xs px-3 py-1.5 font-medium shadow-sm hover:bg-gray-100 transition whitespace-nowrap"
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

      <StrictModeModal isOpen={isModalOpen} onClose={closeStrictModeModal} />
      <RepeatModal isOpen={showRepeatModal} onClose={() => setShowRepeatModal(false)} />
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />


    </div>
  );
};

export default CalendarControls;
