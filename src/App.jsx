import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './general/Router.jsx';
import NavBar from "./components/NavBar.jsx"
import Footer from "./components/Footer.jsx"


export const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow"> {/* This div will expand to fill available space */}
          <Router />
        </div>
        <Footer className="flex-shrink-0" /> {/* This will keep the Footer at the bottom */}
      </div>
    </BrowserRouter>
  );
};