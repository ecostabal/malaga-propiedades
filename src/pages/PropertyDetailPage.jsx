import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);  // Nuevo estado para el agente
  const [imagenes, setImagenes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/propiedad/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
        'Content-Type': 'application/json;charset=iso-8859-1',
      },
    })
      .then(response => response.blob()) // Leer la respuesta como un blob
      .then(blobData => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const decodedData = reader.result; // La respuesta decodificada en texto
          const parsedData = JSON.parse(decodedData);
          
          if (parsedData.responseCode === 0) {
            setImagenes(parsedData.Imagenes);
            setProperty(parsedData.Propiedad);
            setAgent(parsedData.Agente);
          } else {
            console.error('Error fetching property details:', parsedData.ErrorMensaje);
          }
        };
        reader.readAsText(blobData, 'ISO-8859-1'); // Decodificar el blob como texto
      })
      .catch(error => console.error('Error fetching property details:', error))
      .finally(() => setLoading(false));
  }, [propertyId]);

  



  return (
    <div>
      {loading ? (
        <p>Cargando detalles de la propiedad...</p>
      ) : property ? (
        <div>
          <h2>{property.Tipo}</h2>
          <p>Comuna: {property.Comuna}</p>
          <p>Valor en Pesos: {property.ValorPesos}</p>
          <p>Valor en UF: {property.ValorUf}</p>
          <p>Descripción: {property.Descripcion}</p>
          <p>Latitud: {property.Latitud}</p>
          <p>Longitud: {property.Longitud}</p>
          <p>Ciudad: {property.Ciudad}</p>
          <p>Superficie: {property.Superficie} {property.TipoMedida}</p>
          <p>Gasto Común: {property.GastoComun}</p>
          <p>Condominio: {property.Condominio ? 'Sí' : 'No'}</p>
          <p>Orientación: {property.Orientacion}</p>
          <p>Calefacción: {property.Calefaccion ? 'Sí' : 'No'}</p>
          <p>Piscina: {property.Piscina ? 'Sí' : 'No'}</p>
          <p>Estudio: {property.Estudio ? 'Sí' : 'No'}</p>
          <p>Servicio: {property.Servicio ? 'Sí' : 'No'}</p>
          <p>Jardín: {property.Jardin ? 'Sí' : 'No'}</p>
          <p>Terraza: {property.Terraza ? 'Sí' : 'No'}</p>
          <p>Amoblado: {property.Amoblado ? 'Sí' : 'No'}</p>
          {agent ? (
          <>
            <p>Nombre: {agent.Nombre}</p>
            <p>Teléfono: {agent.Telefono}</p>
            <p>Celular: {agent.Celular}</p>
            <p>Email: {agent.Email}</p>
          </>
        ) : (
          <p>No se encontró información del agente.</p>
        )}
        {imagenes && imagenes.length > 0 ? (
          imagenes.map((imagen, index) => (
            <img key={index} src={imagen.Imagen} alt={`Imagen ${index}`} />
          ))
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
      </div>
    ) : (
      <p>No se encontraron detalles de la propiedad.</p>
    )}
  </div>
  );
};

export default PropertyDetailPage;
