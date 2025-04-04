"use client"
import React from "react";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Day Grid plugin (Month view)
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // Interaction plugin (drag-and-drop)
import timeGridPlugin from "@fullcalendar/timegrid"; // Time Grid plugin (Week view)

const Calendarr = () => {
    const [events, setevents] = useState([
        { title: "event1", id: "1" },
        { title: "event2", id: "2" },
        { title: "event3", id: "3" },
        { title: "event4", id: "4" },
    ]);

    const [allEvents, setAllEvents] = useState([
        { title: "Sample Event 1", id: "1", start: "2025-04-01T10:00:00", allDay: false },
        { title: "Sample Event 2", id: "2", start: "2025-04-02T14:00:00", allDay: true },

    ]);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        start: "",
        allDay: false,
        id: 0,
    })
    const addEvent = (arg) => {
        console.log("Hey you have dropped this event")
        const event = { ...newEvent, start: arg.date.toISOString(), title: arg.draggedEl.innerText, allDay: arg.allDay, id: new Date().getTime() }
        setAllEvents([...allEvents, event])
        console.log(allEvents)
    }
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
        let confirmation = confirmationDelete(arg)
        if (!confirmation) {
            console.log("Delete action canceled.");
            return;
        }
        else {
            console.log("Hey the event before was")
            console.log(allEvents)
            console.log("The id to delet is", arg.event.id)
            const idToDelete = arg.event.id
            const updatedEvents = allEvents.filter(event => event.id != idToDelete);
            setAllEvents(updatedEvents);
        }
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
                // Implement the drop, dateClick, etc.
                drop={addEvent}
                eventClick={handleDelete}
                events={allEvents}
                height="143%"
            />
        </>
    );
};
export default Calendarr;
