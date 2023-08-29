import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './general/Router.jsx';
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import { FavoriteContext } from './FavoriteContext.jsx';

export const App = () => {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [favoriteProperties, setFavoriteProperties] = useState({});

  const toggleFavorite = (propertyId, isFavorite) => {
    if (isFavorite) {
      setFavoriteProperties((prevFavorites) => ({
        ...prevFavorites,
        [propertyId]: true,
      }));
      setFavoriteCount((prevCount) => prevCount + 1);
    } else {
      setFavoriteProperties((prevFavorites) => ({
        ...prevFavorites,
        [propertyId]: false,
      }));
      setFavoriteCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favoriteCount, toggleFavorite, favoriteProperties }}>
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
