import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './general/Router.jsx';
import NavBar from "./components/NavBar.jsx"


export const App = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Router />
    </BrowserRouter>
  )
}
