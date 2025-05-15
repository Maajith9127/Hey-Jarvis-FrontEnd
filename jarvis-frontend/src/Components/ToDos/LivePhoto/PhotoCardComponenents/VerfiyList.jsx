import React from 'react'
import { useSelector } from 'react-redux'


const VerfiyList = ({ photoid: photoid }) => {
  const VerifyPhoto=(event)=>{
    console.log("Verify Photo Clicked");
    const data = JSON.parse(event.target.dataset.id);
    console.log("Data", data);
    fetch("http://localhost:3000/apiLivePhotoVerfication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({data}),
  })
}

  let CalendarEvents = useSelector((state) => { return state.calendar.CalendarEvents })
  console.log("Calendar Events", CalendarEvents);
  // Sort CalendarEvents based on start time
  const sortedEvents = CalendarEvents
    .filter(event => event.TodoId === photoid) // Only include events for the current photoid
    .sort((a, b) => {
      const startA = new Date(a.start);
      const startB = new Date(b.start);
      // Compare by date first, then by time if on the same day
      if (startA.getTime() === startB.getTime()) {
        return startA - startB; // Compare time
      }
      return startA - startB; // Compare date
    });

  return (
    <div className='border flex-col w-[40%] rounded-[25px] py-20 '>
      <div>Verification</div>
      <div className='border'>
        {sortedEvents.map((event) => {
          // Format the start and end dates and times
          const startDate = new Date(event.start);
          const endDate = event.end ? new Date(event.end) : null;
          // Format the dates
          const startDateFormatted = startDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          // Format the times with AM/PM
          const startTime = startDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true  // Adds AM/PM
          });

          let endTime = endDate
            ? endDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true  // Adds AM/PM
            })
            : "TBD"; // Handle missing end time
          return (
            <div key={event.TodoId}>
              <ul>{event.title}</ul>
              <ul>
                {/* Display the date and time range */}
                {startDateFormatted} <br />
                {startTime} - {endTime}
              </ul>

              <button
              onClick={VerifyPhoto}
                className='border'
                data-id={JSON.stringify({
                  Todoid: event.TodoId,
                  SpecificEventid: event.SpecificEventId,
                  CollectionToCeck: "Live Photos"
                })}
              >
                Verify
              </button>



            </div>
          );
        })}
      </div>
    </div>
  )
}

export default VerfiyList