import React from 'react';

export const FavoriteContext = React.createContext({
  favoriteCount: 0,
  incrementFavorite: () => {},
  decrementFavorite: () => {},
});
