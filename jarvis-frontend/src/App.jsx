import Accountability from "./Components/Accountability/Accountability";
import TimeLineAndDays from "./Components/TimeLineAndDays/TimeLineAndDays";
import ToDos from "./Components/ToDos/ToDos";
import Navbar from "./Components/NavBar/Navbar";
import { useEffect } from "react";
import { Draggable } from "@fullcalendar/interaction"; // Interaction plugin (drag-and-drop)
import { v4 as uuidv4 } from 'uuid';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddPhotoToRedux } from "./ReduxToolkit/Slices/PhotoSlice";
import { addEventsToRedux } from "./ReduxToolkit/Slices/CalendarSlice"; // Adjust the path if needed
import { addMessageToRedux } from "./ReduxToolkit/Slices/MessageSlice";
import { renderMicroColGroup } from "@fullcalendar/core/internal";

function App() {


  const [AccountabilityMessages, setAccountabilityMessages] = useState([])
  const [LivePhotos, setLivePhotos] = useState([])
  const [CalendarEvents, setCalendarEvents] = useState([])

  useEffect(() => {
    const TODO_DRAGGABLES = document.querySelector(".Todo-Draggable-Elements");

    const observer = new MutationObserver(() => {
      new Draggable(TODO_DRAGGABLES, {
        itemSelector: ".ScrollBar_Elements",
        eventData: function (element) {
          const collectionType = element.getAttribute('data-collectiontype'); // 👈
          const todoId = element.getAttribute('data-id'); // the original id from Scrollbar item
          return {
            id: todoId,
            title: element.innerText || "Untitled",
            extendedProps: {
              Type: "Todo",
              TodoId: todoId,
              SpecificEventId: uuidv4(), // 🔥 generate only ONCE on drop
              CollectionType: collectionType,
            },
          };
        },
      });
    });


    observer.observe(TODO_DRAGGABLES, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect(); // Cleanup
  }, []);

  useEffect(() => {
    const ACCOUNTABILITY_DRAGGABLES = document.querySelector(".Accountability-Draggable-Elements");

    const observer = new MutationObserver(() => {
      new Draggable(ACCOUNTABILITY_DRAGGABLES, {
        itemSelector: ".ScrollBar_Elements",
        eventData: function (element) {
          const collectionType = element.getAttribute('data-collectiontype'); // 👈
          const AccountabilityId = element.getAttribute('data-id'); // the original id from Scrollbar item
          return {
            id: AccountabilityId,
            title: element.innerText || "Untitled",
            extendedProps: {
              Type: "Accountability",
              AccountabilityId: AccountabilityId,
              SpecificEventId: uuidv4(), // 🔥 generate only ONCE on drop
              CollectionType: collectionType,
            },
          };
        },
      });
    });
    observer.observe(ACCOUNTABILITY_DRAGGABLES, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect(); // Cleanup
  }, []);


  const dispatch = useDispatch();

  useEffect(() => {
    const FetchAllData = async () => {
      try {
        const res = await fetch("http://localhost:3000/GetAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        const accountabilityMessages = data?.Accountability || [];
        const livePhotos = data?.LivePhotos || [];
        const calendarEvents = data?.Calendar || [];
        console.log("Fetched data", data);

        // ✅ Map through and dispatch one by one
        accountabilityMessages.forEach((msg) => {
          dispatch(addMessageToRedux(msg));
        });

        calendarEvents.forEach((event) => {
          dispatch(addEventsToRedux(event));
        });

        livePhotos.photos.forEach((photo) => {
          dispatch(AddPhotoToRedux(photo)); // Uncomment this if photo slice is implemented
        });

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    FetchAllData();
  }, []);

  return (
    <>
      <div className="grid border grid-cols-4 gap-1 min-h-screen  py-1  ">
        <div className="ABC col-span-1">
          <ToDos />
        </div>
        <div className="col-span-2">
          <TimeLineAndDays />
        </div>
        <div className="XYZ col-span-1">
          <Accountability />
        </div>
      </div>
    </>
  );
}
export default App;
