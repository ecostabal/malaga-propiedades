import React from 'react';
import '../css/propertyCard.css';

const PropertyCard = ({ property }) => {
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
      <div className='property-price'>
        <p>💰 {property.TipoMoneda === 1 ? '$' : 'UF'} {property.TipoMoneda === 1 ? property.ValorPesos : property.ValorUf}</p>
      </div>
      <div className='property-fetures'>
        <p>{property.Habitaciones}D | {property.Bathroom}B | {property.Estacionamientos}E</p>
      </div>
      <div className='property-name'>
        <p>{propertyType[property.Tipo] || property.Tipo} en {property.Comuna}</p> 
        {/* Aquí usamos propertyType para traducir el tipo de propiedad */}
      </div>
      <div className='property-size'>
        <p>{property.M2} {property.TipoMedida}m² / {property.Superficie} {property.TipoMedida} m²</p>
      </div>
      <img className="card-image" src={property.Imagenes[0].Imagen} alt={property.Nombre} />
    </div>
  </div>
  );
};

export default PropertyCard;
