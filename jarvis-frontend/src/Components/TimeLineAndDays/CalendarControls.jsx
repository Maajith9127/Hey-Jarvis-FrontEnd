import React from 'react'
import { useSelector } from 'react-redux'

const CalendarControls = () => {

    const CalendarEvents = useSelector((state) => { return state.calendar.CalendarEvents })
    const LivePhotos=useSelector((state)=>{return state.photo.Photos})

   

    const HandleSubmit =async () => {
       const res1=await fetch("http://localhost:3000/apiCalendar/CalendarSave", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({ events: CalendarEvents }),
        })
        const data = await res1.json();


        const res2=await fetch("http://localhost:3000/apiPhotos/SaveLivePhotos", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({ LivePhotos:LivePhotos }),
        })
    }

    const HandleStrictMode = async() => {

        const res=await fetch("http://localhost:3000/apiCalendar/StrictMode", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({Message:"Strict Mode Activated"}),
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