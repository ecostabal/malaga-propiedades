// Favorites.js
import { useFavorites } from './favoritesContext';
import PropertyCard from './PropertyCard';

const Favorites = () => {
    const { favorites } = useFavorites();
    
    return (
        <div className="favorites-container">
            {favorites.map(fav => <PropertyCard key={fav.id} property={fav} />)}
        </div>
    );
};
