import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './general/Router.jsx';
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import { FavoriteContext } from './FavoriteContext.jsx';

export const App = () => {
  const [favoriteCount, setFavoriteCount] = useState(0);

  const incrementFavorite = () => {
    setFavoriteCount(prevCount => prevCount + 1);
  };

  const decrementFavorite = () => {
    setFavoriteCount(prevCount => prevCount - 1);
  };

  return (
    <FavoriteContext.Provider value={{ favoriteCount, incrementFavorite, decrementFavorite }}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <div className="flex-grow">
            <Router />
          </div>
          <Footer className="flex-shrink-0" />
        </div>
      </BrowserRouter>
    </FavoriteContext.Provider>
  );
};
