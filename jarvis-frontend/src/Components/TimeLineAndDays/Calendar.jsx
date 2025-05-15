
import React from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Day Grid plugin (Month view)
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // Interaction plugin (drag-and-drop)
import timeGridPlugin from "@fullcalendar/timegrid"; // Time Grid plugin (Week view)
import { store } from "../../ReduxToolkit/store.js";
import { useDispatch, useSelector } from 'react-redux';
import { addEventsToRedux, updateEventInRedux, deleteEventFromRedux } from '../../ReduxToolkit/Slices/CalendarSlice.jsx'; // Adjust the path if needed
import { useEffect } from "react";
import { useState } from "react";

const Calendarr = () => {
    const dispatch = useDispatch();
    const allEvents = useSelector((state) => state.calendar.CalendarEvents); // Make sure reducer key is `calendar`

    //To load the Evenrts from Db
    // const [DbEvents, setDbEvents] = useState([])
    // useEffect(() => {
    //     const FetchFromDb = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3000/apiCalendar/GetAllEvents", {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             });
    //             const data = await response.json(); // ✅ properly awaited
    //             console.log("Events from DB", data);
    //             setDbEvents(data.Events);
    //             data.Events.forEach(event => {
    //                 dispatch(addEventsToRedux(event));
    //             });
    //             console.log(DbEvents) // ✅ assumes response shape is { events: [...] }

    //         } catch (error) {
    //             console.error("❌ Error fetching events:", error);
    //         }
    //     };

    //     FetchFromDb();
    // }, []);

    // useEffect(()=>{
    //     DbEvents.forEach(event => {
    //         dispatch(addEventsToRedux(event));
    //     })
    // })



    const handleDrop = (info) => {
        console.log("Dropped event:", info.event);
        const startTime = new Date(info.event.start);
        // const endTime = new Date(info.event.end);
        const startDate = new Date(info.event.start);
        const endTime = new Date(startDate.getTime() + 60 * 60000); // adds 30 mins
        const formatTime = (date) => {
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const hr = hours % 12 || 12;
            return `${hr}:${minutes}${ampm}`;
        };
        const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

        const newEvent = {
            Type: info.event.extendedProps.Type,
            TodoId: info.event.id,
            SpecificEventId: info.event.extendedProps.SpecificEventId,
            title: info.event.title,
            start: startDate.toISOString(),
            end: endTime.toISOString(),
            timeSlot: timeSlot,
            StrictMode: false,
            VerfificationStatus: false,
            Verfiable: false,
        };

        const eventsBefore = store.getState().calendar.CalendarEvents.length;
        dispatch(addEventsToRedux(newEvent));
        setTimeout(() => {
            const eventsAfter = store.getState().calendar.CalendarEvents.length;
            if (eventsAfter === eventsBefore) {
                // Collision occurred — event wasn't added
                info.revert(); // 🔥 remove visual drop
                console.log("❌ Collision — event not added");
            } else {
                console.log("✅ Event successfully added");
            }
        }, 0);
    };


    const handleChange = (info) => {

        console.log("Changed event:");
        const startTime = new Date(info.event.start);
        const endTime = new Date(info.event.end);

        const startDate = new Date(info.event.start);
        const endDate = new Date(startDate.getTime() + 60 * 60000); // adds 30 mins

        const formatTime = (date) => {
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const hr = hours % 12 || 12;
            return `${hr}:${minutes}${ampm}`;
        };
        const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

        const updatedEvent = {
            SpecificEventId: info.event.extendedProps.SpecificEventId,
            TodoId: info.event.extendedProps.TodoId,
            title: info.event.title,
            start: info.event.start.toISOString(),
            end: endTime.toISOString(),
            timeSlot: timeSlot,
            StrictMode: false,
            // allDay: info.event.allDay,
            VerfificationStatus: false,
            Verfiable: false,
        };
        console.log("Updated event:", updatedEvent);
        dispatch(updateEventInRedux(updatedEvent));

    };

    const handleResize = (info) => {

        const startTime = new Date(info.event.start);
        const endTime = new Date(info.event.end);

        const startDate = new Date(info.event.start);
        const endDate = new Date(startDate.getTime() + 60 * 60000); // adds 30 mins

        const formatTime = (date) => {
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const hr = hours % 12 || 12;
            return `${hr}:${minutes}${ampm}`;
        };
        const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;


        const updatedEvent = {
            SpecificEventId: info.event.extendedProps.SpecificEventId,
            TodoId: info.event.extendedProps.TodoId,
            title: info.event.title,
            start: info.event.start.toISOString(),
            end: endTime.toISOString(),
            timeSlot: timeSlot,
            StrictMode: false,
            // allDay: info.event.allDay,
            VerfificationStatus: false,
        };
        dispatch(updateEventInRedux(updatedEvent));
    };


    const confirmationDelete = (arg) => {
        const res = prompt("Are you sure you want to delete this event? (yes/no)");
        console.log("Hiiiiiiiiii");
        console.log(res);
        if (res && res.toLowerCase() === "yes") {
            return true;
        } else {
            return false;
        }
    }

    const handleDelete = async (arg) => {
        let confirmation = confirmationDelete(arg);
        if (!confirmation) {
            console.log("Delete action canceled.");
            return;
        }
        const idToDelete = arg.event.extendedProps.SpecificEventId;
        dispatch(deleteEventFromRedux(idToDelete));
        const res = await fetch("http://localhost:3000/apiCalendar/DeleteEvent", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                SpecificEventId: idToDelete,
            }),
        })

        const data = await res.json();
        // info.revert();

        localStorage.setItem("scrollPosition", window.scrollY); // or scrollTop for specific div
        window.location.reload();

        useEffect(() => {
  const scrollPos = localStorage.getItem("scrollPosition");
  if (scrollPos) {
    window.scrollTo(0, parseInt(scrollPos));
    localStorage.removeItem("scrollPosition"); // Clean up after restoring
  }
}, []);

    };

    return (
        <>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}

                initialView="timeGridWeek"
                nowIndicator={true}
                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
                //................................
                eventClick={handleDelete}
                events={allEvents}
                height="143%"
                //eventReceive-Here you can access event drop and access the meta dat from new draggable
                eventReceive={handleDrop}
                ///................................
                eventDrop={handleChange}
                eventResize={handleResize}
            />
        </>
    );
};
export default Calendarr;
