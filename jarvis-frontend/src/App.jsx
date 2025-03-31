import Accountability from "./Components/Accountability/Accountability";
import TimeLineAndDays from "./Components/TimeLineAndDays/TimeLineAndDays";
import ToDos from "./Components/ToDos/ToDos";
import Navbar from "./Components/NavBar/Navbar";
function App() {
  return (
    <>
     
      <div className="grid grid-cols-4 gap-1 min-h-screen py-1  ">
        <div className="col-span-1">
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
