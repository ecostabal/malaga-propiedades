import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './general/Router.jsx';
import NavBar from "./components/NavBar.jsx"
import Footer from "./components/Footer.jsx"


export const App = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Router />
      <Footer/>
    </BrowserRouter>
  )
}
