import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

import Photo from './Components/ToDos/LivePhoto/LivePhoto.jsx';
import WebBlocking from './Components/ToDos/WebBlocking/WebBlocking.jsx';
import AppBlocking from './Components/ToDos/AppBlocking/AppBlocking.jsx';
import LiveVideo from './Components/ToDos/LiveVideo/LiveVideo.jsx';

import Message from './Components/Accountability/Message/Message.jsx';
import Payment from './Components/Accountability/Payment/Payment.jsx';


import { Provider } from 'react-redux';
import { store } from './ReduxToolkit/store.js';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <Router>
      <Routes>
        {/* To Dos */}
        <Route path="/" element={<App />} />
        <Route path="/livephoto" element={<Photo />} />
        <Route path="/randomised" element={<Photo />} />

        <Route path="/webblocking" element={<WebBlocking />} />
        <Route path="/appblocking" element={<AppBlocking />} />
        <Route path="/LiveVideo" element={<LiveVideo />} />
        {/* Accountability   */}
        <Route path='/message' element={<Message />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </Router>
  </Provider>
  // </StrictMode>,
)
