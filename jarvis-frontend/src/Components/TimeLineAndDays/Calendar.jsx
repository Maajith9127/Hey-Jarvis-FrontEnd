
import React from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Day Grid plugin (Month view)
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // Interaction plugin (drag-and-drop)
import timeGridPlugin from "@fullcalendar/timegrid"; // Time Grid plugin (Week view)


import { useDispatch, useSelector } from 'react-redux';
import {
    addEventsToRedux,
    updateEventInRedux,
    deleteEventFromRedux
} from '../../ReduxToolkit/Slices/CalendarSlice.jsx'; // Adjust the path if needed


const Calendarr = () => {

    const dispatch = useDispatch();
    const allEvents = useSelector((state) => state.calendar.CalendarEvents); // Make sure reducer key is `calendar`

    const handleDrop = (info) => {
        const newEvent = {
            TodoId: info.event.id,
            SpecificEventId: info.event.extendedProps.SpecificEventId,
            title: info.event.title,
            start: info.event.start.toISOString(),
            end: info.event.end ? info.event.end.toISOString() : null,
            allDay: info.event.allDay,
        };
        dispatch(addEventsToRedux(newEvent));
    };

    const handleChange = (info) => {
        const updatedEvent = {
            SpecificEventId: info.event.extendedProps.SpecificEventId,
            TodoId: info.event.extendedProps.TodoId,
            title: info.event.title,
            start: info.event.start.toISOString(),
            end: info.event.end ? info.event.end.toISOString() : null,
            allDay: info.event.allDay,
        };
        dispatch(updateEventInRedux(updatedEvent));
    };

    const handleResize = (info) => {
        const updatedEvent = {
            SpecificEventId: info.event.extendedProps.SpecificEventId,
            TodoId: info.event.extendedProps.TodoId,
            title: info.event.title,
            start: info.event.start.toISOString(),
            end: info.event.end ? info.event.end.toISOString() : null,
            allDay: info.event.allDay,
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
