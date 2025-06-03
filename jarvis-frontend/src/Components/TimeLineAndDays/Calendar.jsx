
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


const getEventClassNames = (arg) => {
    const event = arg.event;
    const classes = [];

    if (event.extendedProps.Type === 'Accountability') {
        classes.push('accountability-event'); // base class

        if (event.extendedProps.verified === true) {
            classes.push('verified'); // ✅ green
        } else {
            classes.push('unverified'); // ❌ red
        }
    }

    return classes;
};



const Calendarr = () => {
    const dispatch = useDispatch();
    const allEvents = useSelector((state) => state.calendar.CalendarEvents); // Make sure reducer key is `calendar`
    const handleDrop = (info) => {
        console.log("Dropped event:", info.Verfiable);
        const startTime = new Date(info.event.start);
        // const endTime = new Date(info.event.end);
        const startDate = new Date(info.event.start);
        const endTime = new Date(startDate.getTime() + 10 * 60 * 1000); // adds 10 mins
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
            SpecificEventId: info.event.extendedProps.SpecificEventId,
            title: info.event.title,
            start: startDate.toISOString(),
            end: endTime.toISOString(),
            timeSlot: timeSlot,
            StrictMode: false,
        };

        // 💥 Conditionally add the correct ID field
        if (info.event.extendedProps.Type === "Todo") {
            newEvent.TodoId = info.event.id;
        } else if (info.event.extendedProps.Type === "Accountability") {
            newEvent.AccountabilityId = info.event.id;
            newEvent.verified=false;
        }

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
        };
        console.log("Updated event:", updatedEvent);
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
        console.log("Delete event:", arg);
        let confirmation = confirmationDelete(arg);
        if (!confirmation) {
            console.log("Delete action canceled.");
            return;
        }
        const idToDelete = arg.event.extendedProps.SpecificEventId;
        console.log("Deleting event with SpecificEventId:", idToDelete);
        dispatch(deleteEventFromRedux({ SpecificEventId: idToDelete }));

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
                slotDuration="00:05:00"               // 🧠 Backend logic: 1 min steps
                // snapDuration="00:01:00"               // 🎯 Snap every 1 minute
                slotLabelInterval="01:00"             // ⏱ Only show hourly labels
                allDaySlot={false}
                expandRows={true}
                eventClassNames={getEventClassNames}
                initialView="timeGridWeek"
                nowIndicator={true}
                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
                //................................
                eventClick={handleDelete}
                events={allEvents}
                height="100%"
                //eventReceive-Here you can access event drop and access the meta dat from new draggable
                eventReceive={handleDrop}
                ///................................
                eventDrop={handleChange}
                // eventResize={handleResize}
                eventResize={handleChange}
            />
        </>
    );
};
export default Calendarr;
