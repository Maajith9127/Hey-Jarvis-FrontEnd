import React from 'react'
import { store } from '../../ReduxToolkit/store'
import { useSelector } from 'react-redux'

const CalendarControls = () => {

  const HandleSubmit = async () => {
    const state = store.getState();
    const payload = {
      Photos: state.photo.Photos,
      CalendarEvents: state.calendar.CalendarEvents,
      AccountabilityMessages: state.message.messages,
    };
    try {
      const res = await fetch("http://localhost:3000/SaveAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  const HandleStrictMode = async () => {
    const res = await fetch("http://localhost:3000/apiCalendar/StrictMode", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Message: "Strict Mode Activated" }),
    })

    console.log("Strict Mode Clicked")
  }

  return (
    <div className='borde flex justify-center flex-wrap items-center gap-x-3 '>
      <button className='border border-black rounded-2xl px-10 py-2'>Repeat</button>
      <button onClick={HandleStrictMode} className='border border-black rounded-2xl px-10 py-2'>Strict Mode</button>
      <button className='border border-black rounded-2xl px-10 py-2'>Activate</button>
      <button onClick={HandleSubmit} className='border border-black rounded-2xl px-10 py-2'>Save</button>
    </div>
  )
}
export default CalendarControls

