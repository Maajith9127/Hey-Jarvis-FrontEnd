import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

import Location from './Components/ToDos/LivePhoto/LivePhoto.jsx';
import KeepMeAwake from './Components/ToDos/KeepMeAwake/KeepMeAwake.jsx';
import WebBlocking from './Components/ToDos/WebBlocking/WebBlocking.jsx';
import AppBlocking from './Components/ToDos/AppBlocking/AppBlocking.jsx';
import LiveVideo from './Components/ToDos/LiveVideo/LiveVideo.jsx';

import { Provider } from 'react-redux';
import { store } from './ReduxToolkit/store.js';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>


  <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/livephoto" element={<Location />} />
        <Route path="/keepmeawake" element={<KeepMeAwake/>} />
        <Route path="/webblocking" element={<WebBlocking/>} />
        <Route path="/appblocking" element={<AppBlocking/>} />
        <Route path="/LiveVideo" element={<LiveVideo/>} />        
      </Routes>
  </Router>

  </Provider>

   
  // </StrictMode>,
)
