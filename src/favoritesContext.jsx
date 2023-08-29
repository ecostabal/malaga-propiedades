import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
    return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (property) => {
        if (!favorites.some(fav => fav.id === property.id)) {  // Asegúrate de no agregar duplicados
            setFavorites((prev) => [...prev, property]);
        }
    };

    const removeFavorite = (propertyId) => {
        setFavorites((prev) => prev.filter(p => p.id !== propertyId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
