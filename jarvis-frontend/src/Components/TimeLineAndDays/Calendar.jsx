// import React, { useRef } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";

// import { useDispatch, useSelector } from 'react-redux';
// import {
//     addEventsToRedux,
//     updateEventInRedux,
//     deleteEventFromRedux,
// } from '../../ReduxToolkit/Slices/CalendarSlice.jsx';
// import { store } from "../../ReduxToolkit/store.js";

// const formatTime = (date) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const hr = hours % 12 || 12;
//     return `${hr}:${minutes}${ampm}`;
// };

// const handleDatesSet = (arg) => {
//     localStorage.setItem("calendarView", arg.view.type); // example: timeGridWeek
//     localStorage.setItem("calendarDate", arg.startStr);  // example: 2025-07-01T00:00:00.000Z
// };

// const storedView = localStorage.getItem("calendarView") || "timeGridWeek";
// const storedDate = localStorage.getItem("calendarDate") || new Date().toISOString();



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
//     const calendarRef = useRef();


//     const handleDrop = (info) => {
//         const startTime = new Date(info.event.start);
//         const startDate = new Date(info.event.start);
//         const endTime = new Date(startDate.getTime() + 10 * 60 * 1000);

//         const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

//         const newEvent = {
//             Type: info.event.extendedProps.Type,
//             SpecificEventId: info.event.extendedProps.SpecificEventId,
//             title: info.event.title,
//             start: startDate.toISOString(),
//             end: endTime.toISOString(),
//             timeSlot: timeSlot,
//             CollectionType: info.event.extendedProps.CollectionType,
//             fromDb: false, // ✅ Explicitly mark as frontend-only
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
//                 info.revert();
//                 console.log("❌ Collision — event not added");
//             } else {
//                 console.log("✅ Event successfully added");
//             }
//         }, 0);
//     };

//     const handleChange = (info) => {
//         const startTime = new Date(info.event.start);
//         const endTime = new Date(info.event.end);

//         const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

//         const updatedEvent = {
//             Type: info.event.extendedProps.Type,
//             SpecificEventId: info.event.extendedProps.SpecificEventId,
//             TodoId: info.event.extendedProps.TodoId,
//             AccountabilityId: info.event.extendedProps.AccountabilityId,
//             title: info.event.title,
//             start: info.event.start.toISOString(),
//             end: info.event.end.toISOString(),
//             timeSlot,
//             CollectionType: info.event.extendedProps.CollectionType,
//             verified: info.event.extendedProps.verified || false,
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
//         <FullCalendar
//             ref={calendarRef}
//             plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
//             headerToolbar={{
//                 left: "prev,next today",
//                 center: "title",
//                 right: "dayGridMonth,timeGridWeek,timeGridDay",
//             }}
//             slotDuration="00:05:00"
//             slotLabelInterval="01:00"
//             allDaySlot={false}
//             expandRows={true}
//             nowIndicator={true}
//             editable={true}
//             droppable={true}
//             selectable={true}
//             selectMirror={true}
//             eventOverlap={true}
//             initialView={storedView}        
//             initialDate={storedDate}        
//             datesSet={handleDatesSet}
//             eventClassNames={getEventClassNames}
//             events={allEvents}
//             eventReceive={handleDrop}
//             eventDrop={handleChange}
//             eventResize={handleChange}
//             eventResizableFromStart={true}
//             eventDurationEditable={true}
//             eventClick={handleDelete}
//             // drop={(info) => console.log("Drop detected:", info)}



//         />
//     );
// };

// export default Calendarr;





// import React, { useRef, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import { useEffect } from "react";

// import { useDispatch, useSelector } from 'react-redux';
// import {
//     addEventsToRedux,
//     updateEventInRedux,
//     deleteEventFromRedux,
// } from '../../ReduxToolkit/Slices/CalendarSlice.jsx';
// import { store } from "../../ReduxToolkit/store.js";

// const formatTime = (date) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const hr = hours % 12 || 12;
//     return `${hr}:${minutes}${ampm}`;
// };

// const handleDatesSet = (arg) => {
//     localStorage.setItem("calendarView", arg.view.type);
//     localStorage.setItem("calendarDate", arg.startStr);
// };

// const storedView = localStorage.getItem("calendarView") || "timeGridWeek";
// const storedDate = localStorage.getItem("calendarDate") || new Date().toISOString();

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
//     const calendarRef = useRef();
//     const [deleteMode, setDeleteMode] = useState(false);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             const container = document.querySelector('.fc-scroller');

//             if (container) {
//                 const saved = localStorage.getItem('calendarScrollTop');
//                 if (saved) container.scrollTop = parseInt(saved, 10);

//                 const handleScroll = () => {
//                     localStorage.setItem('calendarScrollTop', container.scrollTop);
//                     // console.log("Vertical:", container.scrollTop);
//                 };

//                 container.addEventListener('scroll', handleScroll);
//                 console.log("✅ Scroll listener attached");

//                 // Cleanup
//                 return () => container.removeEventListener('scroll', handleScroll);
//             } else {
//                 console.warn("❌ Could not find .fc-scroller");
//             }
//         }, 300); // delay until FullCalendar DOM is ready

//         return () => clearTimeout(timer);
//     }, []);







//     const handleDrop = (info) => {
//         const startTime = new Date(info.event.start);
//         const startDate = new Date(info.event.start);
//         const endTime = new Date(startDate.getTime() + 10 * 60 * 1000);

//         const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

//         const newEvent = {
//             Type: info.event.extendedProps.Type,
//             SpecificEventId: info.event.extendedProps.SpecificEventId,
//             title: info.event.title,
//             start: startDate.toISOString(),
//             end: endTime.toISOString(),
//             timeSlot: timeSlot,
//             CollectionType: info.event.extendedProps.CollectionType,
//             fromDb: false,
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
//                 info.revert();
//                 console.log("❌ Collision — event not added");
//             } else {
//                 console.log("✅ Event successfully added");
//             }
//         }, 0);
//     };

//     const handleChange = (info) => {
//         const startTime = new Date(info.event.start);
//         const endTime = new Date(info.event.end);

//         const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

//         const updatedEvent = {
//             Type: info.event.extendedProps.Type,
//             SpecificEventId: info.event.extendedProps.SpecificEventId,
//             TodoId: info.event.extendedProps.TodoId,
//             AccountabilityId: info.event.extendedProps.AccountabilityId,
//             title: info.event.title,
//             start: info.event.start.toISOString(),
//             end: info.event.end.toISOString(),
//             timeSlot,
//             CollectionType: info.event.extendedProps.CollectionType,
//             verified: info.event.extendedProps.verified || false,
//         };

//         dispatch(updateEventInRedux(updatedEvent));
//     };

//     const handleDelete = (arg) => {
//         if (!deleteMode) return; // ❌ Ignore if not in delete mode


//         const idToDelete = arg.event.extendedProps.SpecificEventId;
//         dispatch(deleteEventFromRedux({ SpecificEventId: idToDelete }));
//     };

//     return (
//         <div className="w-full">
//             {/* Delete Mode Toggle */}
//             <div className="flex justify-end items-center mb-2 pr-4">
//                 <button
//                     className={`px-4 py-2 rounded-lg text-white font-semibold transition-all duration-200 
//                         ${deleteMode ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-800'}`}
//                     onClick={() => setDeleteMode(!deleteMode)}
//                 >
//                     {deleteMode ? " Delete Mode: ON" : "Delete Mode: OFF"}
//                 </button>
//             </div>

//             {/* Calendar */}
//             <FullCalendar
//                 ref={calendarRef}
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
//                 eventOverlap={true}
//                 initialView={storedView}
//                 initialDate={storedDate}
//                 datesSet={handleDatesSet}
//                 eventClassNames={getEventClassNames}
//                 events={allEvents}
//                 eventReceive={handleDrop}
//                 eventDrop={handleChange}
//                 eventResize={handleChange}
//                 eventResizableFromStart={true}
//                 eventDurationEditable={true}
//                 eventClick={handleDelete}
//             />
//         </div>
//     );
// };

// export default Calendarr;





// import React, { useRef, useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";

// import { useDispatch, useSelector } from 'react-redux';
// import {
//     addEventsToRedux,
//     updateEventInRedux,
//     deleteEventFromRedux,
// } from '../../ReduxToolkit/Slices/CalendarSlice.jsx';
// import { store } from "../../ReduxToolkit/store.js";

// const formatTime = (date) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const hr = hours % 12 || 12;
//     return `${hr}:${minutes}${ampm}`;
// };

// const handleDatesSet = (arg) => {
//     localStorage.setItem("calendarView", arg.view.type);
//     localStorage.setItem("calendarDate", arg.startStr);

//     // Restore scroll position after view change
//     setTimeout(() => {
//         const savedScrollTop = localStorage.getItem("calendarScrollTop");
//         if (savedScrollTop) {
//             const scrollContainer = document.querySelector('.fc-scroller-liquid-absolute');
//             if (scrollContainer) {
//                 scrollContainer.scrollTop = parseInt(savedScrollTop);
//             }
//         }
//     }, 100);
// };

// const storedView = localStorage.getItem("calendarView") || "timeGridWeek";
// const storedDate = localStorage.getItem("calendarDate") || new Date().toISOString();

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
//     const calendarRef = useRef();
//     const [deleteMode, setDeleteMode] = useState(false);
//     const scrollSaveTimeoutRef = useRef(null);

//     // Function to save scroll position
//     const saveScrollPosition = () => {
//         const scrollContainer = document.querySelector('.fc-scroller-liquid-absolute');
//         if (scrollContainer) {
//             localStorage.setItem("calendarScrollTop", scrollContainer.scrollTop.toString());
//         }
//     };

//     // Debounced scroll save function
//     const handleScroll = () => {
//         if (scrollSaveTimeoutRef.current) {
//             clearTimeout(scrollSaveTimeoutRef.current);
//         }
//         scrollSaveTimeoutRef.current = setTimeout(saveScrollPosition, 150);
//     };

//     // Set up scroll listener after calendar renders
//     useEffect(() => {
//         const setupScrollListener = () => {
//             const scrollContainer = document.querySelector('.fc-scroller-liquid-absolute');
//             if (scrollContainer) {
//                 scrollContainer.addEventListener('scroll', handleScroll);

//                 // Restore initial scroll position
//                 const savedScrollTop = localStorage.getItem("calendarScrollTop");
//                 if (savedScrollTop) {
//                     scrollContainer.scrollTop = parseInt(savedScrollTop);
//                 }

//                 return () => {
//                     scrollContainer.removeEventListener('scroll', handleScroll);
//                 };
//             }
//         };

//         // Wait for FullCalendar to render
//         const timeoutId = setTimeout(setupScrollListener, 200);

//         return () => {
//             clearTimeout(timeoutId);
//             if (scrollSaveTimeoutRef.current) {
//                 clearTimeout(scrollSaveTimeoutRef.current);
//             }
//         };
//     }, []);

//     // Also restore scroll position when events change
//     useEffect(() => {
//         const restoreScroll = () => {
//             const savedScrollTop = localStorage.getItem("calendarScrollTop");
//             if (savedScrollTop) {
//                 const scrollContainer = document.querySelector('.fc-scroller-liquid-absolute');
//                 if (scrollContainer) {
//                     scrollContainer.scrollTop = parseInt(savedScrollTop);
//                 }
//             }
//         };

//         const timeoutId = setTimeout(restoreScroll, 100);
//         return () => clearTimeout(timeoutId);
//     }, [allEvents]);

//     const handleDrop = (info) => {
//         const startTime = new Date(info.event.start);
//         const startDate = new Date(info.event.start);
//         const endTime = new Date(startDate.getTime() + 10 * 60 * 1000);

//         const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

//         const newEvent = {
//             Type: info.event.extendedProps.Type,
//             SpecificEventId: info.event.extendedProps.SpecificEventId,
//             title: info.event.title,
//             start: startDate.toISOString(),
//             end: endTime.toISOString(),
//             timeSlot: timeSlot,
//             CollectionType: info.event.extendedProps.CollectionType,
//             fromDb: false,
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
//                 info.revert();
//                 console.log("❌ Collision — event not added");
//             } else {
//                 console.log("✅ Event successfully added");
//             }
//         }, 0);
//     };

//     const handleChange = (info) => {
//         const startTime = new Date(info.event.start);
//         const endTime = new Date(info.event.end);

//         const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)} / ${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;

//         const updatedEvent = {
//             Type: info.event.extendedProps.Type,
//             SpecificEventId: info.event.extendedProps.SpecificEventId,
//             TodoId: info.event.extendedProps.TodoId,
//             AccountabilityId: info.event.extendedProps.AccountabilityId,
//             title: info.event.title,
//             start: info.event.start.toISOString(),
//             end: info.event.end.toISOString(),
//             timeSlot,
//             CollectionType: info.event.extendedProps.CollectionType,
//             verified: info.event.extendedProps.verified || false,
//         };

//         dispatch(updateEventInRedux(updatedEvent));
//     };

//     const handleDelete = (arg) => {
//         if (!deleteMode) return; // ❌ Ignore if not in delete mode

//         const idToDelete = arg.event.extendedProps.SpecificEventId;
//         dispatch(deleteEventFromRedux({ SpecificEventId: idToDelete }));
//     };

//     return (
//         <div className="w-full">
//             {/* Delete Mode Toggle */}
//             <div className="flex justify-end items-center mb-2 pr-4">
//                 <button
//                     className={`p-1 rounded-lg text-white font-semibold transition-all duration-200 
//                         ${deleteMode ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-800'}`}
//                     onClick={() => setDeleteMode(!deleteMode)}
//                 >
//                     {deleteMode ? " Delete Mode: ON" : "Delete Mode: OFF"}
//                 </button>
//             </div>

//             {/* Calendar */}
//             <FullCalendar
//                 ref={calendarRef}
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
//                 eventOverlap={true}
//                 initialView={storedView}
//                 initialDate={storedDate}
//                 datesSet={handleDatesSet}
//                 eventClassNames={getEventClassNames}
//                 events={allEvents}
//                 eventReceive={handleDrop}
//                 eventDrop={handleChange}
//                 eventResize={handleChange}
//                 eventResizableFromStart={true}
//                 eventDurationEditable={true}
//                 eventClick={handleDelete}
//             />
//         </div>
//     );
// };

// export default Calendarr;









import React, { useRef, useEffect } from "react";
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

const handleDatesSet = (arg) => {
    localStorage.setItem("calendarView", arg.view.type);
    localStorage.setItem("calendarDate", arg.startStr);

    setTimeout(() => {
        const savedScrollTop = localStorage.getItem("calendarScrollTop");
        if (savedScrollTop) {
            const scrollContainer = document.querySelector('.fc-scroller-liquid-absolute');
            if (scrollContainer) {
                scrollContainer.scrollTop = parseInt(savedScrollTop);
            }
        }
    }, 100);
};

const storedView = localStorage.getItem("calendarView") || "timeGridWeek";
const storedDate = localStorage.getItem("calendarDate") || new Date().toISOString();

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
    const deleteMode = useSelector((state) => state.calendar.deleteMode); // ✅ Redux deleteMode

    const calendarRef = useRef();
    const scrollSaveTimeoutRef = useRef(null);

    const saveScrollPosition = () => {
        const scrollContainer = document.querySelector('.fc-scroller-liquid-absolute');
        if (scrollContainer) {
            localStorage.setItem("calendarScrollTop", scrollContainer.scrollTop.toString());
        }
    };

    const handleScroll = () => {
        if (scrollSaveTimeoutRef.current) {
            clearTimeout(scrollSaveTimeoutRef.current);
        }
        scrollSaveTimeoutRef.current = setTimeout(saveScrollPosition, 150);
    };

    useEffect(() => {
        const setupScrollListener = () => {
            const scrollContainer = document.querySelector('.fc-scroller-liquid-absolute');
            if (scrollContainer) {
                scrollContainer.addEventListener('scroll', handleScroll);

                const savedScrollTop = localStorage.getItem("calendarScrollTop");
                if (savedScrollTop) {
                    scrollContainer.scrollTop = parseInt(savedScrollTop);
                }

                return () => {
                    scrollContainer.removeEventListener('scroll', handleScroll);
                };
            }
        };

        const timeoutId = setTimeout(setupScrollListener, 200);
        return () => {
            clearTimeout(timeoutId);
            if (scrollSaveTimeoutRef.current) {
                clearTimeout(scrollSaveTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const restoreScroll = () => {
            const savedScrollTop = localStorage.getItem("calendarScrollTop");
            if (savedScrollTop) {
                const scrollContainer = document.querySelector('.fc-scroller-liquid-absolute');
                if (scrollContainer) {
                    scrollContainer.scrollTop = parseInt(savedScrollTop);
                }
            }
        };

        const timeoutId = setTimeout(restoreScroll, 100);
        return () => clearTimeout(timeoutId);
    }, [allEvents]);

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
            fromDb: false,
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

    const handleDelete = (arg) => {
        if (!deleteMode) return; // ✅ Now using Redux deleteMode

        const idToDelete = arg.event.extendedProps.SpecificEventId;
        dispatch(deleteEventFromRedux({ SpecificEventId: idToDelete }));
    };

    return (
        <div className="w-full">
            {/* ✅ Delete toggle removed because it's now global in CalendarControls */}

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
                initialView={storedView}
                initialDate={storedDate}
                datesSet={handleDatesSet}
                eventClassNames={getEventClassNames}
                events={allEvents}
                eventReceive={handleDrop}
                eventDrop={handleChange}
                eventResize={handleChange}
                eventResizableFromStart={true}
                eventDurationEditable={true}
                eventClick={handleDelete}
            />
        </div>
    );
};

export default Calendarr;
