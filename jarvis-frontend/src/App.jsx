// import Accountability from "./Components/Accountability/Accountability";
// import TimeLineAndDays from "./Components/TimeLineAndDays/TimeLineAndDays";
// import ToDos from "./Components/ToDos/ToDos";
// import Navbar from "./Components/NavBar/Navbar";
// import { useEffect } from "react";
// import { Draggable } from "@fullcalendar/interaction";
// import { v4 as uuidv4 } from 'uuid';
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { AddPhotoToRedux } from "./ReduxToolkit/Slices/PhotoSlice";
// import { addEventsToRedux } from "./ReduxToolkit/Slices/CalendarSlice";
// import { addMessageToRedux } from "./ReduxToolkit/Slices/MessageSlice";

// function App() {

//   useEffect(() => {
//     const TODO_DRAGGABLES = document.querySelector(".Todo-Draggable-Elements");

//     const observer = new MutationObserver(() => {
//       new Draggable(TODO_DRAGGABLES, {
//         itemSelector: ".ScrollBar_Elements",
//         eventData: function (element) {
//           const collectionType = element.getAttribute('data-collectiontype');
//           const todoId = element.getAttribute('data-id');
//           return {
//             id: todoId,
//             title: element.innerText || "Untitled",
//             extendedProps: {
//               Type: "Todo",
//               TodoId: todoId,
//               SpecificEventId: uuidv4(),
//               CollectionType: collectionType,
//             },
//           };
//         },
//       });
//     });

//     observer.observe(TODO_DRAGGABLES, {
//       childList: true,
//       subtree: true,
//     });

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     const ACCOUNTABILITY_DRAGGABLES = document.querySelector(".Accountability-Draggable-Elements");

//     const observer = new MutationObserver(() => {
//       new Draggable(ACCOUNTABILITY_DRAGGABLES, {
//         itemSelector: ".ScrollBar_Elements",
//         eventData: function (element) {
//           const collectionType = element.getAttribute('data-collectiontype');
//           const AccountabilityId = element.getAttribute('data-id');
//           return {
//             id: AccountabilityId,
//             title: element.innerText || "Untitled",
//             extendedProps: {
//               Type: "Accountability",
//               AccountabilityId: AccountabilityId,
//               SpecificEventId: uuidv4(),
//               CollectionType: collectionType,
//             },
//           };
//         },
//       });
//     });
//     observer.observe(ACCOUNTABILITY_DRAGGABLES, {
//       childList: true,
//       subtree: true,
//     });

//     return () => observer.disconnect();
//   }, []);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const FetchAllData = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/GetAll", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await res.json();

//         const accountabilityMessages = data?.Accountability || [];
//         const livePhotos = data?.LivePhotos || [];
//         const calendarEvents = data?.Calendar || [];
//         console.log("Fetched data", data);

//         accountabilityMessages.forEach((msg) => {
//           dispatch(addMessageToRedux(msg));
//         });

//         calendarEvents.forEach((event) => {
//           dispatch(addEventsToRedux(event));
//         });

//         livePhotos.photos.forEach((photo) => {
//           dispatch(AddPhotoToRedux(photo));
//         });

//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };





//     FetchAllData();
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen py-2 gap-1">
//       {/* Mobile: flex column, Desktop: 3-column grid */}
//       <div className="flex-1 flex flex-col md:grid md:grid-cols-4">
//         {/* Todos on left - Order 2 on mobile */}
//         <div className="order-2 md:order-none md:col-span-1 border border-slate-200 mb-1 md:mb-0">
//           <ToDos />
//         </div>

//         {/* Calendar in center - Order 1 on mobile (appears first) */}
//         <div className="order-1 md:order-none md:col-span-2 h-[600px] md:h-auto mb-1  md:mb-0">
//           <TimeLineAndDays />
//         </div>

//         {/* Accountability on right - Order 3 on mobile */}
//         <div className="order-3 md:order-none md:col-span-1">
//           <Accountability />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App



import Accountability from "./Components/Accountability/Accountability";
import TimeLineAndDays from "./Components/TimeLineAndDays/TimeLineAndDays";
import ToDos from "./Components/ToDos/ToDos";
import { useEffect } from "react";
import { Draggable } from "@fullcalendar/interaction";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { AddPhotoToRedux } from "./ReduxToolkit/Slices/PhotoSlice";
import { addEventsToRedux } from "./ReduxToolkit/Slices/CalendarSlice";
import { addMessageToRedux } from "./ReduxToolkit/Slices/MessageSlice";

function App() {
  const dispatch = useDispatch();

  //  Make Todos draggable
  useEffect(() => {
    const TODO_DRAGGABLES = document.querySelector(".Todo-Draggable-Elements");

    const observer = new MutationObserver(() => {
      new Draggable(TODO_DRAGGABLES, {
        itemSelector: ".ScrollBar_Elements",
        eventData: function (element) {
          const collectionType = element.getAttribute('data-collectiontype');
          const todoId = element.getAttribute('data-id');
          return {
            id: todoId,
            title: element.innerText || "Untitled",
            extendedProps: {
              Type: "Todo",
              TodoId: todoId,
              SpecificEventId: uuidv4(),
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

    return () => observer.disconnect();
  }, []);

  //  Make Accountabilities draggable
  useEffect(() => {
    const ACCOUNTABILITY_DRAGGABLES = document.querySelector(".Accountability-Draggable-Elements");

    const observer = new MutationObserver(() => {
      new Draggable(ACCOUNTABILITY_DRAGGABLES, {
        itemSelector: ".ScrollBar_Elements",
        eventData: function (element) {
          const collectionType = element.getAttribute('data-collectiontype');
          const AccountabilityId = element.getAttribute('data-id');
          return {
            id: AccountabilityId,
            title: element.innerText || "Untitled",
            extendedProps: {
              Type: "Accountability",
              AccountabilityId: AccountabilityId,
              SpecificEventId: uuidv4(),
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

    return () => observer.disconnect();
  }, []);

  // 🧠 Fetch all data on mount and tag with fromDb
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
        console.log("Fetched data", data);

        const accountabilityMessages = data?.Accountability || [];
        const livePhotos = data?.LivePhotos || [];
        const calendarEvents = data?.Calendar || [];

        // ✅ Tag with fromDb: true to prevent polluting delta states
        accountabilityMessages.forEach((msg) => {
          dispatch(addMessageToRedux({ ...msg, fromDb: true }));
        });

        calendarEvents.forEach((event) => {
          dispatch(addEventsToRedux({ ...event, fromDb: true }));
        });

        livePhotos.photos.forEach((photo) => {
          dispatch(AddPhotoToRedux({ ...photo, fromDb: true }));
        });

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    FetchAllData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen py-2 gap-1">
      {/* Mobile: flex column, Desktop: 3-column grid */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-4">
        {/* Todos on left */}
        <div className="order-2 md:order-none md:col-span-1 border border-slate-200 mb-1 md:mb-0">
          <ToDos />
        </div>

        {/* Calendar in center */}
        <div className="order-1 md:order-none md:col-span-2 h-[600px] md:h-auto mb-1 md:mb-0">
          <TimeLineAndDays />
        </div>

        {/* Accountability on right */}
        <div className="order-3 md:order-none md:col-span-1">
          <Accountability />
        </div>
      </div>
    </div>
  );
}

export default App;
