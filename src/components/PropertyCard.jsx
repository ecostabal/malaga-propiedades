import React, { useState } from 'react';
import { HeartIcon } from "@heroicons/react/24/solid";
import { LuBath, LuBedDouble, LuCar } from "react-icons/lu";
import '../css/propertyCard.css';

// Función para formatear la moneda
function formatCurrency(value) {
    const stringValue = value.toString();
    const parts = stringValue.split(".");
    const formattedIntegerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    let formattedValue = formattedIntegerPart;
    if (parts[1]) {
        formattedValue += "," + parts[1];
    }
    return formattedValue;
}

const PropertyCard = ({ property, onIncrement, onDecrement }) => {
  const [isRed, setIsRed] = useState(false);
    console.log(isRed)

    const handleHeartClick = (e) => {
      e.stopPropagation();
      setIsRed(prevState => !prevState);
      isRed ? onDecrement() : onIncrement();
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
                <div className="text-sm	property-price">
                    💰 {property.Pactado === "PESOS" ? '$' : 'UF'}{' '}
                    {property.Pactado === "PESOS"
                        ? formatCurrency(property.ValorPesos)
                        : formatCurrency(property.ValorUf)}
                </div>
                <div className='property-fetures'>
                    <p className='text-sm'>
                        <LuBedDouble className="h-5 w-5 inline mx-2" />
                        {property.Habitaciones} <LuBath className="h-5 w-5 inline mx-2" />
                        {property.Bathroom} <LuCar className="h-5 w-5 inline mx-2" />
                        {property.Estacionamientos}
                    </p>
                </div>
                <div className='property-name'>
                    <p className='text-sm'>{propertyType[property.Tipo] || property.Tipo} en {property.Comuna}</p>
                </div>
                <div className='property-size'>
                    <p className='text-sm'>{property.M2} {property.TipoMedida}m² / {property.Superficie} {property.TipoMedida} m²</p>
                </div>
                <button className='heart' onClick={handleHeartClick}>
                    <HeartIcon className={`h-8 w-8 ${isRed ? 'text-red-500' : 'text-white'}`} aria-hidden="true" />
                </button>
                <img className="card-image" src={property.Imagenes[0].Imagen} alt={property.Nombre} />
            </div>
        </div>
    );
};

export default PropertyCard;
