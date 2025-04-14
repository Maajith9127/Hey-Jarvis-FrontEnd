import Accountability from "./Components/Accountability/Accountability";
import TimeLineAndDays from "./Components/TimeLineAndDays/TimeLineAndDays";
import ToDos from "./Components/ToDos/ToDos";
import Navbar from "./Components/NavBar/Navbar";
import { useEffect } from "react";
import { Draggable } from "@fullcalendar/interaction"; // Interaction plugin (drag-and-drop)
import { v4 as uuidv4 } from 'uuid';

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
