import Accountability from "./Components/Accountability/Accountability";
import TimeLineAndDays from "./Components/TimeLineAndDays/TimeLineAndDays";
import ToDos from "./Components/ToDos/ToDos";
import Navbar from "./Components/NavBar/Navbar";
import { useEffect } from "react";
import { Draggable } from "@fullcalendar/interaction"; // Interaction plugin (drag-and-drop)



function App() {
  useEffect(() => {
    let ABC_DIV = document.querySelector(".ABC");
    let TODO_DRAGGABLES = ABC_DIV.querySelector(".Todo-Draggable-Elements");
    console.log(TODO_DRAGGABLES);
    if (TODO_DRAGGABLES) {
      new Draggable(TODO_DRAGGABLES, {
        itemSelector: ".Todos",
        eventData: function (A_ToDo_Element) {
          return {
            title: A_ToDo_Element.innerText,
            imageSrc: A_ToDo_Element.querySelector("img").src,
          };
        },
      });
    }
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
          <div className="col-span-1">
            <Accountability />
          </div>
        </div>
      </>
  );
}

export default App;
