import React from 'react';
import { HeartIcon } from "@heroicons/react/24/solid";
import { LuBath, LuBedDouble, LuCar } from "react-icons/lu";
import { useFavorites } from '../favoritesContext.jsx';



import '../css/propertyCard.css';

function formatCurrency(value) {
  // Transformar valor numérico a string
  const stringValue = value.toString();

  // Dividir el valor en partes antes y después del decimal
  const parts = stringValue.split(".");
  
  // Agregar el símbolo de miles usando expresiones regulares
  const formattedIntegerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  // Si hay parte decimal, agregar coma y la parte decimal
  let formattedValue = formattedIntegerPart;
  if (parts[1]) {
    formattedValue += "," + parts[1];
  }

  return formattedValue;
}


const PropertyCard = ({ property }) => {

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav.id === property.Codigo);

  const toggleFavorite = (event) => {
    event.preventDefault();  // Añade esto
    event.stopPropagation();
  
    if (isFavorite) {
        removeFavorite(property.Codigo);
    } else {
        addFavorite(property);
    }
};

  
  
  
  
  const propertyType = {
    DE: 'Departamento',
    CA: 'Casa',
    TE: 'Terreno',
    OF: 'Oficina',
    LO: 'Local Comercial',
    ED: 'Edificio',
    CO: 'Condominio',
  };

  return (
  <div className="card">
    <div className='card-image-container'>
    <div className="property-price">
      💰 {property.Pactado === "PESOS" ? '$' : 'UF'}{' '}
      {property.Pactado === "PESOS"
        ? formatCurrency(property.ValorPesos)
        : formatCurrency(property.ValorUf)}
    </div>
    <div className='property-fetures'>
      <p>
        <LuBedDouble className="h-5 w-5 inline mx-2" />
        {property.Habitaciones}D <LuBath className="h-5 w-5 inline mx-2" />
        {property.Bathroom}B <LuCar className="h-5 w-5 inline mx-2" />
        {property.Estacionamientos}E
      </p>
      </div>    
    <div className='property-name'>
        <p>{propertyType[property.Tipo] || property.Tipo} en {property.Comuna}</p> 
        {/* Aquí usamos propertyType para traducir el tipo de propiedad */}
    </div>
    <div className='property-size'>
        <p>{property.M2} {property.TipoMedida}m² / {property.Superficie} {property.TipoMedida} m²</p>
    </div>
    <button className='heart' onClick={toggleFavorite}>
            <HeartIcon className={`h-8 w-8 text-white ${isFavorite ? 'text-red-500' : ''}`} aria-hidden="true" />
    </button>
    <img className="card-image" src={property.Imagenes[0].Imagen} alt={property.Nombre} />
  </div>
  </div>
  );
};

export default PropertyCard;
