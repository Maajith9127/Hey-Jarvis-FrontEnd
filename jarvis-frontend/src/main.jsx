import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

import Location from './Components/ToDos/Location/Location.jsx';
import KeepMeAwake from './Components/ToDos/KeepMeAwake/KeepMeAwake.jsx';
import WebBlocking from './Components/ToDos/WebBlocking/WebBlocking.jsx';
import AppBlocking from './Components/ToDos/AppBlocking/AppBlocking.jsx';
import Media from './Components/ToDos/Media/Media.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Router>
      <Routes>


        <Route path="/" element={<App />} />
        <Route path="/location" element={<Location />} />
        <Route path="/keepmeawake" element={<KeepMeAwake/>} />
        <Route path="/webblocking" element={<WebBlocking/>} />
        <Route path="/appblocking" element={<AppBlocking/>} />
        <Route path="/media" element={<Media/>} />

        
      </Routes>

  </Router>
   
  // </StrictMode>,
)
