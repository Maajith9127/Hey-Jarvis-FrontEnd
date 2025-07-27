
import React, { useState, useEffect } from 'react';
import { store } from '../../ReduxToolkit/store';
import StrictModeModal from '../Modals/StrictModeModal';
import RepeatModal from '../Modals/RepeatModal';
import SignInModal from '../Modals/SignInModal';
import { saveAllCalendarData } from '../../services/calendarService.js';
import { activateStrictMode } from '../../services/strictModeService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDeleteMode } from '../../ReduxToolkit/Slices/CalendarSlice.jsx';

const CalendarControls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [nextScheduleTime, setNextScheduleTime] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lockedUntil, setLockedUntil] = useState(null);

  useEffect(() => {
    const updateFromLocal = () => {
      const value = localStorage.getItem("selectedStrictMode");
      if (value && value !== "No Strict Mode Selected") {
        setLockedUntil(new Date(value));
      } else {
        setLockedUntil(null);
      }
    };

    updateFromLocal(); // initial load

    window.addEventListener("strictModeUpdated", updateFromLocal);

    return () => {
      window.removeEventListener("strictModeUpdated", updateFromLocal);
    };
  }, []);

  useEffect(() => {
    const updateNextSchedule = () => {
      const savedTime = localStorage.getItem("nextScheduleTime");
      if (savedTime) {
        setNextScheduleTime(new Date(savedTime));
      } else {
        setNextScheduleTime(null);
      }
    };

    updateNextSchedule();

    window.addEventListener("storage", updateNextSchedule);             // 🔁 for multi-tab
    window.addEventListener("nextScheduleUpdated", updateNextSchedule); // ✅ for same tab WS updates

    return () => {
      window.removeEventListener("storage", updateNextSchedule);
      window.removeEventListener("nextScheduleUpdated", updateNextSchedule);
    };
  }, []);

  const dispatch = useDispatch();
  const deleteMode = useSelector((state) => state.calendar.deleteMode); //  Redux value

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
      console.log(" Synced:", result);
      const nextScheduleTime = new Date(result.nextScheduledAt)
      localStorage.setItem("nextScheduleTime", nextScheduleTime.toISOString()); // ✅ Store as string
      setNextScheduleTime(nextScheduleTime);
      toast.success(" All changes saved successfully!");
      // window.location.reload(); //  Reload on save
    } catch (err) {
      console.error(" Sync failed:", err);

      if (err.response?.status === 403 && err.response?.data?.error?.includes("Strict Mode")) {
        const blockedItems = err.response?.data?.blocked || [];
        const itemTypes = [...new Set(blockedItems.map(item => item.type))].join(", ");
        toast.error(` Strict Mode active! Blocked changes in: ${itemTypes}`);
      } else {
        toast.error(err.response?.data?.error || "Unknown error occurred");
      }
    } finally {
      setIsSaving(false);
    }
  };
  const openStrictModeModal = () => {
    setIsModalOpen(true);
    console.log("Strict Mode Clicked, opening modal.");
  };
  const closeStrictModeModal = () => {
    setIsModalOpen(false);
  };
  const HandleStrictMode = async () => {
    try {
      const timestamp = Date.now();
      const res = await activateStrictMode(timestamp);
      console.log(" Strict Mode Activated:", res);
    } catch (err) {
      console.error("Failed to activate strict mode:", err);
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
      {/*  Delete Mode Toggle Button using Redux */}
      <button
        onClick={() => dispatch(toggleDeleteMode())}
        className={`border text-xs px-3 py-1.5 font-medium shadow-sm transition whitespace-nowrap rounded-md ${deleteMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-700 text-white hover:bg-gray-800'
          }`}
      >
        {deleteMode ? "Delete" : "Delete"}
      </button>

      <div className='flex gap-1 justify-center items-center'>
        {nextScheduleTime ? (
          <div className="mt-2 w-full  flex justify-center">
            <div className="flex items-center gap-2 bg-blue-50  border-blue-300 text-blue-700 text-sm rounded-lg px-4 py-2 shadow-sm">
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

          <div className="mt-2  w-[70%] justify-center   bg-yellow-50 border border-yellow-300 text-yellow-700 text-sm  rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
            No upcoming accountability scheduled
          </div>
        )}

        {lockedUntil && new Date(lockedUntil) > new Date() ? (
          <div className="mt-1 px-2 py-1 bg-gray-100 border rounded text-sm text-gray-700 shadow-sm">
            Locked until:{" "}
            <span className="font-medium">
              {lockedUntil.toLocaleTimeString("en-IN", {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })},{" "}
              {lockedUntil.toLocaleDateString("en-IN", {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        ) : (
          <div className="mt-1 px-2 py-1 bg-green-50 border-green-300 rounded text-sm text-green-800 shadow-sm">
            Free to Edit — No Strict Mode Active
          </div>
        )}


      </div>

      <StrictModeModal isOpen={isModalOpen} onClose={closeStrictModeModal} />
      <RepeatModal isOpen={showRepeatModal} onClose={() => setShowRepeatModal(false)} />
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </div>
  );
};

export default CalendarControls;
