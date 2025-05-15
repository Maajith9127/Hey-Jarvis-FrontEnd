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

function App() {

  useEffect(() => {
    const TODO_DRAGGABLES = document.querySelector(".Todo-Draggable-Elements");

    const observer = new MutationObserver(() => {
      new Draggable(TODO_DRAGGABLES, {
        itemSelector: ".ScrollBar_Elements",
        eventData: function (element) {
          const todoId = element.getAttribute('data-id'); // the original id from Scrollbar item
          return {
            id: todoId,
            title: element.innerText || "Untitled",
            extendedProps: {
              Type: "Todo",
              TodoId: todoId,
              SpecificEventId: uuidv4(), // 🔥 generate only ONCE on drop
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
          const AccountabilityId = element.getAttribute('data-id'); // the original id from Scrollbar item
          return {
            id: AccountabilityId,
            title: element.innerText || "Untitled",
            extendedProps: {
              Type: "Accountability",
              AccountabilityId: AccountabilityId,
              SpecificEventId: uuidv4(), // 🔥 generate only ONCE on drop
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
  const [PhotosFromDb, setPhotosFromDb] = useState([])
  useEffect(() => {
    console.log("He this is Photos from Db")

    const fetchPhotosFromDb = async () => {
      try {
        const res = await fetch("http://localhost:3000/apiPhotos/GetLivePhotos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
        )

        const DbPhotos = await res.json();

        console.log("Db Photos Look Like", DbPhotos);
        setPhotosFromDb(DbPhotos.Photos);

      } catch (error) {

      }

    }
    fetchPhotosFromDb();
    console.log("after async fn")
    //load data back to redux after refresh
  }, [])
  useEffect(() => {
    PhotosFromDb.forEach(photo => {
      dispatch(AddPhotoToRedux(photo));
    })
  })


  const [DbEvents, setDbEvents] = useState([])
  useEffect(() => {
    const FetchFromDb = async () => {
      try {
        const response = await fetch("http://localhost:3000/apiCalendar/GetAllEvents", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json(); // ✅ properly awaited
        console.log("Events from DB", data);
        setDbEvents(data.Events);
        // data.Events.forEach(event => {
        //     dispatch(addEventsToRedux(event));
        // });
        console.log(DbEvents) // ✅ assumes response shape is { events: [...] }

      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };

    FetchFromDb();
  }, []);
  useEffect(() => {
    DbEvents.forEach(event => {
      dispatch(addEventsToRedux(event));
    })
  })


  return (
    <>
      <div className="grid grid-cols-4 gap-1 min-h-screen py-1  ">
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
