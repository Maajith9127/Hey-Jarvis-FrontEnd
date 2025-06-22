// import React, { useEffect, useRef } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import { store } from "../../ReduxToolkit/store.js";
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     addEventsToRedux,
//     updateEventInRedux,
//     deleteEventFromRedux,
// } from '../../ReduxToolkit/Slices/CalendarSlice.jsx';

// const getEventClassNames = (arg) => {
//     const event = arg.event;
//     const classes = [];

//     if (event.extendedProps.Type === 'Accountability') {
//         classes.push('accountability-event');
//         classes.push(event.extendedProps.verified ? 'verified' : 'unverified');
//     }

//     return classes;
// };

// const Calendarr = () => {
//     const dispatch = useDispatch();
//     const allEvents = useSelector((state) => state.calendar.CalendarEvents);
//     const calendarRef = useRef(); // ✅ Step 1: Add calendar ref

//     const handleDrop = (info) => {
//         const startTime = new Date(info.event.start);
//         const startDate = new Date(info.event.start);
//         const endTime = new Date(startDate.getTime() + 10 * 60 * 1000);

//         const formatTime = (date) => {
//             const hours = date.getHours();
//             const minutes = date.getMinutes().toString().padStart(2, '0');
//             const ampm = hours >= 12 ? 'PM' : 'AM';
//             const hr = hours % 12 || 12;
//             return `${hr}:${minutes}${ampm}`;
//         };

//         const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

//         const newEvent = {
//             Type: info.event.extendedProps.Type,
//             SpecificEventId: info.event.extendedProps.SpecificEventId,
//             title: info.event.title,
//             start: startDate.toISOString(),
//             end: endTime.toISOString(),
//             timeSlot: timeSlot,
//             CollectionType: info.event.extendedProps.CollectionType,
//         };

//         if (info.event.extendedProps.Type === "Todo") {
//             newEvent.TodoId = info.event.id;
//         } else if (info.event.extendedProps.Type === "Accountability") {
//             newEvent.AccountabilityId = info.event.id;
//             newEvent.verified = false;
//         }

//         const eventsBefore = store.getState().calendar.CalendarEvents.length;
//         dispatch(addEventsToRedux(newEvent));

//         setTimeout(() => {
//             const eventsAfter = store.getState().calendar.CalendarEvents.length;
//             if (eventsAfter === eventsBefore) {
//                 info.revert(); // ❌ Collision
//                 console.log("❌ Collision — event not added");
//             } else {
//                 console.log("✅ Event successfully added");
//             }
//         }, 0);
//     };

//     const handleChange = (info) => {
//         const startTime = new Date(info.event.start);
//         const endTime = new Date(info.event.end);

//         const formatTime = (date) => {
//             const hours = date.getHours();
//             const minutes = date.getMinutes().toString().padStart(2, '0');
//             const ampm = hours >= 12 ? 'PM' : 'AM';
//             const hr = hours % 12 || 12;
//             return `${hr}:${minutes}${ampm}`;
//         };

//         const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

//         const updatedEvent = {
//             SpecificEventId: info.event.extendedProps.SpecificEventId,
//             TodoId: info.event.extendedProps.TodoId,
//             title: info.event.title,
//             start: info.event.start.toISOString(),
//             end: info.event.end.toISOString(),
//             timeSlot: timeSlot,
//             CollectionType: info.event.extendedProps.CollectionType,
//         };

//         dispatch(updateEventInRedux(updatedEvent));
//     };

//     const confirmationDelete = (arg) => {
//         const res = prompt("Are you sure you want to delete this event? (yes/no)");
//         return res && res.toLowerCase() === "yes";
//     };

//     const handleDelete = (arg) => {
//         if (!confirmationDelete(arg)) return;
//         const idToDelete = arg.event.extendedProps.SpecificEventId;
//         dispatch(deleteEventFromRedux({ SpecificEventId: idToDelete }));
//     };

//     return (
//         <>
//             <FullCalendar
//                 ref={calendarRef} // ✅ added
//                 plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
//                 headerToolbar={{
//                     left: "prev,next today",
//                     center: "title",
//                     right: "dayGridMonth,timeGridWeek,timeGridDay",
//                 }}
//                 slotDuration="00:05:00"
//                 slotLabelInterval="01:00"
//                 allDaySlot={false}
//                 expandRows={true}
//                 nowIndicator={true}
//                 editable={true}
//                 droppable={true}
//                 selectable={true}
//                 selectMirror={true}
//                 eventOverlap={true} // allow them to technically overlap
//                 initialView="timeGridWeek"
//                 eventClassNames={getEventClassNames}
//                 events={allEvents}
//                 height="100%"
//                 eventReceive={handleDrop}
//                 eventDrop={handleChange}
//                 eventResize={handleChange}
//                 eventResizableFromStart={true}
//                 eventDurationEditable={true}
//                 eventClick={handleDelete}
//                 drop={(info) => console.log(" Drop detected:", info)} // ✅ test log
//             />
//         </>
//     );
// };

// export default Calendarr;


import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import { useDispatch, useSelector } from 'react-redux';
import {
    addEventsToRedux,
    updateEventInRedux,
    deleteEventFromRedux,
} from '../../ReduxToolkit/Slices/CalendarSlice.jsx';
import { store } from "../../ReduxToolkit/store.js";

const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hr = hours % 12 || 12;
    return `${hr}:${minutes}${ampm}`;
};

const getEventClassNames = (arg) => {
    const event = arg.event;
    const classes = [];

    if (event.extendedProps.Type === 'Accountability') {
        classes.push('accountability-event');
        classes.push(event.extendedProps.verified ? 'verified' : 'unverified');
    }
    

    return classes;
};

const Calendarr = () => {
    const dispatch = useDispatch();
    const allEvents = useSelector((state) => state.calendar.CalendarEvents);
    const calendarRef = useRef();

    const handleDrop = (info) => {
        const startTime = new Date(info.event.start);
        const startDate = new Date(info.event.start);
        const endTime = new Date(startDate.getTime() + 10 * 60 * 1000);

        const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

        const newEvent = {
            Type: info.event.extendedProps.Type,
            SpecificEventId: info.event.extendedProps.SpecificEventId,
            title: info.event.title,
            start: startDate.toISOString(),
            end: endTime.toISOString(),
            timeSlot: timeSlot,
            CollectionType: info.event.extendedProps.CollectionType,
            fromDb: false, // ✅ Explicitly mark as frontend-only
        };

        if (info.event.extendedProps.Type === "Todo") {
            newEvent.TodoId = info.event.id;
        } else if (info.event.extendedProps.Type === "Accountability") {
            newEvent.AccountabilityId = info.event.id;
            newEvent.verified = false;
        }

        const eventsBefore = store.getState().calendar.CalendarEvents.length;
        dispatch(addEventsToRedux(newEvent));

        setTimeout(() => {
            const eventsAfter = store.getState().calendar.CalendarEvents.length;
            if (eventsAfter === eventsBefore) {
                info.revert();
                console.log("❌ Collision — event not added");
            } else {
                console.log("✅ Event successfully added");
            }
        }, 0);
    };

    const handleChange = (info) => {
        const startTime = new Date(info.event.start);
        const endTime = new Date(info.event.end);

        const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

        const updatedEvent = {
            Type: info.event.extendedProps.Type,
            SpecificEventId: info.event.extendedProps.SpecificEventId,
            TodoId: info.event.extendedProps.TodoId,
            AccountabilityId: info.event.extendedProps.AccountabilityId,
            title: info.event.title,
            start: info.event.start.toISOString(),
            end: info.event.end.toISOString(),
            timeSlot,
            CollectionType: info.event.extendedProps.CollectionType,
            verified: info.event.extendedProps.verified || false,
        };

        dispatch(updateEventInRedux(updatedEvent));
    };

    const confirmationDelete = (arg) => {
        const res = prompt("Are you sure you want to delete this event? (yes/no)");
        return res && res.toLowerCase() === "yes";
    };

    const handleDelete = (arg) => {
        if (!confirmationDelete(arg)) return;

        const idToDelete = arg.event.extendedProps.SpecificEventId;
        dispatch(deleteEventFromRedux({ SpecificEventId: idToDelete }));
    };

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            slotDuration="00:05:00"
            slotLabelInterval="01:00"
            allDaySlot={false}
            expandRows={true}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            eventOverlap={true}
            initialView="timeGridWeek"
            eventClassNames={getEventClassNames}
            events={allEvents}
            height="100%"
            eventReceive={handleDrop}
            eventDrop={handleChange}
            eventResize={handleChange}
            eventResizableFromStart={true}
            eventDurationEditable={true}
            eventClick={handleDelete}
            drop={(info) => console.log("Drop detected:", info)}
        />
    );
};

export default Calendarr;
